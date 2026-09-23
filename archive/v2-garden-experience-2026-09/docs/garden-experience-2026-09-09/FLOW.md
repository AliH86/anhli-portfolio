# Hành trình — một buổi ghé vườn Anh Li

## Vào trang

Desktop Dandelion hiện ngay poster nhẹ với lời chào và hai lối: **Dạo vườn** / **Xem portfolio**. Chỉ tải gói 3D khi chọn dạo vườn; nhớ lựa chọn cho lần sau nhưng kiểm tra khả năng máy trước khi tải. Mobile mở bản hiện tại. Người có link sâu tới album/ảnh/nội dung đi thẳng tới nội dung, không bắt qua intro.

Thanh điều hướng HTML luôn có: Nhạc · Hình ảnh · Công việc · Liên hệ · Bản nhẹ. Khách có thể bỏ qua hành trình bất kỳ lúc nào. Không tự phát nhạc.

## Sáu điểm dừng

Các khoảng dưới là tỷ lệ đoạn cuộn để dựng prototype, không phải thời gian chờ bắt buộc. Cuộn ngược đi ngược được; không khóa bánh xe, không yêu cầu kéo đúng một quỹ đạo.

| Đoạn | Cảnh / camera | Chuyện đang diễn ra | Tương tác và dữ liệu hiện có |
|---|---|---|---|
| 0–12% · Cổng vườn | Góc rộng, đường nhỏ dẫn vào; camera tiến nhẹ | Bồ công anh rung, hạt bay ít; bảng “Ghé vườn chơi nha.” là chữ HTML | Bấm điểm đến trên bảng để đi thẳng tới cụm; nút bỏ intro luôn sẵn |
| 12–30% · Góc chăm cây | Camera tới ngang chậu; Li 2D nằm trong không gian 3D, góc xoay giới hạn | Li đang ngồi, tay gần cây. Khi khách dừng, ngẩng đầu/chớp mắt một lần | Chậu hé lá khi hover/focus. “Chuyện của Li” mở nội dung `#about`, lời chào dùng `#welcome`; không tự viết lại tiểu sử |
| 30–55% · Sạp đĩa | Camera lách nhẹ sang sạp, dừng đủ lâu để đọc bìa | Hai hàng bìa treo kẹp, thùng đĩa và máy hát. Bìa chọn nhô nhẹ; khi nghe, mâm đĩa quay | Click bìa mở album thật; nút Nghe mới phát bằng `#audioEl`. Xem tất cả mở danh mục hiện có `#music`. Không nhân bản player |
| 55–74% · Nhà kính hình ảnh | Đường đi vào khung kính; vài ảnh treo có khoảng thở | Gallery hiện dưới dạng ảnh thật trên các mặt phẳng; góc bàn có màn chiếu nhỏ | Ảnh mở lightbox `#gallery`; màn chiếu mở video hiện có `#videos`. Dừng camera khi xem. Không autoplay preview video cả dãy |
| 74–90% · Bàn làm việc | Camera tới bàn gỗ với sổ và các tấm thẻ dự án | Cảnh yên hơn, tập trung vào công việc và dấu mốc | Sổ mở `#work`; chỉ trưng vài ảnh đại diện thật. Thông tin dài vẫn là HTML dễ đọc, tìm kiếm và chọn chữ |
| 90–100% · Hiên cuối vườn | Góc rộng nhìn lại vườn, ánh sáng ấm | Ly nước, phong thư và một cụm hạt | Phong thư mở `#contact`; lịch hạt mở `#gardenCalendar` / dialog Oracle đang có. Lối riêng dẫn đến dandelion-oracle; giữ `#vedic` như nội dung phụ truy cập được |

## Nhịp chuyển động

- **Trong cảnh:** cây/gió dịu, hạt ít, lá che trước ống kính ở điểm nối. Ưu tiên cảnh có chiều sâu rõ trước khi thêm hiệu ứng.
- **Khi người dùng chạm:** cây nảy một nhịp, bìa nghiêng 3–5°, dây kẹp rung ngắn, đĩa chuyển từ đứng yên sang quay. Li không lắc liên tục như sticker.
- **Khi nghe:** vòng quay đĩa theo trạng thái phát/dừng. Ánh đèn thở nhẹ là hiệu ứng trang trí; không gọi là phản ứng theo beat nếu chưa có audio analyser/CORS được kiểm tra.
- **Khi mở nội dung:** camera dừng; panel HTML nhận focus. Đóng/Escape trả focus về điểm vừa bấm và giữ đúng vị trí cuộn. Player tiếp tục nếu người dùng đã chọn phát.
- **Giảm chuyển động:** camera chuyển điểm trực tiếp hoặc fade ngắn; không bay theo cuộn, không bụi/gió/nhấp nháy. Lựa chọn này độc lập với chất lượng đồ họa.

## Trạng thái phải xử lý

Tải cảnh: poster vẫn hiện, có tiến độ và nút về portfolio. Lỗi WebGL/tải model: tự về bản nhẹ, nội dung vẫn truy cập được. Album lỗi: thông báo tại album, không xóa cả sạp. Chuyển theme: rời cảnh, giữ nội dung và playback; đổi lại Dandelion có thể tiếp tục dạo vườn.

Điểm tương tác có nút HTML tương ứng, nhãn rõ, vùng bấm tối thiểu 44×44 CSS px. Không dùng hover làm cách duy nhất mở nội dung. Bàn phím Tab/Enter/Escape hoạt động; canvas không chiếm quyền cuộn trang. Cảnh 3D là lớp trình bày, không phải nguồn nội dung duy nhất.

## Mobile

Giữ sections, player, album và gallery đang có. Có thể dùng một ảnh vườn đã tối ưu làm điểm nhấn; không tải Three.js mới, model hay toàn bộ bìa độ phân giải lớn. Trên tablet không chỉ dựa vào chiều rộng: kết hợp khả năng máy, cách nhập và lựa chọn của khách. Không giả định laptop nào cũng mạnh.

## Prototype đầu tiên

Chỉ làm **góc chăm cây → sạp nhạc**, khoảng 2–3 chiều cao màn hình, có ít nhất một album thật và đường vào danh mục đầy đủ. Nghiệm thu cảm giác chiều sâu, nhận diện Li, chọn/nghe/đóng album, chuyển bản nhẹ rồi trở lại. Bốn cụm còn lại triển khai sau khi đoạn này đạt chất lượng và ngân sách hiệu năng.
