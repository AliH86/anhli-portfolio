# V2 — Xây mới một khu vườn có sức sống

Ngày: 17/09/2026. Cập nhật: anh đã giao quyền chọn hướng phù hợp và build: “portfolio cũng chỉ là 1 phần nằm trong đó ... cái gì ổn thì build”. Bản độc lập đầu tiên đã chạy tại `fresh/dist/`, preview http://127.0.0.1:8791/. Chi tiết thực tế và giới hạn trong `fresh/README.md`, bằng chứng trong `fresh/qa/`. Art chưa được ghi nhận là anh duyệt; chưa publish.

Anh cho phép đơn giản hóa animation thành chọn bìa → vào máy → chủ động Play. Bản đầu chọn nền ảnh có chiều sâu, sprite cử chỉ nhỏ và animation đặt đĩa; không chạy game engine. Môi trường hiện tĩnh, chưa có loop gió/cây riêng. Các yêu cầu chuyển động phong phú bên dưới là hướng mở rộng, không phải bằng chứng đã hoàn thành.

Phần dưới lưu yêu cầu và trình tự tại thời điểm lập brief. Trạng thái mới ở đầu tài liệu và SESSION-HANDOFF.md có ưu tiên.

## Chỉ đạo mới nhất của anh

“anh chỉ muốn quầy nhạc, rồi đặt đĩa vào hát, chứ ko cần sân khấu gì hết”

“tất cả trong tầm mắt, và thấy sạp nhạc -> bấm vào vẫn hiện quyền quyết định chọn nghe hoặc không”

“còn lại profile/resume và gallery tổng hợp trong cái vườn”

“anh muốn có 3d feel chiều sâu, không gian, cảm xúc, animation.... k muốn cuộn trên xuống - hay thử treat như game, 2,5D cũng đc, nhưng nhân vật và mọi chuyển động không gian phải có cảm xúc, loop”

“đừng lấy gì của v1, tạo mới, ổn định, cái mang qua chỉ là hình gallery thôi còn music nó có lưu trữ riêng luôn rồi”

Các yêu cầu này thay thế phương án nhà/hiên, tạp chí, ba chương và sân khấu giấy đã đề xuất. Không tiếp tục mở rộng hoặc vá scenic V2 hiện tại làm nền mặc định.

## Phạm vi xây mới

- Xây frontend độc lập: cấu trúc ứng dụng, giao diện, điều hướng, player, viewer gallery, cảnh, nhân vật và animation đều có thể làm mới. Không bắt buộc giữ layout, landmark, host asset hoặc code cũ.
- Chỉ mang ảnh gallery qua dưới dạng tài nguyên và dữ liệu ảnh cần thiết. Không mang nguyên trang About, lightbox cũ, module legacy, video/motion hay toàn bộ kho nội dung khác vào theo mặc định.
- Nhạc kết nối kho riêng hiện có. Viết player mới. Phải xác minh nguồn danh sách album/bài, bìa, ID và URL phát; kho file audio không mặc nhiên cung cấp đủ metadata. Không nhập toàn bộ JavaScript V1 để lấy dữ liệu.
- Profile/résumé vẫn là chức năng cần có, trình bày mới. Chỉ dùng thông tin thực đã xác minh; không tự nhập nguyên nội dung V1 hoặc tự bịa tiểu sử. Nội dung cuối cần xác định trước khi phát hành.
- Xây ở vùng độc lập, không ghi đè V1 hoặc xóa bản V2 dở dang. Được phép không tái sử dụng không đồng nghĩa với yêu cầu xóa nguồn.

## Trải nghiệm cần đạt

Một khu vườn gọn trong tầm mắt, sạp nhạc là điểm chính, profile/résumé và gallery cùng nằm trong cảnh. Vào là thấy và dùng được, không cổng Explore, MAP trung gian, sân khấu, tour nhiều chương hay cuộn trang để tìm chức năng.

Treat như một màn chơi nhỏ có góc nhìn được đạo diễn. 2,5D được chấp nhận; yêu cầu chính là chiều sâu, không gian và cảm xúc, không phải nhãn công nghệ hoặc camera tự do.

Luồng sạp: mở sạp → xem/chọn đĩa → đặt đĩa → chủ động bấm nghe. Mở sạp, chọn album hoặc đặt đĩa không được tự phát nhạc. Phải luôn có thể đóng và rời đi. Nhạc chỉ bắt đầu do hành động nghe rõ ràng; khi phát thì máy hát mới phản hồi đồng bộ. Có điều khiển dừng rõ ràng.

Profile/résumé và gallery mở thành lớp xem trong khu vườn, đóng là trở về đúng cảnh. Không biến thành các trang dài dẫn người xem ra khỏi trải nghiệm. Nội dung dài có thể đọc trong vùng riêng; toàn cảnh không dùng cơ chế cuộn từ trên xuống.

Mobile phải bố trí lại để vẫn nhận ra cả ba điểm tương tác và chạm được; không chỉ thu nhỏ toàn cảnh desktop.

## Art và chuyển động

- Thiết kế cảnh và nhân vật cùng một ngôn ngữ. Không ghép nhân vật lên ảnh nền rồi coi là hoàn thành.
- Chiều sâu có lớp gần/giữa/xa, phối cảnh, che khuất hợp lý, ánh sáng và bóng tiếp xúc thống nhất.
- Host có hành vi chờ, đón khách, chọn/đưa đĩa, nghe nhạc; có nhịp nghỉ và phản ứng theo thao tác. Sprite nhiều khung hoặc animation phù hợp với art; không lấy CSS lắc một ảnh đứng yên thay cho diễn hoạt.
- Môi trường có loop có chủ đích, chuyển động khác nhịp và vùng tĩnh. Chuyển động phải được tính trong cấu trúc asset ngay từ đầu, không thêm hiệu ứng lên một ảnh phẳng để bù cho art yếu.
- Một mẫu chuyển động ngắn phải được xem sớm cùng bố cục, trước khi sản xuất hàng loạt. Ảnh tĩnh đẹp chưa chứng minh được cảm giác sống.

## Ổn định cần được chứng minh

Một nguồn trạng thái phát nhạc, không phát chồng; mở/đóng sạp và gallery không mất trạng thái. Xử lý tải ảnh/audio lỗi và thao tác nhanh. Loop dừng khi tab ẩn; có chế độ giảm chuyển động. Kiểm tra desktop/mobile và thiết bị thực trước khi tuyên bố ổn định. Các receipt cũ không chứng nhận bản xây mới.

## Bước tiếp theo

1. Chuẩn bị bố cục toàn cảnh và trạng thái mở sạp cho desktop/mobile; giải quyết điểm nhìn, tỷ lệ nhân vật, vùng bấm và chiều sâu.
2. Thử một loop nhân vật/môi trường ngắn để chứng minh cảm xúc, cùng một tương tác chọn/đặt đĩa. Đây là mẫu đánh giá, chưa sản xuất toàn bộ asset.
3. Khi cách thể hiện đạt, xây ứng dụng độc lập và kết nối dữ liệu nhạc/ảnh đã xác minh. Không nhập runtime V1.

Chưa chọn công nghệ hoặc tạo app mới trong lượt cập nhật brief. Chưa có bằng chứng hiệu năng hay phê duyệt art mới. Không commit, merge, push hoặc deploy.
