# V2 — Wrap-up, đánh giá và phương án xây lại

> Cập nhật sau thảo luận ngày 17/09: anh đã xác định hướng xây mới độc lập. Đọc `V2-FRESH-BUILD-BRIEF-2026-09-17.md` trước. Các phương án và ràng buộc tái sử dụng bên dưới là lịch sử, không còn là chỉ đạo tiếp tục. Hướng hiện hành: một khu vườn trong tầm mắt, sạp chọn/đặt đĩa với quyền chủ động nghe, profile/résumé và gallery trong cảnh; chỉ ảnh gallery mang qua, nhạc kết nối kho riêng, frontend/art/player có thể làm mới.

Ngày: 17/09/2026. Trạng thái: DỪNG TRIỂN KHAI, CHỜ CHỌN HƯỚNG MỚI.

Yêu cầu mới nhất của anh: “wrapp up -> đánh gía -> gợi ý thêm phương án xây dựng lại”, vì cảm hứng từ art đến trải nghiệm dưới trung bình. Tài liệu này thay thế lộ trình tiếp tục Shows → Visual → Story trong các checkpoint cũ. Các phương án dưới đây là đề xuất, chưa được anh chọn và chưa triển khai.

## 1. Đã lưu đến đâu

- Cấu trúc đang có trong source: GARDEN · MUSIC · ABOUT. Có thêm bản chữ `/flat/` và Inner World `/sky/`.
- Shows đã bỏ khỏi điều hướng/runtime. `/works/`, `/works/how/`, `/visual/`, `/story/` chuyển về About hoặc mục tương ứng. Không triển khai trang khoe từng dự án. Asset/module Shows cũ còn trên đĩa để lưu lịch sử, không phải hạng mục cần hoàn thiện.
- About gom giới thiệu, résumé, gallery và video gốc: 181 mục gallery (171 hình, 10 motion), 18 video; nội dung lấy từ nguồn cũ, không tự tạo thành tích hay case study. Dữ liệu đầy đủ chưa đồng nghĩa với tuyển chọn hình ảnh tốt.
- Garden và Music đã có cảnh 2,5D; Garden có chuyển động cây/cỏ/parallax; host vẫn một tư thế. Chưa có bộ nhiều cử chỉ hoặc sprite animated loop.
- Giữ catalog nhạc thật và một player dùng chung; không thay catalog bằng đĩa minh họa trong ảnh cảnh.
- Mọi thay đổi còn local. Không commit, merge, push hoặc deploy. Repo có nhiều thay đổi dở dang từ trước, gồm audio/catalog/index/UI; giữ nguyên.
- Đã fetch origin/main ngày 17/09: nhánh `codex/garden-experience-v2` còn sau origin/main 6 commit, không có commit ahead. Sáu commit remote liên quan nhạc/font; đã đọc log, chưa nhập vào local.

## 2. Bằng chứng và giới hạn

Receipt `docs/qa/about-2026-09-14/receipt.json` ghi 10 kiểm tra đạt, không lỗi ghi nhận: route/redirect, một player, filter/load-more, lightbox bàn phím, video lifecycle, history, ba kích thước màn hình và no-JS. External embed chỉ kiểm tra bằng fixture; chưa xác nhận mọi video bên thứ ba phát được. `preservation.json` ghi 13 tệp Garden/host/audio được bảo toàn trong lần gom About.

Đây là kết quả ngày 14/09, không phải lần kiểm thử đầy đủ mới ngày 17/09, không phải chứng nhận mỹ thuật. Trong lượt wrap-up, đọc source hiện tại và xem lại ảnh chụp Garden/Music/About đã lưu. Ảnh Garden/Music cũ còn thanh điều hướng 5 mục; đánh giá cấu trúc điều hướng hiện tại dựa trên source 3 mục.

Ảnh `gallery-390.png` đang có nhiều ô trống: chưa chốt là thời điểm lazy-load hay lỗi hiển thị. Không được ghi toàn bộ gallery đã kiểm tra hình ảnh xong. About còn thiếu vòng kiểm tra trực quan cuối. Chưa có kiểm chứng hiệu năng trên điện thoại thật.

Preview ban đầu ngừng phục vụ. Đã khởi động lại HTTP local trên 127.0.0.1:8784 và kiểm tra HTTP 200; tab trong app vẫn mắc trang lỗi kết nối khi công cụ điều hướng, nên lượt này không tuyên bố đã review live thành công. Không đổi cấu hình bảo mật hay code để xử lý việc đó.

## 3. Đánh giá thẳng

Đánh giá chuyên môn của em: bản hiện tại có nền kỹ thuật dùng lại được, nhưng trải nghiệm chưa truyền tải được một người có cá tính sáng tạo riêng. Tiếp tục thêm cảnh và hiệu ứng theo lộ trình cũ có khả năng làm nhiều việc mà ít cải thiện cảm hứng.

### Art

1. **Cảnh dễ chịu nhưng danh tính yếu.** Cottage, nhà kính, cỏ hoa, ánh chiều tạo một khu vườn đẹp chung chung. Chưa có vật thể hoặc cách bố trí khiến người xem nhớ ngay đây là thế giới của Li.
2. **Thiếu điểm nhìn chính.** Cây, kiến trúc, cỏ và đạo cụ cùng nhiều chi tiết; headline nổi trên trời, host đứng tách ở sân, nội dung thật ở chỗ khác. Người xem phải tự nối các phần.
3. **Ngôn ngữ hình chưa thống nhất.** Host nét mực phẳng đặt trên nền gần ảnh thật dễ có cảm giác dán lên. Cần thiết kế cả môi trường cùng logic với nhân vật; không tự ý đổi host đã chọn sang người thật hay 3D.
4. **Chuyển sang About làm đứt mạch.** About có ảnh thật và nội dung cá nhân rõ hơn, nhưng phong cách trang biên tập khác hẳn Garden/Music. Cùng màu kem chưa đủ thành một hệ thị giác.

### Trải nghiệm

1. **Lời hứa khám phá lớn hơn tương tác thực tế.** Có cổng vào, Explore, MAP và navigation, nhưng nội dung chính hiện chỉ Music/About. Quãng dẫn vào dài hơn giá trị mới mà mỗi bước mang lại.
2. **Đạo cụ chưa giúp sử dụng nội dung.** Những đĩa trong cảnh không phải album thật để chọn; player nằm thành dải UI riêng. Khoảng cách giữa thứ người xem thấy và thứ họ bấm làm cảnh giống hình nền.
3. **Host chưa có vai trò.** Nhân vật hiện diện nhưng chưa chào, mời, chỉ hoặc phản hồi một việc cụ thể. Nhiều animation ngẫu nhiên cũng không tự giải quyết chuyện này.
4. **Gallery là kho dữ liệu, chưa có nhịp xem.** Cần một lớp tuyển chọn 12–18 hình/motion có nhịp lớn nhỏ và một vài video dễ tiếp cận, rồi mới mở kho đầy đủ; giữ nguyên nguồn, không xoá hàng loạt.

Phần trách nhiệm triển khai của em: đã dành quá nhiều công cho dựng cảnh, nối route và đạt kiểm thử; chưa chứng minh đủ sớm rằng khung hình đầu và hành động đầu tiên tạo cảm xúc. Kiểm thử đúng chức năng không thể thay cho chất lượng art và trải nghiệm.

## 4. Ba phương án xây lại

### A. Nhà của Li — một góc sống mở ra vườn (đề xuất ưu tiên)

- **Cảm giác:** đang ghé chơi nơi anh sống và sáng tạo; gần, có đồ dùng, có dấu vết con người.
- **Art:** một hiên/phòng nhỏ với bàn nhạc, sổ tay, album hình; khu vườn làm chiều sâu qua cửa. Minh họa/collage có chất giấy, gỗ, nét mực, tiết chế chi tiết để hợp host đơn sắc. Chất liệu và bảng màu cần thử trên một khung hình trước khi chốt.
- **Hành động:** chọn bìa album thật để nghe; mở album ảnh để xem; mở sổ về Li để đọc giới thiệu/résumé. Luôn có link chữ tương đương, không bắt đoán hotspot.
- **Desktop/mobile:** desktop một góc nhìn với chiều sâu giới hạn; mobile bố trí các nhóm vật theo chiều dọc, thao tác một chạm, không thu nhỏ nguyên căn phòng.
- **Host:** mời ngồi, chỉ album, nghe nhạc, lật sổ theo ngữ cảnh; sản xuất sprite sau khi art và bố cục được chọn.
- **Đánh đổi:** cần art riêng và thiết kế từng tương tác; có thể chật nếu tham đồ vật. Giới hạn ba nhóm chức năng và một khung nhìn mở đầu.

### B. Tạp chí cá nhân đang phát nhạc

- **Cảm giác:** đọc một cuốn tạp chí do anh biên tập về mình, vừa xem vừa nghe.
- **Art:** portrait, ảnh/video gốc, typography mạnh, khoảng trắng và nhịp ảnh lớn nhỏ. 2,5D chỉ dùng cho vài lớp giấy, bìa đĩa hoặc host ở điểm chuyển đoạn; đây là phương án giảm vai trò không gian scenic rõ nhất.
- **Hành động:** nghe ngay từ bài/album gợi ý; cuộn qua hình và video đã chọn; résumé nằm trong About, toàn bộ kho có lối mở riêng.
- **Desktop/mobile:** đọc và nghe liên tục, player gọn giữ trạng thái; không cần màn Explore hoặc MAP trung gian.
- **Host:** dấu nhận diện nhỏ ở lời chào hoặc lời dẫn, không chiếm vùng nội dung chính.
- **Đánh đổi:** nội dung cá nhân nổi bật, ít ma sát; cảm giác bước vào một thế giới riêng yếu hơn A/C. Chất lượng phụ thuộc tuyển chọn hình và typography.

### C. Một buổi chiều với Li — câu chuyện qua ba khung cảnh

- **Cảm giác:** một đoạn kể chuyện ngắn: ghé hiên → chọn nhạc → mở những điều anh giữ lại.
- **Art:** ba bố cục 2,5D được đạo diễn như các khung phim, cùng vật liệu, cùng logic ánh sáng; không mở rộng thành bản đồ nhiều địa điểm.
- **Hành động:** cuộn hoặc chuyển chương; mỗi chương có một hành động thật là nghe, xem, đọc. Có lối đến thẳng nội dung, không ép người xem chờ chuyển cảnh hoặc bật âm thanh.
- **Desktop/mobile:** desktop có chuyển lớp có kiểm soát; mobile là ba đoạn đọc tự nhiên, giảm hiệu ứng và luôn truy cập trực tiếp được.
- **Host:** dẫn người xem qua các hành động, cử chỉ gắn từng chương; không đi vòng quanh vô mục đích.
- **Đánh đổi:** tiềm năng cảm xúc cao nhưng tốn công dựng cảnh/chuyển động nhất; dễ lặp lại vấn đề hiện tại nếu chỉ thay ba ảnh nền đẹp.

## 5. Khuyến nghị và cách làm lượt tiếp theo

Ưu tiên **A**, dùng sự rõ ràng và cách tuyển chọn nội dung của **B** làm nguyên tắc đọc. Giữ yêu cầu 2,5D và host, nhưng thu nhỏ phạm vi để con người, đồ vật và nội dung thật có quan hệ chặt chẽ hơn. Chưa chốt phương án thay anh.

Giữ lại: player/catalog, nguồn ảnh/video, résumé, host gốc, các xử lý keyboard/reduced-motion/fallback và source cảnh cũ để tham chiếu. Xây lại phần bố cục mở đầu, ngôn ngữ thị giác, điều hướng và sự liên kết giữa cảnh với thao tác. Tạm dừng mở rộng cảnh và sản xuất sprite.

Lượt triển khai sau khi chọn hướng nên bắt đầu bằng **một khung desktop + một khung mobile**, dùng một album và vài ảnh thật. Duyệt art tĩnh trước; tiếp đến một prototype thao tác nhỏ để chọn album/mở ảnh và quay lại. Chỉ mở rộng khi:

- Nhìn nhanh biết đây là Li và thấy ngay có thể nghe/xem/đọc gì.
- Nhận ra hành động chính, thực hiện và quay lại mà không cần lời giải thích.
- Hình, chữ, host cùng một ngôn ngữ và vẫn dễ đọc trên mobile.
- Một tương tác có phản hồi rõ ràng và lý do cảm xúc; không cần thêm cả thế giới để chứng minh.

Sau khi bối cảnh, bố cục và cảnh quan được anh chọn mới hoàn thiện hiệu ứng, rồi bộ host nhiều cử chỉ với sprite animated loop thật. Giữ nét/nhận diện, chân neo ổn định, loop liền mạch, dừng khi ẩn/ra route và có trạng thái tĩnh khi giảm chuyển động. Không dùng lắc một ảnh tĩnh để tính là hoàn thành yêu cầu sprite.

## 6. Handoff bắt buộc

Không tiếp tục Shows/Visual/Story từ ghi chú cũ. Không lấy việc Garden từng được duyệt ở checkpoint trước để phủ nhận đánh giá hiện tại. Đọc tài liệu này và phần đầu SESSION-HANDOFF.md trước công việc tiếp theo. Trạng thái chung: functional WIP, art/experience cần xây lại, chưa sẵn sàng phát hành.
