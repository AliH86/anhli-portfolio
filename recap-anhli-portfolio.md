# Recap — anhli-portfolio (cập nhật 13/7/2026)

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
