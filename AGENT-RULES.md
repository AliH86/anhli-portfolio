# Luật phối hợp — Claude ↔ Codex trên cùng repo anhli-portfolio

Ali dùng xen kẽ 2 agent (Claude qua Cowork, và Codex) trên cùng một working
tree/repo. File này là bản nháp luật chơi để tránh commit đè lên nhau hoặc
nhập nhằng giữa việc của agent này với agent kia. **Ali quyết** — đây chỉ là
đề xuất, sửa/thêm/bớt tuỳ ý rồi coi như chốt.

## 1. Trước khi bắt đầu sửa gì

- Luôn `git status` + `git fetch origin main` trước, xem local có lệch với
  `origin/main` không (`git rev-list --left-right --count origin/main...HEAD`).
  Nếu lệch → có khả năng agent kia hoặc Ali đã push gì đó, đọc log trước khi
  sửa tiếp lên nền cũ.
- Nếu thấy `git status` có sẵn uncommitted changes KHÔNG phải do agent hiện
  tại tạo ra (ví dụ agent trước để lại) — không tự ý `git add`/commit/xoá
  chúng. Nêu rõ với Ali đó là gì trước khi động vào.

## 2. Khi commit

- Chỉ `git add` đúng (các) file mình thực sự sửa trong phiên đó. **Không bao
  giờ dùng `git add -A` hay `git add .`** — dễ cuốn theo uncommitted work của
  agent/phiên khác đang nằm sẵn trong working tree.
- File dữ liệu tách riêng (`music-data.js`, `garden-oracle-data.js`,
  `garden-oracle-synthesis.js`, …) nên commit độc lập với `index.html` khi có
  thể, để mỗi lần cập nhật nội dung không phải đụng file lớn.
- Commit message nêu rõ phạm vi (feature/khu vực), tránh message chung chung
  kiểu "update" để agent sau còn đọc log mà hiểu commit đó động vào gì.

## 3. Khi push

- Sandbox của Claude (Cowork) không có git credentials thật — không tự push
  được. Cách làm: viết file `.command`, `chmod +x`, rồi chạy qua Finder
  (double-click) trên máy thật của Ali. Bước double-click này tự nhiên là
  điểm Ali duyệt trước khi lên live — **giữ nguyên bước này**, không tìm cách
  bỏ qua kể cả khi có quyền push trực tiếp.
- Trước khi viết script push, luôn `git pull --no-rebase --no-edit origin
  main` trong script để tránh bị `non-fast-forward` nếu agent kia đã push
  trong lúc mình đang làm việc.
- Không push khi Ali chưa duyệt nội dung thay đổi trong chat.
- Sau khi script chạy xong và push thành công, đợi ~30–60s rồi mới fetch lại
  trang live để kiểm tra — GitHub Pages build có độ trễ, kiểm tra ngay lập
  tức dễ tưởng nhầm thay đổi chưa lên.
- **Riêng cho Claude/Cowork:** nếu `git commit`/`git checkout` báo lỗi
  `unable to unlink ...: Operation not permitted` hoặc kẹt file
  `.git/HEAD.lock` không xoá được — đây là khoá ghi mặc định của Cowork lên
  thư mục portfolio (không phải lỗi git thật). Gọi tool
  `allow_cowork_file_delete` với đường dẫn file đang kẹt để gỡ khoá cho hết
  phiên, rồi thao tác lại bình thường.

## 4. File rác / file thử nghiệm

- File `.command`, `deploy-log-*.txt`, `preview-*.html`, `*-handoff.md` cũ
  không tự xoá — an toàn nhưng để Ali gom dọn theo đợt (xem prompt dọn dẹp
  trong recap). Agent nào tạo file `.command` mới cho phiên của mình thì đặt
  tên có ngày để không đè lên script cũ của agent khác.
- Cleanup 13/7/2026 đã xoá toàn bộ `.command`/deploy log cũ trong repo. Script
  deploy một lần mới phải được xoá hoặc archive ngay sau khi xác nhận push,
  không để tiếp tục tích tụ.
- Source layer Hero không dùng runtime đã chuyển ra ngoài repo tại
  `/Users/alihuynh/Claude/Projects/Anh Li Portfolion/source-archive/hero/dandelion-scene/`.
  Không add ngược chúng vào repo hoặc xoá archive khi chưa có yêu cầu trực tiếp
  từ Ali. Site live dùng asset flatten/optimized trong `images/hero/`.
- `.claude/launch.json` là config preview local được track có chủ đích, không
  phải rác và không tham gia website build.

## 5. Khi phát hiện agent kia đã đổi cùng vùng code mình định sửa

- Không tự động merge/ghi đè phỏng đoán ý đồ của agent kia. Đọc diff, tóm tắt
  cho Ali những gì đã đổi, hỏi rõ trước khi tiếp tục nếu có khả năng xung đột
  ý nghĩa (không phải chỉ xung đột dòng code).

## 6. Nguồn sự thật cho recap

- Mọi agent cập nhật cùng một file `recap-anhli-portfolio.md` (thêm section
  mới có ngày, không xoá lịch sử cũ) thay vì mỗi agent tự tạo file recap
  riêng — tránh nhiều bản recap rời rạc không ai đọc hết.

## 7. Guồng mặc định cho Garden Oracle (áp dụng qua mọi session)

- Đọc `ORACLE-CONTENT-SYSTEM.md` trước mọi thay đổi Oracle. Đây là đặc tả đã
  chốt về 78 hình/câu chuyện hạt, engine tổng hợp, chiêm tinh chung, wording và
  routine kiểm duyệt; không tự định nghĩa lại Oracle từ đầu dựa trên chat cũ.
- Khi Ali nói làm tiếp Oracle, trước tiên đọc mục Oracle mới nhất trong
  `recap-anhli-portfolio.md`, rồi kiểm tra `git status`, fetch/so sánh với
  `origin/main` và đọc log gần nhất. Không yêu cầu Ali nhắc lại guồng này.
- Ba lớp được giữ tách biệt:
  - `garden-oracle-data.js`: tên và diễn giải riêng của 78 hạt; coi là dữ liệu
    đã chốt, chỉ sửa khi Ali yêu cầu trực tiếp.
  - `garden-oracle-synthesis.js`: quy ước tổng hợp ba hạt và `SYNTH_BANK`;
    đây là nơi mặc định để mở rộng nội dung Oracle định kỳ.
  - `index.html`: UI/flow Oracle; không chạm khi công việc chỉ là thêm câu vào
    `SYNTH_BANK`.
- Hướng vận hành mặc định: xây một ngân hàng câu đủ lớn để engine tự xoay theo
  tuần, sau đó chỉ refresh theo đợt khi cần; không tạo nghĩa vụ phải thêm câu
  và commit thủ công mỗi tuần.
- Khi hai agent cùng tham gia Oracle, chỉ một agent được sửa
  `garden-oracle-synthesis.js` tại một thời điểm. Agent còn lại có thể review
  giọng văn hoặc chuẩn bị bảng câu ngoài code. Trước khi đổi vai/người sửa,
  kiểm tra lại status/log để tránh ghi đè phần vừa làm.
- Tiêu chuẩn cho câu tổng hợp theo `ORACLE-CONTENT-SYSTEM.md`: nêu xu hướng
  chung từ hồ sơ nghĩa của ba hạt, chuỗi Nở/Khép, quan hệ nguyên tố và tối đa
  hai tín hiệu chiêm tinh chung của ngày; không giả vờ đọc tổ hợp hay bản đồ
  sao cá nhân, không lặp bullet từng hạt, không phán chắc chắn, không quá chung
  chung và tránh quay lại khung phủ định đã được dọn khỏi wording của site.
- Mỗi đợt chỉ stage đúng file thực sự sửa; ưu tiên commit riêng
  `garden-oracle-synthesis.js`. Trước khi push vẫn áp dụng đầy đủ mục 3 và chờ
  Ali duyệt nội dung trong chat.
