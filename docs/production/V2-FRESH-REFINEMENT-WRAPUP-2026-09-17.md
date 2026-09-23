# Vườn của Li — checkpoint được đón nhận · 17/09/2026

Anh phản hồi: “quá xá đã - wrap up đi em, mình tính step tiếp theo”. Giữ bản này làm nền cho vòng tiếp theo. Đây là sự đồng ý với hướng trải nghiệm/thẩm mỹ hiện tại; chưa đồng nghĩa đã kiểm định thiết bị thật hoặc duyệt xuất bản.

## Bản đang dùng

- App độc lập: `fresh/dist/`; preview http://127.0.0.1:8791/ .
- Khởi động lại: từ `fresh/`, chạy `python3 -m http.server 8791 --bind 127.0.0.1 --directory dist`.
- Bản đóng gói checkpoint: `fresh/checkpoints/2026-09-17-accepted-refinement/site.zip`, chứa thư mục `dist/` cùng manifest SHA-256 đi kèm. Chỉ giải nén ra thư mục mới khi cần đối chiếu, không đè lên thay đổi mới.
- Hướng dẫn và nguồn ảnh: `fresh/README.md`; kiểm tra: `fresh/qa/refinement-receipt.json`; prompt: `fresh/source-art/generation-prompts-refinement.txt`.
- Không commit, push, merge hay deploy. Giữ nguyên các thay đổi lẫn từ trước ở phần cũ của repo.

## Giữ nguyên làm nền

Một khu vườn trong tầm mắt, sạp nhạc là trọng tâm. Chọn bìa → đặt đĩa → chủ động Play. Không cuộn trang vườn; nội dung mở thành khay. Tên: Vườn của Li / Cái Sạp Nhạc / Chuyện của Li / Những điều để dành.

Giữ cảnh nền được chọn, tỷ lệ nhân vật, pose đứng/ngồi nghe/xem ảnh; bóng tiếp đất, màu ấm và cỏ che nhẹ chân. Cây tiền cảnh và mặt nước chuyển động nhỏ. Đồ vật là vùng bấm, nhãn nhỏ, viền sáng khi hover/focus. Khay glass kem, bìa vuông nổi bật, hai cách xem Bìa lớn/Gọn. Đổi layout không ngắt nhạc. Profile có résumé mở rộng; gallery có ảnh/video. Không quay lại thiết kế sân khấu hoặc nhập runtime V1.

## Đã kiểm tra

Desktop 1440×900 và mobile 390×844; tỷ lệ, khay, bố cục và nhãn; chọn đĩa không tự phát; phát/pause bài thật; đóng khay vẫn nghe tiếp; đổi layout giữ tiến độ; kích hoạt pose; mở bằng bàn phím; tắt chuyển động vẫn mở nội dung. Không có lỗi/warning được ghi nhận ở lượt browser cuối. Asset runtime đã trả HTTP200. Catalog/gallery/profile JSON không đổi.

Tải đầu theo dung lượng file khoảng 648 KB desktop / 554 KB mobile, không phải số đo thời gian tải hoặc CPU. Pose phụ tải khi dùng. Glass blur 8px desktop/5px mobile; cây/pose/nước tạm dừng sau khay. Không có WebGL renderer. Asset là raster 2.5D, không phải scene UE5/Twinmotion.

## Bước tiếp theo — đề xuất, chưa thực hiện

1. **Kiểm tra trải nghiệm trên thiết bị thật.** Thử Safari/iPhone và một máy Android nếu có, nghe 10–15 phút, chuyển nền/quay lại, đổi album liên tục, mở ảnh/video, bật/tắt chuyển động. So sánh glass bật/tắt nếu có giật hoặc nóng; chỉ tối ưu theo vấn đề quan sát được. Mục tiêu: điều khiển luôn phản hồi, không âm thanh chồng, không tràn khay. Agent không tự tuyên bố đã đo nhiệt/pin khi chưa có thiết bị và số liệu.
2. **Khép nội dung và media.** Rà profile/résumé; phân nhóm gallery thành album có tên; xác minh 13 track chưa ánh xạ URL (không kết luận file mất). Chẩn đoán video nhúng trên browser thường: Vimeo/YouTube đang trắng trong in-app browser; link nguồn vẫn có. Không tải thêm media hoặc nhập nguyên hệ cũ chỉ để lấp chỗ trống.
3. **Chốt bản phát hành.** Khi hai bước trên ổn, rà lại mobile, nội dung chia sẻ/social preview và chọn cách đưa fresh/dist lên site hiện có. Chuẩn bị bản review cụ thể trước khi xin duyệt xuất bản. Hiện chưa có quyền deploy.

Ưu tiên bước 1 trước khi thêm hiệu ứng, đi bộ, nhiều cảnh hoặc engine 3D. Giữ phần cảm xúc đã đạt, dùng phản hồi thực tế để quyết định vòng tinh chỉnh tiếp theo.
