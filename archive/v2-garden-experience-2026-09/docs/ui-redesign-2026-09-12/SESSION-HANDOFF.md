# Session handoff · UI implementation · 12/09/2026

## Đọc đầu tiên

Anh đã xác nhận triển khai tuần tự hướng của INTAKE-AND-HANDOFF.md. Không cần hỏi lại quyền làm bước 1–5. Quyền publish/push chưa có. Tiếp tục từ checkpoint này, không quay lại audit toàn ZIP.

- Working directory: `/Users/alihuynh/Claude/Projects/Anh Li Portfolion/portfolio-garden-v2`.
- HEAD `5eacde1`; fetch origin/main `5dc754a`, behind 5. Chưa merge, commit, push hay deploy.
- Bước 1: đã khóa `IMPLEMENTATION-CONTRACT.md` theo xác nhận của anh.
- Bước 2: đã tích hợp UI shell và 8 route tĩnh, player thật; còn giới hạn tích hợp/publish nêu dưới.
- Bước 3: đã có blockout Three.js và camera 5 khu; còn cần review/bố cục, chưa asset final.
- Bước 4 chưa bắt đầu: host, GLB production, texture, lighting/motion/lifecycle final.
- Bước 5: đã có QA cho phần vừa triển khai, chưa acceptance toàn world.

## Xem kết quả

Server local phiên này: `http://127.0.0.1:8772/`.
- UI chính: `/`, `/sap/`, `/works/`, `/works/how/`, `/visual/`, `/story/`, `/sky/`, `/flat/`.
- World thử: `/?world=blockout#explore`; query được giữ khi dùng nav.
- Giao diện cũ để QA: `/?classic`. Không đưa link này thành nav sản phẩm.
- Nếu server không còn: `python3 -m http.server 8772 --bind 127.0.0.1` trong checkout.

## Source đã thêm/sửa

- `js/redesign/content.mjs`: một nguồn chữ, routes, services, chapters, artwork cho UI/world/flat. Số liệu và timeline chưa xác minh chưa đưa vào. Email dùng source thật.
- `js/redesign/view.mjs`: HTML template dùng chung build và client navigation.
- `js/redesign/bridge.js`: adapter vào ALBUMS/selectAlbum/playAt, một #audioEl; không thay engine.
- `js/redesign/shell.mjs`: history navigation, MAP/lightbox focus, Music controls, story, Sky slot, explicit blockout review loader.
- `css/redesign.css`: layout/token theo mockup, 390/768/desktop, reduced motion, print và static plates.
- `js/redesign/world-layout.mjs`: geography và camera config.
- `js/redesign/blockout.mjs`: primitive scene, sân khấu chỉ SHOWS, fixed geography, projected hotspot labels, dispose/context-loss. Render theo thay đổi, không idle RAF. Camera hiện cắt cảnh; chưa camera travel/collision.
- `index.html`: bọc nội dung/engine cũ trong #portfolioLegacy, thêm head/base/fonts/css/bridge/module và shell render. Đây là sự tích hợp tạm để bảo toàn engine, chưa tối ưu bản publish.
- `js/garden/entry.js`: early return cho UI mới; slice cũ chỉ chạy ở classic.
- `scripts/build-redesign.mjs`: tạo 8 route static, relative base hỗ trợ GitHub subpath. Đọc catalog gốc + audio-map, giữ lọc hidden/unavailable; 26 albums.
- `scripts/test-redesign.mjs`: test suite route/keyboard/music/responsive/no-JS/sky/reduced motion.
- Các folder sap/works/visual/story/sky/flat là output của builder, không sửa tay.

Bản rollback trước phiên: `/Users/alihuynh/Claude/Projects/Anh Li Portfolion/source-archive/ui-redesign-2026-09-12/`. Không restore đè cả file khi có thay đổi sau checkpoint.
`music-data.js`, `music-data-base.js`, `audio-map.js`, `MISSING-TRACKS.md` giữ nguyên hash từ đầu phiên. Có rất nhiều file uncommitted/untracked từ trước; không git add -A.

## Kiểm tra và bằng chứng

Trong `evidence/implementation/`:
- `ui-receipt.json`: 13 nhóm test, có 1 fail ban đầu về Tab thoát vòng MAP. Những nhóm khác pass: 8 route direct/refresh/back-forward, 26 albums/no autoplay, audio thật chạy xuyên routes, pause/seek/mute, art/chapter, Sky, 390/768/1280, no-JS, reduced motion, 0 page errors ở suite chính.
- `ui-fix-receipt.json`: đã sửa focus trap; 24 Tab + 24 Shift-Tab, Esc return focus PASS. 4 artwork tải và object-fit contain PASS. Đây là bằng chứng mới thay cho fail MAP cũ; không xóa receipt gốc.
- `edge-receipt.json`: subpath `/portfolio-garden-v2/works/` refresh PASS; classic entry + 1 audio PASS; audio network failure báo lỗi cho người nghe PASS. Có 1 page error `Missing Garden Oracle source data for identity 0` trong run có chuyển classic; chưa cô lập origin/rerun được lỗi này. Không nói toàn hệ thống sạch lỗi.
- `blockout-receipt.json`: 5 camera render, 0 page errors, context loss fallback PASS. 15–114 draw calls / 7,978–10,342 triangles tùy camera; chỉ geometry count, chưa FPS benchmark production.
- `blockout-label-receipt.json`: kiểm tra sau sửa hotspot bám điểm world thay vì vị trí CSS giả.
- Ảnh desktop/mobile các route, map, và blockout; đã xem contact sheet + arrival mobile + Visual desktop. World vẫn primitive, cây có thể che khung SHOWS; chưa duyệt khung máy.

## Việc làm tiếp, theo thứ tự

1. **Đóng giới hạn của bước 2 trước publish.** Bản hiện tại bảo toàn DOM/inline data legacy trong HTML ẩn. Vì vậy dữ liệu/tên khách/ảnh cũ vẫn có thể được đọc từ source dù UI SHOWS mới chỉ hiện NDA. Chưa được xem là bản public NDA-safe. Tách runtime nhạc và Oracle khỏi nội dung portfolio cũ, hoặc tạo bộ HTML runtime tối thiểu đã loại dữ liệu khách; giữ nguồn archive riêng. Cũng giảm payload lặp ~8 HTML lớn. Không chỉ dùng CSS hide làm biện pháp bảo vệ dữ liệu.
2. Reproduce race Oracle `Missing Garden Oracle source data for identity 0`, kiểm tra thứ tự nạp async data/profiles/identities; đọc ORACLE-CONTENT-SYSTEM.md trước khi sửa wiring. Không đổi diễn giải nội dung.
3. Review blockout cùng UI. Giữ 6 mốc đúng world-layout, điều chỉnh camera/vegetation để hết cây che foreground, cân lại horizon và diện tích panel. Story bench là prop mới (-15,0,-48), không di chuyển nhà/đồi. Đóng khung portrait riêng. Không coi màu/shape primitive là art direction final.
4. Sau bố cục: tái dùng model/host hợp lệ hoặc dựng GLB/host sheet mới; chiều muộn Music, greenhouse Visual, hill Story. Host không xuất hiện Shows. Chưa rig host 3D, chưa thêm game trứng.
5. Motion/travel, audio-to-vinyl/host và shader/LOD final, test lại hai fail slice cũ nếu tái dùng phần đó. Chọn tư liệu SHOWS đã anonymize; Visual hiện tạm chỉ album artwork, chưa gallery client.
6. Acceptance desktop/tablet/mobile, source NDA, no-WebGL/data-saver, accessibility/audio/Oracle, network & GPU actual. Sau đó mới trình bản publish.

## Lệnh

Node của môi trường không nằm trong PATH. Dùng:
`/Users/alihuynh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/build-redesign.mjs`

Test (server 8772 đang chạy):
`GARDEN_PLAYWRIGHT_MODULE=/Users/alihuynh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs /Users/alihuynh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/test-redesign.mjs`

Sau đổi template/content/index engine: chạy builder. Sau chỉ sửa JS/CSS external không cần rebuild HTML. Lưu receipt mới khi rerun; suite mặc định ghi ui-receipt.json nên nếu cần giữ lịch sử, đổi output path trước.

## Usage

Đầu triển khai 25% khung 5 giờ / 35% tuần; checkpoint khi chuẩn bị handoff 87% / 45%; lần kiểm tra cuối 94% / 46%. Chủ động dành dư địa để kiểm tra/lưu thay vì bắt đầu asset pass nặng. Khi tool báo >=95% không bắt đầu thêm việc, save/wrap up. Không tự reset hạn mức. Các usage này là toàn tài khoản, không phải % context.

## Prompt nối việc

Tiếp tục từ docs/ui-redesign-2026-09-12/SESSION-HANDOFF.md trong portfolio-garden-v2. Anh đã duyệt hướng và triển khai tuần tự. Bước 1 đã chốt, UI 8 route/player thật đã có, blockout 5 camera đã có ở ?world=blockout. Đọc mục việc làm tiếp: cần tách dữ liệu/DOM legacy khỏi public output để NDA-safe, cô lập race Oracle, rồi refine camera/blockout trước asset final. Bảo toàn nhạc/source mới của anh, không mở lại concept, không thêm game trứng, không push. Kiểm tra usage và save/handoff khi 95%.
