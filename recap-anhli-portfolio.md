# Recap — anhli-portfolio (cập nhật 12/7/2026, khuya)

## Chốt đặc tả mở rộng Garden Oracle (12/7/2026)

- Nguồn sự thật mới: `ORACLE-CONTENT-SYSTEM.md`; Claude/Codex phải đọc trước
  mọi công việc Oracle để không suy lại sai ý từ các phiên chat rời rạc.
- Đã chốt bốn trục: 78 hình SVG riêng, 78 câu chuyện lõi, engine tổng hợp ba
  hạt không copy/paste, và lớp chiêm tinh chung tuần/ngày không dùng location.
- Routine đề xuất: Chủ nhật 23:17 chuẩn bị 8 ngày + bản nháp; thứ Hai 10:00 và
  thứ Ba 10:00 nhắc duyệt; chưa duyệt thì giữ wording pack live gần nhất.
- Oracle là lượt trải chung. Chiêm tinh chỉ là “thời tiết” có thể khuếch đại,
  thúc đẩy, làm rõ, làm nổi, làm dịu, làm chậm, gây ma sát hoặc ổn định năng
  lượng ba hạt; tuyệt đối không giả làm bản đồ sao cá nhân.
- Trình tự triển khai được chia thành commit nhỏ có điểm dừng an toàn để agent
  khác có thể tiếp tục khi một phiên chạm giới hạn.
- Art direction sau prototype: card 4:5 botanical 3D; chỉ 78 artwork không chữ,
  bố cục cân hai đầu. Nở dùng ảnh thẳng, Khép xoay cùng ảnh 180°; số, tên và
  trạng thái do HTML phủ lên. Prompt bàn giao nằm ở `ORACLE-ASSET-PROMPT.md`.

## Chốt guồng Garden Oracle qua các session (12/7/2026)

- Đã đưa guồng mặc định vào `AGENT-RULES.md` mục 7 để session/agent mới tự đọc
  và làm tiếp, Ali không cần nhắc lại.
- Mặc định mở rộng Oracle tại `SYNTH_BANK` trong
  `garden-oracle-synthesis.js`; không chạm `garden-oracle-data.js` hay
  `index.html` nếu Ali chỉ yêu cầu làm phong phú câu tổng hợp.
- Hướng vận hành đã chốt: xây ngân hàng câu đủ lớn để tự xoay theo tuần, rồi
  refresh theo đợt khi cần — không bắt buộc tạo commit nội dung mỗi tuần.
- Nếu hai agent cùng làm, một agent giữ quyền sửa file synthesis tại một thời
  điểm; agent kia review/soạn câu. Mọi lần chuyển phiên đều kiểm tra
  status/fetch/divergence/log trước khi sửa và commit riêng đúng file.

## Dọn working tree + fix hero album (12/7/2026, khuya muộn)

**Dọn rác:** xoá 31 file rác đã đọng lâu — 16 `.command` deploy cũ (đã hết
nhiệm vụ, script push 1 lần), 7 `deploy-log-*.txt`, 3 html preview/scratch
(`preview-perf.html`, `hero-video-garden-preview.html`, `hero-vinyl-live.html`),
5 `.md` handoff/draft rời rạc (`ART_DIRECTION.md`, `GARDEN-ORACLE-78-NAMES.md`,
`GARDEN-ORACLE-SYSTEM.md`, `HANDOFF-2026-06-19.md`, `WORDING-DRAFTS.md`).
Xoá thêm 5 asset dandelion-hero thừa không được `index.html` tham chiếu:
`videos/hero-dandelion.mp4` (44MB bản gốc chưa loop), `videos/hero-dandelion-1080.mp4`
(13.7MB), `images/hero/dandelion-video/anhli-dandelion-vid2.mp4` (44MB, trùng
byte-for-byte với file trên), `poster.png` cùng thư mục, và `images/portraits/sense-da-band.png`
(bản trùng, chỉ `.jpg` được site dùng). Giữ nguyên `images/hero/dandelion-scene/*.png`
(8 file nguồn PSD, theo đúng ghi chú trong `DANDELION_HERO_HANDOFF.md`: "leave
them alone unless Ali specifically asks") và `.claude/launch.json` (config dev
server local, vô hại).

**3 file modified xử lý xong:**
- `experience.js`, `tweaks-app.jsx` — revert về HEAD. Xác nhận cả 2 là file
  mồ côi: không còn `<script src>` nào trong `index.html` gọi tới, logic thật
  đã được gộp thẳng vào `index.html` từ commit `f905c5b "feat: self-contained
  index.html with all CSS/JS inlined"`. Kiến trúc "lớp áo CSS tách rời
  (`portfolio-upgrade.css` bơm bởi `tweaks-app.jsx`) không đụng xương sống"
  không còn tồn tại nữa kể từ commit đó — mọi CSS/JS đã nằm chung 1 file.
- `DANDELION_HERO_HANDOFF.md` — commit lại (tài liệu thật, log đúng phiên hero
  video 5/7 đã push live). Thêm ghi chú đầu file: từ nay theo `AGENT-RULES.md`
  §6, log phiên mới đi vào file recap này, không thêm mục mới vào handoff cũ.

**Bug phát hiện & fix trong lúc dọn:**
- **Hero album lệch:** `data-promoted-album` trên `<section id="home">` trỏ
  đúng ID "Một Tần Số Khác" (set từ commit `4291786`, 8/7) nhưng album này chỉ
  tồn tại trong `music-data-base.js` (nạp async, sau khi `renderHeroGarden()`
  đã chạy xong lần đầu bằng mảng `ALBUMS` tĩnh trong `index.html` — không có
  hàm nào gọi lại `renderHeroGarden()` lần 2 sau khi merge dữ liệu async).
  Kết quả: hero kẹt hiện "Mỹ Vị Nhân Sinh" (text tĩnh cũ) thay vì "Một Tần Số
  Khác" như đã chốt từ 8/7. Fix: thêm entry "Một Tần Số Khác" vào `ALBUMS`
  tĩnh + sửa text tĩnh `hero-manifesto` khớp theo — hero giờ đúng ngay từ lúc
  tải trang, không phụ thuộc timing async nữa. Commit `7bab5e6`.
- **Ảnh avatar vỡ trên live:** `images/portraits/sense-da-band.jpg` được
  `index.html` tham chiếu (dòng ~6333, avatar "[SEN]SE Da Band") nhưng chưa
  từng được commit — nghĩa là ảnh 404 trên GitHub Pages thật dù code đã đúng
  từ lâu. Đã `git add` + commit. Commit `7101b5b`.

**Trạng thái cuối phiên:** local ahead 3 commit so với `origin/main`
(`7bab5e6`, `0c5d022`, `7101b5b`) — **chưa push**, chờ Ali duyệt qua script
`.command` theo đúng quy trình ở `AGENT-RULES.md` §3. `git status` sạch hoàn
toàn ngoài 2 mục cố ý giữ untracked (`.claude/launch.json`,
`images/hero/dandelion-scene/*.png`).

## Mới trong phiên hôm nay (12/7/2026, khuya) — Ba hạt từ khu vườn: rebuild toàn bộ + wording pass toàn trang

**Đổi tên 78 lá bài (Tarot) thành hệ tên hạt bồ công anh, dual Nở/Khép:**
- Mỗi lá giờ có 2 tên: tên khi "Nở" (hạt/hành động mở ra) và tên khi "Khép" (hạt/hành động khép lại). Hạt là chủ ngữ mặc định; chỉ The Magician + 16 lá cung đình (Page/Knight/Queen/King) dùng chủ ngữ là người/tay/kỵ sĩ, vì đó là các lá miêu tả một lực tác động chứ không phải hành trình của chính hạt.
- Tên Tarot gốc không còn xuất hiện ở bất kỳ đâu trên UI hay trong lời giải thích.
- Toàn bộ dữ liệu tách sang file riêng `garden-oracle-data.js` (`window.GARDEN_ORACLE_CARDS`, 78 object, có assertion runtime chặn thiếu lá).

**Viết lại lời diễn giải (bloom/closed) cho cả 78 lá — qua 3 vòng sửa theo phản hồi Ali:**
1. Bản đầu quá thơ/trừu tượng, khó hiểu → bị chê.
2. Bản sửa quá chung chung, mất chất "khu vườn" → bị chê "back về tên gốc" dù không dùng tên gốc.
3. Bản chốt: ngôn ngữ tình huống cụ thể (công việc, mối quan hệ, kế hoạch, thói quen), chỉ chạm nhẹ ẩn dụ khu vườn, không nêu tên Tarot.

**Tổng hợp 3 hạt (`synthesis()`) — tách logic ra file riêng như `music-data.js`:**
- Cấu trúc mới theo đúng template Ali đưa: câu mở người kể chuyện → 3 bullet ngắn (chỉ nêu tình huống, không kèm lời khuyên) → 1 câu "điều mình muốn nhắc bạn" → link TikTok → chữ ký.
- Câu khép ban đầu bị lỗi lặp lại nguyên câu của hạt thứ 3 — đã sửa để tính từ tín hiệu tổng (số hạt Khép 0–3) trên cả 3 hạt, không quote lại 1 hạt.
- Nâng cấp thêm: `garden-oracle-synthesis.js` (file mới, tách riêng) — gắn mỗi lá vào 1 trong 5 "vùng đời sống" (tình cảm/công việc/quyết định/hành động/nội tâm), nhận diện 3 hạt có dồn về cùng vùng (cluster) hay trải đều (spread), kết hợp với số hạt Khép → chọn 1 trong nhiều biến thể câu, xoay theo tuần (deterministic theo `weekIndex`) để không lặp mãi một câu mà không cần đụng `index.html`.
- Triết lý đã thống nhất: đây là "quy ước/xu hướng chung" dựa trên 2 tín hiệu đo được, không phải diễn giải tarot thật theo tổ hợp — vì site tĩnh, không gọi AI runtime. Đọc sâu theo đúng tổ hợp cá nhân có link @guidetheheart (reader thật, vợ Ali) ở cuối oracle.
- Mở rộng bằng cách thêm biến thể câu vào `SYNTH_BANK` trong file mới bất cứ lúc nào, không cần bump version gì thêm.

**Fix bug hiệu năng/UX oracle modal:**
- Shader nền Hero (`window.shaderSetPaused`) vẫn chạy full-rate phía sau lớp `backdrop-filter:blur` full-viewport của modal → tranh chấp GPU gây lag, con trỏ chuột biến mất. Fix: gọi `shaderSetPaused(true/false)` trong `openOracle()`/`closeOracle()`.
- Giảm blur backdrop 7px→4px, tăng độ tối scrim để chữ dễ đọc hơn; thêm scrim riêng cho `.go-sensing`.
- CTA "@guidetheheart" đổi từ link chữ trơn sang pill button có icon.

**Wording pass toàn trang (theo yêu cầu huỷ hết khung phủ định "không phải...mà là", bắt đầu bằng chia sẻ/sở thích):**
- Hero quote: đổi thành bản ấm hơn, xưng "đằng ấy", câu hỏi thân mật ("Xin chào đằng ấy ơi, mình là Anh Li...").
- **Bug phát hiện khi Ali đối chiếu ảnh chụp:** một hàm JS `heroQuote()` (dòng ~8552) tự ghi đè `.hero-quote` bằng bản text CŨ mỗi lần tải trang, chạy sau HTML nên luôn thắng — làm tưởng edit không ăn. Đã xoá hẳn hàm này, HTML tĩnh giờ là nguồn duy nhất.
- CTA lịch: đổi thành "Mỗi ngày, mình đều có sẵn một thông điệp chờ bạn — khám phá nhé."
- Rà + sửa hết các câu mở đầu bằng "không" trong quote/tự sự: đoạn "Một lời chào" (welcome-lead), quote About "Mình không làm sự kiện...", room "Dẫn dắt" trong Kinh nghiệm, cùng 2 câu trong pool light/shadow cũ và mô tả công việc đầu tiên (WORK[0]).
- Grep case-insensitive lại toàn file xác nhận không còn "không phải/không chỉ/không nhất thiết/chứ không" nào trong nội dung hiển thị (các chỗ còn "Không" là tên bài hát hoặc mục license, giữ nguyên).

**File mới (untracked → chuẩn bị commit):** `garden-oracle-data.js`, `garden-oracle-synthesis.js`.
**Luật phối hợp Claude/Codex:** tách riêng ra [`AGENT-RULES.md`](./AGENT-RULES.md) — đọc file đó trước khi commit nếu có 2 agent cùng chạm repo trong cùng giai đoạn.

## Changelog commit 6–12/7/2026

**Album cover & dữ liệu album**
- Thêm cover `Tôi Muốn Ôm Trọn Di Sản Quê Hương Mình Vào Lòng`, đưa vào Music Room với mô tả, playlist, 6 track.
- Thêm cover và album 6 bài `Một Tần Số Khác`.
- Đồng bộ `Âm Hưởng` thành 10 track; loại `Vũ Điệu Của Đất` khỏi album này.
- Thêm `Sau Một Mùa Sóng – Mini Deluxe`, gồm 4 bài.

**Hero album**
- Hero từng chuyển sang `Thơ Ru Em Ngủ`, sau đó cập nhật album chính thành `Một Tần Số Khác`.
- Giữ visual skin bồ công anh và hệ 4 album phụ.

**Visual Lab**
- Bổ sung ảnh thiết kế, ảnh khoảnh khắc, video motion mới.
- Gallery desktop tăng tối đa 6 → 8 cột.
- Xáo thứ tự gallery mỗi lần tải trang.
- Sửa cover `Thơ Ru Em Ngủ` dùng đúng asset, bỏ bản trùng trong Lab.

**Music background**
- Thay video nền, dùng crossfade A/B che điểm loop.
- Làm nền sáng hơn, giảm lớp gradient tối, giảm blur Music Gate/drawer/Now Playing từ 18px → 8px.
- Khôi phục nền `absolute/inset:0` (nguyên nhân khó nhìn là overlay chứ không phải crop).

**Playlist vỡ trên mobile thật (đã sửa)**
- `.trow-art` từng fix cứng 38×38px trong khi cột grid co lại theo breakpoint → ảnh đè chữ tên bài trên Zalo in-app browser.
- `grid-template-rows` dùng `svh` không có fallback → webview cũ (Zalo) loại bỏ rule, khung playlist co giãn bất định.
- Fix: `.trow-art` co theo % + `aspect-ratio`; `svh` có fallback `vh` qua `@supports`.
- Commit: `997b604` — fix: stabilize mobile playlist layout.

## Mới trong phiên hôm nay (12/7/2026, tối) — Now Playing mobile

**Vấn đề Ali báo:** chỗ "dĩa than" quay trong khối Now Playing lỗi nặng trên mobile — viền vàng phồng to bất thường, đè lên nút play (kèm ảnh chụp thiết bị thật).

**Nguyên nhân & fix — đợt 1:**
- `#music .listening-room` ép `.player-cover` xuống còn 52px, nhưng viền đồng tâm "nhãn dĩa than" (box-shadow 8/9/16/17px) vẫn tính theo cỡ đĩa to cũ (150–176px) → viền amber phồng to hơn hẳn ảnh, đè lên controls.
- Theo yêu cầu Ali ("mobile: chỗ play đơn giản là floating, gọn đẹp"), bỏ hẳn kiểu dĩa than trên mobile, thay bằng thanh player ngang gọn — đĩa nhỏ 46px + tên bài trái + prev/play/next, ẩn shuffle/share/thời gian, giống ngôn ngữ `.vinyl-dock` (floating player dính đáy) có sẵn.
- Commit: `19ee5e2` (merge `ea31901` với `997b604` mà Ali push song song, không xung đột).

**Nguyên nhân & fix — đợt 2 (sau khi Ali gửi ảnh chụp thiết bị thật lần 2):**
- Đĩa 3D bên phải (`.np-vinyl`, ~96px) vẫn hiện trên mobile dù có rule ẩn — do 3 rule `display` chồng nhau qua 2 khối `<style>` khác nhau. Thêm rule ẩn dứt điểm ở khối CSS cuối cùng trong `<head>` (thắng chắc chắn mọi tranh chấp cascade).
- `.drawer-title` dùng cỡ chữ desktop (`clamp(1.6rem,2.5vw,2.25rem)`), tên album dài (vd "Tôi Muốn Ôm Trọn Di Sản Quê Hương Mình Vào Lòng") wrap 3 dòng, ăn gần hết khung `.album-drawer` trên mobile (~40svh) → track-list chỉ hở 1 hàng, tưởng lỗi scroll. Fix: giới hạn tên album 2 dòng, thu nhỏ chữ, gọn `.drawer-head`.
- Commit: `532269c` — fix(music): mobile — ẩn dứt điểm dĩa 3D bên phải + gọn tên album dài.

**Ali xác nhận trên điện thoại thật (cùng phiên):** đĩa đã hết, tracklist scroll được. Còn 1 ghi nhận nhỏ, chưa xử lý — xem checklist bên dưới.

## Mới trong phiên hôm nay (12/7/2026, đêm) — Garden calendar + Seed-bag oracle video

**Garden calendar (Hero, desktop):** lịch từng đè lên ảnh/người trong Hero. Sửa lại grid: hero-content co còn 700px (từ 860px), cột lịch rộng 280–320px (từ 230–270px) và neo lên gần đầu (`align-self:start`, row 2/4) thay vì canh giữa toàn khối — giờ nằm gọn trong khoảng trống giữa chữ "Anh Li" và người/đĩa nhạc bên phải, thẻ cũng to hơn ~20%.

**Túi hạt (oracle modal) — đổi hẳn từ icon CSS vẽ tay sang video thật:**
- Ali quay/dựng một clip Canva: túi vải bồ công anh bung nở, hạt bay ra. Bản đầu nền trắng có hiệu ứng "vỡ màu" (RGB tách kênh) — đẹp trên trắng nhưng viền cầu vồng lộ rõ khi thả lên nền tối, canh ngưỡng tách nền cỡ nào cũng không hết vì lỗi nằm sẵn trong pixel, không phải do tách nền.
- Giải pháp: Ali xuất lại clip với **nền phẳng trùng màu UI** (không cần trong suốt) — bắt đúng màu `#121B11` (trung bình gradient khung `.go-letter`, KHÔNG phải `--ink` chung của site). Từ đó không cần tách nền nữa, chỉ cần `mask-image` radial-gradient để làm mờ viền chữ nhật cho tan vào nền.
- Icon túi trong modal giờ là chính video đó, phủ full `#goSensing` làm nền, chữ "Chạm vào túi hạt" nổi lên trên có text-shadow để đọc rõ.
- Asset: `images/oracle/bag-poster.jpg`, `bag-burst.mp4/webm` (720×720, ~5s).

**Chapter II "The Listening World" (`#listening-threshold`):** thêm bản 16:9 của clip trên làm nền lớn phía sau chữ "Phần hai bắt đầu...", cùng kỹ thuật match-màu + feather. Video **không tự phát** — chỉ chạy khi bấm "Bước vào Cái Sạp nhạc", giữ ~4 giây rồi mới kích hoạt animation đóng cổng/cuộn sang Music có sẵn (không đổi animation đó). Feather siết khá chặt (42% thay vì rộng hơn) để che một watermark "Gemini" nằm sẵn ở góc phải dưới clip. Asset: `images/oracle/threshold-bloom.mp4/webm` (1280×720).

**Note kỹ thuật quan trọng (đọc trước khi làm video nền tương tự lần sau):**
- Muốn video thật hoà vào nền UI tối mà không lộ viền/watermark: cách chắc ăn nhất là nhờ xuất lại nền phẳng đúng màu container đích (lấy đúng màu của khung/section cụ thể, không lấy biến màu global — hai chỗ có thể khác màu dù nhìn "cùng tối"), rồi chỉ cần feather nhẹ, không cần tách nền/alpha gì cả.
- `preload="none"` + gọi `.play()` suông KHÔNG đáng tin để video thật sự tải — phải chủ động `video.preload='auto'; video.load();` trước khi `.play()`, nếu không trình duyệt có thể im lặng không làm gì.
- Video mở theo click (không autoplay) an toàn hơn autoplay-khi-cuộn cho các khoảnh khắc "portal/reveal" có chủ đích — dễ nói rõ ý hơn với nhau ngay từ đầu để đỡ tốn vòng qua lại.

## Polish checklist (đã cập nhật trạng thái)

- [x] **Player gắn với khung album:** desktop đặt player ngay dưới sân khấu bìa, drawer chiếm cột phải; mobile xếp album → player → track-list. Nút điều khiển được cân lại, bìa đang phát lớn và rõ hơn.
- [x] **Tách album đang xem / đang phát:** lướt sang album khác không còn làm mất ngữ cảnh album đang phát; next/prev/share tiếp tục dùng đúng album phát. Bìa album đang phát có badge và viền glow riêng trong coverflow.
- [x] **Dandelion frame:** thêm viền sage–amber phát sáng nhẹ, corner bloom/seed decor và glow có tiết chế cho khung player.
- [x] **Music Gate không còn crop chân khung:** card có padding/border/bo góc riêng, credit nằm trọn trong nền; màn hình thấp chuyển sang cuộn dọc an toàn.
- [x] **Threshold → Gate:** chuyển cảnh có dandelion bloom/seed bay ra để che chênh lệch hình học giữa hai frame; chế độ giảm chuyển động chỉ crossfade.
- [x] **Một player DOM, hai vị trí:** bỏ hẳn floating player bản sao. Chính `#nowplaying` nằm trong album khi sân khấu còn hiện và chuyển sang `fixed` khi cuộn ra ngoài; giao diện/trạng thái luôn giống tuyệt đối vì là cùng một phần tử.
- [x] **Hai loại random tách biệt:** shuffle của player chỉ đảo trong album đang phát; “Anh Li bốc bài” chọn bất kỳ bài nào toàn sạp và biến mất sau lần bấm đầu.
- [x] **Playlist mobile compact:** hiển thị 6 bài/lượt, “Hiện thêm” từng nhóm, không ép người dùng cuộn trong khung; thêm đĩa album mờ chuyển động phía sau playlist và ẩn khi giảm chuyển động.
- [x] **Aesthetic cleanup player/playlist:** player inline khóa 78px (mobile 72px), grid bìa–metadata–controls, bỏ đĩa/decor thừa và chống text rớt dọc. Bỏ pseudo-disc giả; chuyển nguyên renderer Three.js có sẵn vào chính giữa nền playlist trên desktop, ẩn dưới 1100px hoặc khi giảm chuyển động.
- [x] **Sửa regression mobile/player/motion:** khi dock, chuyển nguyên `#nowplaying` ra `body` để không bị `#music overflow:hidden` cắt lúc cuộn xuống; random hiện lại trên mobile; “Anh Li chọn bài cho bạn” luôn còn; Three.js playlist chạy cả mobile và dừng/ẩn khi giảm chuyển động; album mouse-tilt reset/tắt ngay khi bật giảm chuyển động.
- [x] **Polish UI/narrative tiếp theo:** khóa equalizer về CSS-only và tắt canvas visualizer; đưa Giảm chuyển động vào header; tăng khoảng thở progress; chuyển bài có 14 tim + 7 seed/bloom; video mobile mở 4 item; viết lại flow lời chào → About → Chapter II → hành trình nghề → video; thêm career highlight và narrative cho video.
- [x] **Album card cleanup:** bỏ hẳn sticker “MỞ BÌA”; toàn bộ card/bìa album là vùng bấm duy nhất.
- [x] **Ba hạt từ khu vườn:** thêm lịch tháng realtime sau Lời chủ nhà; hôm nay được khoanh nét crayon và có hint kín. Chạm một lần mở ba số duy nhất `0–78`, ánh xạ sang hệ biểu tượng riêng của theme cùng ba lớp lời nhắn tiếng Việt; kết quả ổn định trong ngày, tự đổi ngày mới, chạy offline và giảm chuyển động chỉ crossfade.
- [x] **Calendar nhập vào Hero + staged oracle:** không còn chiếm section riêng; desktop là góc lịch trong Hero, mobile Hero tự chừa phần cuối. Tương tác chia ba nhịp: khu vườn nhận năng lượng → hé ba số/tên hạt → người xem chủ động mở thông điệp; reduced motion rút ngắn nhịp và chỉ fade.
- [x] **Oracle v2 — per-device + manual ritual:** calendar glass nhẹ nằm bên phải tên trên desktop, phía trên tên ở mobile. Seed = ngày + ID cục bộ của thiết bị nên reload không đổi nhưng máy khác có thể khác. Không tự chuyển bước: người xem hít thở/chạm túi → thấy ba số nằm trên đúng ba hạt → “gieo vào gió” để mở lời nhắn. Thêm disclaimer chống săn/rút lại thông điệp.
- [x] **Hero/Music polish:** khóa lại calendar bằng breakpoint cuối (desktop bên phải chữ Anh Li, mobile phía trên tên); album mở đầu random mỗi load; viewport mobile/coarse chỉ 6 track/lượt; player hạ progress và hiện current/duration; album focus có idle 3D chậm + hover magnify lớn hơn trên desktop; motion toggle tách khỏi nav links; album đang phát có outline/glow mạnh hơn.
- [x] **Calendar/player structural fix + artist:** calendar không còn absolute overlay mà tham gia trực tiếp vào layout Hero (grid cạnh tên desktop, flow trước tên mobile). Progress/timing thành bottom rail nằm bên trong player. Thêm avatar `[SEN]SE Da Band`, dùng JPG 800px ~149KB.
- [x] Playlist mobile: ảnh bìa hàng bài không còn đè chữ; khung track-list không còn co về 0 trên browser thiếu hỗ trợ `svh`.
- [x] Now Playing mobile: bỏ dĩa than lỗi, chuyển thành thanh player gọn kiểu floating; xác nhận trên thiết bị thật.
- [x] Đĩa 3D bên phải trong Now Playing mobile: đã ẩn dứt điểm, xác nhận trên thiết bị thật.
- [x] Tên album dài không còn đè khung track-list trên mobile.
- [x] **Mobile track-list ergonomics:** tăng vùng drawer từ 46svh lên 56svh (tối thiểu 330px), chuẩn hoá vùng chạm hàng bài 48px, bật quán tính/touch pan-y và thêm fade + scrollbar để dễ nhận biết danh sách còn cuộn được. Cần xác nhận cảm giác kéo trên điện thoại thật.
- [ ] Kiểm tra album hero thực tế vẫn là `Một Tần Số Khác`.
- [ ] Thử hero ở mobile/tablet/desktop: cover dài chữ không đè CTA hoặc album phụ.
- [ ] Chuẩn hoá cách viết tên bài: `VŨ ĐIỆU ĐẤT` và `CON CHI VỪA LÓ RA NÌ?`.
- [ ] Đối chiếu số bài, thời lượng và link Suno của album Di Sản.
- [ ] Reload Visual Lab vài lần, kiểm tra thứ tự random không tạo cụm đầu quá lệch hoặc toàn ảnh dọc.
- [ ] Kiểm tra poster/video Motion bị thiếu file, sai tỷ lệ, hoặc tải nặng trên 4G.
- [ ] Xem điểm crossfade Music BG ít nhất 3 vòng; kiểm tra Safari iPhone và chế độ tiết kiệm pin.
- [ ] Kiểm tra độ đọc chữ trên Music Room (nền thoáng hơn nhưng drawer/Now Playing vẫn cần đủ tương phản).
- [ ] Nén thêm JPG/WebP/MP4 lớn; xác nhận không có cover trùng giữa album grid và Visual Lab.
- [x] **Garden calendar desktop:** dời trái + to hơn ~20%, không còn đè lên ảnh/người trong Hero.
- [x] **Seed-bag oracle (túi hạt):** thay icon CSS vẽ tay bằng video thật (Canva), nền match màu khung thay vì tách nền, feather viền, chữ overlay có shadow.
- [x] **Chapter II threshold background:** thêm video bloom 16:9, chỉ chạy khi bấm "Bước vào Cái Sạp nhạc", giữ ~4s rồi mới đóng cổng; feather siết để che watermark góc video.
- [ ] Còn ~9 file `.command`/log cũ (deploy-*, recover-*, retry-push, v.v.) và vài file rác (preview-perf.html, hero-video-garden-preview.html…) chưa dọn — an toàn để xoá khi rảnh, không ảnh hưởng site.
- [x] **Ba hạt từ khu vườn — rebuild tên + nội dung:** 78 lá đổi hệ tên dual Nở/Khép bồ công anh, không còn tên Tarot xuất hiện ở UI/giải thích; nội dung viết lại theo văn phong tình huống cụ thể.
- [x] **Tổng hợp 3 hạt (synthesis) — tách engine riêng:** `garden-oracle-synthesis.js` gắn vùng đời sống + đếm số hạt Khép, chọn câu xoay theo tuần; hết lỗi quote lặp nguyên câu hạt 3.
- [x] **Fix lag/mất con trỏ trong oracle modal:** wire `shaderSetPaused()` vào mở/đóng modal, giảm blur, tăng scrim đọc chữ.
- [x] **Fix bug Hero quote bị JS đè về bản cũ mỗi lần tải trang:** xoá hàm `heroQuote()` ghi đè, HTML tĩnh là nguồn duy nhất.
- [x] **Wording pass toàn trang — huỷ khung phủ định "không phải...mà là":** Hero, CTA lịch, quote About, đoạn "Một lời chào", room "Dẫn dắt".
- [ ] **Oracle — bàn tiếp ở session mới:** routine cập nhật hàng tuần cho
  `garden-oracle-synthesis.js` (mở rộng `SYNTH_BANK`), có thể có phần khác của
  oracle cũng cần bàn thêm. Ali sẽ mở session riêng cho việc này, khả năng có
  cả Codex tham gia (2 agent cùng chạm oracle) — session đó nhớ đọc kỹ
  `AGENT-RULES.md` trước khi sửa, đặc biệt mục "song song 2 agent" và mục
  commit riêng file data. Chưa xử lý gì ở đây, chỉ ghi nhận.
- [ ] Rà nốt phần wording còn lại nếu Ali phát hiện thêm (đã fix Hero/calendar/About/Một lời chào/Dẫn dắt, nhưng site còn nhiều section chưa soi hết).

## Ghi chú kỹ thuật cho phiên sau (deploy mechanics)
- Sandbox không push/pull được (thiếu creds/mạng) nhưng COMMIT được bình thường. Deploy = viết script `.command` (`git pull --no-rebase --no-edit origin main && git push origin main`), `chmod +x` từ sandbox, rồi double-click qua Finder (computer-use) để chạy trên máy thật. Sau khi push, đợi ~30–60s rồi mới fetch lại live để verify — GitHub Pages build có độ trễ, fetch ngay sau push dễ tưởng nhầm là chưa lên.
- Luôn `git add` đúng file liên quan thôi (thường chỉ `index.html`) — tách commit theo phạm vi (data file riêng, doc riêng, code fix riêng) để log dễ đọc.
- **Cowork sandbox có thể chặn unlink/rename file trong thư mục đã mount** (`git commit`/`git checkout` báo `error: unable to unlink ...: Operation not permitted`, hoặc kẹt `.git/HEAD.lock` không `rm` được). Đây là khoá ghi mặc định của Cowork lên thư mục portfolio, không phải lỗi git. Cách gỡ: gọi tool `allow_cowork_file_delete` (tham số `file_path` = đường dẫn VM của file/thư mục đang kẹt) — hỏi Ali 1 lần, xong thì xoá/rename lại bình thường cho hết phiên.
- **Kiến trúc dữ liệu album có 3 tầng, dễ gây bug "hero không cập nhật":** `ALBUMS` viết cứng trong `index.html` (render ngay lúc tải, `renderHeroGarden()` CHỈ chạy 1 lần dùng mảng này) → `music-data.js` (loader) → `music-data-base.js` (kho dữ liệu thật, nạp async qua XHR đồng bộ rồi `merge()` vào `ALBUMS`, nhưng `merge()` không gọi lại `renderHeroGarden()`). Hệ quả: thêm album mới vào `music-data-base.js` là đủ cho Playlist/Discography, nhưng **hero sẽ không thấy** trừ khi album đó cũng được thêm tay vào `ALBUMS` tĩnh trong `index.html`. Nhớ điều này mỗi lần đổi hero album.
- Không có cách emulate viewport mobile đáng tin cậy qua claude-in-chrome trong môi trường này (`resize_window` không đổi viewport thật; same-origin iframe bị GitHub Pages chặn qua header chống frame). Muốn xác minh CSS mobile phải nhờ Ali chụp màn hình thiết bị thật hoặc đọc cascade cẩn thận.

## Commit chính liên quan
- [feat: seed-bag oracle video reveal + Chapter II bloom background on enter](https://github.com/AliH86/anhli-portfolio/commit/95d55c7)
- [fix(music): mobile — ẩn dứt điểm dĩa 3D bên phải + gọn tên album dài](https://github.com/AliH86/anhli-portfolio/commit/532269c)
- [fix(music): mobile Now Playing gọn thành floating bar, bỏ viền dĩa than lỗi](https://github.com/AliH86/anhli-portfolio/commit/19ee5e2)
- [fix: stabilize mobile playlist layout](https://github.com/AliH86/anhli-portfolio/commit/997b604)
- [feat: refine dandelion portfolio and music room](https://github.com/AliH86/anhli-portfolio/commit/6b88c17)
- [Thêm album Di Sản](https://github.com/AliH86/anhli-portfolio/commit/8a83b11)
- [Set hero album to Một Tần Số Khác](https://github.com/AliH86/anhli-portfolio/commit/4291786)
