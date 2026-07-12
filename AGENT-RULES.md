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

## 5. Khi phát hiện agent kia đã đổi cùng vùng code mình định sửa

- Không tự động merge/ghi đè phỏng đoán ý đồ của agent kia. Đọc diff, tóm tắt
  cho Ali những gì đã đổi, hỏi rõ trước khi tiếp tục nếu có khả năng xung đột
  ý nghĩa (không phải chỉ xung đột dòng code).

## 6. Nguồn sự thật cho recap

- Mọi agent cập nhật cùng một file `recap-anhli-portfolio.md` (thêm section
  mới có ngày, không xoá lịch sử cũ) thay vì mỗi agent tự tạo file recap
  riêng — tránh nhiều bản recap rời rạc không ai đọc hết.
