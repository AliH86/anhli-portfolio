> SUPERSEDED ROADMAP — 17 September 2026: implementation paused after user requests art/experience reassessment. Active navigation is Garden/Music/About; Shows/Visual/Story expansion is cancelled. See V2-WRAPUP-AND-REBUILD-2026-09-17.md and SESSION-HANDOFF.md. The host identity and scenery-before-effects-before-multi-gesture-sprites requirements below remain relevant; proposed gesture clips are not produced or accepted.

# Cảnh quan trước · animation và host sau

Yêu cầu trực tiếp ngày 14/09/2026: tiếp tục v2 theo định hướng 2,5D; hoàn thiện toàn bộ bối cảnh, bố cục, cảnh quan trước animation effect; host phải có nhiều cử chỉ và sprite animated loop.

## Thứ tự thực hiện hiện tại

1. Giữ Garden đã được chấp thuận làm chuẩn: cùng ngôi nhà, nhà kính, sân, chất liệu, ánh sáng và host minh họa đơn sắc. Không tăng wind/parallax đã khóa.
2. Giữ MUSIC near-final để đối chiếu continuity. Lời yêu cầu tiếp tục cho phép phát triển cảnh kế tiếp; không ghi thành đã duyệt riêng chất lượng MUSIC.
3. Hoàn thiện lần lượt cảnh tĩnh SHOWS → VISUAL → STORY; kiểm tra cả desktop và portrait, nội dung thật, đường về Garden, lớp gần/giữa/xa và khoảng trống cho UI. Không sản xuất hàng loạt rồi mới kiểm tra.
4. Khi toàn bộ bộ cảnh/bố cục đã hoàn thiện và được xem xét, triển khai selective environmental effects và host sprite animation. Các hiệu ứng Garden đã có được giữ; không mở thêm effect trong lượt scenery này.
5. QA chuyển cảnh, một player, mobile/Flat, reduced motion, hiệu năng và release review.

## Host: yêu cầu bắt buộc, chưa được triển khai

Host hiện tại là một pose tĩnh đã ghép cảnh. Chưa có sprite atlas nhiều frame hoặc loop cử chỉ. Giữ mặt, kính, nét đen trắng, trang phục và tỷ lệ của nguồn đã duyệt; tạo gesture sources mới theo cùng identity, không biến nhân vật thành full-3D avatar.

Bộ cử chỉ đề xuất để sản xuất ở giai đoạn animation:

| Cảnh | Cử chỉ | Cách phát |
|---|---|---|
| GARDEN | Đứng thư giãn, chớp mắt/thở; giơ tay chào; mở tay mời vào | Idle loop; chào/mời theo entry hoặc tương tác, quay về idle |
| MUSIC | Nghe nhạc/gật đầu nhẹ; giới thiệu/chọn đĩa | Listening loop chỉ khi player thật đang phát; chọn đĩa theo album selection |
| VISUAL | Quan sát bản phác, ghi/vẽ nhẹ | Loop thao tác nhỏ, hiện diện phụ |
| STORY | Ngồi/đứng thư thái, nhìn ra vườn, cầm cuốn sổ | Loop chậm, không che nội dung |
| SHOWS | Không host theo hierarchy đã khóa | Không tạo atlas/loop cho cảnh này |

Các gesture cụ thể ở bảng là đề xuất triển khai; yêu cầu nhiều cử chỉ và sprite animated loop là bắt buộc từ anh. Không cần mở lại việc có làm sprite hay không.

## Tiêu chí nghiệm thu sprite

- Có nhiều pose/cử chỉ thực sự, với frame trung gian minh họa nhất quán; không tính CSS lắc/zoom cùng một ảnh là sprite animation hoàn chỉnh.
- Frame source tách khỏi atlas runtime. Mỗi clip có frame rect/duration, loop mode, điểm đặt bàn chân, kích thước canvas và state transition rõ ràng. Chốt fps/frame count sau thử clip, không áp một số cho mọi cử chỉ.
- Loop nối frame cuối về đầu không giật; clip một lần quay về idle tự nhiên. Không đổi khuôn mặt, chiều cao, độ dày nét hoặc làm trượt chân/contact shadow qua frame.
- Alpha thật hoặc matte đăng ký khớp từng frame; không checkerboard giả, viền trắng hoặc bóng nền bị nhấp nháy. Không sửa/ghi đè artwork host đã duyệt.
- Lazy-load atlas khi cần; không tải tất cả gesture/cảnh ngay Garden entry. Tạm dừng khi hidden/off-route hoặc người xem dừng motion; reduced-motion dùng pose tĩnh dễ đọc. Loop nghe nhạc theo trạng thái của audio hiện có, không thêm player hay autoplay.
- Kiểm tra contact/occlusion và tỷ lệ trên desktop lẫn portrait, loop chạy nhiều chu kỳ, pause/resume, đổi route nhanh, mất asset và máy yếu. Browser emulation không được ghi là actual-device QA.

## Trạng thái

Đã chốt yêu cầu và thứ tự. Chưa tạo gesture art, atlas hay runtime host animation trong lượt này. Bản SHOWS mới là checkpoint scenery; VISUAL/STORY vẫn còn phải hoàn thiện.
