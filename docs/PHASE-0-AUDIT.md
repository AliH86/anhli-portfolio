# Phase 0 — Audit & Foundation

Ngày audit: 27/07/2026

## Kết luận

Portfolio là một website tĩnh chạy trực tiếp trên GitHub Pages. Nền hiện tại
phù hợp nhất với module JavaScript thuần, tách biệt khỏi UI và dùng
`localStorage`. Không cần đổi framework, thêm bundler, backend hay dependency.

Phase 0 chỉ thêm world state và ghi nhận ngày ghé. Không có UI mới, asset mới,
gameplay, âm thanh hay thay đổi vào ba Easter Egg đang chạy.

## Cấu trúc hiện tại

- Entry point live: `/index.html`.
- Framework/build tooling: không có; HTML, CSS và JavaScript thuần.
- Routing: một trang với anchor (`#music`, `#gallery`, `#work`...); chưa có
  client router. Trang tương lai nên dùng thư mục thật `garden/index.html`.
- CSS: phần lớn nằm trong nhiều block `<style>` của `index.html`;
  `portfolio-upgrade.css` tồn tại nhưng không được trang live import.
- JavaScript: phần lớn inline trong `index.html`; dữ liệu/engine lớn được tách
  thành `garden-oracle-*.js`, `vedic-*.js`, `music-data*.js` và
  `astronomy-engine.min.js`. `experience.js` và `shader-bg.js` có bản inline
  trong trang live, nên file rời không phải entry point hiện tại.
- Asset: `images/`, `uploads/`, `videos/`; video nặng được gán nguồn/lazy-load
  sau các guard về mobile, reduced motion và save-data.
- Music player: engine inline với `ALBUMS`, audio/player state và UI; dữ liệu
  playlist mới được nạp từ `music-data.js`, rồi từ `music-data-base.js`.
- Easter Egg:
  - `#eggMusic`: click đĩa trong tên để chọn album/bài ngẫu nhiên.
  - `.gc-day.today`: mở Garden Oracle theo ngày.
  - `.nav-logo`: double-click mở modal Bản Đồ Sao Vệ Đà.
  - Registry `window.ANHLI_EGGS` và key cũ `anhli-eggs` chỉ ghi nhận các egg
    đã tìm thấy; chưa phải world state của game.
- Deploy: repository root chính là nội dung GitHub Pages; nhánh `main` được
  pull/commit/push bằng script `.command`. Không có GitHub Actions, package
  build hay server-side fallback.

## Vấn đề kỹ thuật đáng chú ý

1. `index.html` hơn 11.000 dòng và chứa nhiều CSS/JS inline. Nhét game vào đây
   sẽ tăng rủi ro regression và khó rollback.
2. Có hai nguồn code dễ gây nhầm: các file `experience.js`/`shader-bg.js` và
   bản inline đang chạy thật. Mọi patch phải xác nhận entry point live trước.
3. Nhiều key storage hiện hữu (`anhli-eggs`, `anhli_garden_device`,
   `anhli-theme`, `anhli-motion`, album likes). World state cần một key riêng,
   không reset hay migrate các key cũ trong Phase 0.
4. Một số dữ liệu dùng script cache-bust theo `Date.now()` và Three.js từ CDN.
   Game không nên phụ thuộc vào các luồng này.
5. Repo đang có file untracked cũ trong `_to_delete/` và deploy log. Chúng
   không thuộc Phase 0 và được giữ nguyên.

## Kiến trúc đề xuất

```text
index.html                     chỉ nạp foundation
js/
  world-state.js               schema, storage, migration, daily visit, reset
  egg-game.js                  Phase 1, chỉ nạp khi triển khai egg
  chicken-game.js              để sau hatch
  daily-discovery.js           để sau
data/
  discoveries.js               để sau, tách khỏi UI
  items.js                     để sau
garden/
  index.html                   route tĩnh tương lai
scripts/
  test-world-state.mjs         test foundation, không dependency
```

`world-state.js` không truy cập UI, không phát event, không tải asset và không
phụ thuộc player/Oracle/Vệ Đà. Nếu module lỗi, script khác của portfolio vẫn
tiếp tục chạy. API nằm tại `window.AnhLiWorld`.

Storage key: `anhli.worldState`.

`localStorage` được chia sẻ theo origin, không theo path. Vì vậy `/`,
`/garden/` và mọi page con dưới `https://alih86.github.io` dùng được cùng
state nếu cùng hostname/protocol/port. Dữ liệu ở localhost hoặc hostname khác
không tự đồng bộ với production. Dữ liệu cũng không đi qua trình duyệt,
profile hoặc thiết bị khác.

Repo này đang deploy dạng GitHub Pages project site tại
`/anhli-portfolio/`. Vì vậy file `garden/index.html` sẽ có URL production là
`/anhli-portfolio/garden/`. Link từ portfolio nên dùng `./garden/`; hard-code
`/garden/` sẽ trỏ sang một path khác ở root của `alih86.github.io`.

## File Phase 0

- Sửa `index.html`: thêm một thẻ nạp `./js/world-state.js`.
- Tạo `js/world-state.js`.
- Tạo `scripts/test-world-state.mjs`.
- Tạo `docs/PHASE-0-AUDIT.md`.

## Rủi ro và cách giảm

- Storage bị chặn, đầy hoặc JSON lỗi: mọi thao tác đều có fallback, không throw
  ra portfolio.
- Nhiều tab: mỗi lần đăng ký đều đọc state mới nhất; cùng một date key chỉ có
  một phần tử. Hai tab ghi cùng ngày tạo cùng kết quả idempotent.
- Đổi múi giờ: daily visit cố ý dùng ngày local của thiết bị. Việc đổi timezone
  có thể tạo date key khác, đúng với quy ước “ngày local”.
- Schema tương lai: migration bổ sung field thiếu và giữ field lạ; code cũ
  không hạ `version` mới hơn.
- Reset nhầm dữ liệu khác: reset chỉ xóa `anhli.worldState`, không đụng Oracle,
  theme, motion, likes hoặc registry Easter Egg hiện có.

## Test local

Tại root repository:

```bash
node scripts/test-world-state.mjs
python3 -m http.server 8000
```

Mở `http://localhost:8000/`, sau đó kiểm tra trong console:

```js
AnhLiWorld.loadWorldState()
AnhLiWorld.registerDailyVisit()
```

Developer reset:

```js
AnhLiWorld.resetWorldState()
location.reload()
```

## Deploy và rollback

GitHub Pages phục vụ file tĩnh từ `main`, nên không có bước build. Khi được
duyệt, chỉ stage đúng bốn file Phase 0, pull `main`, commit và push theo quy
trình hiện tại. Sau khi Pages cập nhật, hard refresh một lần để kiểm tra.

Rollback nhỏ nhất: bỏ thẻ script khỏi `index.html`. Portfolio lập tức trở về
hành vi cũ, ngay cả khi file/state còn tồn tại. Rollback đầy đủ: revert commit
Phase 0; localStorage còn lại vô hại và có thể xóa bằng developer reset.

## Cố ý chưa làm

- Hidden Egg, microcopy, animation, CSS và asset.
- Tăng stage, hatch, Gà, food, mood, discovery, collection.
- `/garden/`.
- Chuyển dữ liệu từ key `anhli-eggs` cũ sang game mới.
- Backend, đăng nhập, analytics và đồng bộ đa thiết bị.

Nhiệm vụ nhỏ nhất tiếp theo: Phase 1 chỉ thêm `egg-game.js`, một button
semantic đã được đặt kín trong bố cục hiện hữu, CSS nhỏ có reduced-motion và
test stage 0–3; không chạm player, Oracle hoặc modal Vệ Đà.
