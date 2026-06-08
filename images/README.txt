HƯỚNG DẪN ẢNH / VIDEO CHO GALLERY (Tác phẩm thị giác)
======================================================

Có 4 bộ môn, mỗi bộ môn MỘT THƯ MỤC RIÊNG:

  images/2d/       → ảnh 2D  (key visual, poster, brand frame…)
  images/3d/       → ảnh 3D  (render sân khấu, set, lighting…)
  images/sketch/   → phác thảo / storyboard / trang ý tưởng
  images/motion/   → video / clip AI / motion / show reel

──────────────────────────────────────────────
QUY LUẬT ĐẶT TÊN — CHỈ CẦN ĐÁNH SỐ
──────────────────────────────────────────────
Trong mỗi thư mục, đặt tên file là số thứ tự:

  2d/1.jpg   2d/2.jpg   2d/3.jpg ...
  3d/1.jpg   3d/2.jpg ...
  sketch/1.jpg   sketch/2.jpg ...
  motion/1.mp4   motion/2.mp4 ...

• Tên file: KHÔNG dấu, KHÔNG khoảng trắng. Dùng .jpg hoặc .png cho ảnh.
• Ảnh giữ TỈ LỆ GỐC — không cần cắt vuông. Trang tự co theo ảnh (kiểu Pinterest).

──────────────────────────────────────────────
2D / 3D / SKETCH = ẢNH
──────────────────────────────────────────────
Chỉ cần bỏ ảnh vào đúng thư mục với tên đánh số. Xong.

──────────────────────────────────────────────
MOTION = VIDEO (2 cách up)
──────────────────────────────────────────────
CÁCH 1 — File video trong project (riêng tư, tải lên thẳng):
   Bỏ file vào images/motion/  →  motion/1.mp4, motion/2.mp4 ...
   Nên kèm 1 ảnh đại diện cùng số:  motion/1.jpg  (ảnh hiện trước khi bấm play)
   Định dạng nên dùng: .mp4 (H.264). Dung lượng vừa phải để web nhẹ.

CÁCH 2 — Link YouTube (nếu clip đã đăng YouTube — nhẹ web nhất):
   Lấy MÃ video: phần sau "?v=" hoặc sau "youtu.be/".
   Ví dụ  https://youtu.be/AbC123xyz   →   mã là  AbC123xyz
   Rồi báo Anh Li / sửa trong index.html (mảng GALLERY):
       { tag:'Motion', type:'yt', yt:'AbC123xyz', ar:'16/9' }
   (YouTube tự lấy ảnh đại diện, khỏi cần up poster.)

──────────────────────────────────────────────
MUỐN THÊM / BỚT / ĐỔI THỨ TỰ?
──────────────────────────────────────────────
Mở index.html, tìm mảng GALLERY (có chú thích đầy đủ ngay trên đó).
Mỗi tác phẩm là 1 dòng — copy thêm dòng, đổi số file, đổi tỉ lệ ar là xong.
