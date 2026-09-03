# Kế hoạch tối ưu trải nghiệm — anhli-portfolio

> Lập 2026-08-31. Số đo lấy trực tiếp từ bản live `alih86.github.io/anhli-portfolio`
> và file local. Đo lại bằng checklist ở cuối sau mỗi đợt.

## Đo lại 2026-09-03 trên bản live — số thật, và thứ tự đã đổi

Đo bằng Navigation/Resource Timing API tại `alih86.github.io/anhli-portfolio`:

| Chỉ số | Hiện tại |
|---|---|
| TTFB | 305 ms — **ổn, không phải vấn đề** |
| HTML tải xong | 764 ms (165 KB gzip) |
| **DOMContentLoaded** | **6 769 ms** |
| **Load** | **20 476 ms** |
| Tổng | 41 request · 3.68 MB |

**Thủ phạm số 1 đã lộ mặt.** Tài nguyên cuối cùng hoàn tất ngay trước mốc DCL là
`vedic-chart.js` — kết thúc lúc **6 767 ms**, tức DCL bị chính nhóm script Oracle/chiêm
tinh giữ chân. Sáu thẻ script này nằm giữa `<body>` và **không có `defer`**:

- `index.html:5795` garden-oracle-data.js
- `index.html:5796` garden-oracle-profiles.js
- `index.html:5797` garden-oracle-identities.js
- `index.html:5798` garden-oracle-weekly-data.js
- `index.html:7246` astronomy-engine.min.js
- `index.html:7250` vedic-content.js

Lưu ý quan trọng: `vedic-chart.js` **đã có `defer` mà vẫn chặn DCL** — vì script `defer`
luôn chạy TRƯỚC `DOMContentLoaded`. Nên **thêm `defer` là chưa đủ**. Nhóm này chỉ phục vụ
khu Garden Oracle nằm tít dưới và phải bấm mới mở, nên cách đúng là **nạp theo yêu cầu**
(dynamic `import()` / chèn thẻ script khi người dùng mở Oracle lần đầu), hoặc tệ nhất
là `async`. Làm xong, DCL dự kiến còn **~1–1.5 s**.

**Thủ phạm số 2: bìa album nạp qua CSS, nằm trên đường tới hạn.** Chúng có
`initiatorType: "css"` (khai báo `background-image`) nên trình duyệt tải ngay khi xử lý
CSS, tranh băng thông với script:

| File | Nặng | Xong lúc |
|---|---|---|
| sau-mot-mua-song.jpg | 390 KB | 1 617 ms |
| khong-co-gi.jpg | 358 KB | — |
| another-stage.jpg | 312 KB | **6 359 ms** |
| mot-tan-so-khac.jpg | 260 KB | 4 209 ms |
| toi-hat-ca-ca-bon-mua.jpg | 258 KB | **17 786 ms** ← thứ kéo Load lên 20 s |
| chuyen-cua-trang.jpg | 203 KB | 2 627 ms |

Ảnh gốc **1000×1000** trong khi hiển thị nhỏ hơn nhiều. Hạ về ~400 px + WebP/AVIF là
mỗi tấm còn ~40–60 KB → **tiết kiệm ~1.5 MB**. Riêng `toi-hat-ca-ca-bon-mua.jpg` đang
`loading="eager"` — bỏ eager đi.

**Thủ phạm số 3: tranh hero 1.5 MB** — `plane-mid.webp` 731 KB + `plane-far.webp` 398 KB
+ `bg-meadow.webp` 381 KB. Cần bản nhỏ theo viewport (`srcset`) + AVIF.

### Thứ tự nên làm (theo hiệu quả đo được trên mỗi giờ công)

1. **Nạp nhóm Oracle/chiêm tinh theo yêu cầu** — sửa 6 dòng, DCL 6.8 s → ~1.5 s. Rẻ nhất, lời nhất.
2. **Bìa album: hạ 400 px + WebP, bỏ `eager`** — bớt ~1.5 MB, Load giảm mạnh.
3. **Hero: srcset + AVIF** — bớt ~1 MB cho máy nhỏ.
4. Tách CSS/JS khỏi `index.html` (Tier 3 cũ) — chỉ đáng làm sau 3 việc trên.

### Hạ tầng: cái gì free, và $5/tháng mua được gì

**Chuyển site sang Cloudflare Pages (FREE) — đáng làm nhất trong nhóm hạ tầng.**
Cloudflare có PoP đặt tại Việt Nam; GitHub Pages đi qua Fastly, gần nhất là
Singapore/Hong Kong. Với khán giả chủ yếu trong nước, riêng việc đổi nhà là RTT giảm
thấy được, không phải sửa một dòng code. Kèm theo: nhạc trên R2 có thể gắn **custom
domain** cùng gốc với site — vừa gỡ luôn cảnh báo `pub-*.r2.dev` bị giới hạn tốc độ,
vừa bớt một vòng bắt tay DNS/TLS.

**$5/tháng → Cloudflare Images.** Đáng tiền ở chỗ nó **tự resize + tự đổi định dạng
theo trình duyệt** (`?width=400&format=auto` → AVIF cho máy hỗ trợ, WebP cho máy cũ).
Tức là việc số 2 và số 3 ở trên **khỏi làm tay, khỏi giữ nhiều phiên bản ảnh trong
repo**, và sau này thêm bìa album mới cũng không phải nhớ nén.

Nhưng nói thẳng: **$5 đó là mua tiện, không phải mua tốc độ.** Anh vẫn đạt gần y hệt
kết quả bằng `sips` miễn phí như đợt 31/8 — chỉ là phải làm tay mỗi lần thêm ảnh.
Nếu ngại đụng tay thì $5 xứng đáng; còn nếu chỉ muốn nhanh thì **việc số 1 (defer/lazy
JS) mới là thứ quyết định, và nó hoàn toàn miễn phí.**

Đẩy `images/lab` (61 MB) + `videos/` (14 MB) qua R2 thì **không nhanh hơn** (lab đã lazy,
video đã `preload="none"`) — chỉ có lợi cho repo: hiện 374 MB, trần GitHub Pages 1 GB.

---

## TL;DR

Trang không "nặng đều" — nó nặng ở **vài chỗ hỏng cụ thể**, sửa được mà không đụng code:

| Nhóm | Hiện tại | Sau khi sửa | Cách |
|---|---|---|---|
| 6 bìa album lỗi nén | ~14 MB | ~2 MB | `sips`, không đụng code |
| 120 poster Visual Lab | ~28 MB | ~6 MB | `sips`, không đụng code |
| Vài PNG/webp hero | ~6 MB | ~2 MB | `sips`, không đụng code |
| JS Oracle + Vedic + astronomy chặn render | ~133 KB gzip nằm giữa `<body>` | off critical path | thêm `defer` / lazy |
| `index.html` | 580 KB thô / 168 KB gzip | ~110 KB gzip + cache tách phần | tách CSS/JS, minify |
| `videos/hero-dandelion-loop.mp4` | 15 MB (chỉ desktop) | ~4 MB | cần cài `ffmpeg` |

Những thứ **đã tốt rồi, đừng đụng**: font đã `display=swap` + bộ weight gọn; mọi
`<video>` đã `preload="none"`; gallery đã batch 18 + `loading="lazy"` + video lab
chỉ tải khi hover; hero video đã guard mobile / reduced-motion / saveData.

---

## Tier 1 — an toàn, không đụng code, deploy 1 lần

Chỉ là nén lại file ảnh, đường dẫn giữ nguyên. Giữ bản gốc ra `_originals/`
(thêm vào `.gitignore`) phòng khi cần.

### 1.1 — Sáu bìa album bị lưu ở chất lượng ~100

Tất cả đang 1254×1254 nhưng nặng 2.0–2.7 MB (các bìa khác cùng cỡ chỉ 150–580 KB):

```
uploads/bien-nien-that-nghiep-ky.jpg   2693 KB
uploads/khong-co-gi.jpg                2672 KB
uploads/toi-muon-om-tron-di-san.jpg    2511 KB
uploads/mot-tan-so-khac.jpg            2482 KB
uploads/another-stage.jpg             2277 KB   ← còn là --hero-cover fallback ở CSS
uploads/chuyen-cua-trang.jpg           2019 KB
```

- **Cách:** `sips -s format jpeg -s formatOptions 82 -Z 1000 <file> --out <file>`
  (test thực tế: `khong-co-gi.jpg` 2672 KB → **358 KB**, 1000px, mắt không thấy khác
  vì bìa hiển thị tối đa ~600px).
- **Tiết kiệm:** ~14 MB → ~2 MB. Đây là ảnh xem nhiều nhất (drawer, now-playing, gallery).
- **Rủi ro:** gần như 0. Kiểm `another-stage.jpg` kỹ hơn chút vì nó là nền hero desktop.
- **File đụng:** chỉ 6 file trong `uploads/`. Không đụng `.html`/`.js`.
- **QA:** mở drawer từng album, now-playing, hero desktop — bìa vẫn nét.
- **Deploy:** `deploy.command` (stage cả ảnh), không dùng `push-update.command`.

### 1.2 — 120 poster Visual Lab (`images/lab/*.jpg`)

Tổng 28 MB, tấm to nhất 600 KB, trong khi hiển thị ~300px. Đang `loading="lazy"`
nên không tải hết cùng lúc — nhưng ai kéo hết gallery vẫn nuốt vài MB.

- **Cách:** batch `sips -s format jpeg -s formatOptions 78 -Z 900 <file> --out <file>`
  cho cả thư mục.
- **Tiết kiệm:** ~28 MB → ~6 MB.
- **Rủi ro:** thấp. Poster chỉ là khung hình chờ video/ảnh.
- **QA:** kéo hết Visual Lab ở desktop + mobile, đổi vài filter tag.

### 1.3 — PNG/webp hero nặng

`images/hero/dandelion-garden/plane-mid.webp` 731 KB (preload desktop, critical path)
→ nén còn ~300 KB. Vài PNG trong cùng thư mục (`foreground-dandelions.png` 2.5 MB,
`album-pack.png` 1.3 MB) thuộc `dandelion-scene-view.html` standalone — xác nhận
`index.html` có dùng không trước khi đụng.

- **Cách:** `sips -Z 1400` cho webp/png hero; PNG có alpha giữ `-s format png`.
- **Tiết kiệm:** ~4 MB.
- **Rủi ro:** thấp–trung. plane-mid là lớp parallax hero → so sánh trước/sau ở 1440px.

**Tổng Tier 1: ~46 MB nhẹ đi, 1 lần deploy, gần như không rủi ro.**

---

## Tier 2 — code nhỏ, cần QA kỹ

### 2.1 — Hoãn JS Oracle / Vedic / astronomy

`index.html:5781-5784` và `:7232,7236` nạp **không `defer`**, nằm giữa `<body>`:

```
garden-oracle-data.js        garden-oracle-profiles.js (34 KB gz)
garden-oracle-identities.js  garden-oracle-weekly-data.js
astronomy-engine.min.js (47 KB gz)   vedic-content.js
```

~133 KB gzip + chi phí parse, chặn dựng phần dưới. Đây là tính năng phụ của một
trang **nhạc** — không cần cho lần load đầu.

- **Cách (an toàn nhất):** thêm `defer` vào cả 6 thẻ. Kiểm các IIFE khởi tạo
  (`garden-calendar-js`, `vedic-modal-js`, `footer-signature-js`) — nếu chúng chạy
  ngay và đọc `GARDEN_ORACLE_*`, phải bọc trong `DOMContentLoaded` hoặc chuyển
  các thẻ đó xuống sau.
- **Cách (tốt hơn, nhiều việc hơn):** lazy-load khối này khi user mở khu Oracle
  hoặc Vedic lần đầu (IntersectionObserver trên section, hoặc on-click). Tiết kiệm
  luôn cho người không bao giờ mở Oracle.
- **Rủi ro:** trung. Thứ tự init là chỗ dễ vỡ — QA kỹ luồng mở Oracle, trải bài,
  đọc synthesis, mở lá bài, mở Vedic chart, footer.
- **File đụng:** `index.html` (thứ tự/thuộc tính thẻ script + có thể vài IIFE guard).

### 2.2 — Hero video: poster + hoãn `load()`

`index.html:5250` `<video id="heroVideo">` không có `poster`. Script tại `:10827`
gán `src` + `preload='auto'` + `load()` ngay sau khi qua guard → 15 MB tải sớm
trên desktop.

- **Cách:** thêm `poster="./images/hero/dandelion-garden/dandelion-scene-master.jpg"`
  (đã có, 706 KB — nén xuống ~200 KB luôn); dời `video.load()` vào
  `requestIdleCallback` hoặc IntersectionObserver để chỉ tải khi hero thật sự trong
  khung + trình duyệt rảnh.
- **Tiết kiệm:** không giảm dung lượng video, nhưng dời nó ra khỏi lúc tải quan trọng
  → first paint + interactive nhanh hơn hẳn trên desktop.
- **Rủi ro:** thấp. Guard hiện tại giữ nguyên.
- **File đụng:** `index.html` (`hero-video-js` + 1 thuộc tính).

---

## Tier 3 — refactor `index.html`, file mỏng manh, nhiều vòng QA

580 KB thô = **326 KB CSS (21 khối) + 205 KB JS (18 khối) + markup**. Gzip còn
168 KB. GitHub Pages có gzip, **không** có brotli.

### 3.1 — Tách CSS ra file riêng
- 326 KB CSS inline → `css/main.css` + có thể tách `css/oracle.css` nạp `media` hoặc
  `preload`+onload. Lợi: cache qua các lần vào lại, và cập nhật nội dung không phải
  tải lại CSS.
- **Rủi ro:** trung–cao. Nhiều khối `<style>` xen kẽ, dễ sót thứ tự override
  (memory: rule `.gallery` hiệu lực là khối thứ 3/3; accent xanh override `--amber`
  lúc runtime). Phải giữ nguyên thứ tự khi gộp.

### 3.2 — Minify khi build
- Chưa có bước build. Thêm script `sh` nhỏ (esbuild/terser cho JS, lightningcss/
  cssnano cho CSS) chạy trước deploy, xuất `index.min.html`. Giữ `index.html`
  nguồn dễ đọc.
- **Tiết kiệm:** ~168 KB gz → ~110–120 KB gz.
- **Rủi ro:** trung. Cần node (đã có ở `~/.local/node-v24`). Đổi quy trình deploy.

### 3.3 — `<link rel="preload">` cho JS quan trọng, tách phần không critical

Chỉ làm sau khi 3.1/3.2 xong.

---

## Tier 4 — cần cài `ffmpeg` (máy chưa có)

- `videos/hero-dandelion-loop.mp4` 15 MB → H.264 CRF 26 / VP9 ~ **4–5 MB**; thêm
  bản `.webm`. Hoặc cắt còn 6s.
- 10 video `images/lab/vid*.mp4` (13 MB, 10 MB…) → nén tương tự, chỉ tải khi hover
  nên ưu tiên thấp hơn hero.
- Cài: `~/.local` build hoặc tải static build arm64 (không cần brew).

---

## Thứ tự đề xuất

1. **Tier 1.1 + 1.2** ngay — 42 MB, một buổi, rủi ro ~0. Cảm nhận rõ nhất trên mobile.
2. **Tier 2.2** (hero video poster) — nhanh, desktop mượt hơn liền.
3. **Tier 2.1** (defer Oracle JS) — một phiên riêng có QA đầy đủ luồng Oracle.
4. **Tier 1.3** kèm lúc làm (2).
5. **Tier 4** khi cài được ffmpeg.
6. **Tier 3** sau cùng, khi muốn siết lần vào lại — hoặc bỏ qua nếu 1+2+4 đã đủ.

## Checklist đo lại (sau mỗi đợt)

```sh
# dung lượng thư viện
du -sh images uploads videos

# transfer thật của tài nguyên critical (gzip)
b=https://alih86.github.io/anhli-portfolio
for u in /index.html /uploads/another-stage.jpg /videos/hero-dandelion-loop.mp4; do
  curl -s -H 'Accept-Encoding: gzip' -o /dev/null -w "$u %{size_download}B\n" "$b$u"
done
```

- DevTools → Network, throttle "Fast 4G", disable cache: xem **Transferred** tổng
  và thời gian **DOMContentLoaded** / **Load** ở lần đầu và lần vào lại.
- Lighthouse mobile: mốc là Performance ≥ 80, LCP < 2.5s, TBT < 300ms.
- Kiểm lại 4 luồng gãy dễ nhất: mở Oracle → trải bài → đọc; mở Vedic; hero desktop
  có video; gallery kéo hết + đổi filter.
