# Asset — 2D mực đen trong vườn màu

**Cập nhật 11/09:** [Nền xa không sạp](assets/garden-distant-cleanplate-v1.webp), [Li web và 6 bìa/manifest](assets/runtime-candidates/manifest.json) đã được chuẩn bị; chưa tích hợp. Xem [bộ kế hoạch mới](NEXT-SESSION-ASSETS-2026-09-11.md) cho model Blender/Three.js, rig và phạm vi bỏ game trứng. Danh sách cũ bên dưới là nguồn tham chiếu sản xuất.

## Bản hình mới trong bộ này

- **[Li ngồi làm vườn](assets/anhli-gardener-ink-master.png):** bản mẫu nhân vật nền trắng, không nón, áo xắn tay và tạp dề. Dùng để duyệt nét/tỷ lệ và làm nguồn tách layer. Chưa có alpha, rig hoặc các tư thế bổ sung; không đưa nguyên hình nền trắng vào scene như sprite hoàn chỉnh. Nét mặt còn cần đối chiếu với mẫu chân dung Anh gửi khi duyệt.
- **[Nền vườn và sạp đĩa](assets/garden-stall-cleanplate.png):** bản không có người, ô bìa trống để thay bằng artwork thật. Dùng tham chiếu bố cục/ánh sáng và làm fallback tĩnh. **[Bản WebP](assets/garden-stall-cleanplate.webp)** là bản nén cùng hình, 311.944 byte; chưa phải background nhiều lớp hay scene có thể xoay camera.
- [Prompt log](PROMPTS.md) lưu yêu cầu và các lần chỉnh. Hai lần thử nền trong suốt xuất thành ảnh RGB có bàn cờ vẽ vào nền nên không được chọn vào gói asset sử dụng. Không coi họa tiết bàn cờ là alpha.

## Tính cách hình ảnh cần giữ

Li có tóc đen rẽ phồng, mắt nhỏ tự nhiên, má/cằm mềm và nụ cười kín. Gợi nét tương đồng ảnh mẫu; không tả lỗ chân lông, không biến thành thiếu niên mắt lớn. Đen trắng thuần cho nhân vật; không tint cả người theo màu vườn. Nội thất/tán lá có thể nhiều màu nhưng giảm chi tiết tại vùng sau mặt để Li vẫn rõ.

Tỷ lệ người trưởng thành tương đương 6,5–7 đầu khi đứng. Ở tư thế ngồi, kiểm tra vai–khuỷu–gối–cổ chân theo skeleton trước khi rig. Bàn tay đưa tới chậu phải khớp cao độ thật. Không đặt đầu nổi tách cổ, chân lơ lửng hoặc ghế xuyên chậu.

## Danh sách sản xuất

| Asset | Đã có / tái dùng | Phần cần làm để chạy thật |
|---|---|---|
| Li seated master | Mẫu raster mới | Duyệt nét; tách silhouette với alpha thật, nền trắng bên trong đục |
| Li idle / look-up | Chưa có | Layer thân, đầu/cổ, cánh tay gần, bàn tay; mắt mở/khép; pivot khớp vai/khuỷu/cổ. Không xoay nguyên hình để giả cử động người |
| Ghế | Có trong mẫu cùng Li | Nếu giữ ghế 2D, tách layer ghế và khóa phối cảnh; nếu dựng ghế 3D, bỏ ghế khỏi sprite sau khi tách. Không dùng cả hai cùng lúc |
| Chậu, cây, mặt đất | Hình tham chiếu màu | Mesh low-poly riêng; cây nhỏ 3–5 lá là đủ cho một tương tác mọc lá; bóng tiếp xúc bake hoặc plane mềm |
| Sạp retro | Cleanplate mới | Mesh gỗ/mái/dây/kẹp; atlas vật liệu chung; các ô bìa là mặt riêng, không bake artwork vào toàn sạp |
| Turntable | Tham chiếu trong cleanplate | Tách thân, mâm, vinyl, cần kim. Chỉ mâm/vinyl quay, thân đứng yên; label dùng bìa/nhãn thật theo album |
| Bìa và metadata | Catalog đang có | Lấy stable ID sau merge; tạo thumbnail web riêng khi cần; giữ ảnh gốc và quyền cập nhật dữ liệu hiện tại |
| Bồ công anh / hạt | Concept và asset hiện tại | Kiểm tra nguồn dùng được; ưu tiên ít instance và một vật liệu, không hàng trăm DOM hạt |
| Nhà kính / bàn nghề / hiên | Mới có flow | Dựng sau prototype đầu; dùng ảnh/công việc/video thật, không sinh nội dung giả |
| Chữ, bảng chỉ đường, nhãn album | Nội dung HTML hiện có | Giữ HTML overlay rõ nét, có nhãn truy cập; không bake chữ nhỏ vào texture |

## Gói layer nhân vật cần bàn giao tiếp

Một file editable (PSD/SVG thích hợp hoặc source tương đương) và PNG/WebP alpha từng layer, cùng JSON pivot/anchor. Các layer bị che phải có vùng bù khi xoay, tránh hở trắng. Giữ một canvas chung và cùng tọa độ xuất; không crop độc lập làm lệch đăng ký. Kiểm tra trên nền xanh đậm, đất nung và kem để thấy viền răng cưa/halo và vùng trắng bị mất.

Không dùng multiply để “xóa nền trắng”: sẽ làm da/áo trắng biến mất trên nền màu. Không dùng ảnh RGB có bàn cờ vào plane. Alpha test/blending phải thử với lá và bóng để tránh lỗi thứ tự trong suốt. Cho billboard chỉ xoay nhẹ hoặc giữ một góc cố định; camera không đi vòng ra sau Li.

## Chuyển động cho prototype

1. **Idle:** vai/thân dịch rất ít theo nhịp thở, không co giãn đầu. Mắt khép nhanh một lần sau khoảng nghỉ thay đổi; dừng toàn bộ nếu reduced motion.
2. **Chăm cây:** tay hạ một nhịp ở phạm vi nhỏ, chạm điểm anchor cạnh chậu; lá rung trả lời. Chỉ chạy khi đã có layer tay và không xuyên vật.
3. **Nhìn khách:** lúc vào hotspot, đổi head/eye pose đã vẽ; không warp mặt theo chuột. Tối đa một phản hồi rồi trở về nghỉ.
4. **Sạp nhạc:** hover/focus nâng một bìa; click mở album. Sau Play, cần kim hạ và đĩa quay. Pause dừng đúng player state.

## Phân biệt source và runtime

`docs/.../assets/` là gói sáng tạo để review, không tự thêm preload vào trang. Khi được chọn và xử lý xong, xuất riêng vào `assets/garden/` với kích thước theo màn hình hiển thị. Master PNG giữ lại để chỉnh; bản web giảm dung lượng nhưng không ghi đè nguồn. Manifest ghi rõ `lookdev`, `existing` hoặc `planned`, không đánh đồng với `runtime-ready`.
