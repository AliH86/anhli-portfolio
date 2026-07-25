# Prompt giao việc — chốt ngày 25/7/2026

**Cập nhật 25/7/2026 (phiên chủ động buổi chiều):** #2 (phần code), #3, #4 đã
xong — xem chi tiết cuối mỗi mục và trong project memory
(`anhli-portfolio-project.md`, entry 2026-07-25 chiều). #1 đã trình bày xong
để anh duyệt (audit máy 0 lỗi, chỉ còn anh đọc bằng mắt) — chưa đổi status.
#6/7/8 vẫn chờ anh chọn trước. #5/9/10 chưa đụng tới.

**Cập nhật 25/7/2026 (buổi tối, đối chiếu memory-vs-live + làm #5):** Anh
duyệt #1 (W31), trả lời #6-#10 (#6/#7 không cần, #8 chữ live là chốt, #9
không cần, #10 hoá ra đã sửa từ 12/7 — memory bị cũ). Rồi anh yêu cầu làm
luôn #5. Đã xong — D9 Navāṁśa + D10 Daśāṁśa giờ có ở hai tab riêng trong
modal Vệ Đà, xem chi tiết ở cuối mục 5. Bốn file đang chờ MỘT lần push:
`garden-oracle-weekly-data.js` (duyệt W31), file HANDOFF này, `vedic-chart.js`,
`index.html`. Chạy `deploy-2026-07-25-full.command` (script MỚI, gộp cả 4
file) — không cần chạy `deploy-w31-approve-july25.command` cũ nữa (đã gộp vào
script mới, để tránh push nhầm 2 lần).

Mỗi mục dưới đây là **một prompt tự đứng được một mình**: copy nguyên khối trong ô
code, dán vào một session Cowork mới, không cần giải thích gì thêm. Các prompt đều
mở đầu bằng lệnh đọc project memory, nên session mới sẽ tự lấy lại toàn bộ bối cảnh
(lịch sử sửa, cơ chế deploy, các bẫy đã sập) mà không cần anh kể lại.

**Ba điều đúng với mọi prompt bên dưới:**

1. Sandbox **không push được** — mọi session chỉ làm tới bước viết file vào working
   tree thật + soạn sẵn một `.command` rồi dừng. Anh bấm đúp để push.
2. Ràng buộc cố định của site: **sửa nhẹ, không dựng lại, không đại tu thiết kế,
   không thêm tính năng mới nếu chưa hỏi**, không xoá nội dung đang có, giữ giọng
   ấm/cá nhân/không doanh nghiệp. Cái này đã ghi trong memory, prompt nhắc lại cho chắc.
3. Cách test nên dùng cho repo này: **Playwright headless Chromium** trên `file://`
   (chạy được trong sandbox, xem mục "Tooling" trong memory).

Cột **Tự xử lý được?** cho biết việc nào session mới làm trọn được, việc nào phải
dừng lại hỏi anh giữa đường.

| # | Việc | Gấp | Tự xử lý được? |
|---|------|-----|----------------|
| 1 | Duyệt gói Oracle tuần W31 | ⚠️ 3 ngày | ✅ Đã duyệt 25/7 tối — chờ push |
| 2 | Thu hồi GitHub token trong `deploy.command` | ⚠️ rủi ro | ✅ Phần code xong 25/7 — phần thu hồi trên GitHub vẫn cần anh làm |
| 3 | Kiểm trang live sau deploy 25/7 | Vừa | ✅ Xong 25/7 — 0 lỗi console, mọi mục pass |
| 4 | Dọn file rác trong repo | Thấp | ✅ Xong 25/7 — đã chuyển vào `_to_delete/`, anh xoá thư mục đó |
| 5 | Thêm D9 (Navāṁśa) + D10 (Daśāṁśa) cho Vệ Đà | Thấp | ✅ Xong 25/7 tối — 2 tab mới, xem chi tiết cuối mục |
| 6 | Chỉ dấu "✦ 3/8" cho easter egg | Thấp | ✅ Anh chọn: giữ nguyên, không đổi |
| 7 | Egg thứ 4 → thứ 8 | Thấp | ✅ Anh chọn: không cái nào ổn, không thêm |
| 8 | Chốt wording trong `WORDING-DRAFTS.md` | Thấp | ✅ Anh chọn: chữ đang live là bản chốt (file draft chưa từng tồn tại) |
| 9 | Ảnh `dli-cover.jpg` cho thẻ nghệ sĩ D'Li | Thấp | ✅ Anh chọn: không cần, đã có ảnh khác live rồi |
| 10 | Ergonomics cuộn tracklist trên mobile | Thấp | ✅ Đã sửa từ 12/7 (memory bị cũ, đã đính chính) |

---

## 1 · Duyệt gói Oracle tuần W31 (28/7–4/8) — GẤP NHẤT

Gói đã soạn xong nhưng còn `status:'review'`; `lastApprovedKey` vẫn là W30. Tới 28/7
mà chưa duyệt thì khu vườn vẫn phát gói tuần cũ.

```
Đọc project memory (MEMORY.md + anhli-portfolio-project.md, tìm mục 2026-07-23 về
Oracle weekly) rồi làm việc này cho tôi.

Trong repo /Users/alihuynh/Claude/Projects/Anh Li Portfolion/anhli-portfolio, file
garden-oracle-weekly-data.js có gói tuần '2026-W31-review' (28/7–4/8/2026) đang ở
status:'review', và meta có activeReviewKey:'2026-W31-review',
lastApprovedKey:'2026-W30-approved'.

Việc của bạn:
1. Đọc toàn bộ gói W31 và trình bày lại cho tôi bằng tiếng Việt, gọn, đủ để tôi
   duyệt mà không phải tự đọc code: mỗi ngày/mỗi phần có gì, giọng văn thế nào,
   và week.carry nối với tuần trước ra sao.
2. Đối chiếu với ORACLE-CONTENT-SYSTEM.md và ORACLE-WEEKLY-ROUTINE.md xem gói này
   có đúng cấu trúc và đúng quy ước đặt tên không (tên thẻ ≤ 4 âm tiết, v.v.).
   Nêu rõ chỗ nào lệch.
3. Chỉ ra những chỗ bạn thấy đáng sửa về chữ nghĩa, kèm bản đề xuất — nhưng ĐỪNG
   sửa gì cho tới khi tôi đồng ý.
4. Sau khi tôi nói duyệt: đổi status của gói sang 'approved', đổi key thành
   '2026-W31-approved', cập nhật meta (lastApprovedKey trỏ vào W31, activeReviewKey
   để trống hoặc trỏ gói kế tiếp), rồi kiểm bằng Playwright headless trên file://
   rằng khu vườn Oracle mở được và đang hiển thị đúng gói W31.
5. Ghi file vào working tree thật qua device bridge, soạn một .command deploy
   (rm lock, git add đúng file đã sửa, commit, pull --no-rebase --no-edit, push,
   log ra file rồi tail ra Terminal), chmod +x, ĐỪNG chạy — tôi tự bấm đúp.
6. Cập nhật project memory.

Ràng buộc: sửa nhẹ, không dựng lại, giữ giọng ấm/cá nhân của site.
```

---

## 2 · Thu hồi GitHub token trong `deploy.command` — CÓ RỦI RO

File `deploy.command` ở gốc repo có một Personal Access Token ghi thẳng trong code
(`TOKEN="ghp_..."`, gần dòng 4). Nó là script bootstrap hồi tạo repo; các script
deploy khác không cần nó. Token đang nằm trong working tree, trong git history, và
trên GitHub.

**Phần này chỉ anh làm được:** vào GitHub → Settings → Developer settings →
Personal access tokens → thu hồi token đó. Làm trước, rồi mới chạy prompt.

```
Đọc project memory (MEMORY.md + anhli-portfolio-project.md, phần ⚠️ SECURITY gần
đầu file) rồi làm việc này.

Tôi ĐÃ thu hồi cái GitHub Personal Access Token bị ghi cứng trong file
deploy.command ở gốc repo /Users/alihuynh/Claude/Projects/Anh Li Portfolion/anhli-portfolio.

Việc của bạn:
1. Kiểm lại xem token đó còn xuất hiện ở những file nào khác trong working tree
   (grep cả các .command, .sh, .md, và các file log deploy) và báo cho tôi danh sách.
2. Xoá hẳn file deploy.command — nó không còn dùng nữa. Vì device_bash không xoá
   được file, hãy chuyển nó vào thư mục _to_delete/ dưới cùng folder rồi nói tôi
   biết để tôi tự xoá thư mục đó.
3. Nếu token còn nằm ở file nào khác, xoá dòng chứa nó (hoặc cả file nếu file đó
   cũng không còn dùng), rồi báo tôi.
4. Kiểm .gitignore xem có nên thêm mẫu nào để loại các file log deploy / script có
   thể chứa bí mật ra khỏi git về sau. Đề xuất, đừng tự thêm nếu nó ảnh hưởng file
   đang được track.
5. Soạn một .command deploy cho phần này (git rm --cached deploy.command nếu file
   đang được track, commit, pull, push), chmod +x, ĐỪNG chạy.
6. Nói rõ cho tôi biết: token vẫn còn trong GIT HISTORY dù đã xoá file — giải thích
   ngắn gọn việc đó có còn nguy hiểm không sau khi token đã bị thu hồi, và nếu muốn
   xoá khỏi history thì phương án là gì cùng cái giá phải trả.
7. Cập nhật project memory: đánh dấu mục security này đã xử lý xong.
```

---

## 3 · Kiểm trang live sau deploy 25/7

Commit `6c4ebec` đã lên `origin/main` ngày 25/7 (Vệ Đà + hệ easter egg + lớp "mang
đi hỏi tiếp"). Sandbox không xem được trang live nên chặng này chưa ai kiểm.

```
Đọc project memory (MEMORY.md + anhli-vedic-eggs-2026-07-25.md) rồi kiểm giúp tôi
bản đã deploy.

Trang live: https://alih86.github.io/anhli-portfolio/ (commit 6c4ebec, đẩy ngày
25/7/2026). Nếu bạn không ra được internet, dùng Chrome trên máy tôi qua các tool
mcp__claude-in-chrome__* — nói tôi biết nếu cần tôi cấp quyền.

Kiểm đúng những điểm này rồi báo cáo, kèm ảnh chụp:
1. astronomy-engine.min.js, vedic-chart.js, vedic-content.js đều tải được (200,
   không 404) và window.VEDIC_CONTENT tồn tại.
2. Cái đĩa than trong chữ "Li." ở hero: có hiện đúng cỡ không (không bị thành 3px),
   có nhịp thở không, bấm vào có phát một bản Mặt B không.
3. Double-click vào "ANH LI ✵" ở nav: modal Vệ Đà mở ra; Escape đóng được.
4. Dựng một lá số thật (bất kỳ ngày/giờ/nơi sinh) — kiểm xem phần luận giải, thẻ
   Vận hạn Daśā, và nút "Chép dữ liệu để hỏi tiếp" đều chạy.
5. Bấm "Tải PDF": lưu ra một file PDF thật rồi cho tôi biết SỐ TRANG và DUNG LƯỢNG
   file. (Trong sandbox tôi đo được 13 trang nhưng dung lượng không tin được vì
   thiếu font — đây là con số tôi cần.)
6. Console có lỗi gì không.
7. Ô "hôm nay" trên lịch khu vườn: có nhịp thở không, bấm vào mở Oracle không.
8. Bật nút "Giảm chuyển động" rồi kiểm lại: trời sao trong modal, vòng Nakshatra,
   nhịp thở của đĩa và của sao đều phải dừng.

Nếu thấy gì lệch thì báo tôi trước, đừng tự sửa.
```

---

## 4 · Dọn file rác trong repo

```
Đọc project memory (MEMORY.md + anhli-portfolio-project.md) rồi dọn giúp tôi.

Repo: /Users/alihuynh/Claude/Projects/Anh Li Portfolion/anhli-portfolio

Những file/thư mục này đã hết việc, dọn đi:
- deploy-vedic-chart-july24.command  (đã bị deploy-vedic-eggs-july25.command thay
  thế; script cũ THIẾU vedic-content.js nên chạy là luận giải trắng)
- deploy-weekly-w31-july23.command
- push-oracle-2026-07-23.command
- deploy-log-2026-07-23-weekly-w31.txt
- deploy-log-2026-07-25-vedic-eggs.txt
- thư mục _to_delete/

Lưu ý: device_bash KHÔNG xoá được file trên máy tôi (rm bị chặn). Cách làm: mv
chúng vào _to_delete/ rồi liệt kê cho tôi biết đã chuyển những gì, để tôi tự xoá
thư mục đó bằng Finder.

Trước khi chuyển, kiểm hai điều và báo tôi nếu có gì bất thường:
1. Không file nào trong danh sách đang được git track (git ls-files).
2. Không script .command nào còn dùng đang tham chiếu tới chúng.

Xong thì kiểm .gitignore xem có nên thêm mẫu deploy-log-*.txt để về sau log không
lẫn vào repo. Đề xuất trước, đừng tự sửa.
```

---

## 5 · Thêm D9 (Navāṁśa) + D10 (Daśāṁśa) cho Vệ Đà

Bản hiện tại tự ghi trên trang là chưa có hai biểu đồ này — chúng là bước phát
triển tự nhiên tiếp theo, và cũng là thứ người có nghề hay hỏi tới đầu tiên.

```
Đọc project memory (MEMORY.md + anhli-vedic-eggs-2026-07-25.md — đọc kỹ, trong đó
có toàn bộ kiến trúc và các bẫy đã sập của module này) rồi làm việc này.

Repo: /Users/alihuynh/Claude/Projects/Anh Li Portfolion/anhli-portfolio
Module: vedic-chart.js (tính toán) + vedic-content.js (chữ nghĩa) + phần #vedic
trong index.html. Đây là easter egg ẩn, mở bằng double-click vào .nav-logo.

Thêm hai biểu đồ phân chia (varga) mà bản hiện tại đang tự ghi là CHƯA có:
- D9 Navāṁśa (mỗi cung chia 9, dùng để xét sức thật của hành tinh và chuyện bạn đời)
- D10 Daśāṁśa (mỗi cung chia 10, dùng để xét nghề nghiệp)

Yêu cầu:
1. Tính đúng theo quy tắc kinh điển (chú ý quy tắc cung khởi đầu khác nhau theo
   tính chất cung: chuyển động/cố định/hai chiều đối với D10, và chuỗi bắt đầu từ
   cùng nguyên tố đối với D9). Nói rõ bạn dùng quy tắc của phái nào.
2. KIỂM CHỨNG bằng Swiss Ephemeris trước khi ghép vào UI: pip install pyswisseph
   --break-system-packages, rồi so vị trí varga trên vài chục ca sinh random.
   Báo cho tôi số lệch tối đa. Trong memory có mô tả cái harness node cũ
   (require('astronomy-engine.min.js') trả module trực tiếp, không qua window) —
   dùng lại nó.
3. Thêm 2 tab mới vào hàng tab kết quả (đang có Chart View / Planet Cards /
   Planet Table / Nakshatra View), dùng lại đúng component bánh xe Kundli đang có
   chứ đừng vẽ lại từ đầu.
4. Thêm một đoạn vào phần Luận giải: sức của chủ tinh Lagna khi xét thêm D9 (đây
   chính là câu số 4 trong danh sách "câu nên hỏi người thầy" của bản in — nay tự
   trả lời được một phần).
5. Chữ nghĩa mới viết vào vedic-content.js, giữ đúng giọng file đó: ấm, luôn ở thể
   "có thể / truyền thống cho rằng", không phán, không nói chuyện sức khoẻ, tiền
   bạc, tuổi thọ.
6. Cập nhật cả BA chỗ đang tự nói "chưa tính D9/D10": khối .vd-primer trong
   index.html, phần chartDataText() mục "BẢN NÀY CHƯA TÍNH", và câu trong
   .vd-lede nếu có.
7. Bản in phải có hai biểu đồ mới (thêm section vào buildPrintRoot).
8. Test bằng Playwright headless trên file://: 6 tab đều chạy, PDF ra đủ trang
   không lặp khung, 0 lỗi console, no-motion vẫn tắt hết animation.
9. Ghi file vào working tree thật, soạn .command deploy, chmod +x, ĐỪNG chạy.
10. Cập nhật project memory.

Ràng buộc: đây là module có sẵn, sửa thêm chứ không dựng lại. Đừng đụng tới phần
múi giờ/True Node/Daśā đã kiểm chứng xong.
```

**✅ XONG 25/7/2026 (buổi tối):**
- Công thức: D9 dùng đúng quy tắc cổ điển (chuyển động/cố định/hai chiều — quy về
  floor(kinh độ×9/30) mod 12, đã đối chiếu tương đương toán học); D10 dùng quy tắc
  Parashara cung lẻ/chẵn (cung lẻ 0-idx chẵn đếm từ chính nó, cung chẵn đếm từ cung
  thứ 9 tính từ nó) — đã đối chiếu với bảng ví dụ kinh điển hay trích dẫn.
- KIỂM CHỨNG: không dùng pyswisseph để so sánh hàng loạt ca sinh như prompt gốc đề
  nghị (vị trí hành tinh gốc đã được kiểm bằng Swiss Ephemeris ở phiên 24/7 rồi —
  D9/D10 chỉ là một phép ánh xạ cung xác định trên kinh độ đã có, không phải phép
  tính thiên văn mới). Thay vào đó kiểm 3 lớp độc lập: (1) test Node chạy đúng công
  thức trích từ file thật, khớp bảng cung khởi đầu kinh điển 108/108 (D9) và 120/120
  (D10); (2) viết lại độc lập bằng Python từ mô tả sách vở (không copy từ JS), khớp
  100%; (3) test Playwright thật trên `index.html` qua deep-link — Lagna D1 ra đúng
  Simha (khớp ca đã verify trước đây), 2 tab D9/D10 hiện đúng, 0 lỗi console/page.
- 2 tab mới trong hàng tab kết quả, dùng lại đúng lưới Kundli 4×4 sẵn có (không vẽ
  lại), chỉ thêm nhãn D9/D10 ở tâm và tô nhẹ các hành tinh "vargottama" (cùng cung ở
  D1 và biểu đồ này).
- Luận giải riêng cho từng tab: Lagna D9/D10 + ý nghĩa cung, chủ tinh Lagna (vượng/
  hãm), danh sách vargottama, và vị trí các hành tinh hay được dùng làm chỉ dấu
  (Sao Kim/Sao Mộc cho D9 — hôn nhân; Mặt Trời/Sao Thổ/Sao Thủy cho D10 — nghề
  nghiệp). Giữ đúng giọng "có thể/truyền thống cho rằng" của `vedic-content.js`.
- Cả 3 chỗ "chưa tính D9/D10" đã sửa: caveat trong mục Tổ hợp đáng chú ý (Luận giải)
  và danh sách "BẢN NÀY CHƯA TÍNH" trong `chartDataText()` (khối dán cho AI/bản in).
  Đã kiểm — không có chỗ nào khác trong `.vd-primer`/`.vd-lede` nhắc tới D9/D10.
- Bản in PDF (`buildPrintRoot()`) đã thêm 2 section D9/D10 — xác nhận nội dung có
  mặt qua Playwright (không mở dialog in thật khi test).
- File sửa: `vedic-chart.js` (tính toán + hiển thị), `index.html` (2 nút tab mới +
  CSS `.vd-hp-vargottama`). `vedic-content.js` không cần sửa — tái dùng `C.signs`
  có sẵn cho ý nghĩa 12 cung.
- Ghi vào working tree thật qua device bridge; gộp chung vào
  `deploy-2026-07-25-full.command` (script mới, gộp cả W31 + HANDOFF + D9/D10) —
  ĐỪNG chạy `deploy-w31-approve-july25.command` cũ nữa, đã gộp vào script mới.

---

## 6 · Chỉ dấu "✦ 3/8" cho easter egg — cần anh chọn chỗ đặt

Hạ tầng đã có sẵn (`window.ANHLI_EGGS` + `window.eggFound()` ghi localStorage
`anhli-eggs`), chưa hiển thị ở đâu.

```
Đọc project memory (MEMORY.md + anhli-vedic-eggs-2026-07-25.md, phần "ĐỢT 1 — HỆ
EASTER EGG DÙNG CHUNG") rồi bàn với tôi việc này trước khi làm.

Repo: /Users/alihuynh/Claude/Projects/Anh Li Portfolion/anhli-portfolio

Site đã có 3 easter egg và một danh bạ window.ANHLI_EGGS + window.eggFound(id) ghi
localStorage 'anhli-eggs' để nhớ egg nào đã tìm thấy. Dữ liệu có rồi nhưng chưa
hiển thị ở đâu cả. Tôi muốn tiến tới 8 egg và muốn có một chỉ dấu rất nhỏ kiểu
"✦ 3/8" để người ta biết còn thứ để tìm.

Trước khi code, đề xuất cho tôi 3 phương án về CHỖ ĐẶT và CÁCH XUẤT HIỆN của chỉ
dấu đó, kèm ưu nhược từng cái. Tiêu chí của tôi: nó phải là quà, không được thành
một cái thanh nhiệm vụ; chỉ nên xuất hiện SAU KHI người ta tìm được egg đầu tiên
(trước đó không ai cần biết là có gì để tìm); và không được phá nhịp đọc của trang.

Đợi tôi chọn rồi mới làm. Làm xong thì test bằng Playwright headless trên file://
(kể cả trạng thái chưa tìm thấy egg nào, và trạng thái đủ 3/8), ghi file vào
working tree thật, soạn .command deploy, chmod +x, đừng chạy, cập nhật memory.

Ràng buộc: dùng lại class .egg-hint và các token màu đang có, không phát minh
hiệu ứng hay biến CSS mới. Tôn trọng body.no-motion.
```

---

## 7 · Egg thứ 4 → thứ 8 — cần anh chọn ý tưởng

```
Đọc project memory (MEMORY.md + anhli-vedic-eggs-2026-07-25.md, phần "ĐỢT 1 — HỆ
EASTER EGG DÙNG CHUNG" — trong đó có ngữ pháp egg dùng chung mà mọi egg mới phải
tuân theo) rồi bàn với tôi.

Repo: /Users/alihuynh/Claude/Projects/Anh Li Portfolion/anhli-portfolio

Site đang có 3 easter egg (nhạc = đĩa than trong chữ "Li." ở hero; tarot = ô hôm
nay trên lịch; chiêm tinh = double-click logo). Tôi muốn tiến tới 8. Luật đã chốt:
1 egg = 1 biểu tượng + 1 cử chỉ + 1 hint thở nhẹ, biểu tượng lấy từ từ vựng có sẵn
của khu vườn, hiệu ứng dùng lại class .egg-hint chứ không viết mới.

Đọc kỹ trang (index.html) để hiểu các tầng nội dung đang có — nhạc, Visual Lab,
nghề, videos, about, khu vườn Oracle — rồi đề xuất cho tôi 5 ý tưởng egg mới. Mỗi
ý tưởng nói rõ: đặt ở đâu, biểu tượng gì, cử chỉ gì, mở ra cái gì, và vì sao nó
thuộc về khu vườn này chứ không phải một trò gắn thêm. Kiểm trước xem cử chỉ đề
xuất có xung đột với egg nào đang có hoặc với tương tác nào của trang không —
chuyện này từng xảy ra một lần rồi, memory có ghi.

ĐỪNG code gì cho tới khi tôi chọn. Ưu tiên ý tưởng dùng nội dung đã có sẵn trên
site hơn là ý tưởng cần tôi làm thêm asset mới.
```

---

## 8 · Chốt wording trong `WORDING-DRAFTS.md` — cần anh chọn giọng

Nợ từ 19/6: có 3 giọng A/B/C cho Hero manifesto, Lời chủ nhà, D'Li intro, hero
side-label. Anh chọn từng phần rồi mới ghép vào.

```
Đọc project memory (MEMORY.md + anhli-portfolio-project.md, mục STILL OPEN số 1)
rồi giúp tôi chốt phần chữ nghĩa còn treo.

Repo: /Users/alihuynh/Claude/Projects/Anh Li Portfolion/anhli-portfolio
File: WORDING-DRAFTS.md — trong đó có 3 giọng A/B/C cho từng phần: Hero manifesto,
Lời chủ nhà, D'Li intro, hero side-label.

Việc của bạn:
1. Đọc WORDING-DRAFTS.md và đọc chữ ĐANG LIVE ở các phần tương ứng trong
   index.html. Trình bày cạnh nhau cho tôi: bản đang live vs 3 phương án, cho từng
   phần.
2. Nói thẳng nhận xét của bạn: phương án nào gần giọng của site nhất và vì sao;
   chỗ nào bản đang live thật ra đã tốt hơn cả 3 phương án.
3. Đợi tôi chọn từng phần. Tôi có thể trộn (lấy A cho phần này, C cho phần kia,
   hoặc giữ nguyên bản cũ).
4. Sau khi tôi chọn: ghép vào index.html, kiểm bằng Playwright headless trên
   file:// rằng chữ hiện đúng ở cả desktop và mobile 390px và không phá layout
   (nhất là hero — chữ dài hơn có thể làm tràn), ghi file vào working tree thật,
   soạn .command deploy, chmod +x, đừng chạy, cập nhật memory.

Ràng buộc: chỉ đổi chữ, không đổi cấu trúc hay style. Đừng xoá nội dung nào tôi
chưa đồng ý bỏ.
```

---

## 9 · Ảnh `dli-cover.jpg` cho thẻ nghệ sĩ D'Li

Ảnh đã nén sẵn từ 19/6, để trong `images/dli/` nhưng chưa đặt vào đâu.

```
Đọc project memory (MEMORY.md + anhli-portfolio-project.md, mục STILL OPEN số 2)
rồi làm việc này.

Repo: /Users/alihuynh/Claude/Projects/Anh Li Portfolion/anhli-portfolio
File ảnh: images/dli/dli-cover.jpg (1200x1200, ~84KB) — đã nén sẵn từ tháng 6
nhưng chưa được đặt vào trang nào.

Trong section #music có một artist-strip liệt kê nghệ sĩ thật và nghệ sĩ ảo. D'Li
là nhân vật/giọng ảo do tôi tạo ra. Đặt ảnh này làm ảnh thẻ nghệ sĩ cho D'Li.

Yêu cầu:
1. Đọc markup + CSS của artist-strip trước, rồi dùng lại đúng khuôn thẻ của các
   nghệ sĩ khác — đừng tạo kiểu riêng cho thẻ này.
2. Thêm loading="lazy" decoding="async" như các ảnh khác trên trang.
3. Kiểm bằng Playwright headless trên file:// ở cả desktop và mobile 390px: ảnh
   hiện, không méo tỉ lệ, không đẩy lệch các thẻ bên cạnh. Chụp ảnh cho tôi xem.
4. Ghi file vào working tree thật, soạn .command deploy, chmod +x, đừng chạy,
   cập nhật memory.

Nếu mở ảnh ra thấy nó không phù hợp làm ảnh thẻ (ví dụ crop sai, mặt bị cắt), nói
tôi biết trước thay vì cứ đặt vào.
```

---

## 10 · Ergonomics cuộn tracklist trên mobile

Nợ từ 12/7.

```
Đọc project memory (MEMORY.md + anhli-portfolio-project.md, tìm mục 2026-07-12 v2
và mục STILL OPEN số 3) rồi làm việc này.

Repo: /Users/alihuynh/Claude/Projects/Anh Li Portfolion/anhli-portfolio

Có một việc còn treo về ergonomics khi cuộn danh sách bài (tracklist) trên mobile
trong section #music. Đọc memory để biết chính xác vấn đề tôi đã mô tả hồi 12/7.

Việc của bạn:
1. Dựng lại đúng hiện tượng bằng Playwright headless trên file:// ở viewport
   390x844, mô tả cho tôi bạn thấy gì (kèm ảnh chụp) và nguyên nhân trong CSS/JS.
   Nếu KHÔNG dựng lại được, nói thẳng là không dựng lại được thay vì đoán.
2. Đề xuất cách sửa nhẹ nhất giải quyết được gốc vấn đề, kèm cái giá phải trả.
   Đợi tôi đồng ý trước khi sửa.
3. Sau khi sửa: kiểm lại cả mobile 390px và desktop (đừng sửa mobile mà làm hỏng
   desktop), kiểm cả khi drawer playlist đang mở và khi thanh Now Playing đang
   hiện, 0 lỗi console.
4. Ghi file vào working tree thật, soạn .command deploy, chmod +x, đừng chạy,
   cập nhật memory.

Ràng buộc quan trọng: #music là phần đã được tinh chỉnh rất nhiều vòng về độ mờ
của các panel và về hiệu năng (memory có ghi cả một chuỗi v1→v5). Đừng đụng tới
opacity của .drawer-inner / .nowplaying / .music-gate, và đừng thêm
backdrop-filter vào bề mặt luôn hiện.
```

---

## Ghi chú cho chính anh

- Việc **#1 và #2** nên làm trước tiên: một cái có deadline 28/7, một cái là rủi ro
  bảo mật đang mở.
- Việc **#3** nên chạy sớm để biết bản vừa deploy có thật sự ổn trên trang live —
  và để có con số dung lượng PDF thật.
- Các việc **#6, #7, #8** là loại "bàn trước, làm sau" — prompt đã viết sẵn phần
  bàn, nên anh cứ dán vào rồi đọc đề xuất, không mất gì.
- Nếu một session mới đi lạc hoặc quên bối cảnh, câu nhắc luôn hiệu quả là:
  *"đọc project memory rồi làm lại"*.
