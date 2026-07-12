# Garden Oracle — đặc tả nội dung, hình ảnh và vận hành

> Nguồn sự thật dùng chung cho Ali, Claude và Codex. Đọc file này trước mọi
> công việc liên quan tới Oracle. Nếu ý tưởng mới mâu thuẫn với tài liệu này,
> dừng lại và hỏi Ali; không tự định nghĩa lại Oracle từ đầu.

## 1. Bản chất đã chốt

- Oracle là một món quà và một lượt **trải chung theo năng lượng của ngày**,
  nằm trong phiên riêng của portfolio tương tự MUSIC.
- Oracle không đọc bản đồ sao cá nhân; không dùng ngày/giờ sinh, GPS, IP,
  camera, vị trí hay dữ liệu nhận dạng người xem.
- Ba hạt được chọn ngẫu nhiên nhưng ổn định theo `ngày + ID cục bộ của thiết
  bị`: reload trong ngày không đổi, ngày mới tự đổi, thiết bị khác có thể nhận
  bộ khác.
- Chiêm tinh là **thời tiết chung của tuần/ngày**. Nó không chọn ba hạt và
  không được trình bày như bằng chứng rằng hệ thống biết hoàn cảnh cá nhân.
- Mục tiêu trải nghiệm: đúng, dễ hiểu, có chiều sâu và đủ mới để tạo lý do quay
  lại mỗi ngày; không biến thành chatbot hoặc lời phán chắc chắn.

## 2. Bốn lớp của hệ thống

### 2.1. 78 hình mẫu hạt

- Đây là 78 sinh thể của cùng một khu vườn, không phải 78 lá Tarot thay áo.
- Art direction đã chọn: botanical 3D huyền ảo, nền vườn xanh đen, amber/sage,
  vật liệu hữu cơ và đường viền thực vật kim loại mảnh.
- Tỷ lệ master là **4:5 dọc**. Mỗi hạt chỉ có **một artwork raster không chữ**
  (ưu tiên WebP khi đưa lên site), không tạo hai ảnh Nở/Khép.
- Bố cục artwork cân trên/dưới như lá bài hai đầu. Khi hạt Khép, UI xoay chính
  artwork đó `180deg`; tên hạt và trạng thái là text HTML riêng phủ lên card,
  không được bake vào ảnh. Nhờ vậy 78 hình phục vụ đủ 156 tên/trạng thái.
- Artwork không chứa số, tên, chữ, logo hoặc watermark. Chừa safe zone cho UI
  đặt số ở đầu card và cụm tên/trạng thái ở chân card ở cả hai hướng xoay.
- Mỗi hạt có nhận diện riêng từ lõi, tán, thân, hướng gió và một chi tiết kể
  chuyện; vẫn phải nhận ra là hạt bồ công anh trước khi đọc tên.
- 22 hạt lớn có silhouette độc bản mạnh. 56 hạt còn lại cùng họ hình theo bốn
  nguyên tố nhưng vẫn phải phân biệt được từng hạt.
- Không preload cả bộ: mỗi lượt chỉ tải ba WebP; gallery 78 hạt lazy-load.

### 2.2. 78 câu chuyện lõi

- Mỗi hạt có đúng một câu chuyện lõi 45–70 chữ, rồi hai trạng thái ngắn Nở và
  Khép. Câu chuyện phải hiểu được khi người đọc hoàn toàn không biết Tarot.
- Câu chuyện nêu một chuyển động đời thường cụ thể; ẩn dụ khu vườn chỉ là lớp
  hình ảnh nhẹ.
- UI mặc định vẫn ưu tiên lời Nở/Khép gọn. Câu chuyện lõi có thể mở thêm, tránh
  đổ ba đoạn dài vào ritual.
- Viết theo năm đợt: 22 hạt lớn, 14 Lửa, 14 Nước, 14 Khí, 14 Đất. Mỗi đợt phải
  rà trùng ý, độ rõ và bản sắc trước khi sang đợt kế.

### 2.3. Tổng hợp ba hạt

- Không copy/paste hoặc nối lại ba diễn giải riêng. Người xem đã đọc ba phần đó.
- Mỗi hạt cần hồ sơ nghĩa có cấu trúc để engine đọc quan hệ: `domain`,
  `element`, `movement`, `need`, `risk`, `gift`, `action`, `storyStage`.
- Engine đọc lần lượt:
  1. chủ đề chung hoặc điểm lệch giữa ba hạt;
  2. chuỗi Nở/Khép theo ba vị trí;
  3. quan hệ nguyên tố;
  4. một hoặc hai tín hiệu chiêm tinh mạnh nhất của ngày;
  5. một gợi ý nhỏ, cụ thể và vừa sức.
- Tám động từ quan hệ chuẩn cho chiêm tinh: `amplify`, `accelerate`, `clarify`,
  `surface`, `soften`, `slow`, `challenge`, `stabilize`.
- Lời tổng hợp gồm bốn nhịp: chủ đề chung → chuyển động → ảnh hưởng chiêm tinh
  → gợi ý. Mục tiêu 90–140 chữ, một ý chính mỗi câu, tối đa hai dữ kiện chiêm
  tinh và không lặp nguyên văn lời riêng của hạt.

### 2.4. Chiêm tinh chung theo tuần/ngày

- Routine chạy một lần mỗi tuần nhưng chuẩn bị dữ kiện cho đủ 7 ngày và một
  ngày đệm; không lấy một snapshot duy nhất đại diện cả tuần.
- Dùng dữ kiện địa tâm không cần vị trí người xem: pha Mặt Trăng, cung Mặt
  Trời/Mặt Trăng, vị trí hành tinh, góc hợp chính và các chuyển đổi nổi bật.
- Không dùng nhà, cung Mọc, giờ mọc/lặn hay phép tính topocentric.
- Mỗi ngày chỉ giữ một hoặc hai tín hiệu nổi bật đã chuẩn hoá. Dữ kiện là đầu
  vào; wording diễn giải phải qua kiểm duyệt trước khi lên live.
- Chiêm tinh chỉ mô tả nó có thể khuếch đại, thúc đẩy, làm rõ, làm nổi lên,
  làm dịu, làm chậm, gây ma sát hoặc ổn định điều gì trong ba hạt.

## 3. Quy chuẩn wording bắt buộc

### Được phép

- “Năng lượng hôm nay có xu hướng thúc đẩy…”
- “Bối cảnh tuần này làm nổi bật…”
- “Ba hạt cho thấy một xu hướng chung quanh…”
- “Điều này có thể khiến… trở nên rõ hơn.”
- “Bạn có thể cân nhắc…”

### Không được phép

- “Bản đồ sao của bạn cho thấy…”, “Vì bạn thuộc cung…”.
- “Vũ trụ chắc chắn sẽ…”, “Điều này sẽ xảy ra với bạn…”.
- Bất kỳ lời nào giả định hệ thống biết hoàn cảnh, ngày sinh hoặc vị trí cá
  nhân của người xem.
- Thuật ngữ không được giải nghĩa, khẳng định chắc chắn, câu quá thơ đến mức
  không biết đang nói về tình huống nào, hoặc cấu trúc “không phải… mà là…”.
- Lấy câu đầu của ba hạt làm ba bullet rồi gọi đó là tổng hợp.

Mọi kết luận phải truy ngược được về ít nhất một tín hiệu hạt và, nếu có nhắc
chiêm tinh, một dữ kiện tuần/ngày. Khi không có quan hệ đủ rõ, viết khiêm tốn
và đơn giản; không bịa chiều sâu.

## 4. Wording pack và kiểm duyệt

- Wording thay đổi theo tuần bằng các pack đã biên tập, không để AI tự viết và
  tự xuất bản thẳng lên live.
- Pack gồm biến thể cho chuỗi Nở/Khép, vùng đời sống, quan hệ nguyên tố và các
  ảnh hưởng chiêm tinh. `weekKey` chọn pack; `dateKey` chọn biến thể trong pack.
- Trước khi duyệt, agent phải kiểm tra: rõ nghĩa, không trùng, không cá nhân
  hoá, không phán chắc, không phủ định vòng vo, không copy ba lời hạt và không
  dùng quá hai tín hiệu chiêm tinh.
- Nếu Ali bận hoặc chưa duyệt, giữ wording pack đã duyệt gần nhất. Dữ kiện tính
  toán mới có thể cập nhật, nhưng câu chưa duyệt không được lên live.

## 5. Routine vận hành đề xuất

- Chủ nhật 23:17 (`Asia/Ho_Chi_Minh`): chuẩn bị dữ kiện 8 ngày + bản nháp
  wording, chạy kiểm tra và báo “Oracle tuần mới đã sẵn sàng để duyệt”.
- Thứ Hai 10:00: nhắc duyệt lần một nếu chưa có trạng thái `approved`.
- Thứ Ba 10:00: nhắc cuối; sau đó tự fallback về wording pack đã duyệt gần
  nhất, không làm phiền thêm trong tuần.
- Automation không tự merge/push nội dung chưa được Ali duyệt. Cơ chế publish
  vẫn tuân theo `AGENT-RULES.md`.

## 6. Kiến trúc file và quyền sửa

- `garden-oracle-data.js`: 78 tên và lời Nở/Khép hiện tại; chỉ sửa khi Ali yêu
  cầu hoặc trong đợt nâng schema 78 hạt đã được duyệt.
- `garden-oracle-synthesis.js`: engine quan hệ và wording bank; ưu tiên commit
  riêng.
- `index.html`: UI/ritual; không chạm khi chỉ làm nội dung hoặc dữ kiện.
- File mới dự kiến, chỉ tạo khi triển khai: dữ liệu hồ sơ/câu chuyện 78 hạt,
  registry SVG, dữ kiện chiêm tinh tuần/ngày và wording packs.
- Khi Claude và Codex cùng làm, chỉ một agent giữ quyền sửa mỗi file code tại
  một thời điểm; agent còn lại review hoặc soạn bảng ngoài code.

## 7. Trình tự triển khai và điểm dừng an toàn

1. Khoá tài liệu này và commit riêng.
2. Chốt schema mới bằng 3–5 hạt mẫu; chưa viết cả 78 ngay.
3. Làm prototype artwork 4:5 không chữ cho cùng nhóm mẫu; test cùng một ảnh ở
   hướng Nở và xoay 180° ở hướng Khép với text HTML đối ứng.
4. Ali duyệt độ rõ của chữ và ngôn ngữ hình.
5. Mở rộng lần lượt 22 + 14 + 14 + 14 + 14, mỗi nhóm một commit có thể review.
6. Xây engine tổng hợp trên semantic profile và test ma trận tổ hợp đại diện.
7. Thêm routine/dữ kiện chiêm tinh, rồi nối vào engine sau khi dữ kiện được
   kiểm tra độc lập.
8. Cuối cùng mới sửa UI, QA mobile/desktop/reduced motion và chuẩn bị publish.

Không gộp toàn bộ Oracle vào một phiên hoặc một commit lớn. Sau mỗi bước, repo
phải ở trạng thái mà agent khác có thể đọc log và tiếp tục mà không cần lịch sử
chat.
