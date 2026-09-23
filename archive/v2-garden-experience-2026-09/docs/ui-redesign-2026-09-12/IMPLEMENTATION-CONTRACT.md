# Đặc tả thực thi · xác nhận 12/09/2026

Anh đã xác nhận bắt đầu tuần tự theo hướng xử lý trong INTAKE-AND-HANDOFF.md. Các đề xuất ở bảng lệch nguồn trở thành baseline làm việc của implementation, không yêu cầu anh xác nhận lại.

| Đích | Route | Nội dung / khung |
|---|---|---|
| GARDEN | / ; /#explore | Arrival → Explore chủ động; 4 cửa, không idle auto-enter |
| MUSIC | /sap/ | Cái Sạp, late afternoon; player thật, không autoplay |
| SHOWS | /works/ | Ba loại việc, NDA, moments ẩn danh; không per-project |
| Cách em làm | /works/how/ | Brief → Creative Frame → Space → Moment → My Role |
| VISUAL | /visual/ | Nhà kính, nắng qua kính, fragments & process |
| STORY | /story/ | Đường đồi, sunset, About/Journey/Memory |
| SKY | /sky/ | Cổng Jyotiṣa optional, giữ engine hiện tại |
| FLAT | /flat/ | Cùng content module, HTML tĩnh đọc/in được |
| MAP | dialog trên mọi route | 5 mục, đóng giữ state/focus, không URL mới |

Mobile: 5 mục trong MAP/menu luôn nhìn thấy; Explore cards scroll-snap ngang; không free camera. Native dialog cho focus trap; Esc đóng lớp đang mở trước khi về Garden. Reduced-motion tắt mọi animation UI.

Nguồn chữ: js/redesign/content.mjs. Những số quy mô/timeline chưa xác minh không đưa lên. Tư liệu SHOWS cần chọn/anonymize trước khi đưa vào; VISUAL dùng bìa nhạc cá nhân sẵn có trong giai đoạn đầu, không tự mở client gallery.

Kiến trúc: route HTML tĩnh sinh từ scripts/build-redesign.mjs. Base URL tương đối hỗ trợ cả domain root và GitHub project subpath. Không chọn CMS/framework mới. Mỗi lần đổi template/content hoặc engine trong index phải chạy lại builder. Điều hướng nội bộ dùng history để audio không remount; refresh/new tab là một document mới nên không tự phát lại.

Tích hợp: engine và DOM cũ giữ trong #portfolioLegacy, giao diện mới ngoài wrapper. bridge.js gọi selectAlbum/playAt, không tạo audio mới. ?classic là đường QA để xem lại source cũ. Không bật scene slice cũ dưới giao diện mới. Tách engine khỏi monolith là việc tối ưu về sau, không gộp vào revision này.

Bước 2 dùng CSS world plate theo mockup và nhãn UI PREVIEW / WORLD ĐANG DỰNG. Chưa thể gọi đây là world 3D hoàn chỉnh. Bước 3 mới dựng six-anchor blockout và contact sheet camera. Tọa độ VISUAL/STORY phải theo destination đã xác nhận, giữ nguyên geography. Host atlas cần đóng lại sizing trước khi xuất texture.

Đo/check theo từng bước, lưu receipt riêng; không ghi đè kết quả của slice 11/09. Không commit/push/deploy trong phiên nếu chưa có quyền cụ thể.
