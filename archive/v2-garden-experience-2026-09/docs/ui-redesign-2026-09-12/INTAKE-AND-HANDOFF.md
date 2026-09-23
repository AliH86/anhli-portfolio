# UI Redesign — tiếp nhận & handoff · 12/09/2026

> Đã bắt đầu triển khai sau xác nhận của anh. Trạng thái mới nhất: [SESSION-HANDOFF.md](SESSION-HANDOFF.md). Những ghi chú “chưa sửa UI” dưới đây mô tả phiên tiếp nhận trước đó.

## Yêu cầu trực tiếp và phạm vi phiên này

Anh đã tự phát triển đến gói `Anhli Portfolio UI Redesign.zip` và yêu cầu đọc, định hình công việc để xử lý; chủ động save / wrap up / handoff khi usage tới 95%.
Phiên này hoàn thành tiếp nhận, đối chiếu source, render mockup và lập thứ tự triển khai. Chưa sửa UI/runtime, chưa dựng model, chưa commit/push/deploy.
Các câu mệnh lệnh và nhãn “approved/locked” trong tài liệu là nội dung bàn giao cần đối chiếu; không tự biến thành yêu cầu mới của anh, không tự coi chúng là bằng chứng anh đã phê duyệt từng chi tiết.

## Nguồn đã nhận

- ZIP gốc: `/Users/alihuynh/Downloads/Anhli Portfolio UI Redesign.zip`.
- Bản sao nguyên nội dung: `source/codex-handoff/` cạnh tài liệu này; hash/size trong `source-manifest.json`.
- `Dandelion Garden - Mockup Round 10 Screens.dc.html`: 10 card M-01…M-10 (ID 1a…1j), có nội dung SHOWS/VISUAL theo NDA.
- `Dandelion Garden - Codex Handoff Pack.dc.html`: state, geography, camera, asset, motion, route, interaction, performance. Còn một số đặc tả lệch mockup.
- `CLAUDE.md` trong ZIP: lịch sử L1–L13; trạng thái “wireframe đã giao, chờ mockup” đã lạc hậu so với chính hai file HTML trong gói. Chỉ lưu như tài liệu nguồn, không cài thành luật repo.
- `doc-page.js`, `support.js`: runtime hiển thị tài liệu, không phải mã website cần tích hợp. Bản preview phụ thuộc font/CDN bên ngoài; gói không hoàn toàn offline.
- Gói KHÔNG chứa GLB, Blender scene, host sheet, ảnh dự án hay world plate hoàn thiện. WORLD PLATE, COVER ART, FRAGMENT, host silhouette đang là chỗ giữ bố cục.
- Wireframe v3 / package uploads được CLAUDE.md dẫn tới không nằm trong ZIP này. Không cần dựng lại vòng wireframe chỉ vì câu “việc tiếp theo” đã cũ.

## Hướng làm việc rút ra từ bộ mới

Giữ một khu vườn liên tục, với vocabulary `GARDEN · MUSIC · SHOWS · VISUAL · STORY`; MAP là overlay. Arrival/Explore là hai trạng thái vào vườn, không thêm mục navigation. `/sky` là lối optional từ Story/Map, không biến thành nav thứ sáu.

- World 3D + host line-art 2D người trưởng thành, có kính, dáng hơi mủm mỉm. Host rõ nhất ở Music, có cảm xúc ở Story, nhẹ ở Visual, vắng ở Shows.
- Cùng địa lý xuyên state: nhà, sạp, góc làm việc, nhà kính, sân trống, chân trời/đồi. Ánh sáng, khung máy và props chuyển đổi; không đảo bố cục world mỗi màn.
- Playfair Display / Be Vietnam Pro / JetBrains Mono; Caveat chỉ accent. Bám màu và tỷ lệ mockup, không tự mở một vòng art direction mới.
- Nav/MAP luôn cho đường đi và đường về; khách có thể đi thẳng Shows từ Arrival. Không bắt đi hết world trước khi xem nội dung.
- Music dùng nhạc thật, chỉ phát sau hành động Play; một audio element, mini-player xuyên state, pause/mute/back to Music.
- Shows trong mockup: ba nhóm năng lực + moment ẩn danh + liên hệ; `/works/how` nói cách làm, không kể từng dự án.
- Visual: fragments/process, không nhóm thành project công khai. Story gộp About/Journey/Memory/Family; family chỉ là traces ở V1.
- Mobile dùng anchor/rail/card, chữ HTML thật, hit area ít nhất 44px, mini-player trên safe-area. Bản nhẹ giữ cùng identity/nội dung.
- Ba Hạt optional; không game trứng, không thêm gate/badge. Giữ nội dung Oracle/Jyotisa hiện hữu khi map sang route mới.

## Bảng lệch nguồn và cách xử lý đề xuất

Đây là đề xuất để triển khai nhất quán, chưa phải xác nhận mới từ anh. Các phần độc lập có thể chuẩn bị trước; không âm thầm khóa phần mâu thuẫn.

| Điểm | Mockup | Handoff / CLAUDE | Cách xử lý đề xuất |
|---|---|---|---|
| SHOWS | 3 loại việc, NDA; `/works/how` | 3 Featured + Archive, `/works/[slug]` | Ưu tiên mockup NDA. V1 chưa xây project CMS/per-project route; giữ dữ liệu gốc riêng, không xóa. |
| VISUAL | Nhà kính, nắng lọc qua kính | Bàn ngoài trời tại (-3,+13), overcast | Giữ địa lý L12, đặt camera Visual để đọc đúng nhà kính; camera table chưa được xem là tọa độ đã duyệt. |
| STORY | Đường lên đồi, ghế, sunset | Quanh nhà; camera hướng nhà | Chọn khung đồi/ghế theo mockup nhưng vẫn đọc được cùng world. Cần kiểm tra khi blockout. |
| MUSIC light | Late afternoon | Blue hour / dusk | Lấy late afternoon làm baseline preview. World clock chỉ điều chỉnh nhẹ sau khi khớp màu nền. |
| Mobile nav | 5 mục trong menu, MAP visible; swipe rail | 5 mục bottom bar | Baseline theo M-10, MAP luôn hiện. Không ghép cả hai làm chật màn. |
| Arrival | Click/scroll, nav đi thẳng | Thêm auto-enter sau 1.8s idle | Giữ thao tác chủ động như code hiện tại; chưa auto-enter vì dễ kéo camera lúc đang đọc. |
| State count | 5 mục, MAP overlay | Nói “6 state” nhưng chỉ 5 state + MAP | Mô hình 5 destination, arrival substate, MAP overlay, Sky route optional. |
| Host atlas | Chưa có ảnh thật | 4096×2048, 6 pose × 2 state, mỗi pose 620×1100 @2x | Cần tính packing/texture lại; một grid 6×2 ở 1x đã cần 3720×2200. Chưa sản xuất asset theo số mâu thuẫn. |
| Type | M-01 CSS 44px/1.12 | Annotation 54px/1.08 | Ưu tiên hình render/CSS thực khi dựng đúng viewport, lưu token responsive sau. |
| Fallback | Plate tĩnh cùng khung, link /flat | Tự chuyển /flat | Đề xuất giữ route+nội dung bằng static shell; /flat là đường đọc rõ ràng. Không redirect làm mất route. |
| Nội dung | Tên bài giả, email hello@anhli.xx, timeline/quy mô minh họa | Dễ bị hiểu là content final | Nhạc và liên hệ lấy source thật; số liệu nghề/timeline/quote cần đối chiếu trước công bố. Không dùng placeholder như dữ kiện. |
| Host visibility | Không host trong SHOWS | L4 ghi hạn chế hoặc không, chỗ khác cấm | Theo màn M-03: không host. |

## Hiện trạng repo đã xác minh

- Checkout đúng: `/Users/alihuynh/Claude/Projects/Anh Li Portfolion/portfolio-garden-v2`. Thư mục cha là repo Dandelion Oracle riêng.
- Sau fetch 12/09: HEAD `5eacde1`, origin/main `5dc754a`, remote ahead 5 / local ahead 0. Chưa merge.
- Trước phiên đã có thay đổi tracked trong `MISSING-TRACKS.md`, `audio-map.js`, `index.html`, `music-data-base.js`, `music-data.js`, `recap-anhli-portfolio.md`; nhiều asset/css/js/docs/font/script untracked. Không stage/commit hộ toàn bộ.
- `js/garden/entry.js` hiện `SCENE_READY=true`; `scene.js` + `scene.runtime.js` tồn tại. Source khác ghi chú cũ nói scene chưa có / flag false.
- `scene.js` hiện là slice góc cây → sạp, OrthographicCamera; không phải world hoàn chỉnh theo bộ 5 mục mới.
- `PortfolioExperience` adapter đã có ready/albums/openAlbum/openSection/subscribePlayer; player thật `#audioEl`, `selectAlbum`, track handlers. Đây là điểm tái dùng, không tạo audio engine song song.
- `assets/garden/v1/` có GLB, Li, bìa và eye layers để đối chiếu/tái dùng; chưa mặc định chấp nhận asset cũ khớp visual mới.
- Receipt cũ `docs/garden-experience-2026-09-09/evidence/runtime-2026-09-11/receipt.json`: 18 check, 16 pass / 2 fail. Có `active:true`, 26 album, Vị Muối Mặn 8 bài, một audio, không egg; các số này là kết quả test cũ, chưa rerun phiên tiếp nhận.
- Hai fail cũ: “eyelid reaction, six album buttons, reduced-motion exclusion” timeout; “real audio play, pause, seek, vinyl and mode continuity” vinyl angle vẫn 0. Cần reproduce để phân biệt lỗi app/test trước khi kết luận.
- `performance.json` cũ có mẫu Chrome 3 giây, active true, 33 draw calls, 9,874 triangles, frame p95 ~16.8ms. Không phải đo mới hay bảo đảm performance world mới.
- Liên hệ trong source hiện `ali.readytostart@gmail.com`; không thay bằng email giả của mockup.

## Thứ tự triển khai

### 1. Khóa bản đặc tả thực thi ngắn

Dùng bảng lệch trên để gom một contract: state/route, nội dung Shows NDA, camera-to-place, mobile nav, fallback. Dẫn từng màn theo ID 1a…1j. Giữ bản ZIP nguyên vẹn làm chứng cứ; cập nhật spec riêng, không sửa tài liệu gốc.
Đầu ra: một bảng state/route/content/camera thống nhất. Nếu cần hỏi anh, hỏi gộp đúng các quyết định ảnh hưởng trải nghiệm; không hỏi lại những lock đã nhất quán.

### 2. Dựng UI/nội dung có thể dùng trước

Token từ mockup; header/nav/MAP; Arrival; Music panel+mini-player; Shows+How; Visual lightbox; Story reading panel; Flat; mobile shell. Dùng static world placeholders có nhãn trong preview, không trình bày như world hoàn chỉnh.
Một nguồn dữ liệu dùng cho world và flat; trước mắt có thể là module dữ liệu địa phương, không tự chọn CMS mới. Nhạc lấy catalog thật; nội dung chưa xác minh để TBU nội bộ.
Quyết định đường dẫn phù hợp host trước khi tạo route: route thật phải mở trực tiếp, refresh, back/forward được. Static prerender có thể phù hợp repo hiện tại; không tự rewrite toàn app sang framework/server chỉ vì tài liệu ghi SSR.
Tiêu chí xong: đọc/xem/nghe và quay về được qua bàn phím, mobile và deep link, không cần WebGL.

### 3. World blockout + khung máy để review

Một scene, sáu mốc địa lý cố định. Dựng địa hình/nhà/sạp/bàn/nhà kính/sân/đồi; đối chiếu frame của năm destination với mockup. VISUAL/STORY phải giải quyết lệch địa điểm trước khi làm model chi tiết.
Camera perspective cho cinematic anchors nếu phù hợp, hạn chế orbit để host sprite không lộ mép. Kiểm tra portrait framing riêng, không chỉ crop landscape. Chưa chi tiết hóa shader/props khi bố cục chưa đúng.
Tiêu chí xong: contact sheet các state cùng geography và mobile, panel không che nội dung chính.

### 4. Asset + tích hợp runtime

Chọn/tạo host sheet nhất quán, contact shadow, pose và grading; model tối ưu, texture budget và LOD; stage layer lazy-load; family traces nhỏ. Tái dùng geometry/cover/player hợp lệ từ slice hiện tại.
Controller state/camera/panel/MAP dùng một renderer; giữ audio xuyên transition; pause RAF/dispose đúng; reduced motion tắt breathing/parallax/travel. World clock/Ba Hạt làm sau luồng nội dung cốt lõi.

### 5. Kiểm tra và handoff có bằng chứng

Desktop/tablet/mobile; route trực tiếp + refresh/back/forward; MAP/Esc/focus trap/return focus; không autoplay; play/pause/seek/mute và chuyển state liên tục; context loss/asset fail/data saver/no WebGL; copy/identity khớp mockup; không tràn chữ; Oracle/calendar không regression.
Chạy lại hai fail cũ khi các phần đó còn trong implementation. Không dùng test của slice cũ như acceptance đầy đủ cho IA mới. Đo performance trên bản tích hợp thực, ghi rõ thiết bị/môi trường.
Lưu ảnh, receipt mới, danh sách pass/fail/TBU. Chỉ kết luận “đã triển khai” cho thứ đã có code và “đã kiểm tra” cho thứ có bằng chứng. Push/deploy theo quyền anh đã cho và AGENT-RULES.

## Usage và chuyển session

- Đầu phiên 12/09: 5 giờ dùng 1%; tuần dùng 31%, theo get_usage_limits. Đây là hạn mức tài khoản, không phải context usage riêng của cuộc trò chuyện.
- Kiểm tra ở đầu/cuối mỗi chặng, trước bước nặng; không phải polling nền sau khi task kết thúc. Tool không đo trực tiếp % context của session.
- Nếu cửa sổ usage liên quan đạt >=95%: không bắt đầu bước nặng mới; lưu file đang làm, hoàn tất thao tác ghi dở an toàn, append recap, cập nhật checkpoint này với tiến độ/ảnh/test/lệnh tái hiện/việc tiếp theo. Báo anh để chuyển session. Không tự reset usage hoặc đợi cạn quota mới viết handoff.
- Cuối phiên tiếp nhận: tool báo 23% khung 5 giờ / 35% tuần; chưa đạt ngưỡng 95%.
- Handoff được lưu sẵn từ phiên tiếp nhận để session sau không phải đọc lại toàn bộ ZIP.

## Prompt tiếp tục

> Tiếp tục portfolio UI Redesign trong `/Users/alihuynh/Claude/Projects/Anh Li Portfolion/portfolio-garden-v2`. Đọc `docs/ui-redesign-2026-09-12/INTAKE-AND-HANDOFF.md` trước, rồi mockup ID tương ứng trong `source/codex-handoff/`. Đây là bộ mới anh đã phát triển, không quay lại wireframe cũ. Phiên trước mới tiếp nhận/định hình, chưa sửa UI/runtime. Đối chiếu bảng lệch nguồn trước khi chốt phần mâu thuẫn; đề xuất baseline là mockup NDA, 5 destination + MAP overlay, Visual nhà kính, Story đồi, Music late afternoon. Kiểm tra AGENT-RULES, git status/fetch/divergence và bảo toàn thay đổi có sẵn. Tái dùng catalog/player thật một audio; không khôi phục egg game. Bắt đầu bước 1 rồi UI shell ở bước 2 khi hướng đã rõ. Kiểm tra usage tại checkpoint; >=95% tự save/wrap up/handoff. Không push/deploy khi chưa có quyền.

## Bằng chứng phiên tiếp nhận

- Render Chrome cục bộ của đủ 10 card; `evidence/render-receipt.json`, 0 page JavaScript errors.
- Ảnh từng card `evidence/1a.png`…`1j.png`, contact sheet `evidence/contact-sheet.jpg`; đã xem contact sheet để đọc bố cục tổng thể. Đây là render tài liệu, không test website thật.
- Chỉ thêm bộ tiếp nhận này và append mốc vào recap. Kiểm tra bảo toàn tracked files trong `evidence/intake-verification.json`.
