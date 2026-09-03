#!/usr/bin/env node
/**
 * upload-audio-r2.mjs — đẩy kho nhạc lên Cloudflare R2.
 *
 * Nhạc xếp theo album, tên file bỏ dấu cho dễ đọc:
 *     bien-nien-that-nghiep-ky/08-vai-tu-phuong.mp3
 * Đường dẫn này do build-audio-manifest.mjs sinh ra (cùng lúc với audio-map.js
 * mà player dùng để tra), nên hai bên luôn khớp nhau.
 *
 * Cần trước: `wrangler login`, và một bucket R2 đã bật truy cập công khai.
 *
 * Dùng:
 *   node scripts/upload-audio-r2.mjs --bucket anhli-music            # đẩy hết
 *   node scripts/upload-audio-r2.mjs --bucket anhli-music --dry-run  # xem trước
 *   node scripts/upload-audio-r2.mjs --bucket anhli-music --limit 3  # thử vài bài
 *
 * Thêm nhạc mới: thả file vào thư mục nguồn → chạy build-audio-manifest.mjs →
 * chạy lệnh này kèm --skip-existing, nó chỉ đẩy phần chưa có trên kho.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const REPO = path.resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const flag = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? def : (args[i + 1] ?? true);
};
const BUCKET = flag('bucket');
const DRY = args.includes('--dry-run');
const LIMIT = Number(flag('limit', 0)) || 0;
/* Bỏ qua bài đã nằm trên kho — hỏi thẳng URL công khai bằng HEAD.
   Mặc định lấy đúng URL R2 mà index.html đang dùng. */
const SKIP = args.includes('--skip-existing');
const BASE = String(flag('base', 'https://pub-a3731640f04640feb4e5e790b78deedf.r2.dev/')).replace(/\/*$/, '/');

if (!BUCKET){
  console.error('Thiếu --bucket. Ví dụ: node scripts/upload-audio-r2.mjs --bucket anhli-music');
  process.exit(1);
}

const manifestPath = path.join(REPO, 'data/audio-manifest.json');
if (!fs.existsSync(manifestPath)){
  console.error('Chưa có data/audio-manifest.json — chạy `node scripts/build-audio-manifest.mjs` trước.');
  process.exit(1);
}
const { source, tracks } = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

let entries = Object.entries(tracks);
if (LIMIT) entries = entries.slice(0, LIMIT);

/* File trong iCloud có thể mới chỉ là placeholder (chưa tải về máy) — upload
   nhầm placeholder sẽ ra file 0 byte trên R2, nên chặn ngay từ đây. */
const notLocal = [];
const missing = [];
const ready = [];
for (const [id, entry] of entries){
  const { file, key } = entry;
  if (!key){ missing.push(file); continue; }
  const full = path.join(source, file);
  if (!fs.existsSync(full)){ missing.push(file); continue; }
  const st = fs.statSync(full);
  if (st.blocks * 512 < st.size * 0.9){ notLocal.push(file); continue; }
  ready.push({ id, file, key, full, size: st.size });
}

if (missing.length) console.warn(`⚠︎ ${missing.length} file không tìm thấy trong ${source}`);
if (notLocal.length){
  console.error(`⚠︎ ${notLocal.length} file còn nằm trên iCloud, chưa tải về máy. Chạy:`);
  console.error(`   find "${source}" -name '*.mp3' -exec brctl download {} \\;`);
}
console.log(`Sẵn sàng đẩy: ${ready.length} bài (${(ready.reduce((n,r)=>n+r.size,0)/1048576).toFixed(0)} MB)\n`);

if (SKIP){
  const before = ready.length;
  const kept = [];
  for (const r of ready){
    const res = await fetch(BASE + r.key.split('/').map(encodeURIComponent).join('/'), { method: 'HEAD' })
      .catch(() => null);
    if (!res || !res.ok) kept.push(r);
  }
  ready.length = 0; ready.push(...kept);
  console.log(`Bỏ qua ${before - ready.length} bài đã có trên kho → còn ${ready.length} bài cần đẩy.\n`);
}

if (DRY){
  for (const r of ready.slice(0, 10)) console.log(`  ${r.file}  →  ${r.key}`);
  if (ready.length > 10) console.log(`  … và ${ready.length - 10} bài nữa`);
  process.exit(0);
}

let done = 0, failed = [];
for (const r of ready){
  process.stdout.write(`[${++done}/${ready.length}] ${r.key} … `);
  try {
    execFileSync('wrangler', [
      'r2', 'object', 'put', `${BUCKET}/${r.key}`,
      '--file', r.full,
      '--content-type', 'audio/mpeg',
      '--remote',
    ], { stdio: 'pipe' });
    console.log('ok');
  } catch (err){
    console.log('LỖI');
    failed.push({ id: r.id, file: r.file, err: String(err.stderr || err).slice(0, 300) });
  }
}

console.log(`\nXong: ${done - failed.length}/${ready.length} bài lên R2.`);
if (failed.length){
  console.log(`\n${failed.length} bài lỗi:`);
  for (const f of failed) console.log(`  ${f.file}\n    ${f.err}`);
  process.exit(1);
}
