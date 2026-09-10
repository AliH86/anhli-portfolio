#!/usr/bin/env node
/**
 * build-cjk-fonts.mjs — cho chữ Hán trên trang đi cùng kiểu chữ với tiếng Việt.
 *
 * Trang dùng 'Cormorant Garamond' (serif) và 'Instrument Sans' (sans), ghi cứng
 * ở hơn 60 chỗ. Hai font này KHÔNG có chữ Hán, nên tên bài song ngữ như
 * "你係我嘅夏天 · Mùa Hè Của Anh" bị trình duyệt vá bằng font hệ thống — lệch hẳn.
 *
 * Cách vá:
 *   1. Gom mọi chữ CJK đang có trong dữ liệu/HTML của trang (vài chục chữ).
 *   2. Xin Google Fonts bản Noto Serif TC / Noto Sans TC CHỈ chứa đúng mấy chữ đó
 *      (tham số text=) — mỗi file vài KB — rồi lưu thẳng vào repo (fonts/cjk/).
 *   3. Khai @font-face mang TRÙNG TÊN 'Cormorant Garamond' / 'Instrument Sans',
 *      unicode-range đúng các chữ đó → Latin/tiếng Việt vẫn là font cũ.
 *
 * Mỗi mức đậm/kiểu chữ mà trang nạp từ Google phải có một khối CJK KHỚP ĐÚNG
 * mức đó. Chrome gom font theo độ đậm trước rồi mới xét unicode-range: khai
 * một dải "300 700" cạnh các mức rời 300/400/600 của Google là Chrome bỏ qua
 * luôn khối CJK (đã thử 10/9 — chữ Hán vẫn ra font hệ thống).
 *
 * Thêm bài có chữ Hán mới → chạy lại script này rồi push css/cjk-fonts.css + fonts/cjk/.
 * Dùng:  node scripts/build-cjk-fonts.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const REPO = path.resolve(import.meta.dirname, '..');
const OUT_CSS = path.join(REPO, 'css/cjk-fonts.css');
const OUT_DIR = path.join(REPO, 'fonts/cjk');
// Google trả woff2 chỉ khi thấy trình duyệt hiện đại
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36';

/* Các file có thể chứa chữ hiển thị trên trang. */
const SOURCES = ['index.html', 'music-data-base.js', 'music-data.js', 'garden-oracle-data.js',
  ...fs.readdirSync(path.join(REPO, 'js')).filter(f => f.endsWith('.js')).map(f => `js/${f}`)];
const CJK_RE = /[⺀-⿟　-㏿㐀-䶿一-鿿豈-﫿︰-﹏＀-￯]/gu;

/* Mức đậm/kiểu Google đang nạp cho mỗi họ (khớp link Google Fonts trong index.html)
   → file Noto nào gánh mức đó. */
const FAMILIES = [
  { as: 'Cormorant Garamond', google: 'Noto+Serif+TC', file: 'noto-serif-tc', faces: [
    ['normal', 300, 400], ['normal', 400, 400], ['normal', 600, 600],
    ['italic', 300, 400], ['italic', 400, 400], ['italic', 600, 600],
  ]},
  { as: 'Instrument Sans', google: 'Noto+Sans+TC', file: 'noto-sans-tc', faces: [
    ['normal', 300, 400], ['normal', 400, 400], ['normal', 500, 500],
    ['italic', 300, 400],
  ]},
];

const chars = new Set();
for (const f of SOURCES){
  const p = path.join(REPO, f);
  if (!fs.existsSync(p)) continue;
  for (const c of fs.readFileSync(p, 'utf8').match(CJK_RE) || []) chars.add(c);
}
const text = [...chars].sort().join('');
if (!text){ console.log('Trang không có chữ CJK nào — không cần font.'); process.exit(0); }
const range = [...chars].map(c => 'U+' + c.codePointAt(0).toString(16).toUpperCase()).sort().join(', ');

fs.mkdirSync(OUT_DIR, { recursive: true });
for (const old of fs.readdirSync(OUT_DIR)) fs.unlinkSync(path.join(OUT_DIR, old));

const saved = new Map();          // "noto-serif-tc-400" -> đường dẫn tương đối từ css/
async function fetchFont(fam, weight){
  const name = `${fam.file}-${weight}`;
  if (saved.has(name)) return saved.get(name);
  const cssRes = await fetch(`https://fonts.googleapis.com/css2?family=${fam.google}:wght@${weight}&text=${encodeURIComponent(text)}`,
    { headers: { 'User-Agent': UA } });
  if (!cssRes.ok) throw new Error(`Google Fonts trả ${cssRes.status} cho ${name}`);
  const url = ((await cssRes.text()).match(/url\(([^)]+)\)/) || [])[1];
  if (!url) throw new Error(`Không thấy file font cho ${name}`);
  const bin = Buffer.from(await (await fetch(url, { headers: { 'User-Agent': UA } })).arrayBuffer());
  if (bin.subarray(0, 4).toString() !== 'wOF2') throw new Error(`${name}: không phải woff2`);
  fs.writeFileSync(path.join(OUT_DIR, `${name}.woff2`), bin);
  const rel = `../fonts/cjk/${name}.woff2`;
  saved.set(name, rel);
  console.log(`  ${name}.woff2  ${(bin.length / 1024).toFixed(1)} KB`);
  return rel;
}

let css = `/* cjk-fonts.css — SINH TỰ ĐỘNG bởi scripts/build-cjk-fonts.mjs, đừng sửa tay.
   ${chars.size} chữ CJK trên trang dùng Noto Serif TC / Noto Sans TC nhưng mang tên
   'Cormorant Garamond' / 'Instrument Sans' — Latin & tiếng Việt không bị ảnh hưởng. */\n`;
for (const fam of FAMILIES){
  for (const [style, weight, notoWeight] of fam.faces){
    const src = await fetchFont(fam, notoWeight);
    css += `@font-face{font-family:'${fam.as}';font-style:${style};font-weight:${weight};font-display:swap;` +
           `src:url(${src}) format('woff2');unicode-range:${range};}\n`;
  }
}
fs.writeFileSync(OUT_CSS, css);
console.log(`→ css/cjk-fonts.css · ${chars.size} chữ: ${text}`);
