# CURRENT · V2.2 finish pass live · 18 September 2026

User resumed after the laptop pause. Finish pass is now live at https://alih86.github.io/anhli-portfolio/?v=22-garden2 , commit `d058ee25f2803d2d6d1562defbf928b769c165c3`. Pages build succeeded; 13 live resource hashes match. Live laptop sign and phone playlist smoke passed. 50 automated tests passed after resume; physical iPhone Safari retest remains pending.

Read `docs/production/V2.2-FINISH-2026-09-18.md` for final scope, evidence and release boundary. Source remains `fresh/dist/`; final package is `../website-releases/2026-09-18-v2.2-finish/`. Preserve unrelated development work. The paused/local status and older release entries below are historical, superseded by this entry. Next work should follow concrete user feedback on this live version.

---

## 2026-09-18 — PAUSED by user, V2.2 finish pass remains local

User is closing the laptop. Do not continue until they resume. Exact checkpoint: `fresh/checkpoints/2026-09-18-v2.2-paused-finish/`. Read `docs/production/V2.2-PAUSED-FINISH-2026-09-18.md` first. Latest laptop sign-animation fix is not yet rechecked; 50 tests passed before that last edit. Live is still `198184e`, not this local finish pass.

---

# CURRENT · V2.2 iPhone hotfix live · 18 September 2026

User physical-iPhone screenshots exposed overlapping garden labels/note and a blank music layer after V2.2 release. Targeted repair is now live at https://alih86.github.io/anhli-portfolio/?v=22-iphone1 , commit `198184ebc1bfd7ce44bc93a9859308a666b01712`. Pages build succeeded;6 live entry/code/style/catalog hashes match. **Physical Safari retest remains pending; do not claim it is verified from Chromium viewport QA.**

Read `docs/production/V2.2-IPHONE-HOTFIX-2026-09-18.md`. Music now has explicit visual viewport geometry, an inset playlist with independent scrolling and fixed transport, no mobile dialog fade dependency, and dimensions assigned before showModal. Compact garden note and measured mini-player/navigation spacing remove overlaps; duplicate large scenic labels hidden on phones while object hotspots remain.548 runtime files; only app.js/index.html changed and garden-mobile.css added; original art/catalog unchanged.43 automated checks, local flow/scroll/resize/audio checks and live394×710 playlist smoke passed.

Source: `fresh/dist/`. Clean release: `../portfolio-garden-v22-iphone-hotfix-2026-09-18/`. Package/publication/evidence: `../website-releases/2026-09-18-v2.2-iphone-hotfix/`. Previous version: `d00e69a`; before-hotfix checkpoint saved. Preserve mixed development work. Next: user's physical Safari retest, then concrete fixes if necessary.

---

# CURRENT · V2.2 live · 18 September 2026

User approved the revised art and explicitly requested publication. **V2.2 is live** at https://alih86.github.io/anhli-portfolio/?v=22-art2 . Release `d00e69a94d2c91d763ce4eff8e025417524ef343`; GitHub Pages build succeeded;56 live resources match release SHA-256.547 runtime files match the approved art checkpoint.43 regression tests and live browser smoke passed: entrance, explicit Play, one native audio, playback after room close, mobile playlist. Physical iPhone checks are now pending the user's testing.

Read `docs/production/V2.2-LIVE-WRAPUP-2026-09-18.md`. Source `fresh/dist/`; clean release worktree `../portfolio-garden-v22-release-2026-09-18/`; evidence `../website-releases/2026-09-18-v2.2/`. Checkpoint acceptance/publication receipts supersede historical pending/no-deploy snapshots below. Preserve mixed development work and wait for concrete iPhone feedback.

---

# V2.2 · Vòng art sau phản hồi · 18/09/2026

Bản art đầu chưa đạt ref; nhận định hoàn thiện trước đó quá sớm. Đã chỉnh lại khung, bảng tên, tỷ lệ kệ/player, thư và bảng ảnh. Bản duyệt mới: `docs/production/V2.2-ART-REVIEW-2026-09-18.md`; checkpoint `fresh/checkpoints/2026-09-18-v2.2-art-review/`. Chưa có duyệt mỹ thuật, chưa live. Dữ liệu và artwork cũ nguyên vẹn.

---

# V2.2 · 18/09/2026 · Local review only

Hoàn thiện art/UI/mobile, đối soát nguồn 26 album/213 bài, pipeline project-local. Chữ opaque trên vellum trong nhẹ; wood honey + vine/daisy alpha.43 tests pass,213/213 URL audio. Tham chiếu `docs/production/V2.2-REVIEW-2026-09-18.md` và `design-qa.md`. Chưa live; đợi duyệt mỹ thuật và QA thiết bị thật. Checkpoint `fresh/checkpoints/2026-09-18-v2.2-review/`.

---

# Latest · Wrap-up V2.1 tổng hợp cập nhật · 18/09/2026

Theo yêu cầu anh Li, đã cập nhật `docs/production/V2.1-LIVE-WRAPUP-2026-09-18.md` thành điểm vào tổng hợp cho toàn bộ V2.1 và hotfix: brief/quyết định HUD ⋯ cuối cùng, các lỗi và cách sửa, catalog 28 album/226 bài (213 có URL, 13 thiếu), release `33f1c0c`, QA, giới hạn nhiệt/pin/thiết bị thật, việc V2.2, checkpoint, worktree, archive và nguồn cần sửa. Lịch sử lần live đầu được giữ bên dưới, có đánh dấu rõ. SESSION-HANDOFF/fresh README và các wrap-up liên quan đã trỏ về bản tổng hợp.

Đã fetch đối chiếu origin/main và xác nhận 507 runtime file vẫn đúng manifest hotfix, worktree release sạch. Vòng này chỉ cập nhật tài liệu; không sửa runtime hoặc deploy lại. Snapshot `checkpoint.json` là trạng thái lúc tạo gói; `publication.json`/live receipts mới hơn xác nhận đã live. Chưa có phản hồi xác nhận sau hotfix từ iPhone thật của anh; không đổi trạng thái QA thiết bị thành đã đạt.

---

# Previous · V2.1 sửa mobile và HUD ⋯ đã live · 18/09/2026

Anh báo lỗi cuộn dọc Safari iPhone 13 Pro, playlist kẹt từ bài 5, máy nóng, chuông không có sound và balloon/focus logo sai. Theo các mẫu anh gửi, HUD đã thu gọn: bấm ⋯ mở danh sách cuộn dọc, chọn bài rồi thu lại; đóng HUD vẫn nghe, bấm player nhỏ mở lại đúng bài. Bìa album có mép kệ gỗ và phần Li giới thiệu giữ đủ lời. Karaoke/lời hát vẫn để phiên sau.

Đã sửa overflow đúng trục, thêm chuông 1.25 giây rồi đóng context, bỏ focus cam tự bật ở logo và neo balloon cạnh vai. Dừng animation cảnh/gió/wildlife khi mở khay trên touch, lưu lựa chọn ✦ và có nút ✦ trong HUD; host nhắc nhẹ. Canopy dùng alpha native để tránh lỗi checkerboard Safari. Một native music player được bảo toàn.

Commit live `33f1c0c1f4e968781a4c2674797363d1b332059e`; Pages build thành công, 18 resource online đúng checksum; live Chrome/WebKit responsive scroll và desktop/mobile R2/profile/gallery smoke đạt. 36 unit checks + 7 viewport/browser scenarios. Nhiệt độ, pin và background/lock-screen trên máy thật chưa được chứng nhận; anh sẽ thử lại iPhone, không có tablet/Android. Chi tiết: `docs/production/V2.1-MOBILE-HOTFIX-2026-09-18.md`. Checkpoint `fresh/checkpoints/2026-09-18-v2.1-mobile-hotfix/`, package `../website-releases/2026-09-18-v2.1-hotfix/`. Bản V1/V2/V2.1 cũ giữ nguyên; không trộn dirty work vào release.

---

# Previous · V2.1 đã lên live · 18/09/2026

Anh Li chốt xuất bản V2.1; wording và karaoke/lyrics để phiên V2.2. Đã push commit `3b80fa7d4159cb4b5e75c3877aba97047da7940d` từ worktree release riêng, GitHub Pages build/deploy thành công. Live: https://alih86.github.io/anhli-portfolio/ . 17 tài nguyên online trùng checksum; smoke desktop/mobile trên site thật đạt, gồm nhạc R2 phát tiếp khi đóng sạp và ambience đổi ngày/đêm. Một native player được giữ nguyên. Lyrics index vẫn trống, chưa hiển thị karaoke.

Wrap-up: `docs/production/V2.1-LIVE-WRAPUP-2026-09-18.md`. Gói lưu/chứng từ: `../website-releases/2026-09-18-v2.1/`; worktree sạch: `../portfolio-garden-release-2026-09-18/`. Bản lưu V1/V2, kho nhạc local và workspace nháp được giữ nguyên. File deploy một lần đã archive sau khi kiểm tra xong. QA thiết bị thật vẫn là giới hạn chưa xác minh; các note wording/karaoke sẽ tiếp tục ở phiên sau.

---

# Previous · V2.1 accepted; wording remains · 18 September 2026

## User acceptance · 18 September 2026

Ali confirmed: “ok, còn lại là wording, còn lại ổn nha”. The current V2.1 visuals, layout, motion, ambience and interaction are accepted, including all four review refinements. Remaining work is **wording only**. All 506 runtime files still match `fresh/checkpoints/2026-09-18-v2.1-review/hashes.json`; the reviewed archive is unchanged. Approval receipt: `fresh/checkpoints/2026-09-18-v2.1-review/acceptance.json`. No runtime copy was changed in this acknowledgment, and no publication was performed.

# Previous · V2.1 review follow-up · 18 September 2026

Ali: “mostly là quá ổn… còn lại ok hết cho trang v2.1”; requested full host quotes, visible breeze, uninterrupted looping ambience, and two related HUD groups with Li's avatar introduction below the album and playlist alongside. Implemented these four locally in `fresh/dist/`. Full quote is no longer shortened or affected by the scenery mask. Playlist remains one vertical menu joined to its transport panel. Continuous birds/crickets ambience is opt-in and ducks for music. Native music, catalog and artwork are preserved.

36 unit/regression checks and 12 browser scenarios passed; full longest quote and active wind checked across five viewport sizes. Real ambience played across two native loop cycles without a restart or silence timer; delayed day/night handoff and clean stop passed. Actual R2 playback sampled at three viewport sizes. Evidence: `fresh/qa/v2.1-review-2026-09-18/`. Exact local checkpoint: `fresh/checkpoints/2026-09-18-v2.1-review/`. Details at the top of `docs/production/V2.1-LOCAL-WRAPUP-2026-09-17.md`. No commit/push/deploy. The four follow-up changes await review; V2 release worktree remains clean.

---

# Latest · V2.1 local · 17 September 2026

Runtime: `fresh/dist/`. Built locally from the supplied V2.1 brief, including gate, habitat/world polish, continuous vertical playlist dropdown, reserved host visibility and lazy featured-lyrics support. No commit/push/deploy. Full handoff: `docs/production/V2.1-LOCAL-WRAPUP-2026-09-17.md`; checkpoint: `fresh/checkpoints/2026-09-17-v2.1-local/`. Earlier horizontal song cards were rejected; do not restore them. Existing content and unrelated development work are preserved.

---

# Recap — anhli-portfolio (cập nhật 13/7/2026)

## Ba lỗi của script dọn thư mục — Ali phát hiện 3/9/2026

Ghi lại vì cả ba đều là script **chống lại ý người dùng**, không phải lỗi kỹ thuật:

1. **Tự dựng lại folder Ali đã xoá.** Script tạo folder rỗng + `_THIẾU.txt` cho mọi
   album còn thiếu. Ali xoá xong, chạy lại là mọc lại y cũ. → Giờ chỉ ghi `_THIẾU.txt`
   vào folder ĐANG TỒN TẠI và còn ít nhất 1 bài; không bao giờ tạo folder mới.
2. **Lôi file Ali đã tự tay xếp ra khỏi folder album.** Hai bài chưa có trong dữ liệu
   trang (`Mộng Cõi Mây Ngàn`, `Mượn Trăng`) bị hốt vào `_chưa có trên trang/` dù Ali
   đã đặt đúng chỗ. → Giờ CHỈ gom file nằm ở GỐC thư mục; file trong folder album là
   quyết định của Ali, không đụng.
3. **Đẻ folder trùng vì lệch dấu.** Ali tạo `Tôi Họa Cả Thế Gian/`, dữ liệu trang ghi
   `Tôi Hoạ Cả Thế Gian` → script tạo folder thứ hai rồi bê 9 file của Ali sang, để lại
   folder gốc rỗng. → Giờ so tên folder theo dạng bỏ dấu (`dirFor()`); có folder tương
   đương thì DÙNG LẠI.

Nguyên tắc rút ra: **script dọn được phép sắp xếp thứ nó tự nhận diện, nhưng không được
phủ quyết vị trí do người dùng đặt.**

## Tối ưu tốc độ tải — đợt 3/9/2026

Đo trên bản live trước khi sửa: TTFB 305ms (ổn), **DOMContentLoaded 6 769ms**,
**Load 20 476ms**, 41 request / 3.68MB. Thủ phạm không phải dung lượng mà là
**script chặn render**: `vedic-chart.js` hoàn tất ở 6 767ms — DCL 6 769ms.

**Bài học quan trọng: `defer` KHÔNG cứu được DCL.** Script `defer` vẫn chạy TRƯỚC
`DOMContentLoaded`. `vedic-chart.js` đã có `defer` từ trước mà vẫn giữ chân DCL.
Muốn thoát khỏi DCL phải dùng `async` (cho file độc lập) hoặc nạp động (khi cần).

Đã làm:

1. **4 file dữ liệu Oracle → `async`** (`index.html` ~5800). Chúng độc lập nhau nên
   không cần giữ thứ tự. Kèm theo: lịch Oracle trước đây chốt cứng
   `const deck/profileById/identityById` một lần lúc chạy — dữ liệu về sau sẽ không
   bao giờ được dùng. Đổi sang `let` + `refreshOracleData()`, gọi lại qua `onload`
   của từng thẻ script. Phần còn lại của lịch không phải sửa.
2. **Bộ Vệ Đà (astronomy-engine + vedic-content + vedic-chart, ~290KB) → nạp khi cuộn
   tới**, bằng IntersectionObserver trên `#vdApp` với `rootMargin:600px`. Nạp tuần tự
   đúng thứ tự vì `vedic-chart` đọc `window.Astronomy` và `window.VEDIC_CONTENT`.
   `vedic-chart.js` tự gọi `boot()` khi DOM sẵn sàng nên nạp muộn vẫn tự khởi động.
3. **Bìa album: 30 file, 1000–1254px → 600px q80** (`sips -Z 600 -s formatOptions 80`).
   `uploads/` **10.6MB → 4.1MB**. Bản gốc ở `_originals/covers-2026-09-03/`.
   Thẻ hiển thị rộng 206–240px nên 600px vẫn dư cho màn Retina.
4. **Hero → AVIF** (`sips -s format avif -s formatOptions 60`): plane-mid 732→412KB,
   plane-far 400→344KB, bg-meadow 384→336KB, tổng **1.5MB → 1.08MB**. Dùng
   `image-set()` với `type('image/avif')` + dòng `url(...webp)` khai TRƯỚC làm dự
   phòng — trình duyệt không hiểu `image-set()` giữ nguyên webp, không ai mất ảnh nền.
   `<link rel=preload>` trỏ AVIF kèm `type="image/avif"` để máy không hỗ trợ thì bỏ qua.

Kết quả đo tại localhost (không phản ánh được giây thật vì không có độ trễ mạng, nhưng
chứng minh thay đổi cấu trúc): script hoàn tất trước DCL **15 → 5**, file Vệ Đà tải lúc
vào trang **3 → 0**. **Phải đo lại trên live sau khi deploy** để có con số giây thật.

**Chưa xác minh được:** bấm nút ngày "hôm nay" trên lịch không mở được phần rút hạt
Oracle (thử cả click tổng hợp lẫn click chuột thật). **Bản TRƯỚC khi sửa cũng y hệt**
nên đây KHÔNG phải hồi quy do đợt này — nhưng cần kiểm riêng xem Oracle có thật sự
hoạt động trên live không.

**Chưa làm:** chuyển site sang Cloudflare Pages (miễn phí, có PoP ở VN, GitHub Pages
đi qua Fastly gần nhất Singapore/HK) và gắn custom domain cho R2 thay `pub-*.r2.dev`
(Cloudflare giới hạn tốc độ dev URL này). Cần Ali thao tác tài khoản.

## Nhạc chuyển sang tự host trên Cloudflare R2 (3/9/2026)

**Sự cố:** Suno khoá CDN. `cdn1.suno.ai/{id}.mp3` trả **403 MissingKey** — giờ mỗi
file phải kèm chữ ký CloudFront (`Policy` + `Signature` + `Key-Pair-Id`) do server
Suno ký tươi và hết hạn sau ít phút, không thể nhúng cố định vào trang tĩnh.

Đã dò hết các đường vòng, tất cả đều chết — ghi lại để sau này khỏi thử lại:

- `audiopipe.suno.ai/?item_id=` → HTTP 200 nhưng body **0 byte**.
- `suno.com/embed/{id}` → trang tải được, nhưng thẻ audio bên trong trỏ vào
  `studio-api.prod.suno.com/api/forbidden` (403). **Fallback iframe cũ đã vô dụng**
  — chính nó gây cảm giác "bấm mà im".
- `d2lwuy8qc234o3.cloudfront.net/1/clip/{id}.m4a` (lộ trong `media_urls` của trang
  bài hát) → tải được thật, có CORS và Range, **nhưng nội dung bị mã hoá** (không có
  box `ftyp`, byte đầu là rác) và header `x-amz-expiration` cho thấy S3 tự xoá object
  sau ~30 ngày. Không dùng được.
- Ảnh bìa `cdn2.suno.ai/image_*.jpeg` thì **vẫn sống** — không cần đụng tới.

**Cách làm hiện tại:** nhạc nằm trên Cloudflare R2, bucket `anhli-music`, public dev
URL `https://pub-a3731640f04640feb4e5e790b78deedf.r2.dev/`, CORS mở cho
`alih86.github.io` (nhờ vậy equalizer Web Audio chạy theo sóng nhạc thật trở lại —
CDN Suno trước đây không cho CORS).

File xếp theo album cho dễ quản lý: `bien-nien-that-nghiep-ky/08-vai-tu-phuong.mp3`
(tên bỏ dấu, có số thứ tự để đúng thứ tự album khi liệt kê).

**Thay đổi trong code:**

- `index.html`: thêm `AUDIO_BASE`; `streamUrl(id)` tra `window.AUDIO_MAP` để ra đường
  dẫn; **bỏ hẳn `showEmbed()`** (embed Suno đã câm) thay bằng `showTrackUnavailable()`
  báo bài chưa lên kho + link sang Suno; `PROBE` của bộ dò CORS lấy bài đầu trong
  AUDIO_MAP thay vì id cứng.
- `audio-map.js` (**sinh tự động, đừng sửa tay**): bảng id → đường dẫn, nạp sớm ở
  `<head>` với `?v=Date.now()` nên thêm nhạc mới không phải đụng `index.html`.
- `scripts/build-audio-manifest.mjs`: khớp file mp3 tải từ Suno với dữ liệu bài hát,
  sinh `audio-map.js`, `data/audio-manifest.json` và `MISSING-TRACKS.md`.
- `scripts/upload-audio-r2.mjs`: đẩy lên R2 qua wrangler; tự chặn file iCloud chưa
  tải về máy để không đẩy nhầm file 0 byte.

**Hai cái bẫy đã sập một lần, đừng sập lại:**

1. **Trang có 245 bài / 31 album, KHÔNG phải 182.** `index.html` có sẵn mảng `ALBUMS`
   viết thẳng trong file, `music-data-base.js` chỉ **gộp đè theo id**. Chỉ đọc file
   dữ liệu là hụt 8 album (Dấu Ấn Thanh Âm, Vietnam Young Lions '25/'26, TẾT Ngọ Sum
   Vầy '26, Dai-Ichi Life Vietnam…). `build-audio-manifest.mjs` đã lặp lại đúng logic
   `merge()` — dùng nó, đừng parse tay một nguồn.
2. **Tên file Suno tải về bị XOÁ ký tự có dấu, không phải bỏ dấu:** "Buồn Mây Bán Gió"
   → `Bun My Bn Gi.mp3`. Muốn khớp phải áp đúng phép biến đổi mất mát đó lên tên bài.

**Thư mục nhạc gốc đã được dọn** (`~/Library/Mobile Documents/…/Downloads/My Suno_music`)
bằng `scripts/organize-source-folder.mjs`: mỗi album một folder tên tiếng Việt, file đặt
lại `NN - Tên Bài.mp3`, album nào thiếu có `_THIẾU.txt` liệt kê bài còn thiếu kèm link
Suno, nhạc chưa bày trên trang nằm ở `_chưa có trên trang/`, nhật ký đổi tên ở
`_đã đổi tên.csv`. Ali thả bài mới tải vào thẳng folder album (để nguyên tên Suno cũng
được) rồi chạy lại build + upload.

**Ba cái bẫy của script dọn thư mục — đã sập rồi mới sửa, đừng lặp lại:**

1. **Luôn chạy `build-audio-manifest.mjs` NGAY TRƯỚC khi dọn.** Bảng khớp cũ trỏ vào tên
   file đã đổi → script tưởng cả 154 file là nhạc lạ và hốt sạch vào `_chưa có trên trang`.
   Đã thêm chốt chặn: script tự dừng nếu bảng khớp cũ.
2. **Bài nằm ở hai album** (cùng file, hai id Suno khác nhau — vd "Duyên, Hợp, Tan" ở cả
   *Unplugged Special* lẫn *TẾT Ngọ*): chỗ đến thứ hai phải NHÂN BẢN, không được chuyển,
   nếu không album kia mất bài.
3. **Nhận diện "nhạc lạ" phải theo TÊN BÀI, không theo đường dẫn** — nếu không thì bản sao
   hợp lệ của bài dùng chung bị đá vào `_chưa có trên trang`, rồi lần chạy sau lại nhân bản
   ra, lặp vô tận và đẻ thêm file mỗi lần.

**Đã ẩn 4 album nhạc job khách** (Dai-Ichi Life Vietnam, Dấu Ấn Thanh Âm, Vietnam Young
Lions '25 và '26) bằng cờ `hidden:true` trong mảng `ALBUMS` inline — dữ liệu vẫn nằm
nguyên trong `index.html` để bật lại sau. Lọc bằng `dropHiddenAlbums()` gọi NGAY SAU khi
khai báo mảng và lần nữa trong `merge()`, chứ không lọc lúc render: mọi hàm dùng chỉ số
album (selectAlbum/playAt/shuffle/deep link) phải thấy cùng một mảng, lọc lúc render là
lệch chỉ số. Trang còn 27 album / 209 bài.

**Bài chưa có file thì ẩn luôn khỏi trang** (`dropUnavailableTracks()`): lọc theo
`window.AUDIO_MAP`, album rỗng thì bỏ luôn khỏi sạp. Tải bài về → chạy build → push
`audio-map.js` là bài tự hiện lại, KHÔNG phải sửa `index.html`. An toàn: nếu
`audio-map.js` lỗi không tải được thì giữ nguyên toàn bộ bài (thà vài bài câm còn hơn
sạp trống). Chạy ở 3 chỗ: sau khai báo ALBUMS, trong `merge()` trước `renderMusic()`, và
trong `onload` của audio-map.js (phòng khi nó về muộn hơn dữ liệu nhạc). Trang hiện bày
**21 album / 137 bài**. Kiểm rồi: album chính của hero (`data-promoted-album` =
Một Tần Số Khác) vẫn còn; 2 album phụ của hero bị lọc nhưng hero tự bỏ qua, không lỗi.

**Đã gỡ bộ đếm lượt truy cập** — `api.counterapi.dev` trả 410 Gone (dịch vụ khai tử
endpoint), mà trang cũng không hề có phần tử `#visit-count` để hiện số. Gỡ cả hàm
`loadCounter()` lẫn lời gọi.

**Còn dở:** 13/202 bài chưa có file (MiTek 5 + Tôi ❤ Việt Nam 8 — Ali chủ động bỏ) (xem `MISSING-TRACKS.md`, có link Suno từng bài),
Ali tải bổ sung rồi chạy lại `build-audio-manifest.mjs` + `upload-audio-r2.mjs --skip-existing`.
3 bài tên file lệch quá xa đã được Ali xác nhận và ghim trong `data/audio-aliases.json`
(ghép tay luôn thắng khớp tự động).


## Wording checkpoint 1 — Hero + About + ngưỡng Music (13/7/2026, review)

- Trạng thái: **review local**, chưa commit/push/live; chờ Ali xem trên giao
  diện trước khi chuyển sang Music.
- Khóa hướng giọng: xưng “mình – bạn”, “đằng ấy” chỉ là dấu chào ở
  Hero; cụ thể trước, hình ảnh sau; ấm, có duyên và hiểu ngay.
- Hero đổi từ lời chào hỏi khách đến bằng cách nào sang lời tự giới
  thiệu rõ việc dựng sân khấu, viết nhạc và tìm thêm người đồng hành.
  Eyebrow chuyển sang tiếng Việt; side label rút gọn và đã sửa đồng bộ
  cả HTML lẫn `renderHeroGarden()` để JS không ghi đè bản cũ.
- Cầu nối “Một lời chào” đổi sang lời mời người đang ở đây ở lại
  và chốt hình tượng Anh Li là “người làm vườn”.
- About bỏ phần tự giới thiệu lặp lại, kể hành trình từ thiết kế không
  gian đến âm nhạc; viết lại quote, ba nét ngắn và bốn trụ nghề theo
  việc làm cụ thể. Giữ câu “Nhạc sĩ độc lập ‘tự phong’” theo duyệt của Ali.
- Ngưỡng Music bỏ hoàn toàn nhãn “Chapter II”; chuyển thành lời mời
  nghe đôi chút thanh âm tự sự. CTA “Bước vào Cái Sạp nhạc” giữ nguyên.
- QA local đã qua ở 1440×900, 390×844 và 320×700: không tràn ngang
  trang, Hero quote vẫn nằm trọn trong Hero, copy ngưỡng Music nằm trọn
  trong section, nhãn Chapter không còn trong DOM và console không có lỗi.

## Wording checkpoint 2 — Music (13/7/2026, review)

- Trạng thái: **Ali đã duyệt wording local**, chưa commit/push/live.
- Intro Music chuyển từ giọng giới thiệu bên ngoài sang giọng chủ sạp “mình”;
  làm rõ D'Li là màu giọng ảo do Anh Li tạo ra để kể phần cảm xúc
  một mình chưa kể hết.
- Cửa AI bỏ khung phủ định “AI không thay thế… / chỉ là…”. Bản mới gọi
  AI là một nhạc cụ trong căn phòng và nói thẳng rằng trái tim, lựa chọn,
  trách nhiệm sáng tạo thuộc về con người. CTA đổi thành “Mở cửa
  nghe nhạc” / “Để mình đọc lại”.
- Toàn bộ microcopy playlist/player được đưa về ngôn ngữ Cái Sạp:
  “Kệ nhạc”, “Để mình chọn một bài cho bạn”, “Đang nghe”, “Nghe từ
  đầu”, cùng loading/error/share/shuffle và accessibility label tương ứng.
- Viết lại mô tả album theo hướng cụ thể, gọn và có hình ảnh; giữ
  nguyên ID, tên album, subgenre, cover, tên bài, thời lượng và link. Các album
  trùng ID được sửa cả trong `index.html` fallback lẫn
  `music-data-base.js` để không quay về wording cũ khi loader lỗi.
- QA runtime: loader ghép đúng **25 album**; desktop và mobile 320px không
  tràn ngang toàn trang, cửa AI mở đúng trạng thái, không có lỗi console.
  Mô tả album một dòng trên mobile và cụm chân dung nằm ngang là hành vi
  responsive đã có sẵn, không phải lỗi wording.

## Wording checkpoint 3 — Oracle + nhịp tuần (13/7/2026, approved)

- Trạng thái: **Ali đã duyệt để push live**.
- Viết lại ritual từ lịch → túi hạt → lật hạt → kết quả theo giọng mời ở lại:
  rõ hơn về thao tác, bớt câu phủ định/phán xét và nói thẳng rằng ba hạt được
  chọn ngẫu nhiên nhưng giữ nguyên đến khi ngày mới sang.
- Thêm lớp nội dung nhìn thấy được `Nhịp tuần · 13–19/7` với chủ đề
  **“Dọn một khoảng đất cho điều mới”**. Nội dung chỉ dùng hai trục thời tiết
  chung đã kiểm tra: Trăng non 14/7 và Sao Thuỷ nghịch hành ở Cự Giải; không
  cá nhân hoá, không giả định hoàn cảnh người xem.
- `garden-oracle-synthesis.js` trả thêm weekly context từ pack đã duyệt;
  `index.html` render thành một khối riêng trước “Khi ba hạt gặp nhau”. Thêm
  cache key cho weekly data để trình duyệt cũ nhận ngay nội dung mới.
- QA: matrix **80 tổ hợp × local/live** qua; đủ 78 semantic profile, pack tuần
  được nạp đúng. Ritual hoàn chỉnh qua trên 1440×900 và 390×844, ba hạt hiển
  thị đủ, khối kết quả cuộn đúng và toàn trang không tràn ngang.

## DONE — dọn toàn bộ untracked cũ có chủ đích (13/7/2026)

- **Đã xoá an toàn** 3 script deploy một lần đã hết nhiệm vụ:
  `deploy-cleanup-hero-fix-july12.command`,
  `deploy-oracle-artwork-july13.command`,
  `deploy-oracle-spec-july12.command`.
- **Đã xoá an toàn** log cũ `deploy-log-cleanup-hero-fix-july12.txt` (chỉ ghi
  lần push đã hoàn tất ở commit cũ `b9a3fa8`; không còn giá trị vận hành).
- **Đã xoá** `images/hero/dandelion-scene/bg-dandelion-field.png` sau khi
  SHA-256 xác nhận trùng byte với file tracked `images/hero/dandelion-field.png`.
- **Đã lưu trữ ngoài repo** 7 layer Hero độc bản thay vì xoá. Đường dẫn mới:
  `/Users/alihuynh/Claude/Projects/Anh Li Portfolion/source-archive/hero/dandelion-scene/`.
  Gồm: `anhli-sitting.png`, `dli-standing-back.png`, `giant-cd-case.png`,
  `cd-loose.png`, `fg-dandelion-grass.png`, `light-haze.png`,
  `seed-overlay.png`. Site không tham chiếu chúng; đây chỉ là source để dựng
  lại Hero nếu cần. Thư mục untracked cũ trong repo đã được xoá sạch.
- **Đã quyết định track** `.claude/launch.json`: cấu hình preview website tĩnh
  bằng `python3 -m http.server 8765`, giúp agent/Cowork sau mở local nhanh;
  không tham gia bundle hoặc ảnh hưởng GitHub Pages.
- Sau cleanup, không còn deploy script/log/source-layer untracked trong repo.
  Không được tạo lại các file đã xoá chỉ để deploy; Codex có thể push trực tiếp,
  còn script một lần mới phải được dọn ngay sau khi hoàn thành nhiệm vụ.

## NEXT SESSION — đại cập nhật wording toàn website (Ali đã chốt)

### Quyết định và thứ tự

- Ali đồng ý làm wording toàn website, không giới hạn ở Oracle. Thứ tự đã chốt:
  **Hero + About + Chapter II trước** để khóa giọng chung → **Music** →
  **Work/Career** → **Visual/Video** → **Oracle** → microcopy/fallback/footer.
- Lý do: ba section mở đầu định nghĩa con người và nhịp kể của cả website;
  nếu sửa Music/Work/Visual/Oracle trước khi khóa giọng, sẽ phải viết lại lần
  hai. Không đổi thứ tự này nếu Ali chưa yêu cầu.
- Đây là một phase nội dung riêng. Không tự ý redesign, thay asset, đổi logic
  player/Oracle hoặc sửa dữ liệu ngoài phần wording đang duyệt.

### Instruction bắt buộc cho agent/session kế tiếp

1. **Preflight:** đọc `AGENT-RULES.md`, mục này và các mục wording/Oracle mới
   nhất; chạy `git status`, fetch/so sánh `origin/main`, đọc log. Các file
   untracked sẵn có (`.claude/`, deploy script/log cũ,
   `images/hero/dandelion-scene/`) không được add/xoá/commit.
2. **Audit trước khi viết:** lập inventory text hiển thị theo section và ghi
   rõ nguồn thật của từng câu: HTML tĩnh, JS hardcode, `music-data*.js`, data
   Oracle hoặc fallback. Nhớ regression cũ `heroQuote()` từng ghi đè HTML;
   không coi việc sửa một chuỗi là xong trước khi kiểm tra có lớp khác override.
3. **Voice Bible ngắn:** trước pass lớn, đề xuất 6–10 nguyên tắc giọng Anh Li
   và 2–3 đoạn mẫu cho Hero/About/Chapter II. Ali duyệt giọng rồi mới mở rộng.
   Giọng mục tiêu: gần, có duyên và hình ảnh nhưng hiểu ngay; cụ thể hơn thơ;
   ấm nhưng không sáo; tránh câu AI chung chung, phán chắc, giải thích quá dài
   và cấu trúc phủ định vòng “không phải… mà là…”.
4. **Checkpoint 1 — Hero + About + Chapter II:** rà toàn flow lời chào → con
   người Anh Li → ngưỡng bước vào Cái Sạp nhạc. Kiểm tra H1/H2, quote, CTA,
   caption, mobile wrapping và mọi JS có thể ghi đè.
5. **Checkpoint 2 — Music:** rà Music Gate, album descriptions, playlist,
   player states, random-pick/share/loading/error. Kiểm tra đúng cả ba tầng
   `ALBUMS` trong `index.html` → `music-data.js` → `music-data-base.js`; không
   làm sai title/track/link/duration chỉ vì đang sửa văn phong.
6. **Checkpoint 3 — Work + Visual/Video:** làm rõ vai trò, thành tựu, cách làm
   nghề và nhịp kể; tránh biến portfolio thành CV khô hoặc statement mơ hồ.
7. **Checkpoint 4 — Oracle:** chỉ làm sau khi giọng chung đã khóa. Đọc lại
   `ORACLE-CONTENT-SYSTEM.md`. Tách rõ ritual copy, 156 lời Nở/Khép, semantic
   profile và synthesis/weekly pack; không sửa hàng loạt 78 lá nếu chưa có
   sample 6–9 lá được Ali duyệt. Không để wording pack `review` lọt ra live.
8. **QA cuối:** grep text cũ/duplicate/khung phủ định; kiểm tra desktop/mobile,
   CTA dài, line break, fallback/loading/error; test Oracle matrix và syntax
   inline JS nếu có chạm. Commit theo checkpoint, stage đúng file, chờ Ali
   duyệt trước mỗi lần push.

### Definition of done

- Một giọng nhất quán xuyên trang nhưng từng “phòng” vẫn có cá tính riêng.
- Không còn câu cũ bị JS/data layer ghi đè lại, không còn wording fallback lệch
  giọng, không phá dữ liệu album/Oracle và không tạo regression mobile.
- Recap phải cập nhật sau từng checkpoint với ví dụ before/after và trạng thái
  `draft/review/approved/live`; tuyệt đối không dùng “đã chốt” cho thứ mới chỉ
  nằm trong đặc tả hoặc local.

## ĐÍNH CHÍNH TRẠNG THÁI ORACLE — audit spec ↔ code (13/7/2026)

- Các mục trước từng dùng chữ “đã chốt” cho cả đặc tả lẫn implementation,
  khiến trạng thái bị hiểu sai. Tại thời điểm audit này, phần **đã hoàn tất**
  gồm: dữ liệu tên/lời riêng 78 hạt, semantic profile 78 hạt, 78 artwork,
  ritual rút hạt và engine prototype chỉ đọc `domain + số Nở/Khép +
  cluster/spread`.
- Phần **chưa được triển khai trước audit**: engine chưa đọc semantic profile;
  chưa đọc quan hệ nguyên tố/movement/need/risk/gift/action; chưa có dữ kiện
  chiêm tinh địa tâm 8 ngày; chưa có wording pack với `weekKey`, trạng thái
  `approved` và fallback; chưa có routine tạo/duyệt pack; chưa đạt lời tổng hợp
  90–140 chữ theo bốn nhịp trong `ORACLE-CONTENT-SYSTEM.md`.
- Checklist cũ đánh dấu `[x] Tổng hợp 3 hạt` chỉ đúng với **prototype hai tín
  hiệu**, không đồng nghĩa engine theo đặc tả đã hoàn tất. Cụm “chiêm tinh đã
  có” ở mục artwork UI phía dưới cũng sai: field `astro` rời trên vài lá Major
  không phải lớp thời tiết chiêm tinh ngày/tuần.
- Bug wording live được xác nhận: `index.html` lấy câu đầu của ba lời riêng làm
  bullet rồi gọi là tổng hợp, trái trực tiếp quy chuẩn “không copy ba lời hạt”.
  `weekIndex` chỉ luân phiên vài câu tĩnh, không phải weekly astrology/wording
  pipeline.
- Đợt triển khai local kế tiếp phải hoàn thành theo thứ tự: dữ kiện 8 ngày +
  wording pack có duyệt → engine đọc semantic profile + quan hệ nguyên tố +
  Nở/Khép + tối đa hai tín hiệu chiêm tinh → test ma trận → UI/QA → mới commit
  và push. Mọi mục bên dưới phải được đọc cùng đính chính này.

## Oracle local rebuild — wording/astrology engine + desktop ritual (13/7/2026)

- Trạng thái: **đã hoàn thành và QA ở local**. Weekly pack 13–20/7 ban đầu là
  `review`, sau đó Ali xác nhận “tốt” và yêu cầu đẩy QA nên chuyển thành
  `2026-W29-approved`; local/live cùng dùng đúng pack đã duyệt.
- Thêm `garden-oracle-weekly-data.js`: dữ kiện địa tâm 8 ngày, tối đa hai tín
  hiệu mỗi ngày, có `verb` chuẩn + domain liên quan + wording đã biên tập; ghi
  nguồn Astrodienst Swiss Ephemeris 2026 và NASA Moon Phases. Không dùng vị
  trí, giờ sinh, nhà hoặc cung Mọc.
- Viết lại `garden-oracle-synthesis.js`: engine nay nạp đủ 78 semantic profile,
  đọc domain, movement, trạng thái Nở/Khép, quan hệ nguyên tố và tối đa một tín
  hiệu chiêm tinh phù hợp nhất. Kết quả bốn đoạn 90–140 tiếng, có metadata truy
  vết profile/pack/signal; không lấy câu bloom/closed làm bullet.
- Thêm `scripts/test-oracle-synthesis.mjs`: 80 tổ hợp đại diện × hai môi trường
  local/live; xác nhận đủ 78 profile, độ dài 90–140, không copy lời riêng,
  tối đa hai signal, đúng trace source và pack approved được nạp đúng trên live.
- UI synthesis bỏ hoàn toàn ba bullet copy/paste, thay bằng bốn nhịp: trọng tâm
  → Nở/Khép + movement → nguyên tố + thời tiết chung → một việc vừa sức.
- Desktop drawn state thành sân khấu 1180px không khung: ba lá 250px pop-out,
  float/thở lệch nhịp, lật tuần tự rồi đứng lại để xem artwork. Mobile giữ
  format compact. Cả hai chỉ mở thông điệp khi người xem bấm lần hai “Đọc
  thông điệp từ khu vườn”; hết lỗi tự chuyển quá nhanh.
- Pass desktop-large sau feedback: sân khấu mở tối đa 1680px; ở viewport
  2048×1152 mỗi lá đạt 451px (gần gấp đôi bản 250px), grid 1580px. Artwork sau
  lật có neon amber–sage thở quanh viền, vẫn giữ float lệch nhịp.
- Màn thông điệp desktop bỏ hoàn toàn panel nền/viền/shadow, trải tối đa
  1440px trực tiếp trên backdrop; layout hai cột ~700/550px — ba lời hạt bên
  trái, synthesis + disclaimer/CTA bên phải. H2 tăng tới 5.7rem. Mobile không
  đổi layout vì toàn bộ pass này khoá trong breakpoint `min-width:901px`.
- Fix performance modal: chuyển sang cursor hệ thống, tạm ngưng cursor giả,
  shader, EQ/vinyl loop và seasonal canvas khi Oracle mở; backdrop blur giảm
  còn 2px. QA local desktop 1440×900 + mobile 390×844: artwork lật đúng,
  Khép xoay đúng, synthesis 4 đoạn/0 bullet, scroll mobile an toàn, console
  không warning/error.
- Tạo mặt lưng chung bằng image generation, style-match trực tiếp một artwork
  trong bộ: huy chương bồ công anh đối xứng 180°, viền dây lá kim tuyến, nền
  xanh–đen amber/sage, không chữ/logo/watermark. Bản web
  `images/oracle/card-back-v01.webp` 720×900, quality 86, ~148KB.
- Mặt úp không còn lộ số/tên. Ba lá float/thở lệch nhịp ngay khi xuất hiện;
  artwork mặt lưng tự scale/brightness rất nhẹ và có dải sáng quét chậm. Reduced
  motion tắt toàn bộ. Bảng mở hạt đổi nền sang alpha 0.86→0.80 để hòa với
  backdrop hơn. QA desktop 2048×1152 + mobile 390×844 đều đạt.

## Oracle — đưa đủ 78 artwork vào ritual trên website (13/7/2026)

- Đã giữ nguyên 78 PNG master ngoài repo và xuất riêng bản web 720×900 WebP,
  quality 82, tổng 5.6 MB vào `images/oracle/cards/seed-00.webp` đến
  `seed-77.webp`. Script tái tạo có kiểm tra đủ id 0–77, không trùng và đúng
  kích thước master 1122×1402: `scripts/build-oracle-card-assets.py`.
- UI chỉ gắn đúng 3 ảnh của lượt rút; không preload cả bộ 78. Màn “Gió đã chọn
  xong” hiện ba mặt lưng có số/tên. Khi bấm “Gieo ba hạt vào gió”, ba lá lật
  tuần tự rồi mới mở thông điệp.
- Mỗi artwork raster vẫn không chữ. Số, tên và trạng thái Hạt Nở/Hạt Khép là
  HTML phủ riêng; lá Khép dùng đúng artwork đó xoay 180°, không tạo ảnh thứ hai.
- Phần thông điệp có thumbnail artwork cạnh từng lời đọc để người xem còn thấy
  hình sau animation. Bỏ tên Tarot khỏi metadata hiển thị; chỉ giữ nguyên tố và
  chiêm tinh đã có, đúng tinh thần đây là 78 sinh thể của khu vườn.
- QA cục bộ thực tế ở desktop và mobile 390×844: mặt lưng không tràn, nút CTA
  không đè card, lật đúng, modal thông điệp cuộn an toàn; mỗi lượt có đúng 3
  URL ảnh. Reduced motion bỏ thời gian chờ/lật như trước.
- Việc push checkpoint trước khi làm bị chặn do môi trường không phân giải được
  `github.com`; chưa có thay đổi nào được đẩy live trong phiên này.

## Oracle — duyệt 78 artwork thành phẩm và chốt cách đặt tên theo thần thái riêng (13/7/2026)

- Ali bổ sung nguyên lý sáng tạo cần giữ cho mọi phiên sau: 78 lá đi đúng
  cảm hứng nguyên thủy của hệ 78, nhưng nhân vật thật là Hạt bồ công anh và
  hành trình của Hạt qua 78 nội dung. Prompt là điểm khởi hành; nếu artwork
  thành phẩm hữu duyên mở ra một cảm nhận mới mà vẫn giữ bản chất Hạt, độ lệch
  đó được coi là thần thái riêng của Dandelion Oracle, không phải lỗi cần ép
  quay về khuôn Tarot/prompt ban đầu.
- Số, tên và trạng thái Nở/Khép (xuôi/ngược) do HTML render riêng; artwork
  raster vẫn không chữ và dùng chung cho hai hướng xoay. Khi đặt tên, xem đồng
  thời mô tả gốc + hình thành phẩm + chuyển động thật của Hạt. Tên tối đa 4
  tiếng, ưu tiên bỏ “Hạt”/“Người”/“Kỵ sĩ”, có thể là một hành động; không gọi
  tay/chân/mắt/tai hoặc vật thể không có trong hình.
- Đã xem đủ 78/78 PNG theo 5 khối Major 22 + Lửa/Nước/Khí/Đất mỗi khối 14,
  đối chiếu trực tiếp artwork với `openName`/`closedName`, `coreStory` và
  `visualMotif`. Kết luận: phần lớn tên đã chốt giữ đúng năng lượng và hình;
  không đổi hàng loạt chỉ để đồng bộ slug filename hoặc giọng văn.
- Chỉ sửa 3 lá có lệch hình–tên rõ ràng, đồng bộ cả
  `garden-oracle-data.js` và `garden-oracle-profiles.js`:
  - id62 Queen of Swords: `Cắt Cành Che Nắng / Cắt Cành Cần Nắng` →
    `Rạch Gió Mở Lối / Rạch Gió Thành Vách` (ảnh không có cành; có một đường
    gió sáng sắc, mở lối hoặc thành vách ngăn).
  - id66 Three of Pentacles: `Nhiều Hạt Vun Luống` →
    `Chung Rễ Vun Luống` (ảnh chỉ có một Hạt trên mạng rễ hội tụ; tên Khép
    `Tự Vun Một Mình` giữ nguyên).
  - id74 Page of Pentacles: `Tập Nâng Từng Đồng / Muốn Quả Chưa Gieo` →
    `Chạm Mầm Hiện Thực / Mơ Quả Chưa Gieo` (ảnh không có tay/chân hay động
    tác nâng; Hạt đang chạm tới một mầm/khoáng sáng nằm trong rễ đất).
- Rà lại riêng id47 Knight of Cups: file hiện tại vẽ một Hạt nguyên vẹn dưới
  vòm mưa, không có ngựa/người cưỡi và rất hợp `Mang Mưa Đến Hẹn`. Vì vậy giữ
  artwork, bỏ cờ lỗi cũ bằng cách đổi tên
  `seed-47-ky-si-mang-mua-den-hen-NEEDS-REDO-v01.png` thành
  `seed-47-ky-si-mang-mua-den-hen-v01.png`. Bộ nguồn trong Downloads vẫn đủ
  78/78; thao tác này ở ngoài repo nên không nằm trong commit Git.
- Không đổi `bloom`/`closed`, `coreStory`, `visualMotif`, semantic profile,
  `garden-oracle-synthesis.js`, prompt ảnh hay `index.html` trong pass này.
  Filename nguồn tiếp tục là nhãn vận hành theo convention
  `seed-{id}-{slug}-v01.png`; không ép slug cũ chạy theo tên HTML mới.

## Oracle — đổi tên ngắn cho toàn bộ 78 lá, tối đa 4 âm tiết (13/7/2026)

- Sau khi hoàn tất nội dung + ảnh cho đủ 78/78 hạt, Ali quyết định đặt lại
  tên bài (`openName`/`closedName`, tức `gardenOpen`/`gardenClosed` trong
  `garden-oracle-data.js`) — vì số thứ tự và trạng thái Nở/Khép sẽ do lớp
  HTML tự render riêng, tên không cần mang cả câu mô tả dài như trước
  (vd "Hạt để gió xuyên qua nỗi đau thật" → "Gió Xuyên Nỗi Đau").
- Quy tắc chốt cùng Ali: tối đa **4 âm tiết** (đếm theo mỗi tiếng Việt,
  không phải cụm từ), có thể bỏ chữ "Hạt" hoặc chuyển hẳn sang tên dạng
  hành động; dùng tên dài hiện tại làm cảm hứng, không bịa ý mới.
- Đã đổi tên cho toàn bộ 156 tên (78 Nở + 78 Khép), đồng bộ ở CẢ 2 nơi:
  `garden-oracle-data.js` (nguồn sự thật, field `gardenOpen`/`gardenClosed`)
  và `garden-oracle-profiles.js` (field `openName`/`closedName`, phải khớp
  chính xác). Thực hiện bằng script Python thay thế theo từng cặp
  (id, tên cũ, tên mới) — verify đối chiếu chuỗi cũ xuất hiện đúng 1 lần
  trước khi ghi, tránh thay nhầm/sót.
- Verify script node: 78 cards, 0 sai khác giữa 2 file, không tên nào vượt
  quá 4 âm tiết, không trùng tên mới. Grep xác nhận `index.html` chỉ đọc
  tên qua field động (`gardenOpen`/`gardenClosed`/`GARDEN_ORACLE_CARDS`),
  không hardcode chuỗi tên cũ nào — đổi tên không phá vỡ gì đang chạy.
  Bloom/closed (câu ritual dài) và coreStory/visualMotif/profile GIỮ
  NGUYÊN, chỉ đổi 2 field tên.
- Vì đây là một pass kỹ thuật áp dụng đồng loạt lên cả 2 file cho toàn bộ
  5 khối cùng lúc (không tách được theo suit như lúc viết nội dung), gộp
  thành 1 commit duy nhất thay vì 5 commit riêng.
- Cập nhật docblock đầu file của cả `garden-oracle-data.js` và
  `garden-oracle-profiles.js` ghi rõ quy tắc ≤4 âm tiết cho các lần đổi
  tên sau này.

## Oracle — soát lại tên theo đúng logic "hạt không có tay chân" (13/7/2026)

- Ali review danh sách 78 tên và chỉ ra: hạt bồ công anh là chủ thể xuyên
  suốt, nó KHÔNG "đi" — chỉ có các hành động Bay/rời đi/bay đi/đáp/chạm
  đất/vướng/cản... Mọi tên còn ngụ ý tay-chân-mắt-tai (đứng, bịt tai, bịt
  mắt, giữ chân, nhiều tay, đào, uống, ngoảnh mặt) là sai logic chủ thể,
  cần sửa toàn bộ 78 lá chứ không chỉ mấy lá Ali nêu ví dụ.
- Áp dụng đúng 5 lá Ali chỉ rõ (High Priestess, Emperor, Lovers, Chariot,
  Strength) + tự rà thêm 10 lá khác dính lỗi tay/chân/mắt/tai (Hierophant,
  Justice, Four/Seven/Nine of Wands, Four/Nine of Cups, Two of Swords,
  Three/Seven of Pentacles) — tổng 15 lá / 20 field đổi tên. Không đụng
  các lá Major còn lại (10, 12–21) vì soát kỹ không thấy lỗi tương tự,
  tránh xáo trộn không cần thiết chỉ để đổi giọng văn.
- Ali cho thêm ví dụ The Moon (id18): tên cũ "Qua Miền Sương Trăng / Lạc
  Trong Trăng Giả" dùng chữ "Trăng" nhưng ảnh thật KHÔNG hề vẽ mặt trăng
  — chỉ có sương mờ, hạt phát sáng, vài bóng mờ ảo xa xa (đã xem lại ảnh
  `seed-18-hat-qua-mien-suong-trang-v01.png` để xác nhận). Đổi thành "Ánh
  Trong Sương Bạc / Sương Giăng Mờ Lối" — khớp đúng thứ đang hiện trên ảnh.
  Đây là một loại lỗi khác: tên đúng ngữ pháp nhưng nhắc tới vật thể không
  có trong hình.
- Sau đó Ali cho thêm 1 lần sửa nữa cho The Hermit (id9): "Đèn Gọi Từ Xa /
  Cô Tĩnh Không Lối" → "Bay Theo Ánh Sáng / Đèn Không Rọi Đến".
- Toàn bộ áp dụng bằng script Python verify-trước-khi-ghi (đếm đúng 1 lần
  xuất hiện chuỗi cũ) lên cả `garden-oracle-data.js` và
  `garden-oracle-profiles.js`, sau đó verify lại bằng node: 78 cards, 0 sai
  khác giữa 2 file, 0 tên vượt quá 4 âm tiết, 0 tên trùng.
- Nhân dịp này Ali cũng nhắc: "cần xem đủ 78 ý, và hình" — đã tranh thủ
  spot-check thêm vài lá dễ dính lỗi "tên nhắc vật không có trong ảnh"
  (The Star id17 — có ánh sao thật trong ảnh, đúng; Ten of Cups id45 —
  vòng cung giọt sương đóng vai cầu vồng, chấp nhận được; Ace of Wands
  id22 — ngọn lửa thật sự hiện diện ở lõi hạt, đúng). Chưa soát hết 78/78
  ảnh (chi phí lớn), nên nếu Ali muốn rà tiếp các suit còn lại thì làm tiếp
  ở phiên sau.
- Đồng thời hoàn tất việc còn treo từ trước: bộ Đất (Pentacles) đã có đủ
  14 ảnh trong `Dandelion Oracle_ Pentacles`, đã xem từng ảnh đối chiếu
  visualMotif rồi đổi tên file theo đúng convention
  `seed-{id}-{slug}-v01.png` (Ace→King, id64–77).

## Oracle — sửa lại lần 2: bớt nhân cách hoá Kỵ sĩ + khoá đúng khung viền (13/7/2026)

- Ali tạo thử 2 ảnh Kỵ sĩ Lửa/Nước theo prompt fix lần 1 (bỏ ngựa) — phản
  hồi: (1) "nhân cách hoá 1 cách quá mức rồi" — ảnh ra hẳn một sinh vật
  hình người/côn trùng với tay chân, khớp nối rõ, tư thế hành động quá
  kịch tính, không còn đọc ra là hạt bồ công anh; (2) "sai cấu trúc" —
  khung viền hoa văn góc thẻ bài đổi hẳn kiểu (bùng sáng/vỏ sò) khác với
  hoa văn dây-lá kim tuyến dùng xuyên suốt bộ.
- Bài học: lần fix 1 dùng cụm "puffed pappus head and two slender
  fiber-limbs" — quá cụ thể về giải phẫu, khiến model vẽ hẳn tay chân có
  khớp. Fix lần 2: quay về MỘT hạt bồ công anh duy nhất, KHÔNG nhân hoá
  (no visible limbs/arms/legs/joints), chỉ nghiêng/gập thân + vệt mờ
  chuyển động để gợi tốc độ — giống cách các lá số (không nhân hoá) trong
  bộ đã truyền tải chuyển động mà không cần cho hạt "cơ thể". Đồng thời
  thêm câu khoá khung viền: "same fine gold vine-and-leaf corner
  scrollwork frame used throughout this deck — do not invent a different
  border pattern" vào mọi prompt Kỵ sĩ.
- Sửa lại `visualMotif` cho cả 4 lá Kỵ sĩ (id 33, 47, 61, 75) trong
  `garden-oracle-profiles.js`, đồng bộ cả 2 file prompt
  (`ORACLE-ASSET-PROMPTS-FIRE-WATER.md`, `ORACLE-ASSET-PROMPTS-AIR-EARTH.md`).
  Lưu ý Page/Queen/King (đã nhân hoá nhẹ, có ảnh Ali khen) GIỮ NGUYÊN,
  không đụng — vấn đề chỉ ở Kỵ sĩ.
- Đã cập nhật ghi nhớ dài hạn `oracle-court-card-no-horse` với bài học lần
  2 này (tránh lặp lại việc over-personify khi làm Kỵ sĩ Khí/Đất hoặc bất
  kỳ lá nào sau này).
- Việc kế tiếp: Ali tạo lại ảnh Kỵ sĩ Lửa (seed-33) và Kỵ sĩ Nước (seed
  Cups Knight, id47, chưa generate) bằng prompt mới nhất; Khí/Đất Kỵ sĩ
  (id61, 75) áp dụng luôn từ đầu.

## Oracle — sửa design 4 lá Kỵ sĩ: bỏ ngựa, giữ hạt bồ công anh là chủ thể (13/7/2026)

- Ali review ảnh Kỵ sĩ Lửa (seed-33) đã tạo: prompt cũ mô tả "a small
  horse-and-rider silhouette" khiến ảnh ra MỘT con ngựa + MỘT người cưỡi
  tách biệt — ngựa lấn át, hạt bồ công anh không còn là chủ thể rõ ràng.
  Ali thích cách nhân hoá ở lá King of Wands (seed-35, hạt có "đầu tơ xù +
  hai nhánh tơ như tay chân" cầm đuốc) và muốn Kỵ sĩ theo đúng phong cách
  đó — không tách ngựa riêng, chính hạt vừa là người cưỡi vừa là "ngựa".
- Sửa `visualMotif` trong `garden-oracle-profiles.js` cho cả 4 lá Kỵ sĩ:
  id 33 (Knight of Wands), 47 (Knight of Cups), 61 (Knight of Swords), 75
  (Knight of Pentacles) — đổi "hình dáng cưỡi ngựa nhỏ..." thành "hình dáng
  hạt bồ công anh được nhân hoá — đầu tơ xù cùng hai nhánh tơ mảnh như tay
  chân, không có ngựa hay vật cưỡi riêng biệt" + giữ nguyên motif hành động
  đặc trưng (lao nhanh/xé mây/bước đều...). `openName`/`closedName`/`coreStory`
  (chữ "kỵ sĩ" chỉ là tên gọi/ẩn dụ, không phải chỉ định hình ảnh) giữ
  nguyên, không đổi.
- Đồng bộ sửa cả `ORACLE-ASSET-PROMPTS-FIRE-WATER.md` (id 33, 47) và
  `ORACLE-ASSET-PROMPTS-AIR-EARTH.md` (id 61, 75): prompt tiếng Anh đổi
  "A small horse-and-rider silhouette..." → "A dandelion seed personified
  in the same style as the other court cards — ... no separate horse or
  mount, the seed itself is both rider and runner/walker" + thêm câu chặn
  rõ ở cuối "no separate horse or mount — the dandelion seed itself must
  stay the clear, unmistakable central subject".
- **Việc kế tiếp: ảnh seed-33 (Knight of Wands, Lửa) đã tạo cần Ali tạo lại
  bằng prompt mới** (trong `ORACLE-ASSET-PROMPTS-FIRE-WATER.md`, batch 2)
  trước khi rename/dùng chính thức — 13 ảnh Lửa còn lại không cần đổi. Áp
  dụng bài học này khi tạo ảnh Khí + Đất (Kỵ sĩ Khí/Đất dùng prompt mới
  ngay từ đầu, chưa generate nên không cần làm lại).

## Oracle — 28 prompt Imagen cho khối Khí + Đất (13/7/2026)

- Viết `ORACLE-ASSET-PROMPTS-AIR-EARTH.md`: 28 prompt tự nhiên (id 50-77,
  14 Khí + 14 Đất), chia 4 batch ~7 ảnh/batch, cùng văn phong với
  `ORACLE-ASSET-PROMPTS-MAJOR.md` và `ORACLE-ASSET-PROMPTS-FIRE-WATER.md`.
- Dựng trực tiếp từ `visualMotif`/`coreStory` đã có trong
  `GARDEN_ORACLE_PROFILES.suits.Swords`/`.Pentacles`. Ánh sáng đặc trưng
  nguyên tố giữ nhất quán xuyên suốt mỗi khối: Khí = "pale silver-blue
  wind-trail lighting with warm amber accents" (đã dùng cho các lá Air trong
  Major); Đất = "deep mossy green-brown undertones with warm amber lighting"
  (đã dùng cho các lá Earth trong Major).
- Đây là 2 khối prompt cuối cùng — cùng với 22 Major + 28 Lửa/Nước đã có,
  tổng cộng đủ 78/78 prompt ảnh cho toàn bộ Garden Oracle.
- Việc kế tiếp: Ali tạo ảnh (qua ChatGPT), gửi lại để soát trùng
  silhouette/an toàn safe-zone, sau đó rename theo quy ước
  `seed-{id}-{slug}-v01.png`.

## Oracle — hoàn tất core-story 14 Khí + 14 Đất, ĐỦ 78/78 hạt (13/7/2026)

- **Khối Khí (Swords) hoàn tất 14/14** và **khối Đất (Pentacles) hoàn tất
  14/14** trong `garden-oracle-profiles.js` (`GARDEN_ORACLE_PROFILES.suits.Swords`
  và `.suits.Pentacles`), theo đúng trình tự rank Ace→King. Đã bỏ hẳn biến
  tạm `suitSamples` (chỉ còn `{ majors, suits }` export).
- **Toàn bộ 78/78 hạt (22 Major + 56 Minor) nay đã có đủ coreStory +
  visualMotif + hồ sơ nghĩa** — hoàn tất giai đoạn viết văn bản theo quyết
  định của Ali (ưu tiên viết đủ nội dung trước, xử lý an toàn vùng sáng/tối
  ảnh bằng overlay HTML ở bước sau).
- Verify bằng script node: 5 mảng đúng độ dài (22+14+14+14+14=78); id 0-77
  liên tục, không trùng; domain khớp 100% `SUIT_DOMAIN`/`MAJOR_DOMAIN` đã
  khoá trong `garden-oracle-synthesis.js` (Swords→'decision', Pentacles→'work');
  dữ liệu tarot/gardenOpen/gardenClosed/element khớp 100% `GARDEN_ORACLE_CARDS`;
  không trùng visualMotif trong toàn bộ 78 hạt; word-count coreStory của các
  hạt mới trong khoảng hợp lý (~40-110 chữ).
- movement vocabulary mở rộng thêm cho Khí: cutting, reflecting, concealing,
  confessing, dawning, watching, pruning, judging. Cho Đất: juggling,
  seeking, practicing, flourishing, plodding.
- Header docblock của `garden-oracle-profiles.js` đã cập nhật bảng trạng
  thái theo khối (tất cả ĐỦ 14/14 hoặc 22/22) và tài liệu vocabulary mới.
- Việc kế tiếp (chưa làm, chờ Ali xác nhận): viết prompt Imagen dạng tự
  nhiên cho 28 hạt Khí+Đất (tương tự `ORACLE-ASSET-PROMPTS-FIRE-WATER.md`),
  có thể chia 4 batch ~7 ảnh để giữ nhất quán phong cách.

## Oracle — hoàn tất core-story 14 Nước (13/7/2026)

- **Khối Nước (Cups) hoàn tất 14/14** trong `garden-oracle-profiles.js`
  (`GARDEN_ORACLE_PROFILES.suits.Cups`), theo đúng trình tự rank Ace→King.
  Verify bằng script: domain khớp 100% `SUIT_DOMAIN.Cups` ('love') đã khoá
  trong `garden-oracle-synthesis.js`; dữ liệu khớp 100% `GARDEN_ORACLE_CARDS`;
  không trùng id/visualMotif với 36 hạt đã có (50/78 hạt đã xong).
- movement vocabulary mở rộng thêm 5 giá trị: sharing, gathering, noticing,
  remembering, savoring.
- Ali yêu cầu viết prompt Imagen cho cả 2 khối Lửa + Nước cùng lúc (28 ảnh),
  chia 4 batch ~7 ảnh để giữ nhất quán phong cách khi generate — xem file
  `ORACLE-ASSET-PROMPTS-FIRE-WATER.md`.
- Việc kế tiếp (chưa làm): checkpoint 14 Khí, 14 Đất — vẫn mỗi khối một
  commit riêng.

## Oracle — rename 22 ảnh Major + hoàn tất core-story 14 Lửa (13/7/2026)

- Ali tạo 22 ảnh (qua ChatGPT image, không phải Google Imagen — filename gốc
  `ChatGPT Image ...`) trong `~/Downloads/AnhLi_Dandelion Oracle/`, đúng thứ
  tự 22 prompt trong `ORACLE-ASSET-PROMPTS-MAJOR.md`. Claude request quyền
  truy cập folder này (không phải workspace project), xem từng ảnh, đối
  chiếu visual motif để xác nhận thứ tự khớp 100% với id 0–21, rồi rename
  bằng script Python thành `seed-{id}-{slug}-v01.png` (giữ .png vì đây là
  bản master lossless; webp xuất riêng lúc lên site, theo đúng
  ORACLE-ASSET-PROMPT.md). Không commit ảnh vào repo — folder này nằm ngoài
  workspace project, chỉ rename tại chỗ.
- Ali quyết đi thẳng bước 5 (viết văn bản 22+56) mà bỏ qua lo ngại safe zone
  ở 2/5 ảnh mẫu — xử lý bằng overlay HTML sau, không regenerate ảnh.
- **Khối Lửa (Wands) hoàn tất 14/14** trong `garden-oracle-profiles.js`
  (`GARDEN_ORACLE_PROFILES.suits.Wands`), theo đúng trình tự rank Ace→King.
  Verify bằng script: domain khớp 100% `SUIT_DOMAIN.Wands` ('action') đã khoá
  trong `garden-oracle-synthesis.js`; tarot/openName/closedName/element khớp
  100% `GARDEN_ORACLE_CARDS`; không trùng id hay visualMotif với 22 Major đã
  có trước đó (36 hạt đã viết / 78).
- movement vocabulary mở rộng thêm 5 giá trị khi làm khối này: lifting,
  racing, carrying, radiating, guiding — ghi rõ trong header file.
- Việc kế tiếp (chưa làm): viết prompt Imagen cho 14 Lửa (nếu Ali muốn ảnh
  ngay) và bắt đầu checkpoint 14 Nước — mỗi khối vẫn một commit riêng, không
  gộp.

## Oracle — 22 prompt Imagen cho khối Major (12/7/2026, khuya)

- File mới `ORACLE-ASSET-PROMPTS-MAJOR.md`: 22 prompt Imagen (văn phong tự
  nhiên, không chia field — theo đúng format 5 mẫu Ali đã duyệt trước đó),
  dựng từ `visualMotif`/`coreStory` đã viết trong `garden-oracle-profiles.js`.
  Ali sẽ tự chạy từng prompt qua Imagen, không cần Claude generate ảnh trực
  tiếp trong phiên này.
- Ali quyết: bỏ qua lo ngại vùng sáng chạm safe zone ở 2/5 ảnh mẫu trước đó —
  xử lý bằng shadow/glow overlay ở lớp HTML khi lên UI thật, không regenerate.
- Bước kế tiếp (chưa làm): Ali chạy 22 ảnh → gửi lại contact sheet để soát
  trùng silhouette/safe zone, song song có thể bắt đầu checkpoint văn bản cho
  14 Lửa nếu Ali muốn tiếp tục ngay.

## Oracle — 22 Major hoàn tất core-story + hồ sơ nghĩa (12/7/2026, khuya)

- Ali xem 5 ảnh mẫu (Imagen) → duyệt: 2 card (Lửa/Nước) có vùng sáng chạm safe
  zone, nhưng Ali quyết xử lý bằng shadow/glow overlay ở lớp HTML UI thay vì
  regenerate ảnh — không cần sửa prompt/ảnh ở bước này.
- Ali chọn đi thẳng vào bước 5 của trình tự (`ORACLE-CONTENT-SYSTEM.md` §7):
  viết đủ **văn bản** (không phải ảnh) cho 22 Major + 56 Minor. Đã hoàn tất
  khối đầu tiên — **22/22 Major** — trong `garden-oracle-profiles.js`
  (`GARDEN_ORACLE_PROFILES.majors`), mỗi lá đủ `coreStory`, `visualMotif`,
  `profile.{domain, movement, storyStage, need, gift, risk, action}`.
- Đã verify bằng script (node, không chỉ đọc mắt): domain của cả 22 Major khớp
  100% với `MAJOR_DOMAIN` đã khoá trong `garden-oracle-synthesis.js` (0
  mismatch); `tarot`/`openName`/`closedName`/`element` của cả 22 khớp 100%
  với `GARDEN_ORACLE_CARDS` trong `garden-oracle-data.js` (0 mismatch).
- 4 mẫu Minor cũ (Wands id24, Cups id43, Swords id55, Pentacles id70) giữ
  nguyên trong `suitSamples`, đánh dấu rõ PENDING 1/14 — **chưa** viết đủ 56
  Minor, đây là việc của 4 checkpoint kế tiếp (mỗi nguyên tố 14 hạt, một
  commit riêng), đúng nguyên tắc không gộp cả Oracle vào một phiên.
- storyStage cho Major dùng vocabulary riêng theo hành trình Fool's Journey
  (activation, intuition, growth, structure, tradition, choice, drive,
  composure, withdrawal, turning, reckoning, suspension, ending, balance,
  entanglement, collapse, hope, uncertainty, joy, awakening), cố tình tái
  dùng 'spark' (lá 0) và 'culmination' (lá 21) làm hai đầu nối với vocabulary
  numerology của Minor. movement mở rộng thêm 7 giá trị mới so với 5 mẫu ban
  đầu (listening, choosing, steering, turning, balancing, suspending,
  entangling) — đều ghi rõ trong header file để 56 hạt Minor còn lại tái dùng
  trước khi thêm mới.
- Việc kế tiếp (checkpoint riêng, chưa làm): 14 Lửa, 14 Nước, 14 Khí, 14 Đất
  theo cùng schema; sau đó mới tính nối `garden-oracle-profiles.js` vào engine
  tổng hợp hoặc `index.html`.

## Oracle — schema câu chuyện lõi + hồ sơ nghĩa, 5 hạt mẫu (12/7/2026, khuya)

- Bước 2 của trình tự triển khai trong `ORACLE-CONTENT-SYSTEM.md` §7: "Chốt
  schema mới bằng 3–5 hạt mẫu; chưa viết cả 78 ngay". File mới, không đụng
  `garden-oracle-data.js` / `garden-oracle-synthesis.js` / `index.html`.
- File mới `garden-oracle-profiles.js` (DRAFT, chưa nạp vào `index.html`):
  định nghĩa schema cho `coreStory` (đoạn kể chuyện sâu hơn bloom/closed hiện
  có, không copy nguyên văn) và `visualMotif`, cộng hồ sơ nghĩa có cấu trúc
  `profile.{domain, movement, storyStage, need, gift, risk, action}` để engine
  tổng hợp sau này đọc quan hệ giữa 3 hạt mà không cần NLP hay copy câu chữ.
  `domain` tái dùng đúng 5 giá trị đã có trong `garden-oracle-synthesis.js`
  (love/work/decision/action/inner) để không phải viết lại engine hiện có.
  `movement`/`storyStage` là vocabulary mới, có ghi rõ trong file để 73 hạt
  còn lại theo cùng quy tắc (storyStage suy từ rank: Ace→spark…King→mastery,
  Major gán tay).
- 5 hạt mẫu đã viết đầy đủ: `The Fool`/id 0 (Major, Air) — trùng đúng hạt
  trong ảnh reference "Hạt gieo vào gió" Ali đã chọn; `Three of Wands`/id 24
  (Lửa); `Eight of Cups`/id 43 (Nước); `Six of Swords`/id 55 (Khí); `Seven of
  Pentacles`/id 70 (Đất). Cố tình không chọn toàn lá Ace — chọn rank khác nhau
  (Ace/3/6/7/8) để test schema có generalize được không, không chỉ đúng với
  trường hợp dễ nhất.
- File mới `ORACLE-ASSET-SAMPLES.md`: điền sẵn 5 master prompt đầy đủ (theo
  đúng khung câu của `ORACLE-ASSET-PROMPT.md`, không đổi cấu trúc prompt gốc)
  cho 5 hạt trên, kèm tên file gợi ý và checklist duyệt contact-sheet 0°/180°.
  Sẵn sàng để Ali hoặc một phiên tạo ảnh khác chạy từng request riêng.
- Nghệ thuật: dùng art direction đã chốt — botanical 3D huyền ảo, card 4:5,
  cân hai đầu, không chữ; Nở dùng ảnh thẳng, Khép xoay cùng ảnh 180°.
- Chưa làm: chưa generate ảnh thật (cần Ali đính kèm card "Hạt gieo vào gió"
  v2 làm style reference cho phiên tạo ảnh), chưa mở rộng ra 78, chưa nối
  `garden-oracle-profiles.js` vào engine tổng hợp hay `index.html`. Đây vẫn là
  bước schema + mẫu, chờ Ali duyệt độ rõ trước khi đi tiếp theo trình tự ở
  `ORACLE-CONTENT-SYSTEM.md` §7 (bước 3: prototype artwork → bước 4: Ali
  duyệt → bước 5: mở rộng theo đợt 22 + 4×14).

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

## Chốt phiên Oracle 13/7/2026 — trạng thái tới thời điểm hiện tại

- **Nội dung + hồ sơ nghĩa:** đủ 78/78 hạt (22 Major + 4 suit × 14) có
  `coreStory`/`visualMotif`/`profile` trong `garden-oracle-profiles.js`,
  khớp domain với `garden-oracle-synthesis.js` (không đổi file này).
- **Ảnh:** đủ 78/78 đã sinh và đổi tên đúng convention
  `seed-{id}-{slug}-v01.png` trong từng thư mục con của
  `AnhLi_Dandelion Oracle` (Major/Wands/Cups/Swords/Pentacles) — riêng
  `seed-47-ky-si-mang-mua-den-hen-NEEDS-REDO-v01.png` (Knight of Cups)
  vẫn đang treo ở bản cũ kiểu ngựa-người-cưỡi, chờ Ali tạo lại theo prompt
  đã fix trong `ORACLE-ASSET-PROMPTS-FIRE-WATER.md`.
- **Tên ngắn (`gardenOpen`/`gardenClosed`/`openName`/`closedName`):** đã
  qua 2 vòng chỉnh — (1) rút toàn bộ 156 tên về ≤4 âm tiết; (2) soát và
  sửa 16 lá dính lỗi logic chủ thể (hạt không tay chân) hoặc tên nhắc vật
  không có trong ảnh (Moon), cộng 1 lần chỉnh riêng cho Hermit. Verify
  node xác nhận: 78/78 khớp giữa `garden-oracle-data.js` và
  `garden-oracle-profiles.js`, không tên nào >4 âm tiết, không trùng tên.
- **Còn treo lại cho phiên sau (nếu Ali muốn tiếp tục):**
  - Regenerate ảnh Knight of Cups (id47) rồi đổi tên file theo đúng
    convention.
  - Rà nốt phần còn lại của 78 ảnh để tìm thêm trường hợp "tên nhắc vật
    không có trong hình" giống lỗi Moon (mới spot-check Star/Rainbow/
    Ace of Wands, cả 3 đều ổn — chưa xem hết).
  - `index.html` (UI hiển thị) chưa được rà lại sau đợt đổi tên này —
    nên grep nhanh `gardenOpen`/`gardenClosed` một lần nữa trước khi coi
    Oracle là "xong hẳn", dù lần đổi tên trước đã xác nhận UI đọc field
    động, không hardcode.
- **Commit đã tạo trong phiên này (chưa push — cần Ali chạy `.command`):**
  `13a1dba fix(oracle): sửa tên lá theo đúng logic hạt (không tay chân) + fix Moon/Hermit`,
  `afea277 feat(oracle): đổi tên ngắn cho toàn bộ 78 lá (tối đa 4 âm tiết)`,
  cùng các commit nội dung/prompt/Kỵ sĩ trước đó cùng phiên (xem `git log`
  phía trên các mục này).

## Commit chính liên quan
- [feat: seed-bag oracle video reveal + Chapter II bloom background on enter](https://github.com/AliH86/anhli-portfolio/commit/95d55c7)
- [fix(music): mobile — ẩn dứt điểm dĩa 3D bên phải + gọn tên album dài](https://github.com/AliH86/anhli-portfolio/commit/532269c)
- [fix(music): mobile Now Playing gọn thành floating bar, bỏ viền dĩa than lỗi](https://github.com/AliH86/anhli-portfolio/commit/19ee5e2)
- [fix: stabilize mobile playlist layout](https://github.com/AliH86/anhli-portfolio/commit/997b604)
- [feat: refine dandelion portfolio and music room](https://github.com/AliH86/anhli-portfolio/commit/6b88c17)
- [Thêm album Di Sản](https://github.com/AliH86/anhli-portfolio/commit/8a83b11)
- [Set hero album to Một Tần Số Khác](https://github.com/AliH86/anhli-portfolio/commit/4291786)

## Chỉnh giọng Việt + nhịp mở Oracle — 14/7/2026 (approved/live)

- Viết lại trực tiếp sáu hạt xuất hiện trong ảnh/video review, sau đó thay
  toàn bộ 156 tên Nở/Khép bằng hệ tên tiếng Việt nói thẳng nghĩa. Bỏ giới hạn
  bốn âm tiết vì giới hạn này từng tạo các cụm tối nghĩa như “Nhận Ra Mưa
  Mời”; `garden-oracle-data.js` và `garden-oracle-profiles.js` vẫn đồng bộ.
- Viết lại engine tổng hợp theo câu có chủ thể và hành động rõ; sửa lỗi cắt
  câu ở dấu phẩy làm sinh ra “Hôm nay, chỉ cần trước khi phán xét ai đó”. Bỏ
  nhãn nguyên tố/cung ở cuối lời riêng, đồng thời viết lại bối cảnh tuần
  13–19/7 thành việc cụ thể, không dùng “mang theo/đủ yên/bền lòng” mơ hồ.
- Flow lật bài giữ hai quyết định riêng: lần một chỉ lật so le 1–2–3 và đứng
  yên ở mặt bài. Sau khi lật xong, một lời báo ngắn hiện dần dưới ba lá, nói
  đúng số hạt Nở/Khép và gợi không khí chung; người đọc tự bấm “Mở diễn giải
  chi tiết” mới chuyển vào phần bên trong. Trong kết quả, Nở/Khép là tag có
  chú thích riêng và mỗi artwork có thể bấm để phóng lớn; Escape/backdrop đóng
  lớp zoom trước khi đóng modal.
- Màn mở đầu Oracle được art-direct lại trên chính video túi hạt: khung vườn
  đêm nhiều lớp sáng, halo thở chậm sau túi, viền trong tiết chế, lời dẫn có
  phân cấp, CTA dạng dấu ấn và ghi chú nghi thức. Không thêm asset mới; mobile
  có tỷ lệ chữ/khung/CTA riêng và reduced-motion tắt nhịp halo.
- Chốt lại ngôn ngữ nghi thức theo trục gió–hạt–bàn tay: gió đi qua túi hạt,
  người xem “hít sâu một hơi, đón hạt”, hạt hiện vào tay; bỏ từ lật/mở trong
  nhịp này. Lời dẫn phía trên đổi nội dung sau khi ba hạt hiện, và preview
  Nở/Khép dùng giọng văn mềm hơn nhưng vẫn nói rõ số lượng/trạng thái.
- Result view được nới thành hai khối thoáng hơn, seed card và synthesis hiện
  lệch nhịp, câu chính/gợi ý quan trọng có bold chọn lọc. Zoom artwork dùng
  layout hai cột: ảnh + core story + chỉ dẫn quan sát + giải nghĩa riêng cho
  trạng thái Nở/Khép và hành động cụ thể; mobile xếp dọc và cuộn trong modal.
- QA: `node --check` qua đủ bốn file Oracle + script inline calendar; ma trận
  synthesis chuẩn qua 80 tổ hợp local/live, đủ 78 profile; kiểm tra mở rộng
  toàn bộ ngày 13–20/7 giữ lời tổng hợp trong ngưỡng 90–140 chữ; `git diff
  --check` sạch. Ali duyệt, commit `6fe9e98` và đã push đồng bộ `origin/main`.

## Oracle — tách tên thật của lá khỏi trạng thái Nở/Khép (14/7/2026, prototype local)

- Ali xác định đúng vấn đề nền: 156 tên đang hiển thị thực chất là tiêu đề diễn
  giải của trạng thái, không phải danh tính nguyên mẫu của 78 lá. Các cụm cụ
  thể như “Nhìn Lại Cuộc Cãi Vã” khóa lá vào một tình huống và làm hệ bài khó
  mở rộng thành bộ vật lý hoặc cho reader tự nội suy theo ngữ cảnh.
- Chốt kiến trúc mới: mỗi lá có một `cardName` cố định + `essence` + keyword
  cốt lõi; Nở/Khép chỉ là hai hướng vận động, mỗi hướng có `title`, keyword,
  `meaning` và `invitation`. Tên Tarot vẫn chỉ là đối chiếu nội bộ.
- Thêm `garden-oracle-identities.js` làm nguồn dữ liệu dùng chung tương lai cho
  website, sách hướng dẫn và lá vật lý. Prototype cố ý chỉ gồm 6 lá: id 0, 26,
  39, 54, 64, 76; trong đó 39/54/76 là đúng ba lá Ali gửi ảnh để review.
- UI prototype hiển thị số + tên thật + tag Nở/Khép + tiêu đề trạng thái +
  keyword. Zoom đổi “Câu chuyện của hạt” thành “Linh hồn của lá” khi đã có
  identity, rồi tách riêng phần “Khi hạt Nở/Khép” và lời mời. 72 lá chưa có
  identity vẫn dùng giao diện cũ, không tự suy diễn hoặc đổ dữ liệu hàng loạt.
- Điểm dừng an toàn: chạy QA local rồi Ali duyệt hierarchy/voice của 6 lá;
  chỉ sau đó mới mở rộng lần lượt 22 Major + bốn nhóm 14 lá.

### Ali duyệt hệ họ + mở rộng 22 Hạt Hành Trình

- Ali duyệt hierarchy/tên mẫu và chốt hướng Việt hoá bốn nguyên tố. Giữ
  Fire/Water/Air/Earth cùng Wands/Cups/Swords/Pentacles làm bộ xương nội bộ,
  nhưng người đọc chỉ thấy **Nắng – Sương – Gió – Đất**. Câu định hướng hình
  ảnh: “Nắng đánh thức – Sương nuôi dưỡng – Gió mang đi – Đất đón lại”.
- 22 Major gọi công khai là **Hạt Hành Trình**. Đã viết đủ 22 tên thật, essence
  rộng và ba nhóm keyword cốt lõi/Nở/Khép; không dùng tình huống cụ thể làm
  danh tính. Năm Minor mẫu id 26/39/54/64/76 vẫn được giữ để review xuyên họ.
- UI thêm tên họ cạnh số hạt ở mặt lá, danh sách kết quả và zoom, ví dụ
  `Hạt số 54 · Gió`; không lộ tên Tarot hay tên suit truyền thống.
- Tại checkpoint đầu, identity local đạt 27: đủ id 0–21 và năm Minor mẫu. Bước kế tiếp
  theo thứ tự là 14 Hạt của Nắng → 14 Sương → 14 Gió → 14 Đất, mỗi khối phải
  test trùng tên/keyword và đọc biên tập trước khi sang khối sau.
- Đã hoàn tất tiếp **14 Hạt của Nắng** (id 22–35): dùng nắng, độ ấm, sức sống
  và chuyển động để giữ trường nghĩa sáng tạo/ý chí/hành động của Wands mà
  không lộ Gậy/Lửa. Tại checkpoint này identity đạt 40: 22 Hành Trình + 14 Nắng +
  bốn prototype Sương/Gió/Đất; bước tiếp theo là đủ 14 Hạt của Sương.
- Đã hoàn tất **14 Hạt của Sương** (id 36–49): mở rộng Cups thành trường của
  tiếp nhận, ký ức, thân mật, mất mát, trực giác và trưởng thành cảm xúc; không
  đồng nhất toàn bộ Sương với tình yêu đôi lứa. Tại checkpoint này identity đạt 53;
  bước tiếp theo là đủ 14 Hạt của Gió.
- Đã hoàn tất **14 Hạt của Gió** (id 50–63): giữ chiều sâu tư tưởng, sự thật,
  quyết định, chiến lược và xung đột của Swords nhưng không gọi thẳng
  “cãi vã/đau khổ/lo âu” là bản chất duy nhất của lá. Tại checkpoint này identity
  là 66; còn một khối cuối là 14 Hạt của Đất.
- Đã hoàn tất **14 Hạt của Đất** (id 64–77): thân thể, kỹ năng, công việc,
  nguồn lực, trao đổi, di sản và cách thành quả bén rễ. Không đồng nhất Đất với
  tiền bạc hoặc thành công vật chất.
- Hệ identity local nay đủ **78/78**: 22 Hành Trình + 14 Nắng + 14 Sương +
  14 Gió + 14 Đất. Mỗi lá có tên thật cố định, essence rộng 45–70 chữ, bốn
  keyword cốt lõi, ba keyword Nở và ba keyword Khép; UI vẫn giữ riêng tiêu đề
  trạng thái và lời dành cho hôm nay.
- Thêm `ORACLE-IDENTITY-REVIEW.md` làm bản đọc duyệt thuần nội dung đủ 78 lá,
  chia năm chương, không cần đọc code. File được sinh từ nguồn runtime bằng
  `scripts/build-oracle-identity-review.mjs`; Ali chỉ cần ghi chú theo số/tên
  lá, sửa nội dung ở nguồn rồi sinh lại để bản duyệt không lệch website.
- Ali bắt đầu biên tập trực tiếp bản review từ các lá 00–06. Quy luật giọng mới
  nhận ra: ưu tiên một tiểu cảnh Hạt đang chuyển động; hình ảnh hoa/gió/thân cây
  đi trước tầng nghĩa; Nở/Khép soi nhau trên cùng một hình ảnh; chấp nhận tên
  dài hơn nếu có nhạc và nhìn thấy được cảnh; cứu lại tên cũ khi hình ảnh thật
  sự đúng. Đã polish và đồng bộ ý 00–05 về source, không chép nguyên dấu `/`
  hoặc câu còn ở dạng nháp lựa chọn của Ali.
- Generator review nay từ chối ghi đè khi file đã tồn tại, trừ khi gọi rõ
  `--force`, để bảo vệ mọi chỉnh sửa trực tiếp của Ali. Trước mỗi lần sinh lại
  bắt buộc merge review → source rồi mới dùng `--force`.

### NEXT SESSION — đưa chiêm tinh vào chính mạch luận giải ba hạt

- Ali chốt vấn đề tiếp theo: phần chiêm tinh hiện có dữ liệu đúng nhưng cảm giác
  đọc vẫn bị tách khỏi ba hạt trong tay. Không được giữ mô hình “một khối nhịp
  tuần riêng + một khối ba hạt riêng” như hai bài viết đặt cạnh nhau.
- Phiên sau cần thiết kế lại synthesis để tín hiệu chiêm tinh **tác động lên
  quan hệ thật của ba identity/trạng thái**: nó đang khuếch đại hạt nào, làm
  chậm chuyển động nào, khiến xung đột nguyên tố nào nổi rõ hoặc giúp hai hạt
  nào tìm được nhịp chung. Mọi câu chiêm tinh phải truy ngược được về signal +
  profile/identity cụ thể, không được gắn chung chung sau khi luận xong.
- Vẫn giữ giới hạn an toàn: tối đa hai tín hiệu địa tâm chung, không cá nhân
  hoá, không giả vờ biết hoàn cảnh người xem. UI có thể giữ nhãn “Nhịp tuần”
  làm nguồn bối cảnh, nhưng câu chữ phải đan vào bốn nhịp luận giải của ba hạt.
- Bắt đầu phiên sau bằng audit output 10 tổ hợp đại diện: đánh dấu câu nào đang
  nói từ Hạt, câu nào từ chiêm tinh và câu nào thật sự là tương tác giữa hai
  lớp; chỉ sửa engine sau khi đã thấy rõ chỗ đang bị rời.

## Oracle — prototype nối chiêm tinh vào ba Hạt (14/7/2026, local review)

- Audit đúng 10 tổ hợp đại diện cho thấy 10/10 output cũ chỉ nối câu Hạt với
  câu chiêm tinh; chưa có câu nào xác định tín hiệu đang chạm Hạt nào. Engine
  cũ cũng luôn chọn một tín hiệu dù điểm liên quan bằng 0.
- `garden-oracle-synthesis.js` nay tạo một interaction có truy nguyên gồm
  `verb`, dạng `single/pair/whole`, `targetIds`, điểm liên quan và evidence
  domain/state/movement. Tín hiệu được chấm theo domain + trạng thái + chuyển
  động; không có liên hệ đủ rõ thì bỏ, không bịa thêm tầng chiêm tinh.
- Khoá tương thích ngữ pháp: `amplify/accelerate` chỉ chạm Hạt Nở;
  `surface/soften` chỉ chạm Hạt Khép; `slow` chỉ chạm nhóm chuyển động có nhịp
  nhanh. Gợi ý cuối ưu tiên chính Hạt vừa bị thời tiết chiêm tinh tác động.
- Phần luận giải đi theo bốn nhịp: chủ đề/trạng thái chung → quan hệ cụ thể
  giữa hai Hạt → chiêm tinh tác động đúng Hạt/quan hệ/nhịp chung → việc có thể
  làm. Nhãn “Nhịp tuần” trên UI được thu gọn thành nguồn bối cảnh; bỏ hai đoạn
  tuần riêng từng đứng cạnh bài luận ba Hạt.
- Sau vòng mẫu 640 lượt, Ali yêu cầu phải chứng minh khả thi bằng công thức và
  routine tuần. Không gian thật được khoá ở `C(78,3) × 2³ = 608.608` lượt/ngày;
  ba vị trí chưa có nghĩa riêng nên engine nay bất biến theo thứ tự rút, tránh
  tăng vô cớ thành sáu hoán vị cho cùng một bộ ba.
- Thêm `ORACLE-WEEKLY-ROUTINE.md` và
  `scripts/audit-oracle-week.mjs`. Full audit đã quét đủ **4.868.864** lượt
  của pack 8 ngày: single 2.222.120, pair 1.612.633, whole 127.543, bỏ tín
  hiệu yếu 906.568 (18,62%), 21/24 ô verb/kind được kích hoạt trong pack hiện
  tại và cả 24/24 template đều có test reachability. Full scan chạy khoảng
  76,1 giây trên runtime local, đủ nhẹ để đưa vào routine một lần mỗi tuần.
- Full audit cuối có 0 cờ kỹ thuật; độ dài 80–147 chữ. 322.172 lượt (6,62%)
  nằm ngoài dải ưu tiên 90–140 nhưng trong biên cứng 80–155. Chốt nguyên tắc:
  không cắt máy móc để đạt số chữ; routine luôn xuất mẫu ngắn nhất/dài nhất và
  một mẫu cho mỗi ô interaction để đọc tay về chủ thể, quan hệ, tác động và
  hành động.
- Sửa thêm một dị biệt nghĩa do audit phát hiện: đoạn quan hệ nay bắt buộc neo
  đúng Hạt/cặp Hạt mà chiêm tinh sắp tác động; bỏ đại từ “Nó” và các cụm giọng
  máy như “mối nối vừa hiện ra”, “đặt nhịp xuống”. Local/live đồng nhất và
  `git diff --check` sạch.
- Trạng thái: thay đổi đang ở local, chưa commit/push, chờ Ali đọc và duyệt
  giọng của các lượt mẫu trước khi publish.

## Oracle — khoá ma trận hành động Nở/Khép × chiêm tinh (14/7/2026, local)

- Ali chốt Nở/Khép là luật sẵn sàng hành động: 3 Nở = đi; 2 Nở/1 Khép = đi
  trong giới hạn; 1 Nở/2 Khép = thử nhỏ và xem lại; 3 Khép = dừng, thở, nhìn
  lại. Đây không phải thang “tích cực/tiêu cực”.
- Chuẩn hoá thành 28 policy có chiêm tinh + 4 fallback không tín hiệu. Bốn cặp
  không hợp lệ bị loại ngay từ schema: `go/surface`, `go/soften`,
  `pause/amplify`, `pause/accelerate`.
- Gợi ý cuối nay dùng `actionRhythm` và `actionPolicyKey`, nên cùng động từ
  `surface` sẽ khác rõ: một Hạt Khép chỉ yêu cầu gọi tên giới hạn trước khi đi;
  ba Hạt Khép yêu cầu chưa đẩy tiếp, thở một nhịp và nhìn lại điểm chung.
- Test nhanh 640 tổ hợp đã qua, đồng thời khoá đủ 28 policy, 4 fallback và 24
  template diễn đạt `verb/kind`. Audit tuần được bổ sung cờ tự động nếu policy
  lệch số Hạt Khép hoặc ba Khép không nói rõ `chưa/dừng/hoãn`.
- Full audit cuối đã quét đủ 4.868.864 lượt trong 103,7 giây: 0 cờ kỹ thuật,
  độ dài 80–150 chữ, 546.068 lượt (11,22%) ngoài dải ưu tiên 90–140 nhưng vẫn
  trong biên cứng. Pack hiện tại kích hoạt 29/32 policy khả dụng (28 policy có
  chiêm tinh + 4 fallback); các policy chưa xuất hiện vẫn được khóa bằng test
  cấu trúc và ma trận nhanh.
- Trạng thái: local, chưa commit/push; chờ Ali duyệt câu chữ trước khi publish.

## Oracle — pack nội dung 15–27/7/2026 (14/7/2026, local review)

- Giữ nguyên và đưa 15–19/7 qua ma trận action policy mới; đây là dữ kiện đã có
  trong pack W29 và đã qua full audit, không tạo bản forecast trùng.
- Thêm `2026-W30-approved` cho 20–27/7 gồm 12 tín hiệu/8 ngày; sau khi Ali duyệt,
  pack được chuyển sang `approved` và đặt làm `lastApprovedKey`.
- Dữ kiện đối chiếu từ Swiss Ephemeris, NASA Moon Phases và bảng aspect UTC.
  Các mốc chính: Mộc tam hợp Hải Vương/đối đỉnh Diêm Vương 20/7, Trăng thượng
  huyền 21/7, Mặt Trời vào Sư Tử 22/7, Thuỷ lục hợp Kim 24/7, cụm Mặt Trời đối
  Diêm Vương và Sao Thổ bắt đầu nghịch hành ở ngày đệm 27/7.
- Full audit W30 đã quét 4.868.864 lượt trong 101,3 giây: 0 cờ, 80–152 chữ,
  bỏ 1.147.896 tín hiệu yếu (23,58%), single 2.079.312, pair 1.496.967, whole
  144.689. Pack kích hoạt 18/24 ô verb/kind và 25/32 action policy.
- Thêm `ORACLE-CONTENT-REVIEW-2026-07-15-27.md` để Ali đọc toàn bộ forecast
  15–27/7 theo ngày và sửa trực tiếp bằng tag `verb/domain`.
- Engine chọn pack approved theo `dateKey`: 15–19/7 vẫn dùng W29, từ 20/7 dùng
  W30; ngày cũ không mất forecast khi một tuần mới được publish.
- Trạng thái: Ali đã duyệt, chuẩn bị commit/push.

## Oracle — chốt cách đọc và sửa chuyển cảnh Music (16/7/2026, Ali duyệt)

- Sửa luồng “Bước vào Cái Sạp nhạc”: threshold được cố định thành lớp phủ
  toàn viewport trong lúc video bloom chạy; Music/Gate được đặt sẵn phía sau,
  sau đó cửa trập mở để lộ cùng một khung. Không còn hiện tượng threshold rơi
  xuống, Music xuất hiện thành nhịp rời rồi mới đẩy sang Gate. Desktop/mobile
  đều đã kiểm tra; reduced motion vẫn dùng nhịp ngắn.
- Oracle bên ngoài mỗi hạt chỉ còn “Điều có thể đang xảy ra”. “Một bước nhỏ để
  thử” và câu mở “Để nuôi phần đang Nở/Để hiểu phần đang Khép” chỉ xuất hiện
  trong phần xem kỹ của hạt, không lặp ở danh sách ba hạt.
- Phần xem kỹ đổi toàn bộ ngôn ngữ công khai từ “lá” sang “hạt”; thứ tự đọc là
  câu chuyện của hạt → cách nhìn hình → liên hệ với hôm nay → một bước nhỏ.
  Hướng dẫn quan sát chỉ hướng mắt vào artwork, không copy lại nghĩa/risk/gift.
- Tổng hợp được chia thành bốn nhãn rõ: Bức tranh chung → Vì sao các hạt liên
  quan → Chiêm tinh tác động ở đâu → Một bước nhỏ hôm nay. Câu quan hệ được
  chỉnh lại để không còn cấu trúc cụt “cho thấy muốn…/gợi tới muốn…”.
- Khung chiêm tinh hiện đủ body tuần và “Vì sao bối cảnh này xuất hiện?”. Lời
  công khai không còn lộ các từ vận hành như dữ kiện, hệ thống, giữ/bỏ hay gán;
  thay bằng giải thích tín hiệu đang làm rõ điều gì và gặp hạt/trạng thái/vùng
  đời sống nào. Font tuần/rationale được tách khỏi rule tăng chữ của bài luận
  để không phình hoặc tràn khung.
- `garden-oracle-identities.js` tạo lời mời Nở/Khép khác nhau cho 72 hạt dùng
  profile mặc định; 6 override biên tập tay được giữ nguyên. Audit đạt 78 danh
  tính/156 trạng thái, không còn lời mời Nở/Khép trùng, tên Tarot công khai,
  cách gọi “Lá này” hoặc cấu trúc phủ định bị cấm.
- Validation cuối: 640 tổ hợp synthesis × local/live qua; đủ 28 policy chiêm
  tinh + 4 fallback và 24 template; 16 inline script parse sạch; `git diff
  --check` sạch. Ali đã duyệt local và yêu cầu cập nhật quy ước, commit, push.

## Oracle — sửa wording toàn bộ diễn giải và tái cấu trúc câu tổng hợp (23/7/2026, Ali duyệt)

- Ali đọc lại toàn bộ wording diễn giải Oracle và thấy vẫn khó hiểu ("toàn bộ
  á em"). Bắt đầu từ lỗi cụ thể nhất: panel "Câu chuyện của hạt" luôn hiện
  `essence` (trừu tượng, thơ) thay vì `coreStory` (cụ thể, tình huống) cho cả
  78 hạt, do thứ tự `identity?.essence||profile?.coreStory` bị đảo trong
  `index.html`. Đổi lại thành `profile?.coreStory||identity?.essence`; commit
  `4d02d1c`, chưa push.
- Trọng tâm phiên: đoạn "Vì sao các hạt liên quan" trong
  `garden-oracle-synthesis.js` (`relationshipLine`) tuy giọng văn đã ổn từ
  trước nhưng cấu trúc câu vẫn là bưng nguyên diễn giải từng hạt rồi ghép lại
  bằng dấu câu ("Hạt A đang X: ... Hạt B đang Y: ... Khi đặt cạnh nhau, quan
  hệ.") — đúng điều `ORACLE-CONTENT-SYSTEM.md` cấm (không nối lại ba diễn giải
  riêng). Ali yêu cầu sửa cấu trúc câu, không chỉ từ ngữ.
- Bản sửa cuối (Ali duyệt): với cặp 2 hạt, liệt kê ngắn tên + trạng thái Nở/
  Khép trước dấu `:`, sau đó là một câu diễn giải liền mạch nói thẳng với
  người đọc ("bạn"), khép lại bằng quan hệ nguyên tố — ví dụ "Hạt Giữa Những
  Luồng Gió đang Khép, còn Hạt Chạm Miền Đất Mới đang Nở: bạn đang giằng co
  với một giới hạn hiện rõ, cần biến điều đã rõ thành hành động ngay — động
  lực cần một nhịp đủ bền." Trường hợp cả ba hạt cùng domain/hướng thì mở đầu
  bằng điểm chung (`Chạm {domain}:` / `Cùng {Nở|Khép}:`) trước khi liệt kê
  từng hạt.
- Trong lúc chỉnh cấu trúc, một vài câu `compactEvidence` và `ELEMENT_RELATIONS`
  dài nhất bị gọt bớt 1-2 chữ (không đổi nghĩa) để giữ khung 80–155 chữ.
- Full audit quét đủ 4.868.864 tổ hợp (78 chọn 3 × 8 trạng thái × 8 ngày pack
  hiện tại) trong ~97 giây: **0 tổ hợp vượt khung 80–155 chữ**, min 83 / max
  155 / trung bình ~128 chữ — khớp chuẩn "0 cờ kỹ thuật" cũ.
- Còn lại cho phiên sau: xem lại wording khung chiêm tinh tuần ("Vì sao bối
  cảnh này xuất hiện?"), thêm hiệu ứng chữ cho khối chữ ký/liên hệ
  (@guidetheheart) cho nổi bật hơn, chuẩn bị pack chiêm tinh tuần mới cho
  28/7/2026 trở đi (pack `2026-W30-approved` hiện chỉ phủ tới 27/7).
- Trạng thái: Ali đã duyệt hướng và câu chữ, yêu cầu commit + push trong phiên
  này; QA nội dung mẫu (đọc thử nhiều tổ hợp hơn) để phiên sau.

## Cổ tích Vườn Bồ Công Anh — Phase 0 + Phase 1 (29/7/2026, Ali duyệt)

### Đã làm

- Phase 0 audit toàn bộ nền website và chốt kiến trúc zero-cost:
  JavaScript thuần, không backend, không build system mới, deploy được trên
  GitHub Pages project site. Báo cáo nằm tại `docs/PHASE-0-AUDIT.md`.
- Thêm world state versioned tại `js/world-state.js`, dùng key
  `anhli.worldState`. Module chịu được storage bị chặn, JSON lỗi, schema cũ;
  migration bổ sung field thiếu và giữ field chưa biết.
- Daily visit dùng ngày local của thiết bị, một ngày chỉ ghi nhận một lần.
  Foundation không đụng các key cũ của Oracle, Vệ Đà, theme, motion, likes hay
  registry Easter Egg.
- Phase 1 thêm Hidden Egg MVP, tách thành:
  `data/egg-game-config.js` (microcopy), `js/egg-game.js` (transition/state),
  `css/egg-game.css` (visual) và `scripts/test-egg-game.mjs` (test).
- Egg có bốn stage: `0 dormant`, `1 warm`, `2 cracked`, `3 ready`. Lần đầu
  phát hiện chuyển thẳng sang stage 1; chỉ tăng stage vào một ngày local khác;
  nhiều click hoặc reload cùng ngày không tăng thêm; stage dừng ở 3 và chưa nở.
- Developer helper chỉ xuất hiện trên `file:`, `localhost`, `127.0.0.1` hoặc
  `[::1]`: `AnhLiEggDebug.getState()`, `reset()`, `setStage(n)`, `nextDay()`.
  Production không có debug control hoặc debug UI.
- Visual cuối đã được Ali duyệt: desktop đặt egg trong bụi cỏ ngay dưới chân
  nhân vật đứng thứ hai, sát chân bìa album lớn; không chồng hitbox của jewel
  case nhỏ. Shell desktop `36×45px`, hit area `56×56px`; mobile shell
  `30×38px`, hit area `52×52px`.
- Cỏ foreground dùng lại `grass-clump-3.png`, chỉ che nhẹ đáy egg và có
  `pointer-events:none`. Idle movement chỉ chạy trước khi phát hiện, chu kỳ
  9,4 giây với khoảng nghỉ dài; hover/focus phản ứng nhẹ.
- Button semantic, focus state rõ, microcopy qua live region, không autoplay
  âm thanh, không modal lớn, không thêm vào navigation. `prefers-reduced-motion`
  và `body.no-motion` tắt chuyển động.
- Desktop 1440/1024, tablet portrait 820 và mobile 390 đã được kiểm tra:
  không overlap vùng click album, không horizontal overflow, không đè calendar
  hoặc quote sau khi font ổn định. Album interaction, navigation, Music,
  Garden Oracle và Vệ Đà không bị thay đổi.

### Validation và commit

- `node scripts/test-world-state.mjs` → pass.
- `node scripts/test-egg-game.mjs` → pass.
- JavaScript syntax, `git diff --check` và browser console → sạch.
- Commit Phase 0: `2ecb474` — `feat: add versioned world state foundation`.
- Commit Phase 1: `6c882f1` — `feat: add hidden egg MVP`.
- Commit visual approved: `f6df84b` —
  `fix: refine hidden egg visual placement`.
- Các commit hiện chỉ ở local; chưa push và chưa deploy production.

### Cố ý chưa làm

- Không hatch và chưa tạo bé Gà.
- Không hatch animation hoàn chỉnh hoặc final sprite/art.
- Không food points, mood, music rewards, Daily Discovery hay collection.
- Không tạo `garden/index.html` hoặc link `/garden/`.
- Không backend, account, analytics mới hoặc đồng bộ đa thiết bị.
- Không migrate registry `anhli-eggs` cũ vào `anhli.worldState`.

### Brief scope tiếp theo — Phase 2: Hatch Transition & Chicken Foundation

Phase này phải được Ali duyệt brief trước khi code. Scope nhỏ nhất được đề
xuất:

1. Chốt hatch rule. Khuyến nghị: egg ở stage 3 chỉ nở khi người dùng quay lại
   và tương tác vào một ngày local mới; cùng ngày đạt stage 3 không nở ngay.
   Đây đang là đề xuất, chưa phải luật đã khóa.
2. Khi hatch hợp lệ, chỉ cập nhật `egg.hatched=true`,
   `egg.hatchedAt=<ISO>` và state Gà tối thiểu cần thiết; migration phải tương
   thích state Phase 0/1 và không làm mất field lạ.
3. Thêm một reveal nhỏ, không chặn portfolio, không autoplay âm thanh và có
   reduced-motion fallback. Art chỉ ở mức placeholder/sprite nhẹ để test flow.
4. Sau khi nở, render một bé Gà tĩnh hoặc phản ứng rất nhẹ tại cùng visual
   group. Refresh vẫn giữ đúng trạng thái.
5. Bổ sung developer helper và test cho: cùng ngày, ngày mới, hatch một lần,
   refresh, corrupted storage, state cũ, desktop/mobile/keyboard/reduced motion.
6. Phase 2 không kéo theo food, Daily Discovery, collection, `/garden/` hoặc
   hệ progression mới. Các phần này tách phase sau.

### Quy ước tiếp tục giữ

- `window.AnhLiWorld` và `anhli.worldState` là nguồn state duy nhất cho game.
  Mọi schema change phải tăng `version`, có migration và giữ unknown fields.
- Logic ngày dùng local date; một ngày tối đa một bước tiến. Không timer nền,
  backend hoặc cơ chế chống đổi ngày hệ thống phức tạp.
- State transition tách khỏi DOM để unit-test được. Copy nằm trong data/config;
  visual nằm trong CSS; không nhét logic game trở lại `index.html`.
- Game lỗi không được làm hỏng portfolio. Không dependency/animation library
  nặng, không autoplay, không layout shift, luôn có reduced-motion.
- Asset/link dùng đường dẫn tương đối tương thích project site. Không hard-code
  `/garden/`; route tương lai là thư mục thật `garden/index.html`.
- Hidden Egg không xuất hiện trong navigation và không có wording “click me”.
  Placement desktop đã khóa tại bụi cỏ dưới chân nhân vật đứng cạnh album lớn;
  mobile dùng mép dưới hero khi không có đủ không gian sạch.
- Debug helper chỉ có ở local preview; production không có control debug.
- Trước mỗi commit: fetch/so sánh `origin/main`, test, `git diff --check`, stage
  đúng file. Không dùng `git add .`/`git add -A`; không cuốn `_to_delete/`,
  `.command` hoặc deploy log.
- Không push/deploy cho đến khi Ali duyệt trực tiếp. Deploy vẫn giữ luồng
  `.command` có bước pull trước push; không tự bỏ qua điểm duyệt này.

## Cổ tích Vườn Bồ Công Anh — Phase 2 (30/7/2026)

### Hatch rule đã khóa

- Ali duyệt tiếp Phase 2 theo rule đã đề xuất: egg ở stage 3 chỉ nở khi người
  dùng tương tác vào một ngày local mới. Cùng ngày vừa đạt stage 3 vẫn chưa nở.
- Lần hatch hợp lệ duy nhất ghi `egg.hatched=true`,
  `egg.hatchedAt=<ISO>`, cập nhật `egg.lastInteractionDate` và mở
  `chicken.unlocked=true`.
- Sau khi đã nở, mọi lần tương tác tiếp theo chỉ là gặp lại Gà; không thay
  `hatchedAt`, không tạo thêm progression hoặc phần thưởng.

### Đã triển khai

- `js/world-state.js` tăng schema từ v1 lên v2. Migration giữ unknown fields và
  tự sửa invariant: state cũ có `egg.hatched=true` luôn mở khóa Gà.
- `js/egg-game.js` thêm transition `hatched`/`chicken`, hatch một lần, render
  bền qua refresh, aria label sau nở và reveal class ngắn. Logic state tiếp tục
  tách khỏi DOM.
- `data/egg-game-config.js` bổ sung microcopy hatch/gặp lại Gà và aria label;
  không nhét copy vào UI logic.
- `index.html` chỉ thêm hook `data-hatched` và một span Gà trong semantic
  button hiện có; không thêm modal, navigation hoặc route.
- `css/egg-game.css` thêm Gà placeholder CSS nhẹ, shell-open/chicken-reveal
  ngắn và phản ứng hover/focus nhỏ. `prefers-reduced-motion` cùng
  `body.no-motion` vẫn tắt transition/animation.
- Giữ nguyên placement đã khóa của pocket, hit area desktop `56×56px` và
  mobile `52×52px`; Gà dùng cùng visual group nên không tạo layout shift.
- Local preview có thể mở `?egg-preview=hatched` để kiểm tra visual sau nở mà
  không ghi state. Flag chỉ hoạt động trên `file:`, `localhost`, `127.0.0.1`
  hoặc `[::1]`; production bỏ qua.

### Validation và commit

- World-state tests: pass.
- Egg-game tests: pass, gồm cùng ngày, ngày mới, hatch một lần, refresh giữ
  timestamp, corrupted storage, v1 migration, local preview và production
  guard.
- JavaScript syntax và `git diff --check`: pass.
- Browser QA: desktop 1440/1024, tablet portrait 820 và mobile 390; không
  horizontal overflow, hit area không đổi, aria label chuyển đúng và browser
  console không có warning/error.
- Trước commit đã fetch và xác nhận `origin/main` không có commit mới; local
  `main` đang đi trước remote.
- Commit Phase 2: `b192810` —
  `feat: add egg hatch and chicken foundation`.
- Chưa push và chưa deploy production.

### Cố ý chưa làm / scope kế tiếp chưa khóa

- Gà hiện chỉ là placeholder CSS để xác nhận flow, chưa phải final sprite/art.
- Không food points, feeding, mood progression, music reward, Daily Discovery,
  collection hoặc achievement.
- Không tạo `garden/index.html`, không thêm link `/garden/`.
- Không backend, account, analytics mới hoặc đồng bộ đa thiết bị.
- Phase tiếp theo chưa được khóa. Trước khi code cần chọn một mục tiêu nhỏ:
  polish final art/motion của Gà hoặc thiết kế interaction đầu tiên cho Gà;
  không kéo nhiều hệ progression vào cùng một phase.

## Cổ tích Vườn Bồ Công Anh — Hoàn thiện art thật cho trứng + bé Gà (31/7/2026)

### Bối cảnh
Ali gửi bộ concept pixel qua folder máy `Downloads/pé gà út` (4 trạng thái
trứng, bé Gà út đầy đủ, bộ pose mở rộng, item pack khởi đầu). Hướng chọn: giữ
nguyên cơ chế/logic Phase 2, chỉ thay art placeholder CSS bằng sprite thật.

### Đã làm
- Tách 5 sprite từ 2 sheet concept, xoá nền bằng dò viền nét pixel-art (không
  dùng nguyên tấm concept sheet làm asset), lưu tại `assets/game/egg/`:
  `egg-dormant.png`, `egg-warm.png`, `egg-cracked.png`, `egg-ready.png`,
  `chicken.png`.
- `egg-ready.png` = bản `cracked` tăng sáng/rực hơn — bộ concept không có art
  riêng cho stage "ready"; đã báo Ali, chưa có phản hồi điều chỉnh riêng.
- Sửa DUY NHẤT `css/egg-game.css`: thay background gradient/clip-path vẽ tay
  bằng `background-image` theo `data-stage`/`data-hatched`; bỏ layer `::after`
  vẽ vết nứt (đã nằm sẵn trong ảnh). Không đụng `index.html`/JS/config —
  state logic, hit area, vị trí đã khoá giữ nguyên.
- Test: `node scripts/test-world-state.mjs`, `test-egg-game.mjs` pass. QA hình
  ảnh bằng Playwright headless trên `file://` ở 1440px/390px, đủ 4 stage +
  hatched — không lỗi console, không horizontal overflow.
- Quay GIF animation thật (idle → phát hiện → tăng stage → nở) gửi Ali xem
  trực tiếp, kèm hướng dẫn debug console (`AnhLiEggDebug.setStage/nextDay/
  reset`) để tự bấm thử trên `file://` thật.

### Commit
`b099f2e` — feat: finalize real pixel art for egg + chicken sprites. Ali yêu
cầu trực tiếp sau khi xem ảnh + GIF ("xong rồi thì commit đi") — đã commit
đúng 6 file (5 sprite mới + `css/egg-game.css`), KHÔNG dùng `git add -A`.
Repo hiện đi trước `origin/main` 7 commit, CHƯA PUSH.

### Việc dở dang — đọc kỹ trước khi làm tiếp
- Ali phản hồi "trứng hơi nhỏ" → đã tăng size sprite ~28%, GIỮ NGUYÊN hit area
  56×56/52×52 đã khoá (không dịch layout): `.hidden-egg-shell` 36×45→46×57
  (mobile 30×38→39×49), `.hidden-egg-chicken` 31×34→40×43 (mobile
  27×30→35×38), bottom offset chicken 7px→5px cho cân đối. Đã QA lại: không
  overflow, không đè 2 "jewel case" cạnh bên.
- Thay đổi size này ĐÃ ghi vào file thật trên máy Ali nhưng **CHƯA COMMIT** —
  Ali chưa xác nhận size mới ổn chưa (đang hỏi thì chuyển sang yêu cầu recap
  session mới). **Việc đầu tiên của session sau: hỏi lại Ali size đã ổn chưa,
  rồi mới `git add css/egg-game.css` + commit riêng** (đừng gộp việc khác).
- Sprite bé Gà còn sót vệt bóng mờ phía sau (glow nền gốc trong concept dính
  sát viền nhân vật, xử lý ảnh thường không tách 100% sạch) — chấp nhận được
  ở size hiển thị thật, có thể cải thiện sau nếu Ali muốn.
- Bộ pose mở rộng (idle/nháy mắt/ngủ/ăn/ôm quà) và item pack (hạt, vàng, dâu,
  bút, hoa bồ công anh, bản đồ, chìa khoá) trong 2 ảnh concept còn lại CHƯA
  dùng — để dành phase sau, tránh gộp nhiều hệ vào một đợt.
- `.git/index.lock`/`.git/HEAD.lock` tái xuất hiện sau MỖI lệnh git ghi khi
  chạy qua cầu nối Cowork — không phải lỗi git thật, `mv` sang `_to_delete/`
  là gỡ được ngay (xem AGENT-RULES.md mục 3). Không ảnh hưởng khi Ali tự chạy
  git trên Terminal/Finder thật.
- Chưa push, chưa deploy. Vẫn giữ luồng cũ: viết `.command` mới (có bước pull
  trước push) rồi Ali tự bấm đúp — chưa làm ở phiên này.

### Phase kế tiếp — vẫn chưa chốt
Như Phase 2 đã ghi: chọn 1 trong 2 (polish art/motion thêm cho Gà, hoặc thiết
kế tương tác đầu tiên cho Gà) — không gộp nhiều hệ vào cùng một phase.

Có bàn sơ qua với Ali (CHƯA quyết, mới là ý tưởng, CHƯA thành brief đã khoá):
mở rộng thành "nuôi gà ảo" kiểu Nhật — cho ăn, mặc đồ/nón/giáp (kiến trúc
layer tách rời được gợi ý sẵn), nghe nhạc, easter egg, huy hiệu sưu tầm,
daily hook để quay lại mỗi ngày. Đây là hướng dài hạn — **session sau đừng tự
ý triển khai chỉ vì đọc thấy mục này**, phải hỏi Ali chốt phạm vi trước.

## Cổ tích Vườn Bồ Công Anh — Commit size tweak + chuẩn bị deploy (1/8/2026)

### Bối cảnh
Ali hỏi: nếu push bây giờ thì trang có gì, bé Gà đã hoạt động chưa, còn thiếu
bước nào không. Trước khi trả lời, đã audit lại toàn bộ để không đoán:

- Đọc lại `js/egg-game.js`, `js/world-state.js`, `data/egg-game-config.js`
  đầy đủ — logic discover → 4 stage → hatch → unlock bé Gà, persist qua
  `localStorage`, migration versioned, debug helper gate đúng theo
  `file:`/`localhost` — đều đã hoàn chỉnh, không thấy lỗ hổng chức năng.
- Grep `index.html`: `css/egg-game.css` đã link, 3 script
  (`world-state.js`, `egg-game-config.js`, `egg-game.js`) đã include đúng
  thứ tự với `defer`, markup `#hiddenEgg`/`#hiddenEggMessage` đã có trong
  DOM (dòng ~5287-5292). Wiring đầy đủ, không thiếu bước tích hợp nào.
- Chạy lại `node scripts/test-world-state.mjs` và `test-egg-game.mjs` —
  pass cả hai.
- Build harness Playwright riêng (không đụng file thật) render đủ 4 stage +
  hatched với CSS size mới (46×57 / 40×43): 0 console error, số đo
  `getBoundingClientRect` khớp đúng spec CSS, không tràn khỏi hit-area
  56×56. Xem lại crop bé Gà: còn vệt bóng mờ nhẹ bên phải thân — đúng như
  đã ghi nhận 31/7, chấp nhận được ở size hiển thị thật, không phải lỗi
  mới phát sinh do tăng size.

**Kết luận:** nếu push ngay, trang live sẽ có Cổ tích Vườn Bồ Công Anh chạy
đầy đủ — tìm trứng, 4 stage ấm dần theo ngày, nở thành bé Gà, nhớ trạng thái
qua `localStorage`. Không thiếu bước chức năng nào. Việc còn thiếu duy nhất
trước khi push là size CSS chưa commit — đã xử lý trong phiên này (xem
dưới).

### Đã làm trong phiên này
1. `git add css/egg-game.css` + commit riêng (`4de7cc5`) — tăng size
   sprite trứng/gà ~28% (đã QA bằng harness ở trên), không đụng hit-area.
2. Viết `deploy-egg-chicken-2026-08-01.command` (mới, có `git pull
   --no-rebase --no-edit origin main` trước `git push`, đúng luật mục 3
   AGENT-RULES.md) — **CHƯA CHẠY**, Ali tự bấm đúp để đẩy lên thật.
3. Dọn `.git/index.lock`/`HEAD.lock` kẹt lại sau các lệnh ghi qua cầu
   Cowork bằng cách `mv` sang `_to_delete/` (không phải lỗi git thật, xem
   AGENT-RULES.md mục 3).

### Trạng thái git sau phiên này
`main` hiện đi trước `origin/main` **9 commit** (mới nhất `4de7cc5`), vẫn
CHƯA PUSH, CHƯA DEPLOY — chờ Ali bấm `deploy-egg-chicken-2026-08-01.command`.

### Việc dở dang — không đổi so với ghi nhận 31/7
- Vệt bóng mờ nhẹ sau bé Gà — chấp nhận được, có thể tinh chỉnh sau.
- Phase kế tiếp chưa chốt (polish thêm art/motion cho Gà, hay làm tương tác
  đầu tiên cho Gà đã nở) — đừng tự chọn.
- Ý tưởng "nuôi gà ảo kiểu Nhật" (cho ăn, mặc đồ, huy hiệu, daily hook) —
  vẫn mới là ý tưởng, chưa phải brief đã khoá.
- 2 sheet asset chưa dùng (pose mở rộng + item pack) — để dành phase sau.


## 09/09/2026 — Codex: Garden experience, asset và handoff

- Mốc source đã đối chiếu: `5eacde1`, origin `AliH86/anhli-portfolio`; checkout đúng là `portfolio-garden-v2`. Repo ở thư mục cha là dandelion-oracle, không dùng để sửa portfolio.
- Tạo bộ `docs/garden-experience-2026-09-09/`: review.html, flow sáu điểm dừng, asset manifest, instruction triển khai và kiểm tra hiệu năng từ source/DOM. Có mẫu Li đen trắng ngồi làm vườn nền trắng, cleanplate sạp màu và bản WebP. Đây là lookdev; nhân vật chưa alpha/rig, nền chưa geometry 3D.
- Hướng: nhân vật 2D giữa vườn 3D; tái dùng catalog/player/gallery/career/calendar; mobile/classic không tải scene mới. Prototype đầu chỉ góc cây → sạp nhạc.
- Các ưu tiên đã ghi: bỏ sync XHR trong music-data.js; gate media/renderer trước tải; thống nhất lifecycle; xử lý texture disposal/race; version cache thay Date.now theo phạm vi dữ liệu. Chưa áp dụng các sửa chức năng này.
- Chưa benchmark FPS/Network; budget là mục tiêu. Không thay source app, không commit, không push/deploy.

## 10/09/2026 — Codex Garden implementation checkpoint (paused at user request)

User authorized applying new Garden review art + Three.js and replacing incompatible decorative video/theme. Started new entrance, async music loader, gated/retired old decor, draft Garden controller/adapter, local Three.js 0.186.0 and gardener alpha asset. Actual `js/garden/scene.js` is NOT built; `SCENE_READY=false` keeps missing scene inaccessible and routes entry to real music. Full visual/interaction/performance QA pending. No commit/push/deploy. Continue from `docs/garden-experience-2026-09-09/SESSION-HANDOFF-2026-09-10.md`; preserve pre-existing recap/docs changes.

## 11/09/2026 — Codex: asset bổ sung, game trứng hoãn, chốt kế hoạch session sau

- Anh làm rõ đại tu giao diện/style toàn trang: Li minh họa, animation/Three.js; Blender được dùng cho model. Giữ nội dung và cá tính của portfolio, không ràng buộc giao diện cũ. Game trứng/ấp/nở/gà bỏ khỏi bản này; game nối sau ở giai đoạn xa hơn.
- Tạo nền xa bằng built-in imagegen từ cleanplate đã chọn, bỏ sạp/props gần; lưu master PNG và WebP tại `docs/garden-experience-2026-09-09/assets/garden-distant-cleanplate-v1.*`. Xuất Li alpha 853×1024 và 6 bìa 512² vào `assets/runtime-candidates/` trong bộ docs, có manifest nguồn/ID/hash. Tổng bản web mới 719.362 byte. Đây là asset chuẩn bị, chưa tích hợp; model/rig chưa làm.
- Đã bỏ nạp game CSS, world-state/config/game JS và cụm DOM hiddenEgg trong `index.html`; chuyển governor CSS/JS sang nạp trực tiếp vì trước đây đi qua egg-game.js. Giữ file nguồn game và localStorage; không đổi Oracle/Vedic. Receipt kiểm tra tại `evidence/egg-removal-2026-09-11.json` trong bộ docs.
- Fetch origin/main hiện `5dc754a`, hơn local `5eacde1` 5 commit, chưa merge. Dữ liệu mới gồm hai album, audio map/font CJK, đổi album của một bài, và Vị Muối Mặn có 8 bài. Không dùng số bài của audit hôm trước như hiện trạng mới.
- Anh mở Blender nhưng MCP vẫn không nối được addon ở thời điểm kiểm tra. CLI xác nhận Blender 5.2.1 LTS; không thay scene UI, không tạo model mới.
- Theo chỉ dẫn cuối, kết thúc ở asset và kế hoạch; scene/model/rig/tích hợp tiếp tục session sau. Điểm đọc đầu: `docs/garden-experience-2026-09-09/NEXT-SESSION-ASSETS-2026-09-11.md`. `SCENE_READY=false`, scene.js chưa tồn tại. Không commit/push/deploy.


## 12/09/2026 — Codex: tiếp nhận UI Redesign anh đã phát triển

- Yêu cầu phiên này: đọc gói ZIP, định hình bước xử lý; khi usage >=95% chủ động lưu/wrap up/handoff. Chưa sửa UI/runtime.
- Điểm nối mới: `docs/ui-redesign-2026-09-12/INTAKE-AND-HANDOFF.md`; có nguồn ZIP giữ nguyên, 10 ảnh mockup, bảng lệch nguồn, thứ tự triển khai và prompt session tiếp theo.
- Mockup đã chuyển SHOWS sang NDA: loại việc/vai trò/moments + `/works/how`; handoff/CLAUDE vẫn còn Featured/Archive/per-project. VISUAL/STORY, light MUSIC, nav mobile cũng cần đồng bộ theo bản tiếp nhận, không âm thầm code từ spec cũ.
- Xác minh source hiện có `SCENE_READY=true`, scene.js/runtime và receipt cũ active true; hai fail cũ reduced-motion/eyelid và audio-vinyl vẫn cần reproduce. Không suy diễn từ recap cũ nói scene chưa có.
- Fetch: local `5eacde1`, origin `5dc754a`, behind 5; chưa merge. Bảo toàn thay đổi sẵn có; không commit/push/deploy.
- Usage đầu phiên: 1% / 31% (5 giờ / tuần). Quy tắc checkpoint và handoff đã lưu trong bản tiếp nhận, không tạo monitor nền.


## 12/09/2026 — Codex: triển khai UI mới + blockout bước đầu

- Anh xác nhận làm tuần tự. Đã khóa spec; thêm 8 route HTML tĩnh, UI 5 mục/MAP/mobile/Flat, nhạc dùng 26 album và một audio engine cũ. Không đổi dữ liệu nhạc.
- Three.js blockout geography/camera trong js/redesign/, xem qua ?world=blockout. Chưa GLB/host/lighting final, chưa camera travel.
- Suite UI pass các phần route/audio/responsive/No-JS; fail MAP đã sửa và có targeted receipt PASS. Edge run bắt race Oracle identity source, chưa cô lập.
- Chưa publish-ready: HTML ẩn vẫn chứa dữ liệu legacy, cần tách runtime khỏi dữ liệu khách để NDA-safe. Không được coi CSS hide là loại dữ liệu khỏi output.
- Điểm nối: docs/ui-redesign-2026-09-12/SESSION-HANDOFF.md. Có source, lệnh build/test, receipt, ảnh và thứ tự tiếp tục. Usage gần wrap-up 87%/45%. Không merge/commit/push/deploy.


## 12/09/2026 — Codex: Garden production checkpoint và house draft

- Đã lưu hai nguồn Locked Handoff/Master Prompt, kế hoạch theo usage, manifest, decision log và QA tại docs/qa/garden-proof/.
- Anh đã cho phép cân camera/FOV riêng mobile và cao độ terrain tương đối để output tốt; không hỏi lại và không chặn production vì match số tuyệt đối. Giữ geography và composition intent.
- Có source/GLB terrain study và house architecture draft: source/garden/production/garden-house.blend → assets/garden/production/garden-house.glb. Nhà có ngói cong, khung gỗ, cửa/hiên; chưa texture/AO/visual final.
- Viewer local 8784: /docs/qa/garden-proof/?asset=house&detail=1. Không sửa shell/player/catalog của portfolio. Bảy kiểm tra study pass; house tải và chụp QA không page error.
- Điểm nối mới: SESSION-HANDOFF.md ở root. Bước tiếp theo: stall + greenhouse, cân cảnh/camera, rồi landscape/material/light/host; Garden visual approval vẫn bắt buộc trước rollout.
- Không merge/commit/push/deploy. Hash baseline 599 file cũ được giữ; recap chỉ thêm cuối.


## 13/09/2026 — Codex: board art direction + sạp/nhà kính

- Anh gửi DANDELION_GARDEN_ART_DIRECTION_BOARD (1).pptx, xác nhận direction đã chốt và tiếp tục v2. Đọc 14 slide và ảnh tham chiếu; lưu bản gốc/hash. Board khóa look/feel, không thay spatial contract.
- Dựng mới sạp/nhà kính: source Blender editable + GLB tại source/garden/production và assets/garden/production; 166/219 source parts. Giữ trục máy hát và sáu sleeve; dùng bìa nhạc thật trong preview.
- Viewer mới: http://127.0.0.1:8784/docs/qa/garden-architecture-2026-09-13/ — A1/A2/A3/mobile và các góc gần. 11 kiểm tra pass; sửa lỗi mặt gắn bìa được phát hiện khi xem ảnh.
- Đây là mốc kiến trúc WIP, chưa near-final Garden. Tiếp: chỉnh mái/side facade nhà, workspace + terrain/path/water, planting/material/light/host rồi ghép Garden vào shell. Không hỏi lại direction/camera permission.
- Root SESSION-HANDOFF.md đã cập nhật. Không đổi catalog/audio/index/runtime/v1/house cũ; không merge/commit/push/deploy.


### 13/09/2026 — Ghi nhận steering sau architecture checkpoint

- Anh nhận xét thiếu mảng xanh, nhà đơn giản; “không ý kiến nếu chỉ định vị” không phải duyệt visual.
- Sau khi bắt đầu soạn lượt scenic, anh nêu vấn đề flow thực của nhà có sân vườn nhìn ra bờ hồ. Tạm dừng dựng phụ thuộc để làm rõ lối vào/sân/cửa/hiên/view mặt nước.
- Đề xuất sơ bộ chưa duyệt: cửa đón phía sân + hiên ôm góc mở về mặt nước; trước hết thử giữ geography. Không tự đổi tọa độ/route.
- Chỉ có script draft và baseline mới; build đầu lỗi trước khi save/export. Preview architecture cũ giữ nguyên; không có scenic output được kiểm chứng. Chi tiết nối việc ở đầu SESSION-HANDOFF.md.


### 13/09/2026 — Sơ đồ flow nhà/sân/hiên/mặt nước

- Anh cho phép làm tiếp sơ đồ. Đã làm comparison hiện trạng/hiên ôm góc và mặt cắt tầm nhìn; chưa sửa model.
- Nối cửa đón phía sân với hiên nhìn nước có thể thử trên vị trí hiện tại. Cao độ study nước cao hơn mặt sàn hiên khoảng 0,45m; mặt cắt mới chỉ đề xuất dốc vườn xuống nước.
- Mặt nước study 7,6×3,6m đang đọc như ao vườn; cần phân biệt với ý định bờ hồ liên tục. Chưa coi layout mới hoặc thay hình dạng nước là được duyệt.
- Chi tiết: docs/production/SPATIAL-FLOW-REVIEW-2026-09-13.md. Kiểm tra diagram desktop/390px, toggle, overflow và ảnh. Không đổi asset/runtime/catalog, không push.


## 2026-09-13 · Codex · House, wraparound veranda and lakeshore

Tiếp theo “ok, tiếp tục”: dựng hướng sân đón → hiên ôm góc → vườn → bờ hồ, giữ tọa độ công trình. Nhà có cửa hông, mái hiên, chỗ ngồi; cảnh quan thêm cây/bụi/cỏ, đường đi, bàn nghề và sàn gỗ thấp. Sàn hiên cao hơn nước 0,65m; kiểm tra ray từ chỗ ngồi ra hồ thông thoáng. Source mới 392/1.567 phần mesh vẫn editable, texture packed; bản cũ giữ nguyên.

Review: http://127.0.0.1:8784/docs/qa/garden-scenic-2026-09-13/?view=house . 11/11 browser checks, source reopen và bảo toàn portfolio (26 album, 1 audio, không autoplay) pass. GLB toàn cảnh 8,68MB/554.730 triangle riêng; còn quá nặng cho mobile, chưa đo GPU thật. Đây là scenic development: cây/đất/nước/ánh sáng còn schematic, host/UI và near-final proof chưa xong. Không commit/push/deploy. Handoff và `docs/production/SCENIC-CHECKPOINT-2026-09-13.md` ghi bước tiếp: hoàn thiện chất liệu/mảng xanh/host và dựng proof cùng UI thật.


## 2026-09-13 · Codex · Host style correction

Anh chấp nhận bố cục nhà/vườn hiện tại và yêu cầu tiếp. Sau bản host quá tả thực, anh gửi 2 hình và sửa “đơn giản thế này nè”. Đã theo nét đen trắng, mặt cách điệu thân thiện, kính, trang phục casual. Reference nguyên vẹn và host mới `source/garden/production/host/host-lineart-v1.png` được lưu với prompt/provenance. Bản PNG nguồn nền trắng RGB, chưa phải sprite alpha và chưa đặt vào world. Không thay runtime/nhạc/geometry trong lượt này. Host màu tả thực trước đó bị loại theo feedback.


## 2026-09-13 · Codex · Host đã vào Garden QA

Theo “oki lah, tiếp”, giữ host nét đen trắng đã chọn, tạo opacity mask bằng imagegen và ghép trong Three.js tại mép sân với bóng tiếp xúc. Review mới `docs/qa/garden-host-2026-09-13/`, góc arrival/host/mobile. 11/11 checks và bảo toàn source/runtime cũ pass. PNG RGB + mask riêng, không phải một PNG RGBA. Mobile đã cân gần để host rõ, nhà crop một phần/sạp ngoài khung; UI thật, cảnh quan/chất liệu/ánh sáng và GPU mobile chưa hoàn tất. Handoff đầy đủ trước mốc usage95%; không reset, không commit/push/deploy.


## 2026-09-14 · Codex · Cảnh mới + UI/player thật trong bản duyệt

Tiếp từ host đã chốt: làm mới tán cây, cỏ thấp, màu nền và mép đường sỏi, điều chỉnh ánh sáng trong viewer. Source mới garden-landscape-finish.blend giữ1.869mesh editable, GLB408.642triangle/4,30MB. Bốn GLB493.674triangle; không thay asset cũ.

Ghép ảnh cảnh mới với bản copy của shell/engine thật tại http://127.0.0.1:8784/docs/qa/garden-ui-2026-09-14/ . DesktopPNG1,96MB/mobile536KB, không tải GLB/Three; player thật26album,1audio, không autoplay. Sửa headline tránh tán cây và thẻ Explore nằm dưới host. 11 scene checks +8 UI checks/source reopen/preservation pass. Đây là review local, không default-route integration hay final art acceptance; refresh/new-tab route thật quay về bản route hiện có. Cây/vật liệu/nước/AO vẫn còn việc polish. Handoff và GARDEN-UI-PROOF-2026-09-14.md đã lưu; không commit/push/deploy.


## 2026-09-14 · Codex · Garden local ổn định qua route

Theo kỳ vọng “hài hoà ổn định”, tích hợp cảnh tĩnh vào root/local8routes; reload/newtab giữ Garden, 1picture/1player, lỗi ảnh có nền sáng dự phòng. Tablet dọc dùng portrait, màn thấp cuộn bố cục đầy đủ. 23checks pass, gồm phát audio thật qua route/MAP; bảo toàn music/art/legacy engine. Không deploy/commit/push. Handoff lưu ở usage96%; dừng heavywork theo mốc95% đã dặn. Xem GARDEN-STABILITY-2026-09-14.md.


# Latest checkpoint · Garden image finish matched to deck · 14 September 2026

Latest user correction: wants the finished imagery shown in the art-direction deck, not further low-poly polish. Explicitly acknowledged that procedural geometry polish alone could not promise that visual target.

Completed two built-in imagegen scene plates using exact current arrival/portrait camera renders as composition guides and board image-5-1.png as material/light authority. Runtime assets: assets/garden/production/stills/2026-09-14-art/. Desktop 1672×941 and portrait 941×1672. Same house-left/court/pergola/greenhouse/stall composition; rich natural vegetation, weathered plaster/tiles/timber, late-afternoon sun. This is finished static artwork, NOT a matching new 3D model or evidence that free-camera views attain the same quality. Generated detail is approximate; the GLB sources remain unchanged. Final user visual acceptance still pending.

Approved monochrome host source+mask preserved, rendered with original camera into separate transparent native Three.js overlays (arrival-host.png/mobile-host.png). No AI repaint of host. view.mjs now creates one scene wrapper with background and host responsive picture layers; controller still uses the background load state. CSS keeps header/readability and action contrast over detailed art. Eight local routes rebuilt; real catalog and audio engine unchanged. Root preview http://127.0.0.1:8784/ . Browser open request returned queued; do not claim it visibly opened.

Evidence: docs/qa/garden-finish-2026-09-14/art-page/{desktop,mobile}.png and receipt.json: both loads successful, host loaded, no page errors, no horizontal overflow, one stopped audio, no canvas. Viewports are headless Chrome 1440×900 and390×844, not actual device tests. Prompt/provenance: docs/production/GARDEN-ART-PROMPTS-2026-09-14.md; source capture script capture-art-inputs.mjs and art-inputs/ alongside. Existing scene/route regression receipts describe the preceding implementation, not a fresh run for this artwork.

No commit, push or deployment. Next: user assesses the actual scene image; do not roll out other-state motion before Garden visual acceptance. Do not return to incremental primitive foliage edits as the route to photographic deck finish.


# Garden 2.5D motion · 14 September 2026

User accepted the new scene imagery and explicitly accepted 2.5D with a little movement, parallax and/or depth-of-field. This authorizes the Garden motion pass; it does not claim all other scene art is finished.

Implemented `js/redesign/garden-motion.mjs` and integrated with garden-plate controller. Desktop pointer input eases to ±4px on backdrop and host and ±11px on a softly masked foreground image layer. Host and ground use exactly the same transform, preserving contact. Existing photographed foreground blur remains, with a 0.6px softening on the near-plane duplicate. This is a restrained masked-image depth effect, not semantic foliage separation or independent leaf/water animation. Image source assets and host source have not been edited.

CSS camera drift runs slowly over24s; touch uses subpixel drift and no pointer tracking. Text/navigation/player stay outside the transformed scene. Pause button persists locally. Reduced-motion, hidden document, image failure and inactive routes stop decorative movement; JS requestAnimationFrame only interpolates pointer changes and stops after settling. One shared audio element, no autoplay, no WebGL/canvas. All8 route HTML files regenerated from current local source; no music data changes in this pass.

Validation: `scripts/test-garden-motion.mjs` completed6 behavior checks with no page errors: separate near-plane transform and fixed copy; interpolation settles; pause persistence; route stop/resume; live reduced-motion preference; touch layout with no horizontal overflow. Desktop1440×900 and390×844 touch emulation in headless Chrome, not physical-device performance profiling. Screenshots and JSON: docs/qa/garden-motion-2026-09-14/. Initial video capture was unavailable because Playwright ffmpeg is not installed; no video recording is claimed.

Preview: http://127.0.0.1:8784/ . Reload and move pointer gently. UI now has Dừng chuyển động / Bật chuyển động. The static-review label is cleared for loaded Garden because the scene now has movement.

Git: origin/main advanced to487e4fd (local HEAD5eacde1, behind6). New remote change concerns music/catalog/fonts and a legacy index line; it was inspected, not merged. Existing mixed uncommitted work preserved. No commit, push or publish.

Next: retain this subtle motion amplitude; extend art direction to content scenes in a separate pass. Free camera navigation is not promised.


# Host1.70m + meadow wind · 14 September 2026

User said the imagery otherwise looks good; asked to check host1.7m and add grasses/dandelions with a light breeze. Implemented only this Garden visual/motion scope.

Calibration: source matte1122×1402, green-channel alphaTest threshold133, occupied rows63–1350, visible fraction0.9186875892. Prior full-plane1.94m corresponded to a visible1.782253923m, not exactly1.70m. New plane1.850465839m gives visible1.70m. Source RGB+mask unchanged. The host felt small because of camera distance; moved the rendering anchor from[7.8,-1.5241,13] to[9.4,-1.0660,16.2] with terrain raycast and0.012m ground offset. Arrival distance17.75→14.15m; mobile9.08→5.63m. Fresh transparent native renders2560×1440/1080×1920 preserve source illustration and contact shadow. House/stall/greenhouse anchors and scene backgrounds are unchanged. This uses authored 3D camera/terrain calibration; generated photographic scenery is not surveyed geometry. Original 3D QA viewer remains historical; new capture script/receipt defines the current 2.5D host.

Runtime assets under assets/garden/production/stills/2026-09-14-wind/, capture script scripts/capture-garden-host-170.mjs, exact metrics in host-scale-receipt.json. Source versions preserved.

New built-in imagegen4-column photographic meadow atlas: slender grass, golden seed spikes and dandelion globes. Original RGB black backing retained; CSS screen blend composites it without rewriting pixels.10 clusters on desktop,5 on mobile; root transforms with7.8–12.1s staggered periods, restrained rotation/skew. Foreground has slight softness, a few smaller clusters enrich meadow edges. These are independent added clusters, not animation of every pre-existing tree or baked leaf. Motion respects the existing pause button, reduced-motion and route/visibility stop. Text/player unchanged.

View generator switched host references and inserts wind clusters; CSS added wind layer.8 routes regenerated. scripts/test-garden-motion.mjs now writes docs/qa/garden-wind-2026-09-14/ and passed8 behavior checks with no page errors, including exact visible-height math, wind time progression/staggering, pause, reduced motion, route state, grounded host/backdrop transforms, fixed text and touch layout. Inspected desktop and mobile screenshots. Physical-device profiling remains untested.

Prompt: docs/production/GARDEN-WIND-PROMPT-2026-09-14.md. Asset provenanceJSON saved. Preview http://127.0.0.1:8784/; reload existing tab, avoid spawning more preview tabs. No commit/push/deployment. Mixed existing changes and remote music work remain preserved.


# WRAP-UP · Canopy wind, parallax, transitions · 14 September 2026

User latest: “oki lah, hiện sẵn tiến trình điều chỉnh - em wrap-up nhé”. Stop here. Latest live usage98% five-hour /84% weekly; do not start new heavy work in this window. No reset credit used. Next continuation must read this checkpoint and recheck usage.

Preview remains http://127.0.0.1:8784/ in the existing tab. Do not create additional preview tabs; user already has5. Changes are local only. No commit, push or deployment.

Completed:
- Removed the duplicate photographic foreground layer that caused doubled plants during parallax. The backdrop picture is now either visible as fallback OR replaced in paint by a single opaque 2D image-effect canvas. No second moving background photograph is composited over it.
- Added garden-canopy.mjs: small native WebGL image displacement shader, no Three.js/GLB world. Locally masks high foreground branches and tree crowns; protects house, greenhouse, stall and pergola areas. Smoothly tapered displacement and leaf movement; source artwork remains unchanged. This is image warping, not articulated 3D branches or simulation.
- Current normal Garden has ONE lightweight effect canvas, superseding prior “zero canvas/no WebGL” notes. Approx30 draw updates/sec, capped DPR1.25, pauses off-route/hidden/paused; reduced motion shows ordinary static picture. GPU/context setup failure retains the image. Actual device GPU profiling and forced context-loss fallback tests are not completed.
- Increased depth separation: backdrop/host±13px horizontally, independent grass layer±31px; high near branches gain local parallax. Host retains the calibrated1.70m artwork, closer anchor and same ground transform. No host source or landmark center changes in this pass.
- Stronger grass sway, about−3 to+4.2deg desktop, lower mobile amplitude, staggered phases. Existing10 desktop/5 mobile photographic clusters preserved.
- Removed white tag boxes behind lower links, pause control and handwritten note; warm light lettering and a smooth darkened lower edge replace them. Mobile intro chip also removed. Main brown arrival CTA and approved scene retained.
- Added synchronous route transitions in shell.mjs: content fades/rises420ms and backdrop fades/settles600ms via Web Animations; header and real player remain outside those effects. Back/Forward/URL/focus update immediately. Reduced motion skips these effects. This is a UI/scene entry transition, not a continuous journey through authored new destination imagery.

Verification:
- scripts/test-garden-motion.mjs:9 passed, no page errors. Receipt/screens docs/qa/garden-canopy-2026-09-14/. Covers one background paint, crown clock, removed duplicate,1.70m calibration, grass timing, parallax/copy/ground, pause, route stop, reduced motion and touch layout.
- scripts/test-garden-routes.mjs: final13/13 PASS after switching route animation to synchronous rendering. Includes actual audio playback across routes/MAP, Back/Forward/reload,26albums, keyboard/lightbox/Sky,390/768/1280 layouts, no-JS/reduced motion. Final receipts/screens overwrite the current regression folder docs/qa/garden-stable-2026-09-14/regression/.
- Initial native View Transition attempt made legacy immediate-state assertions race; replaced by synchronous render plus non-blocking Web Animations. No native View Transition route code remains.
- Fresh desktop/mobile combined images also under docs/qa/garden-finish-2026-09-14/art-page/. Inspected desktop final composition; browser emulation is not real-device acceptance. git diff --check passed for tracked changes.

Current files: js/redesign/{garden-canopy,garden-motion,garden-plate,shell,view}.mjs, css/garden-plate.css, generated8route HTML. Existing mixed music/data work preserved. origin/main487e4fd, local HEAD5eacde1, behind6; no merge performed.

Next after usage refresh: user assessment of current wind/parallax; physical-device smoothness if available; then match destination scene imagery to approved Garden quality. MUSIC/SHOWS/VISUAL/STORY real content still works but has not received finished photographic world scenes in this pass. Do not restart the accepted art direction or host.


# MUSIC near-final review checkpoint · 14 September 2026

## Authoritative continuation
The user's CONTINUATION NOTE after14Sep now approves Garden as the technical/visual baseline. It supersedes earlier “Garden approval pending” notes. Lock SCENIC2.5D WORLD + limited depth + unchanged illustrated host + selective effects + simple spatial navigation. Goal: simple, polished, personal, memorable; SEE → CHOOSE → ENTER → VIEW → RETURN. No free camera, no stronger Garden parallax/wind, no new low-poly world, no mass production of destination states. Navigation remains GARDEN · MUSIC · SHOWS · VISUAL · STORY. No JOURNEY destination. Family V1 is subtle objects/traces only, never a character/navigation system.

Order: Garden locked → MUSIC near-final → Garden/MUSIC review → SHOWS → VISUAL → STORY → Flat/mobile/performance/accessibility/release. Do not pass the MUSIC review gate without user acceptance. SHOWS work-led/minimal host; VISUAL quiet creative process/light host; STORY personal/memory/InnerWorld/current host. No commit/push/deploy authorized.

## Completed now
1. Saved Garden/source/audio hashes in docs/production/GARDEN-LOCK-2026-09-14/baseline.json.13 protected files all unchanged after MUSIC work; receipt under docs/qa/music-2026-09-14/baseline-preservation.json. Garden CSS, art, canopy/wind/parallax, calibrated host and audio data remain frozen.
2. Built MUSIC only, on actual local /sap/ route. Same cottage/greenhouse/garden and existing timber/cream-canvas record-stall language, photographed closer at quiet blue hour with warm practical light. Two new built-in imagegen desktop1672×941 and portrait941×1672 plates. No new universe, no fantasy music elements. The real album covers remain in the actual player; scenic record sleeves are illustrative artwork only.
3. Reused original host RGB+mask, no redraw/remodel/new pose. Native Three.js OFFLINE render produced transparent layers at visible1.70m with contact shadow and mild warm material tint. Original host source and Garden host placements remain untouched. MUSIC is a static layered2.5D scene with depth/DOF in art; no additional parallax or decorative idle loop. Existing route transitions carry across.
4. Music-scoped CSS puts the world first: headline/return link above, slim shared-player strip at lower edge, real track list below. Mobile uses a separately composed image, its Play and mute controls visible on first390×844 screen; track list scrolls below. No new audio element, no autoplay; shared player continuity and global mini control preserved.
5. Added js/redesign/music-view.mjs, music-scene.mjs, css/music-scene.css. Minimal imports/hooks in view.mjs/shell.mjs and one new stylesheet link in index; regenerated8route HTML. No destination art/code redesign for SHOWS/VISUAL/STORY. Existing mixed uncommitted music work preserved; origin/main487e4fd is6 commits ahead of local5eacde1, inspected but not merged.

## Review and evidence
Open existing browser tab at http://127.0.0.1:8784/sap/ (avoid creating more tabs). Garden remains http://127.0.0.1:8784/ . Fresh final Music screenshots in docs/qa/music-2026-09-14/music-1440x900.png and music-390x844.png; also320×568,768×1024,844×390. Initial larger full-page captures are in the same folder, with an earlier headline width before the final max-width correction.

scripts/test-garden-routes.mjs:13/13pass, including actual audio playback across all routes/MAP, catalog26albums, selection no-autoplay, pause/seek/mute, Back/Forward/reload, lightbox/Sky, mobile layouts, no-JS and reduced motion. Current receipt under docs/qa/garden-stable-2026-09-14/regression/.
scripts/test-music-scene.mjs:10/10pass, no page errors. Cold Garden downloads no Music art; one scene/no duplication;1.70m host metadata; Garden motion off in Music; user-started audio survives Garden↔Music and mini return;5 viewport sizes,390pxPlay visible, image failure retains player and Garden return. acceptance-receipt.json records device limitation.

Visual review assessment: same-world architecture/materials/light, Garden-quality scenic photography, quiet controls, original host, actual music and return flow are ready for USER review. Mobile is intentionally reframed, not a desktop crop. No physical phone was available through this workflow; Chrome viewport/touch emulation is not device smoothness/battery/heat validation. No Garden motion increase occurred.

## Sources
assets/garden/music/v1/{music-desktop,music-mobile,host-desktop,host-mobile}.png
assets/garden/music/v1/{provenance,host-placement}.json
scripts/capture-music-host.mjs — unchanged-source1.70m offline host projection; generated background is visual scale reference, not surveyed geometry.
docs/production/MUSIC-ART-PROMPTS-2026-09-14.md — full built-in imagegen prompts and input roles.

## Next
STOP at MUSIC review. Await user assessment of Garden↔Music continuity, scene/host/UI balance. Revise MUSIC if needed; do not move to SHOWS/VISUAL/STORY yet. Public release still unapproved. Usage window had reset to9% five-hour /85% weekly at entry; no reset credit used. Recheck on next sustained continuation and honor95% handoff rule.


# SHOWS static scenery + host animation requirement · 14 September 2026

## Latest direct instruction
Anh asked to recheck v2 checkpoint and continue, emphasizing 2.5D: finish all context/layout/scenery before animation effects; host needs multiple gestures AND sprite animated loops. See `docs/production/SCENIC-AND-HOST-SEQUENCE-2026-09-14.md` for mandatory acceptance and proposed gesture clips. New host artwork/atlas/loops have NOT been produced. Preserve approved monochrome identity, glasses, clothing, scale/grounding. Existing one-pose host is an interim state. SHOWS remains without host.

## Completed in this continuation
- Checked actual checkout, fetched origin/main and inspected six remote commits; local branch codex/garden-experience-v2 at5eacde1 remains behind origin/main487e4fd by6. Prior mixed catalog/audio/index/UI changes remain; no merge/commit/push/deploy.
- Garden already approved per the preceding handoff. MUSIC is near-final and still open to visual feedback. Latest “continue” authorizes the next scenery work; it is not recorded as automatic visual approval of MUSIC/SHOWS.
- Built SHOWS on actual local `/works/`: same-world afternoon timber stage, cottage/greenhouse/planting, two native generated compositions (1672×941 desktop,941×1672 portrait). No host or event-client imagery. Preserved three work categories, NDA/contact and method route; replaced six decorative blank moment tiles with the scenic view and honest project-material note.
- Added `js/redesign/shows-{view,scene}.mjs`, `css/shows-scene.css`; small hooks in view/shell and stylesheet in index; generated8routes. Lazy responsive art, static/no loop, route hide/resume, readable image-error fallback. Existing real audio survives navigation. PNGs are about3.14MB/2.92MB; web compression still pending.
- Route regression reproduced historical Oracle race: async identities could execute before cards/profiles. Changed three Oracle script tags in index to ordered defer and rebuilt routes. Weekly stays async; Oracle source content/meanings untouched. Deterministic800ms delay tests reproduce0identities+error before and78identities+no errors after.
- 32 protected files and13Garden-lock files hash-identical. Garden/Music scene code, CSS, source artwork and audio data unchanged.

## Evidence and review
Preview: http://127.0.0.1:8784/works/ . One new in-app preview was opened only after inventory showed no remaining localhost preview tabs, and marked deliverable. Reuse it.

`docs/qa/shows-2026-09-14/`:
- `acceptance-receipt.json`:12/12SHOWS checks, five viewports320×568,390×844,768×1024,844×390,1440×900; real player, back/reload, no-JS, reduced motion, lazy art and image failure.
- `regression-final/ui-receipt.json`:13/13full-site checks after ordered-defer fix, including8direct routes, real audio26albums, MAP, keyboard/lightbox/Sky, mobile, fallback and no page errors.
- `oracle-before.json` / `oracle-startup.json`: two intentionally delayed dependency cases before/after fix.
- `preservation-receipt.json`:32+13checks, no changed protected files.
- `shows-1440x900.png`, `shows-390x844.png`, full-page versions and3other viewport captures. Inspected desktop/portrait/full layout plus visible in-app preview. Device scope is Chrome emulation; no physical-phone performance/battery test.
- Earlier `regression/` retains the failed concurrent pre-fix run (Oracle race and a transient readiness timeout); final sequential run above is authoritative. No test failure was hidden or removed.

## Next exact work
1. Review the SHOWS static composition in the same Garden/Music family; refine only if feedback identifies a mismatch. Static art acceptance remains user-owned; tests do not approve aesthetics.
2. Continue VISUAL: same existing greenhouse/daylight, work-in-progress mood, real personal fragments/lightbox, light host presence; separate desktop/portrait composition. Then STORY: personal porch/evening scene, existing chapters/InnerWorld and subtle family traces. Keep real content and navigation.
3. Only after ALL backgrounds/layout/scenery are completed and reviewed, build selective effects plus real multi-gesture host source frames/atlas/runtime. Include idle/blink, welcome/invitation and context clips, clean first/last loop, grounded foot anchor, no character identity drift, lazy atlas, pause/off-route/hidden and reduced-motion static fallback. Do not substitute one-pose CSS sway for sprite animation.
4. Web image compression, physical-device profiling, Flat/accessibility and release-content checks remain. This pass fixes the Oracle load-order bug only, not blanket release readiness.

No usage stop was encountered; last live usage27%five-hour/4%weekly. Recheck next sustained continuation and honor95%save/handoff rule. No reset credit used.


## 17 September 2026 · V2 wrap-up and rebuilding assessment

User requests stopping implementation, evaluating art/experience and proposing reconstruction because inspiration is below average. Supersedes the earlier instruction to expand Shows/Visual/Story and any inference that prior Garden approval is final acceptance now.

The immediately preceding About change is implemented locally: Garden/Music/About navigation; résumé plus original181gallery items and18videos; old work/visual/story paths redirect to About; no individual case studies. Shows assets retained only as history. Sep14 About functional receipt has10passes; mobile gallery visual QA remains incomplete (blank tiles in capture). Host is still one pose; no multi-gesture sprite loops yet.

Saved detailed assessment and three unselected proposals in docs/production/V2-WRAPUP-AND-REBUILD-2026-09-17.md. Recommend testing an intimate2.5D room/porch with meaningful music/photo/notebook interactions; alternatives are a personal editorial magazine or a short three-scene narrative. Stop scene/effect expansion. Next implementation follows direction choice and a small desktop/mobile static proof, then interaction proof, before asset production.

Fetched remote: behind6/ahead0, inspected music/font log, no merge. This wrap-up changes documentation only. No commit/push/deployment. HTTP preview responds200 after restart; in-app navigation still errored, so assessment uses saved captures plus current source, not a fresh successful live walkthrough.


## 17 September 2026 · Fresh independent V2 direction

User clarified: one garden in view, record stall with deliberate choose/place/play, profile/résumé and gallery inside the garden; no stage, scroll-led tour or entrance gate. Wants emotional spatial depth and meaningful character/environment loops; 2.5D is acceptable.

User permits rebuilding frontend, player, layout, scenery and host without preserving V1 or old V2 assets/code. Only gallery images carry over by default; music connects to its independent store. Local source confirms an external AUDIO_BASE plus a track-path map; authoritative album metadata still needs verification before integration. Profile/résumé remains required, with verified factual content and new presentation. Existing files are not authorized for deletion.

Saved docs/production/V2-FRESH-BUILD-BRIEF-2026-09-17.md, prepended SESSION-HANDOFF.md and marked the earlier wrap-up historical. Next is whole-garden desktop/mobile composition and opened-stall state, with a small early motion proof. This is a requirements update, not completed art or implementation.

Fetched origin/main: behind6/ahead0; inspected six music/font commits. Mixed uncommitted application work preserved. Documentation only this turn; no merge, commit, push or deploy.


# CURRENT · Fresh V2 built locally · 17 September 2026

Latest user authorization: “portfolio cũng chỉ là 1 phần nằm trong đó ... cái gì ổn thì build.” Build the experience with music central and portfolio secondary. The new authorization supersedes earlier implementation pauses and requirements to retain old UI/player/host. Simplified meaningful animation is acceptable; performance is a priority.

**New independent application: `fresh/dist/`. Preview: http://127.0.0.1:8791/ .** See `fresh/README.md` and `fresh/qa/`. Do not resume old scenic routes by mistake.

Implemented: one garden, new desktop/portrait art, new four-state host, choose/place/explicit Play, one native audio player, in-garden résumé and gallery drawers. 28 albums / 226 tracks / 213 mapped URLs; 13 unmapped disabled honestly. 171 gallery images, all local references exist. No legacy runtime. Metadata is an extracted snapshot; audio stays in separate R2 store. Generated art is raster, not UE/Twinmotion or an editable 3D scene.

Verified locally: actual audio playback and elapsed progress, selection no-autoplay, closing drawer keeps playback, pause, rapid selection, image lightbox/next/Escape, profile and disabled missing links. Desktop1440×900, mobile390×844, portrait889×1150 visual review. Initial file bytes about465KB desktop/371KB mobile. No captured browser console errors. Not a physical-device performance or thermal certification; no full 213-track playback audit. Small host gesture loop and static environment are the current motion scope; richer character/environment motion is not claimed complete. User art acceptance is still open.

Next continuation should start with this build and the user's concrete feedback, then improve it or perform targeted physical-device QA. Preserve existing mixed uncommitted work. No merge, commit, push or deployment occurred. Server was started locally with `python3 -m http.server 8791 --bind 127.0.0.1 --directory dist` from `fresh/`.

---


## 2026-09-17 — Codex Fresh Garden wildlife follow-up (local only)

Continued only `fresh/` from the accepted refinement and later living-garden pass. Fixed detached shoe grass/duplicated edge foliage; added icon-only day/night/auto and ambience, exact 05:30–17:30 day time, selected-album Li dialogue and gentle random messages. New imagegen wildlife drawings were accepted by Ali; subsequent steering required mapped perches, sparrow pairs/small groups, no species parade, and faster call/response birdsong. Those behavior corrections are implemented locally. 22 regression checks pass. Latest detailed handoff: `docs/production/V2-FRESH-WILDLIFE-WRAPUP-2026-09-17.md`; QA: `fresh/qa/wildlife-2026-09-17/`. No commit/push/deploy, no legacy Oracle edits, no changes to prior music/art data. Physical-device background audio and private audio delivery remain unverified/unimplemented respectively.


## 2026-09-17 — Codex: Fresh final-review follow-up (local only)

User accepted most of the preceding wildlife work and requested a final revision before an on-air review. Generated two exact-composition night relighting plates, crossfaded through the existing three scenic layers; removed blanket nighttime grading. Animals leave beyond the frame at full opacity, with pond/low-plant fireflies and a single bat pass. User confirmed **78 cards**, so the conversational daily gift now uses the approved full source deck and identical date/device selection to the first card of the legacy Oracle; ordinary Li quotes stay random. Gallery is compact masonry with large pin detail and browser-local hearts. Video remains in Điều để dành → Video; blank external Vimeo embed is not certified, source link made prominent. Record is resized to the whole platter, visibly rotates on play and holds on pause. Original assets/catalog remain unchanged; 26 checks pass. No commit, push or deployment. Awaiting user final visual approval. Handoff: `docs/production/V2-FRESH-FINAL-REVIEW-2026-09-17.md`.


## 2026-09-17 — Codex: Fresh release package and v1 keepsake

Ali approved moving to the new look ("còn lại là triển"), requested a safe v1 archive and optionally a Vietnamese profile based on Ali_Huynh_Resume_2026.pdf. The Fresh profile now has a concise Vietnamese introduction, three capability areas, verified work history and education/teaching in the existing expandable section. The full CV, phone number and future project details are not added to the public runtime.

Loading now has a lightweight dandelion interaction: tap to send a gust while a room or the scenery is actually loading. Cached/loaded content appears immediately; the scenic hint cannot block entry. Reduced-motion preferences are respected. The release base URL is preserved when changing room hashes. Tablet scenery fills its frame; the phone scene softly meets the reserved player area.

V1 archive: `../website-archives/2026-09-17-v1-before-garden/ĐỌC-TRƯỚC.md`. Contains exact live origin/main ZIP at 487e4fd, complete local Git bundle, 1,666-file workspace snapshot, old hero source and URL manifest. ZIP CRC and git bundle verification pass. A supplementary 210-file audio download completed before Ali clarified that audio already exists locally. No more audio downloads; his local music archive is untouched. External video binaries are not archived, only provider URLs/metadata.

Release prepared independently in `../portfolio-garden-release-2026-09-17/`, branch `codex/garden-v2-release-2026-09-17`, based on current origin/main, leaving mixed uncommitted work in the development checkout untouched. Root `index.html` loads the isolated `garden-v2/` runtime; old tracked v1 assets remain preserved. No uploaded backups, original CV or local audio files.

Verification: 31 checks pass; 488 runtime files / 30,456,659 bytes; 108 literal relative references and 448 content asset references resolve. Browser release-path smoke confirms profile, 28-album shelf, album selection without autoplay, one native audio element, no broken loaded images, and close/back navigation. Profile checked on desktop and 390×844 phone; 834×1112 tablet scenery checked. Throttled local QA server exercised the interactive loading state; production has no artificial loading delay. No browser console errors captured. QA: `fresh/qa/release-2026-09-17/`.

Publication status at handoff: release commit/package prepared, not yet pushed. Per AGENT-RULES.md §3, final push is delivered as a dated `.command` for Ali to double-click; this checkpoint is preserved. Script checks the expected remote revision before pulling/pushing, refuses changed release files, then checks the deployed HTML after Pages builds. Do not report live until that receipt passes. Device background/lock-screen audio remains to be validated on real iPhone/iPad/Android; public R2 playback links still have UI download deterrents only, not server-side access control.


## 2026-09-17 — Codex: Vườn của Li V2 is LIVE

Ali explicitly requested direct publication ("live đi em, cho phép, miễn v1 đã an toàn"). Reverified all archive checksums/ZIP CRC and complete Git bundle. Clean release worktree remained at 64f76b3, origin/main at the expected 487e4fd; pull was already up to date. Pushed release commit `64f76b313c67d6345cae48eaa87f66a244bce07b` to main without force. GitHub Pages build/deploy succeeded (run 35208057344). Live URL: https://alih86.github.io/anhli-portfolio/ .

Five deployed resources returned HTTP 200 and hashes identical to release (root HTML, app, profile, loading, night art). Browser verified 28 albums, no autoplay on selection, real playback of Quên Vầng Trăng Thề, elapsed progress 18.47→28.39 seconds across closing the tray, one audio element and disc-spin animation. No broken loaded images or captured console errors. Paused the test song and left the live tab open. Proof: `../website-releases/2026-09-17/live-receipt.json`, `release-receipt.json`, and `fresh/qa/release-2026-09-17/live-garden.png`.

V1, original sources and local music remain untouched. No more audio downloaded. Archived the one-time deployment helper. The physical-device/background-audio, external embed and public audio URL limitations from the previous handoff remain; deployment does not certify those. No unrelated development changes were staged, committed or removed.


## 2026-09-17 — Codex: user paused at live baseline; comparison saved

Ali says the live version is currently acceptable, with a few unspecified points to fix and improve next session. Saved `docs/production/V2-LIVE-WRAPUP-2026-09-17.md` and `fresh/checkpoints/2026-09-17-live-wrapup/checkpoint.json`; current handoff and Fresh README point to this pause. Existing v2 ZIP checksum was verified; v1 archive remains intact. No runtime edits, asset generation, additional audio downloads, commits, or deployments in this wrap-up. Release worktree remains clean at 64f76b3.

Compared archived v1 487e4fd with live v2 64f76b3 using source sections/player controls and release evidence. V2 strengthens the garden/music identity; v1 had more visibly separated professional content and legacy Oracle/calendar/Vedic experiences. V1 shuffle is not yet carried into the simpler v2 player. Saved a prioritized proposal: receive exact user notes, real-device audio/performance and 13 unmapped tracks first; then music search, gallery/role context and a quick professional route; access-controlled audio and extra ambient diversity later. These are recommendations, not an approved implementation batch. No unmeasured performance superiority is claimed.
