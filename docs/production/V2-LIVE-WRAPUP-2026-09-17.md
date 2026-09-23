> Current release: V2.1 was published on 18 September 2026 at `3b80fa7`. See [V2.1 live wrap-up](V2.1-LIVE-WRAPUP-2026-09-18.md). The notes below are the preserved earlier history. Wording and karaoke/lyrics are deferred to V2.2.

# Vườn của Li — wrap-up bản live · 17/09/2026

## Trạng thái chốt phiên

Anh Li đánh giá bản hiện tại “cũng ổn”, còn vài điểm muốn sửa nhưng để phiên sau. Đây là **baseline đang live, được chấp nhận để tiếp tục cải thiện**, không phải xác nhận hết lỗi hay khóa thiết kế vĩnh viễn. Những điểm anh vừa nhắc chưa được liệt kê cụ thể; không tự biến các gợi ý dưới đây thành lỗi đã được anh xác nhận.

Phiên wrap-up chỉ lưu tài liệu và đối chiếu hai phiên bản. Không sửa runtime, thêm asset, đổi giao diện hoặc phát hành thêm.

- Live: https://alih86.github.io/anhli-portfolio/
- V2: commit `64f76b313c67d6345cae48eaa87f66a244bce07b`.
- V1 ngay trước thay áo: commit `487e4fd46fcebb2356e1f44cfb0a8212635acdbd`.
- GitHub Pages build/deploy thành công: https://github.com/AliH86/anhli-portfolio/actions/runs/35208057344
- Bản phát hành sạch: `/Users/alihuynh/Claude/Projects/Anh Li Portfolion/portfolio-garden-release-2026-09-17/`.
- Nơi phát triển: `portfolio-garden-v2/fresh/dist/`. Preview local: http://127.0.0.1:8791/ .

## Đã lưu an toàn

**V1:** `../website-archives/2026-09-17-v1-before-garden/ĐỌC-TRƯỚC.md`. Có bản ZIP đúng site cũ, Git bundle chứa lịch sử, 1.666 file workspace trước phát hành, hero source và danh sách media bên ngoài. Trước khi push đã kiểm tra lại checksum/CRC và `git bundle verify`. Không xóa bản gốc. Video bên ngoài giữ URL/metadata, không có bản video offline.

**V2:** `../website-releases/2026-09-17/02-GARDEN-V2-READY.zip`. Đây là snapshot runtime đã live; SHA-256: `80cc7cb5f5568530640461540e45b18f18716ccfc293e8b66bb9ca6a2c2dfabc`. Đối chiếu lại checksum ở phiên wrap-up, không nhân đôi asset.

**Nhạc:** anh đã có kho local. Không tải thêm, không di chuyển/xóa kho đó. Bản tải phụ hoàn tất trước tin nhắn của anh đã được ghi rõ là bản phụ trong gói lưu; không phải nguồn nhạc chính.

**Bằng chứng:** `../website-releases/2026-09-17/live-receipt.json`, `release-receipt.json`; ảnh và kiểm tra tại `fresh/qa/release-2026-09-17/`.

## Bản V2 hiện có

- Một khu vườn, ba góc chính: sạp nhạc, chuyện của Li, điều để dành.
- Desktop/portrait có tranh riêng; tranh ngày và tranh đêm riêng, chuyển mờ giữa các lớp. Auto ngày 05:30–17:30 theo giờ thiết bị; mặt trời/mặt trăng để chọn tay.
- Host đứng/ngồi nghe/xem ảnh; thoại giới thiệu album, câu nhắn và thông điệp ngày. Cây lá chuyển động nhẹ; chim thú có đường bay/điểm đậu theo cảnh, tiếng vườn bật riêng.
- 28 album / 226 mục bài hát / 213 mục có URL; 13 mục chưa ánh xạ URL được vô hiệu hóa rõ ràng. 213 mục tương ứng 210 URL nhạc riêng biệt.
- Một audio element; chọn album chưa autoplay; Play chủ động; đĩa và pose nghe phản ánh playback. Media Session và hỗ trợ phát nền trong phạm vi trình duyệt.
- Gallery 171 ảnh, bố cục pin gọn, xem lớn và thả tim lưu tại trình duyệt; 18 video ở tab Video với đường dẫn nguồn dự phòng.
- Hồ sơ tiếng Việt từ CV 2026, năng lực và kinh nghiệm nằm trong phần mở rộng. Không upload toàn bộ PDF CV.
- Một thông điệp mỗi ngày từ đủ 78 lá gốc; cố định theo ngày/thiết bị khi storage hoạt động.
- Loading bồ công anh có thể chạm gửi gió, chỉ hiện khi nội dung thực sự đang tải; không có chờ giả.

## Đã kiểm tra và giới hạn

31 kiểm tra tự động qua ở bản phát hành. Giao diện đã xem trên desktop, khung điện thoại 390×844 và tablet 834×1112; đây là kiểm tra viewport, không thay cho máy thật. 448 đường dẫn ảnh trong dữ liệu tồn tại.

Sau phát hành: 5 file chính HTTP 200 và checksum trùng release. Browser kiểm tra thư viện 28 album, chọn album không autoplay, một audio element; Quên Vầng Trăng Thề phát được, tiến độ 18,47 → 28,39 giây qua thao tác đóng sạp; đĩa xoay. Không có ảnh hỏng trong phần đã tải hoặc lỗi console được ghi nhận. Không phải đã nghe thử đủ 213 mục có URL.

Còn mở: Safari iPhone/iPad và Chrome Android chuyển app/khóa màn hình, pin/nhiệt/độ mượt; 13 mục thiếu URL; video nhúng từng trắng trong in-app browser; bảo vệ audio ở máy chủ chưa có. URL R2 còn public, `nodownload` chỉ cản thao tác tải trong giao diện. Tim ảnh không đồng bộ giữa thiết bị. Chưa đo A/B hiệu năng hai bản trong điều kiện giống nhau.

## So sánh V1 và V2

Đối chiếu cấu trúc từ HTML v1 trong archive và mã nguồn/kiểm tra v2 đã live. Nhận xét về cảm giác, độ rõ và ưu tiên là đánh giá thiết kế; không phải kết quả nghiên cứu người dùng.

| Mặt so sánh | V1 trước thay áo | V2 đang live | Điều nên giữ / cải thiện |
|---|---|---|---|
| Cách ghé thăm | Trang cuộn với Nhạc, Visual, Nghề, About, Liên hệ thành các mục | Một khu vườn; nội dung mở trong các khay | Giữ thế giới vườn; làm ba lối vào dễ nhận biết ngay lần đầu |
| Cá tính và cảm xúc | Nhấn vào tên Anh Li và các mảng hoạt động | Li hiện diện như chủ vườn, có thoại, ngày/đêm, nhạc và sinh vật | V2 có bản sắc rõ hơn theo mục tiêu đã chọn; tiếp tục tiết chế chuyển động |
| Nghe nhạc | Player và danh mục trong trang; có điều khiển đổi bài ngẫu nhiên | Chọn album, đặt lên máy rồi Play; đĩa quay, host ngồi nghe; 28 album | V2 gắn âm nhạc với không gian tốt hơn; cân nhắc tìm album/bài và đưa shuffle trở lại |
| Xem tác phẩm | Gallery, video và kinh nghiệm nằm ở các mục riêng | 171 ảnh theo dạng pin, mở lớn/thả tim; 18 video trong tab | Dễ dạo ảnh; cần bộ lọc ảnh và vài tác phẩm nổi bật có vai trò/bối cảnh |
| Hồ sơ nghề nghiệp | About, kinh nghiệm, các mảng Show Direction/Music/Creative Production/Visual và liên hệ được tách rõ | Phần tiếng Việt gọn trong Chuyện của Li, kinh nghiệm mở rộng | V1 đưa nghề nghiệp ra trước mắt hơn; V2 nên có lối xem nhanh cho người tìm cộng tác |
| Thông điệp và tiện ích | Lịch vườn, Oracle ba hạt, nội dung tổng hợp và phần Vệ Đà | Một thông điệp ngày từ 78 lá xuất hiện trong lời thoại | V2 giảm độ dày nội dung; các trải nghiệm cũ chưa được chuyển đầy đủ, không coi là bị mất dữ liệu |
| Chuyển động | Trải nghiệm gắn với các section và thành phần trên trang | Các lớp cảnh, cây, host, sinh vật, âm thanh và ánh sáng cùng hoạt động | Độ sống động tăng; ưu tiên quy luật vị trí, số lượng và khoảng nghỉ |
| Bảo trì và hiệu năng | HTML chính khoảng 608 KB, nhiều phần nằm chung | Runtime tách JS/CSS/JSON và asset; không dùng WebGL trong bản live này | Tách file thuận tiện bảo trì hơn; chưa đủ bằng chứng kết luận bản nào tải nhanh hay ít hao pin hơn |

V2 phù hợp hơn với mục tiêu “ghé vườn nhà Li chơi và nghe nhạc”. Thế mạnh cần học lại từ V1 là khả năng đưa thông tin nghề nghiệp và nhiều tiện ích ra thật rõ. Không cần đưa toàn bộ độ dày của V1 trở lại trang chính.

## Gợi ý cho phiên sau — chưa triển khai

| Ưu tiên | Việc nên làm | Mục đích và cách xác nhận |
|---|---|---|
| 1 | Nhận đúng các note còn vướng của anh; sửa vị trí/layer, crop, balloon hoặc tương tác bị ảnh hưởng | Theo từng ảnh/vị trí cụ thể; kiểm tra lại cả ngày/đêm và các kích thước liên quan. Không tự kết luận đang có những lỗi này |
| 1 | Thử máy thật iPhone/iPad/Android: nghe 10–15 phút, chuyển app, khóa màn hình, cuộc gọi/âm thanh khác, quay lại trang | Xác định giới hạn trình duyệt thật; đo độ mượt/pin/nhiệt trước khi thêm hiệu ứng |
| 1 | Đối chiếu 13 bài chưa có URL với kho nhạc local đã sẵn | Bổ sung mapping đúng; không tải lại toàn bộ nhạc, không đoán file là đã mất |
| 2 | Tìm nhanh album/bài hát; cân nhắc shuffle và nhớ phiên nghe | 28 album đã đủ cần công cụ tìm; nhớ album/vị trí nhưng vẫn chờ người dùng Play sau khi mở lại |
| 2 | Lọc gallery theo ảnh/tác phẩm; chọn 3–5 dự án có chú thích vai trò | Dạo ảnh vẫn vui, người xem nghề nghiệp hiểu Li làm phần nào; tránh chỉ có tên nhóm chung |
| 2 | Lối “Xem hồ sơ / Cộng tác với Li” gọn trong Chuyện của Li | Giữ âm nhạc làm trung tâm nhưng giúp khách nghề nghiệp tìm thông tin nhanh |
| 2 | Kiểm tra video trên trình duyệt phổ biến, giữ thumbnail và link nguồn rõ | Xác định vấn đề embed cụ thể trước khi đổi hosting/nhà cung cấp |
| 3 | Thiết kế phương án audio qua quyền truy cập máy chủ/URL có hạn khi anh muốn siết bảo vệ | Cản chia sẻ link tải trực tiếp tốt hơn; cân nhắc chi phí và phát nền. Không hứa chống sao chép/thu âm tuyệt đối |
| 3 | Tăng độ đa dạng cây/chim/thoại sau khi trải nghiệm nền ổn định | Tăng tự nhiên bằng khoảng nghỉ và hành vi hợp cảnh, không tăng số lượng hiệu ứng đơn thuần |

Đợt cải thiện tiếp theo nên ngắn: **note của anh → kiểm tra mobile/audio → tìm nhạc và hiểu tác phẩm**. Hoãn asset mới cho đến khi có nhu cầu rõ.

## Bắt đầu lại phiên sau

1. Đọc mục mới nhất trong `recap-anhli-portfolio.md` và tài liệu này; tiếp tục Fresh V2 đang live, không quay về thử nghiệm 3D cũ.
2. Nhận note cụ thể của anh trước khi sửa các điểm chưa mô tả. Các đề xuất trong bảng là backlog để cân nhắc, không phải yêu cầu đã duyệt để tự triển khai.
3. Kiểm tra Git, fetch main, đọc diff. Development checkout đang có nhiều thay đổi cũ và ở HEAD 5eacde1, sau main 7 commit; không pull/merge toàn bộ một cách tự động.
4. Bản release riêng sạch, trên branch `codex/garden-v2-release-2026-09-17`, commit 64f76b3. Chỉ chuyển/stage phần thay đổi được xác minh; không `git add .` hoặc `git add -A`.
5. Không tạo game trứng đã hoãn, không tải thêm kho nhạc, không xóa hoặc ghi đè archive v1. Không tự triển khai các gợi ý trong phiên wrap-up.
