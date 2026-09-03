#!/usr/bin/env node
/**
 * build-audio-manifest.mjs — khớp file mp3 đã tải từ Suno với dữ liệu bài hát của trang.
 *
 * BỐI CẢNH: từ 2026-09, Suno đã khoá CDN (cdn1.suno.ai trả 403 MissingKey), nên trang
 * không thể stream bằng id nữa. Nhạc phải được tự host. Script này dựng bảng ánh xạ
 * trackId -> tên file, để bước upload và player biết bài nào lấy file nào.
 *
 * Tên file Suno tải về bị XOÁ SẠCH dấu tiếng Việt (không phải bỏ dấu):
 *   "Buồn Mây Bán Gió"  ->  "Bun My Bn Gi.mp3"
 * nên phải khớp bằng cách áp cùng phép biến đổi mất mát đó lên tên bài.
 *
 * Nhạc trên R2 được xếp theo album cho dễ nhìn, dễ quản lý:
 *     bien-nien-that-nghiep-ky/08-vai-tu-phuong.mp3
 * Player tra đường dẫn đó qua window.AUDIO_MAP (audio-map.js) theo id bài.
 *
 * Dùng:  node scripts/build-audio-manifest.mjs [thư-mục-mp3]
 * Xuất:  data/audio-manifest.json · audio-map.js · MISSING-TRACKS.md
 */
import fs from 'node:fs';
import path from 'node:path';

const REPO = path.resolve(import.meta.dirname, '..');
const SRC = process.argv[2] || path.join(
  process.env.HOME,
  'Library/Mobile Documents/com~apple~CloudDocs/Downloads/My Suno_music'
);

/* ---- đọc danh sách album ĐÚNG NHƯ TRANG CHẠY ----
   Trang có HAI nguồn album và phải gộp lại mới ra đủ bài:
     1. mảng ALBUMS viết thẳng trong index.html  (nguồn gốc)
     2. music-data-base.js                        (bản cập nhật, đè lên theo id)
   Chỉ đọc music-data-base.js sẽ thiếu 8 album chỉ tồn tại trong index.html.
   Hàm này lặp lại đúng logic merge() ở cuối index.html. */
function sliceLiteral(src, from, open, close){
  const start = src.indexOf(open, from);
  let depth = 0;
  for (let i = start; i < src.length; i++){
    if (src[i] === open) depth++;
    else if (src[i] === close && --depth === 0) return src.slice(start, i + 1);
  }
  throw new Error('không tìm được literal đóng');
}
function readAlbums(){
  const html = fs.readFileSync(path.join(REPO, 'index.html'), 'utf8');
  const inline = eval(sliceLiteral(html, html.indexOf('const ALBUMS = ['), '[', ']'));

  const dataJs = fs.readFileSync(path.join(REPO, 'music-data-base.js'), 'utf8');
  const updates = JSON.parse(
    sliceLiteral(dataJs, dataJs.indexOf('window.PORTFOLIO_MUSIC'), '{', '}')
  ).albums;

  for (const src of updates){
    const dst = inline.find(a => a.id === src.id);
    if (!dst){ inline.push(src); continue; }
    if (src.tracks && src.tracks.length) dst.tracks = src.tracks;
    for (const k of ['cover', 'name', 'sub', 'desc']) if (src[k]) dst[k] = src[k];
  }
  // album hidden:true (nhạc job khách) không bày trên trang → không tính là thiếu
  return inline.filter(a => !a.hidden && Array.isArray(a.tracks) && a.tracks.length);
}

/* ---- hai phép chuẩn hoá: giống Suno (xoá ký tự có dấu) và bỏ dấu thông thường ---- */
const clean = x => x.toLowerCase().replace(/[^a-z0-9]+/g, '');
const sunoStyle = x => clean([...x.normalize('NFC')].filter(c => c.charCodeAt(0) < 128).join(''));
const deaccent  = x => clean(x.normalize('NFD').replace(/đ/g,'d').replace(/Đ/g,'D').replace(/\p{M}/gu, ''));

/* Tên file/thư mục trên R2: bỏ dấu, chỉ còn a-z 0-9 và gạch nối.
   Giữ ASCII để URL không phải encode, nhìn link là đoán được bài. */
function slug(x){
  return x.normalize('NFD').replace(/đ/g,'d').replace(/Đ/g,'d').replace(/\p{M}/gu,'')
          .toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0, 60)
          || 'khong-ten';
}

/* Quét cả thư mục con: sau khi chạy organize-source-folder.mjs thì nhạc nằm
   trong từng folder album, và Ali thả bài mới tải vào thẳng folder đó. */
function walk(dir, base = ''){
  const out = [];
  for (const e of fs.readdirSync(path.join(SRC, dir), { withFileTypes: true })){
    if (e.name.startsWith('.')) continue;
    const rel = base ? path.join(base, e.name) : e.name;
    if (e.isDirectory()) out.push(...walk(path.join(dir, e.name), rel));
    else if (/\.(mp3|m4a|wav)$/i.test(e.name)) out.push(rel);
  }
  return out;
}

const albums = readAlbums();
const files = walk('');

/* Ghép tay cho những bài tên file lệch quá xa (Ali đã nghe và xác nhận).
   Đọc trước mọi phép khớp tự động và luôn thắng. */
const aliasPath = path.join(REPO, 'data/audio-aliases.json');
const aliases = fs.existsSync(aliasPath)
  ? Object.fromEntries(Object.entries(JSON.parse(fs.readFileSync(aliasPath, 'utf8'))).filter(([k]) => k !== '_'))
  : {};

const byKey = new Map();
for (const f of files){
  // bỏ thư mục cha, đuôi file, và tiền tố số thứ tự "07 - " do chính script này đặt
  const base = path.basename(f).replace(/\.[^.]+$/, '').replace(/^\d{1,2}\s*-\s*/, '');
  for (const k of new Set([sunoStyle(base), deaccent(base)])){
    if (k && !byKey.has(k)) byKey.set(k, f);
  }
}

/* ---- độ giống, để bắt các tên bị lệch nhẹ (dấu chấm lửng, chữ hoa, "..." bị cắt) ---- */
function similarity(a, b){
  if (a === b) return 1;
  if (!a.length || !b.length) return 0;
  const m = a.length, n = b.length;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++){
    const cur = [i];
    for (let j = 1; j <= n; j++){
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i-1] === b[j-1] ? 0 : 1));
    }
    prev = cur;
  }
  return 1 - prev[n] / Math.max(m, n);
}
/* Ngưỡng cao mới tự ghép. Vùng lưng chừng chỉ ĐỀ XUẤT để Ali xác nhận tay —
   ghép nhầm (bài A phát ra nhạc bài B) tệ hơn hẳn là để trống. */
const AUTO = 0.90, SUGGEST = 0.72;

const manifest = {};
const missing = [];
const suggest = [];
const usedFiles = new Set();
const seenIds = new Set();

for (const al of albums){
  for (const t of al.tracks){
    if (seenIds.has(t.id)) continue;   // vài bài xuất hiện ở 2 album
    seenIds.add(t.id);
    // Alias trỏ theo TÊN FILE. Sau khi dọn thư mục, file đã đổi tên nên alias có
    // thể trỏ vào chỗ không còn gì — lúc đó bỏ qua, để khớp tự động lo (tên mới
    // đã đúng tên bài nên khớp thẳng).
    const alias = aliases[t.id] && files.find(f => path.basename(f) === aliases[t.id]);
    let hit = alias || [sunoStyle(t.name), deaccent(t.name)].map(k => byKey.get(k)).find(Boolean);
    if (!hit){
      const key = sunoStyle(t.name);
      let best = null, bestScore = 0;
      for (const [k, f] of byKey){
        const sc = similarity(key, k);
        if (sc > bestScore){ bestScore = sc; best = f; }
      }
      if (bestScore >= AUTO) hit = best;
      else if (bestScore >= SUGGEST) suggest.push({ album: al.name, name: t.name, id: t.id, file: best, score: bestScore });
    }
    if (hit){ manifest[t.id] = hit; usedFiles.add(hit); }
    else missing.push({ album: al.name, name: t.name, id: t.id });
  }
}

/* Bài nằm ở hai album có hai bản sao hợp lệ; chỉ một bản được ghi vào bảng khớp,
   bản kia KHÔNG phải "nhạc lạ" — lọc theo tên bài chứ không theo đường dẫn. */
const matchedNames = new Set();
for (const al of albums) for (const t of al.tracks) if (manifest[t.id]) matchedNames.add(deaccent(t.name));
const unused = files.filter(f => {
  if (usedFiles.has(f)) return false;
  const n = path.basename(f).replace(/\.[^.]+$/, '').replace(/^\d{1,2}\s*-\s*/, '');
  return !matchedNames.has(deaccent(n));
}).sort();
const total = seenIds.size;

/* ---- đường dẫn trên R2: <album>/<số thứ tự>-<tên bài>.mp3 ---- */
const keyOf = {};
for (const al of albums){
  const dir = slug(al.name);
  al.tracks.forEach((t, i) => {
    if (!manifest[t.id] || keyOf[t.id]) return;   // bài nằm ở 2 album → lấy album đầu
    keyOf[t.id] = `${dir}/${String(i + 1).padStart(2, '0')}-${slug(t.name)}.mp3`;
  });
}

fs.mkdirSync(path.join(REPO, 'data'), { recursive: true });
fs.writeFileSync(
  path.join(REPO, 'data/audio-manifest.json'),
  JSON.stringify({
    generated: new Date().toISOString(),
    source: SRC,
    tracks: Object.fromEntries(Object.entries(manifest).map(([id, file]) => [id, { file, key: keyOf[id] }])),
  }, null, 1) + '\n'
);

/* audio-map.js — bảng tra id → đường dẫn, để player khỏi phải đoán tên file.
   Tách file riêng để thêm nhạc mới không phải đụng vào index.html. */
const mapLines = Object.entries(keyOf)
  .sort((a, b) => a[1].localeCompare(b[1]))
  .map(([id, key]) => `  "${id}": "${key}"`)
  .join(',\n');
fs.writeFileSync(path.join(REPO, 'audio-map.js'),
`// audio-map.js — SINH TỰ ĐỘNG bởi scripts/build-audio-manifest.mjs, đừng sửa tay.
// Tra id bài hát → đường dẫn file trên kho nhạc (AUDIO_BASE trong index.html).
// Bài nào không có ở đây = chưa upload; player sẽ báo "chưa lên kho nhạc".
window.AUDIO_MAP = {
${mapLines}
};
`);

/* ---- báo cáo cho Ali: bài nào còn thiếu, tải ở đâu ---- */
const byAlbum = new Map();
for (const m of missing){
  if (!byAlbum.has(m.album)) byAlbum.set(m.album, []);
  byAlbum.get(m.album).push(m);
}
let md = `# Bài còn thiếu file nhạc\n\n`;
md += `Cập nhật: ${new Date().toISOString().slice(0,10)}\n\n`;
md += `Đã khớp **${Object.keys(manifest).length}/${total}** bài. Còn thiếu **${missing.length}** bài.\n\n`;
md += `Nguồn quét: \`${SRC}\`\n\n`;
md += `Tải bổ sung từ Suno rồi bỏ vào đúng thư mục trên, chạy lại script này là xong.\n\n`;
for (const [album, list] of byAlbum){
  md += `## ${album} — thiếu ${list.length} bài\n\n`;
  for (const t of list) md += `- [ ] ${t.name} — https://suno.com/song/${t.id}\n`;
  md += `\n`;
}
if (suggest.length){
  md += `## Cần anh xác nhận tay (${suggest.length})\n\n`;
  md += `Tên gần giống nhưng không trùng khít — em KHÔNG tự ghép, vì ghép nhầm thì bài này phát ra nhạc bài kia.\n\n`;
  for (const t of suggest.sort((a,b)=>b.score-a.score)){
    md += `- [ ] **${t.name}** _(${t.album})_ ← \`${t.file}\` — giống ${(t.score*100).toFixed(0)}%\n`;
  }
  md += `\n`;
}
if (unused.length){
  md += `## File chưa dùng (${unused.length})\n\n`;
  md += `Có thể là bản mix khác, bài đã đổi tên, hoặc bài không có trên trang.\n\n`;
  for (const f of unused) md += `- ${f}\n`;
}
fs.writeFileSync(path.join(REPO, 'MISSING-TRACKS.md'), md);

console.log(`Khớp ${Object.keys(manifest).length}/${total} bài · thiếu ${missing.length} · chờ xác nhận ${suggest.length} · file chưa dùng ${unused.length}`);
console.log(`→ data/audio-manifest.json`);
console.log(`→ audio-map.js`);
console.log(`→ MISSING-TRACKS.md`);
