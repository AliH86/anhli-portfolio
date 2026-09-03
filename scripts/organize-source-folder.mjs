#!/usr/bin/env node
/**
 * organize-source-folder.mjs — dọn thư mục nhạc gốc thành từng folder album,
 * đặt lại tên file cho đọc được, để Ali dò xem còn thiếu bài nào.
 *
 * Thư mục sau khi dọn:
 *   Biên Niên Thất Nghiệp Ký/
 *     _THIẾU.txt                     ← còn thiếu bài nào, kèm link Suno
 *     08 - Vái Tứ Phương.mp3
 *   _chưa có trên trang/             ← nhạc có trong máy nhưng trang chưa bày
 *   _đã đổi tên.csv                  ← nhật ký tên cũ → tên mới, để hoàn tác
 *
 * KHÔNG tự tạo folder cho album không có bài nào. Ali xoá folder nào là cố ý bỏ
 * album đó — script dựng lại là chống lại ý người dùng (đã từng xảy ra 3/9).
 * _THIẾU.txt chỉ ghi vào folder ĐANG TỒN TẠI và còn ít nhất một bài.
 *
 * Dùng:  node scripts/organize-source-folder.mjs [--dry-run]
 */
import fs from 'node:fs';
import path from 'node:path';

const REPO = path.resolve(import.meta.dirname, '..');
const DRY = process.argv.includes('--dry-run');

const { source: SRC, tracks } = JSON.parse(
  fs.readFileSync(path.join(REPO, 'data/audio-manifest.json'), 'utf8')
);

/* CHẶN BẢNG KHỚP CŨ. Nếu bảng còn trỏ vào tên file không còn tồn tại (vì thư mục
   đã được dọn từ lần trước), script sẽ tưởng mọi file trong folder album là nhạc
   lạ và hốt hết vào "_chưa có trên trang". Đã dính một lần rồi. */
{
  const stale = Object.values(tracks).filter(e => !fs.existsSync(path.join(SRC, e.file)));
  if (stale.length){
    console.error(`Bảng khớp đã cũ: ${stale.length}/${Object.keys(tracks).length} file không còn ở đường dẫn ghi trong data/audio-manifest.json.`);
    console.error(`Ví dụ: ${stale[0].file}`);
    console.error('Chạy `node scripts/build-audio-manifest.mjs` trước rồi hãy chạy lại lệnh này.');
    process.exit(1);
  }
}

/* cùng cách đọc album như build-audio-manifest.mjs (gộp index.html + music-data-base.js) */
function sliceLiteral(src, from, open, close){
  const start = src.indexOf(open, from);
  let depth = 0;
  for (let i = start; i < src.length; i++){
    if (src[i] === open) depth++;
    else if (src[i] === close && --depth === 0) return src.slice(start, i + 1);
  }
  throw new Error('không tìm được literal đóng');
}
const html = fs.readFileSync(path.join(REPO, 'index.html'), 'utf8');
const albums = eval(sliceLiteral(html, html.indexOf('const ALBUMS = ['), '[', ']'));
const dataJs = fs.readFileSync(path.join(REPO, 'music-data-base.js'), 'utf8');
for (const src of JSON.parse(sliceLiteral(dataJs, dataJs.indexOf('window.PORTFOLIO_MUSIC'), '{', '}')).albums){
  const dst = albums.find(a => a.id === src.id);
  if (!dst){ albums.push(src); continue; }
  if (src.tracks && src.tracks.length) dst.tracks = src.tracks;
  for (const k of ['name', 'cover', 'sub', 'desc']) if (src[k]) dst[k] = src[k];
}

/* macOS: '/' không được phép trong tên file, ':' thì Finder hiển thị thành '/' */
const safe = x => x.replace(/[/:]/g, '-').replace(/\s+/g, ' ').trim().slice(0, 80);

/* Tên album trong dữ liệu trang và tên folder Ali gõ tay có thể lệch nhau ở dấu
   ("Tôi Hoạ" vs "Tôi Họa"). Nếu đã có folder tương đương thì DÙNG LẠI folder đó,
   đừng tạo folder thứ hai rồi bê nhạc của Ali sang — đã lỡ làm vậy ngày 3/9. */
const foldKey = x => x.normalize('NFD').replace(/\p{M}/gu,'').replace(/đ/gi,'d')
                      .toLowerCase().replace(/[^a-z0-9]+/g,'');
const existingDirs = new Map();
for (const e of fs.readdirSync(SRC, { withFileTypes: true })){
  if (e.isDirectory() && !e.name.startsWith('_') && !e.name.startsWith('.')){
    existingDirs.set(foldKey(e.name), e.name);
  }
}
const dirFor = name => existingDirs.get(foldKey(name)) || safe(name);

const fileOf = {};                       // id -> tên file hiện tại
for (const [id, e] of Object.entries(tracks)) fileOf[id] = e.file;

const moves = [];                        // {from, to}
const usedFiles = new Set();
const missingNotes = [];                 // {dir, lines}

for (const al of albums){
  if (!Array.isArray(al.tracks) || !al.tracks.length) continue;
  const dir = dirFor(al.name);
  const missing = [];
  let has = 0;

  al.tracks.forEach((t, i) => {
    // Bài nằm ở 2 album thì xếp vào CẢ HAI (bản thứ hai là bản sao) — thiếu một
    // bản là folder nhảy số, nhìn tưởng thiếu nhạc trong khi không phải.
    const cur = fileOf[t.id];
    if (!cur){ missing.push(`- [ ] ${String(i + 1).padStart(2, '0')} · ${t.name}\n       https://suno.com/song/${t.id}`); return; }
    has++;
    usedFiles.add(cur);
    // Giữ cả trường hợp file đã nằm đúng chỗ: nó vẫn là một "chỗ đến" của
    // file nguồn, nếu bỏ qua thì album khác dùng chung file sẽ cuỗm nó đi.
    moves.push({ from: cur, to: path.join(dir, `${String(i + 1).padStart(2, '0')} - ${safe(t.name)}.mp3`) });
  });

  // Album trống trơn: bỏ qua hoàn toàn — không tạo folder, không ghi ghi chú.
  if (!has) continue;
  if (missing.length){
    missingNotes.push({ dir, text:
`ALBUM: ${al.name}
Đã có ${has}/${has + missing.length} bài — còn thiếu ${missing.length}.

Tải các bài dưới đây từ Suno rồi thả thẳng vào folder này
(để nguyên tên Suno cũng được, script sẽ tự nhận và đặt lại tên):

${missing.join('\n')}
` });
  }
}

/* nhạc có trong máy nhưng trang chưa bày (quét cả thư mục con, để chạy lại lần
   hai vẫn đúng khi nhạc đã nằm trong folder album) */
function walk(dir, base = ''){
  const out = [];
  for (const e of fs.readdirSync(path.join(SRC, dir), { withFileTypes: true })){
    if (e.name.startsWith('.') || e.name.startsWith('_')) continue;
    const rel = base ? path.join(base, e.name) : e.name;
    if (e.isDirectory()) out.push(...walk(path.join(dir, e.name), rel));
    else if (/\.(mp3|m4a|wav)$/i.test(e.name)) out.push(rel);
  }
  return out;
}
const allFiles = walk('');
const ORPHAN = '_chưa có trên trang';
/* "Nhạc lạ" phải xét theo TÊN BÀI, không theo đường dẫn: một bài nằm ở hai album
   thì có hai bản sao hợp lệ, xét theo đường dẫn sẽ tưởng bản thứ hai là nhạc lạ
   rồi đá vào đây, vòng vo mãi không dừng. */
const clean = x => x.normalize('NFD').replace(/đ/g,'d').replace(/Đ/g,'d').replace(/\p{M}/gu,'')
                    .toLowerCase().replace(/[^a-z0-9]+/g,'');
const onSite = new Set();
for (const al of albums) for (const t of (al.tracks || [])) onSite.add(clean(t.name));
for (const f of allFiles){
  if (usedFiles.has(f)) continue;
  // CHỈ gom file đang nằm ở GỐC thư mục. File Ali đã tự tay bỏ vào một folder
  // album là quyết định của Ali — script không có quyền lôi ra, kể cả khi trang
  // chưa có bài đó. (Đã lôi nhầm 2 bài ngày 3/9, Ali phát hiện.)
  if (path.dirname(f) !== '.') continue;
  moves.push({ from: f, to: path.join(ORPHAN, path.basename(f)) });
}

console.log(`Sẽ xếp ${moves.length} file vào ${new Set(moves.map(m => path.dirname(m.to))).size} folder.`);
console.log(`Trong đó ${moves.filter(m => path.dirname(m.to) === ORPHAN).length} file chưa có trên trang.`);
console.log(`Ghi ${missingNotes.length} file _THIẾU.txt.\n`);
for (const m of moves.slice(0, 8)) console.log(`  ${m.from}\n    → ${m.to}`);
if (moves.length > 8) console.log(`  … và ${moves.length - 8} file nữa`);

if (DRY){ console.log('\n(--dry-run: chưa đụng gì vào thư mục)'); process.exit(0); }

/* ghi nhật ký TRƯỚC khi động vào file, để lỡ có gì còn lần ngược được */
const log = ['tên cũ,tên mới', ...moves.map(m => `"${m.from.replace(/"/g,'""')}","${m.to.replace(/"/g,'""')}"`)].join('\n');
fs.writeFileSync(path.join(SRC, '_đã đổi tên.csv'), log + '\n');

/* Một bài có thể nằm ở hai album (hai id Suno khác nhau, cùng một file nhạc).
   File chỉ chuyển được một lần, nên lần sau thì NHÂN BẢN từ chỗ đã chuyển tới,
   để folder album nào cũng đầy đủ khi Ali dò. */
let done = 0, copied = 0, kept = 0, failed = [];
const placed = new Map();          // file nguồn -> một chỗ nó đã nằm sẵn
for (const m of moves){
  const from = path.join(SRC, m.from), to = path.join(SRC, m.to);
  try {
    fs.mkdirSync(path.dirname(to), { recursive: true });
    if (fs.existsSync(to)){ placed.set(m.from, m.to); kept++; continue; }
    if (placed.has(m.from)){
      // file này đã được dùng cho album trước → nhân bản, đừng chuyển đi
      fs.copyFileSync(path.join(SRC, placed.get(m.from)), to);
      copied++; continue;
    }
    fs.renameSync(from, to);
    placed.set(m.from, m.to);
    done++;
  } catch (err){ failed.push(`${m.from} → ${m.to}: ${err.message}`); }
}
for (const n of missingNotes){
  // chỉ ghi vào folder đã có sẵn — không hồi sinh folder Ali đã xoá
  if (!fs.existsSync(path.join(SRC, n.dir))) continue;
  fs.writeFileSync(path.join(SRC, n.dir, '_THIẾU.txt'), n.text);
}

console.log(`\nĐã chuyển ${done} file, giữ nguyên ${kept} file đã đúng chỗ` + (copied ? `, nhân bản ${copied} file cho bài nằm ở hai album.` : '.'));
if (failed.length){ console.log(`\n${failed.length} file lỗi:`); for (const f of failed) console.log('  ' + f); }
console.log(`Nhật ký tên cũ → tên mới: ${path.join(SRC, '_đã đổi tên.csv')}`);
