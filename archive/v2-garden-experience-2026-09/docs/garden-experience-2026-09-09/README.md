# Anh Li — Khu vườn có người ở

Bộ định hướng asset, hành trình và handoff triển khai • 09/09/2026

**Cập nhật 11/09:** [Asset mới và kế hoạch session sau](NEXT-SESSION-ASSETS-2026-09-11.md) — brief đại tu toàn trang, Li minh họa, animation/Three.js, Blender cho model, game trứng đưa ra khỏi đợt này. Đã bổ sung nền xa + Li web + 6 thumbnail; chưa dựng scene. Đây là điểm đọc đầu tiên; các ghi chú cũ bên dưới phản ánh ngày 09/09.

**Hướng đề xuất:** nhân vật Anh Li 2D mực đen trắng, ngồi chăm cây trong khu vườn 3D có màu. Khách cuộn để đi qua vườn, chạm đồ vật để mở nội dung portfolio đang có. Desktop có chiều sâu và tương tác; mobile giữ trải nghiệm đọc/nghe quen thuộc, tối ưu riêng.

[Mở bảng xem hình tổng hợp](review.html)

## Mở theo thứ tự

1. [Flow và tương tác](FLOW.md) — sáu điểm dừng, cách vào/ra nội dung, thao tác bàn phím và mobile.
2. [Asset và cách sản xuất](ASSETS.md) — ảnh mới, vật thể cần dựng thật, layer cần tách, nội dung tái sử dụng.
3. [Three.js và phương án giảm tải](PERFORMANCE.md) — hiện trạng đã kiểm tra, ưu tiên sửa, ngân sách thử nghiệm.
4. [Instruction triển khai](IMPLEMENTATION.md) — trình tự thay đổi nhỏ, hợp đồng kết nối player, điều kiện nghiệm thu.
5. [Manifest asset](asset-manifest.json) — trạng thái và nguồn để bàn giao tiếp.

## Quyết định thiết kế

- Một ông Li có hoạt động: chăm chậu cây, ngẩng nhìn khách, chạm tay chỉnh bìa đĩa. Giữ tóc rẽ phồng, nét mặt mềm, nụ cười kín gần ảnh mẫu; không nón, không phóng đại mắt/cằm. Màu trắng trên nhân vật phải đục, không xuyên nền.
- Không gian có màu: kem ấm, xanh lá dịu, đất nung, vàng bồ công anh. Độ sâu từ đường đi, che khuất giữa các lớp, ánh sáng và camera; nét đen trắng của Li tạo điểm nhìn.
- Một thao tác tạo một phản hồi có nghĩa: chọn bìa → hiện album thật; bấm nghe → cùng player phát nhạc; mở ảnh → lightbox hiện có.
- Dandelion là danh tính xuyên suốt. Chế độ trải nghiệm tách khỏi lựa chọn theme. Chuyển theme hoặc chọn bản nhẹ phải có đường quay lại rõ ràng.

## Phạm vi bộ này

Đây là asset/lookdev và đặc tả chuẩn bị triển khai; chưa phải scene Three.js chạy được. Ảnh phẳng chưa có geometry, rig hay camera 3D. Những mục `planned` trong manifest chưa được sản xuất. Không sửa chức năng, không commit/push/deploy trong đợt này.

Nguồn đúng là repo `AliH86/anhli-portfolio`, checkout `portfolio-garden-v2`, commit `5eacde1`. Thư mục cha là repo `dandelion-oracle`; không triển khai portfolio vào đó. Bảng tải/FPS chưa được benchmark: ngân sách trong tài liệu là mục tiêu để đo, không phải kết quả đạt được.
