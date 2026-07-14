# Garden Oracle — công thức khả thi và routine tuần

> Mục tiêu: tuần đầu thiết lập chặt, các tuần sau chỉ thay phần thời tiết và
> duyệt một gói mẫu hữu hạn. Không đọc tay hàng triệu lượt, nhưng cũng không
> lấy “câu ngắn” làm bằng chứng rằng câu đã rõ.

## 1. Không gian trường hợp thật

Ba vị trí hiện không có nghĩa riêng trong synthesis. Vì vậy cùng ba Hạt và
cùng trạng thái phải cho một lời tổng hợp dù thứ tự rút thay đổi.

- Bộ ba không lặp: `C(78,3) = 76.076`.
- Mỗi bộ ba có `2³ = 8` thế Nở/Khép.
- Một ngày có `76.076 × 8 = 608.608` trường hợp có nghĩa khác nhau.
- Một pack 8 ngày có `608.608 × 8 = 4.868.864` trường hợp phải qua máy.

Nếu sau này ba vị trí được gán nghĩa riêng, không gian tăng thành
`P(78,3) × 8 = 3.651.648` trường hợp/ngày, gấp sáu lần. Không mở biến số này
trừ khi có quyết định nội dung rõ ràng về nghĩa của từng vị trí.

## 2. Vì sao vẫn khả thi

Hàng triệu lượt không tương ứng với hàng triệu đoạn phải viết tay. Engine ghép
từ một bộ ngữ pháp hữu hạn:

- 4 nhịp trạng thái: 0, 1, 2 hoặc 3 Hạt Khép.
- 2 dạng mở chủ đề: có domain trội hoặc ba domain khác nhau.
- 14 cụm chuyển động: 7 nhóm movement × Nở/Khép.
- 8 dạng quan hệ nguyên tố: 6 cặp bổ sung/ma sát + cùng nguyên tố + fallback.
- Tối đa 24 ô diễn đạt tương tác: 8 động từ × `single/pair/whole`.
- 4 nhịp sẵn sàng hành động: `go` (3 Nở), `guarded` (2 Nở/1 Khép),
  `review` (1 Nở/2 Khép), `pause` (3 Khép).
- 28 policy hành động có chiêm tinh: 4 nhịp × 8 động từ, trừ 4 cặp vô
  nghĩa (`go/surface`, `go/soften`, `pause/amplify`, `pause/accelerate`).
- 4 policy fallback, mỗi nhịp một policy, dùng khi không có tín hiệu đủ mạnh.
- 78 hành động cụ thể đã biên tập trong hồ sơ Hạt.

Các khung cố định chỉ cần duyệt lại khi sửa engine. Mỗi tuần, phần mới thật sự
chỉ là tối đa 16 tín hiệu (`8 ngày × tối đa 2 tín hiệu/ngày`) và các ô
động từ/dạng mà pack đó thực sự kích hoạt.

Nhịp trạng thái là luật nền; chiêm tinh chỉ điều chỉnh cách luật đó được thi
hành. Vì vậy `surface` với 2 Nở/1 Khép vẫn cho phép đi từ phần Nở sau khi gọi
tên giới hạn, còn `surface` với 3 Khép phải tạo một khoảng dừng để thở và nhìn
lại. Hai trường hợp không được dùng chung câu kêu gọi hành động.

## 3. Schema bắt buộc cho mỗi tín hiệu

Mỗi tín hiệu phải có đủ:

- `label`: dữ kiện chiêm tinh có thể truy nguồn.
- `verb`: một trong `amplify`, `accelerate`, `clarify`, `surface`, `soften`,
  `slow`, `challenge`, `stabilize`.
- `domains`: một hoặc hai vùng thực sự liên quan.
- `wording`: một câu tiếng Việt đã biên tập, có chủ thể và nói được tín hiệu
  có xu hướng làm gì.

Không thêm tín hiệu chỉ để đủ hai tín hiệu/ngày. Không có liên hệ mạnh thì
engine phải bỏ.

## 4. Routine mỗi tuần

### Bước A — chuẩn bị pack 8 ngày

1. Điền 7 ngày + 1 ngày đệm.
2. Giữ tối đa hai tín hiệu/ngày.
3. Chọn `verb` và `domains` trước khi viết câu.
4. Đọc riêng 16 câu forecast, chưa ghép Hạt, để kiểm tra dữ kiện và giọng.

### Bước B — kiểm tra máy toàn bộ

Chạy:

```sh
node scripts/audit-oracle-week.mjs > ORACLE-WEEKLY-AUDIT.md
```

Audit phải quét đủ `4.868.864` trường hợp và báo:

- số lượt `single/pair/whole`;
- số lượt bỏ tín hiệu yếu;
- khoảng độ dài ngắn nhất/dài nhất;
- ô `verb/kind` thực sự xuất hiện;
- `actionPolicyKey` thực sự xuất hiện và có khớp số Hạt Khép hay không;
- trường hợp 3 Khép nhưng lời cuối không nói rõ `chưa/dừng/hoãn`;
- câu thiếu tên Hạt mục tiêu, sai cấu trúc, quá dài hoặc kết ở từ nối;
- token `[[seed:ID]]` không khớp plain text hoặc nhắc một Hạt ngoài lượt rút;
- một mẫu đại diện cho mỗi ô thực sự xuất hiện.

Khoảng 90–140 chữ là dải ưu tiên, không phải lệnh tự động cắt câu. Biên cứng
để bắt lỗi cấu trúc là 80–155 chữ. Lượt nằm ngoài dải ưu tiên nhưng còn trong
biên cứng phải được đưa vào nhóm mẫu ngắn nhất/dài nhất để đọc bằng mắt; không
rút chữ chỉ để làm đẹp chỉ số.

### Bước C — duyệt rõ nghĩa bằng mắt

Không duyệt theo số chữ đơn thuần. Mỗi mẫu phải trả lời được ngay:

1. Ba Hạt đang nói về chuyện gì?
2. Hai Hạt nào đang tạo quan hệ chính, và quan hệ đó là gì?
3. Tín hiệu chiêm tinh chạm đúng Hạt/cặp/cả bộ ba nào?
4. Nó thay đổi nhịp theo động từ nào?
5. Việc cuối cùng có làm được trong hôm nay không?

Đồng thời đối chiếu nhịp hành động:

- 3 Nở — `go`: có thể làm bước thật.
- 2 Nở/1 Khép — `guarded`: được đi tiếp trong giới hạn đã gọi tên.
- 1 Nở/2 Khép — `review`: chỉ thử nhỏ, có thể rút lại; chưa chốt.
- 3 Khép — `pause`: dừng, thở, nhìn lại; không thúc hành động ra ngoài.

Đọc thành tiếng và đánh rớt câu nếu có một trong các dấu hiệu:

- thiếu chủ thể hoặc không biết “nó/điều này” đang chỉ gì;
- đoạn quan hệ giải thích một cặp Hạt nhưng đoạn chiêm tinh lại tác động một
  cặp khác;
- ghép hai cụm đúng nghĩa riêng nhưng đứng cạnh nhau thành tối nghĩa;
- rút ngắn đến mức mất quan hệ nhân–quả;
- lặp tên Hạt quá nhiều, thuật ngữ lộ máy, hoặc ẩn dụ lấn át việc đời thường;
- câu trôi chảy nhưng không truy ngược được về profile + signal.

### Bước D — trạng thái duyệt

- Chỉ chuyển pack sang `approved` khi audit không có lỗi máy và tất cả mẫu
  đại diện đã được đọc bằng mắt.
- Nếu chưa duyệt, giữ pack approved gần nhất.
- Không tự commit/push pack `review`.

## 5. Format báo cáo tuần

Mỗi báo cáo cần đúng sáu phần:

1. Pack và khoảng ngày.
2. Công thức + tổng lượt đã quét.
3. Phân bố `single/pair/whole/omitted`.
4. Khoảng số chữ và số cờ kỹ thuật.
5. Một mẫu cho mỗi ô `verb/kind` và mỗi `actionPolicyKey` đang hoạt động,
   cộng ít nhất một mẫu bỏ tín hiệu.
6. Checklist duyệt tay: `rõ chủ thể / rõ quan hệ / rõ tác động / rõ hành động`.

Có thể chạy `node scripts/audit-oracle-week.mjs --summary` khi chỉ cần bảng
phân bố; bỏ `--summary` để xuất đủ mẫu đọc duyệt.

Nhờ vậy biến số tuần nằm ở forecast và số ô interaction được kích hoạt; bộ
xương, tiêu chí và cách kiểm không đổi theo cảm hứng từng phiên.
