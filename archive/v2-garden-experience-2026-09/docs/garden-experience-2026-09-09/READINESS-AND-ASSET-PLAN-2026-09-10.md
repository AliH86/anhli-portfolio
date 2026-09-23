# Garden — đối chiếu trang live và kế hoạch asset

**Cập nhật tiếp 11/09:** xem [asset đã bổ sung và kế hoạch session sau](NEXT-SESSION-ASSETS-2026-09-11.md). Game trứng/ấp/nở/gà được đưa khỏi đợt Garden; Blender được phép dùng để dựng model. User yêu cầu chốt asset/kế hoạch và tiếp tục scene ở session sau. Origin đã có thêm commit `5dc754a`; các số liệu live dưới đây là audit 10/09.

Ngày kiểm tra: 10/09/2026. Phạm vi: đánh giá mạch đã chốt, đối chiếu bản live và bản Garden đang dở, tính phần cần bổ sung. Tài liệu này là đề xuất triển khai; không thay FLOW.md, không đánh dấu scene đã hoàn thành.

## Brief được Anh làm rõ sau lượt đánh giá

**Đại tu giao diện và phong cách toàn trang; không dùng ảnh người thật làm hình đại diện/trang trí cho giao diện mới.** Li xuất hiện bằng nhân vật minh họa đã chọn. Animation và Three.js là thành phần của trải nghiệm cần hoàn thành, không chỉ là phần thử có thể bỏ sau khi thay hero.

Điều phải giữ là bản chất của trang: một thế giới cá nhân, có giọng nói và sự hiếu khách của Li; âm nhạc tự sự, công việc sáng tạo, hình ảnh, những điều để khám phá và quay lại. Album, bài hát, tác phẩm, credits, Oracle và các đường kết nối phải được bảo toàn. Ảnh/video tư liệu trong thư viện tác phẩm được giữ như nội dung; không tiếp tục dùng chân dung chụp thật làm hero, avatar hoặc lớp trang trí. Không xóa tư liệu có người chỉ vì thay ngôn ngữ giao diện.

Được thiết kế lại từ đầu: hero, chân dung giao diện, bố cục sections, navigation, player UI, album panel, gallery, trang nghề, contact, màu sắc, vật liệu, typography, transition và cách diễn đạt các tương tác. Tái dùng dữ liệu/player engine để bảo toàn chức năng; DOM và giao diện cũ không phải ràng buộc thẩm mỹ. Mobile cũng theo bộ nhận diện mới, với chuyển động nhẹ phù hợp khả năng thiết bị.

Hai khung tĩnh là bước kiểm tra bố cục trong quá trình sản xuất. Bản trải nghiệm hoàn thiện phải có chuyển động có chủ đích: camera dẫn đường, cây/lá phản hồi, bìa có trạng thái, máy hát theo playback và ít nhất một phản hồi của Li sau khi rig hợp lệ. Không dùng việc chia giai đoạn để thu hẹp brief thành một poster tĩnh.

## Kết luận

Giữ sáu điểm dừng và đoạn thử đầu **góc chăm cây → sạp nhạc**. Mạch có chủ nhà, hoạt động, tác phẩm, nghề và lời mời kết nối; không cần thêm điểm dừng thứ bảy. Phần còn thiếu là cách nối nội dung thật vào khu vườn, bộ asset có thể dựng được, và kiểm tra hình trước khi diễn hoạt.

Ưu tiên ba việc: đồng bộ với nội dung live mới nhất; làm hai khung hình dựng thử đạt chất lượng; hoàn thiện một vòng chọn album → nghe → đóng → tiếp tục dạo. Những cảnh sau có thể chuẩn bị nội dung ngay nhưng chỉ dựng sau khi đoạn đầu đạt.

## Bằng chứng vừa kiểm tra

- Live: https://alih86.github.io/anhli-portfolio/ trả HTTP 200, quan sát bằng Chrome headless ở 1440×1000. Có **26 album và 181 mục gallery**; gallery gồm 32 Thiết kế, 10 Motion, 139 Khoảnh khắc.
- Local Garden: HEAD `5eacde1`, 24 album, cùng 181 mục gallery. Sau fetch, `origin/main` ở `28dbb85`, hơn local **4 commit**.
- Hai album mới trên live: `local-vi-muoi-man` — **Vị Muối Mặn — 鹹味未散** và `local-cai-ban-nhau` — **Cái Bàn Nhậu**, mỗi album 6 bài. Bản mới còn chuyển “Sầu Thừa Vừa Một Ly” khỏi “Tôi Hoạ Cả Thế Gian” sang “Cái Bàn Nhậu”, cập nhật audio map và font chữ Hán. Cần mang đủ thay đổi khi tích hợp; không chỉ thêm hai tên album.
- `index.html:5870` vẫn di chuyển `#gardenCalendar` vào `.hero-content`. Garden CSS ẩn `#home`, khiến lịch mất khỏi giao diện ở cả 1440×1000 và 390×844. Lịch vẫn hiện trên live.
- Quan sát local không thấy page JS error hoặc tràn ngang ở hai viewport trên. Đây là kiểm tra trang tĩnh hiện tại, chưa là kiểm thử scene, player phát nhạc, hay toàn bộ accessibility.
- Kiểm tra riêng adapter: mở được album “Một Tần Số Khác” với 6 hàng bài, chỉ có một audio element, không tự phát, Escape đóng dialog và drawer quay về `listeningRoom`. Chưa kiểm tra phát/seek và focus quay về hotspot thật vì chưa có scene.
- `scene.js` chưa có; `SCENE_READY=false`. Không có bộ model/layer/pivot hoàn chỉnh trong các thư mục asset đã kiểm tra.
- `assets/garden/anhli-gardener-alpha.png`: RGBA thật, 1145×1374, 1.103.090 byte. Pixel nền mẫu có alpha 0; các điểm mẫu ở mặt/áo/quần có alpha 254. Cần QA viền và xử lý vùng trắng cho bản runtime, không cần tách nền từ đầu.
- Cleanplate hiện có: 1672×941, WebP 311.944 byte. Đây là một ảnh đã gộp cả sạp, chậu và nền; chưa thể dùng làm toàn cảnh có camera đi vòng.
- Ảnh kiểm tra và dữ liệu tại [evidence/readiness-2026-09-10/](evidence/readiness-2026-09-10/). Không đổi mã nguồn sản phẩm trong lượt đánh giá này.

## Những chỗ dễ làm trải nghiệm hụt

| Điểm | Đối chiếu với bản gốc | Bổ sung cụ thể |
|---|---|---|
| Nhận diện chủ vườn | Bản vào Garden hiện chỉ có vườn trống, bìa trống, tên Li ở cỡ nhỏ | Cho thấy Li minh họa và artwork album hiện có trong hình vào trang cuối cùng. Giữ tên và vai trò nghề dễ đọc. Xây nhận diện mới bằng nét vẽ, hành động và giọng nói của Li |
| Hình đẹp nhưng dựng không tới | Cleanplate có cây, vật liệu và ánh sáng rất giàu chi tiết; dựng toàn bộ bằng hộp/cầu màu phẳng sẽ hụt xa hình duyệt | Khóa hai khung hình thực tế trước: gặp Li và tới sạp. Dùng hình khối tiết chế nhưng vật liệu, bóng và chiều sâu cùng ngôn ngữ với cleanplate |
| Đọc nội dung làm mất đường dạo | Controller hiện rời Garden/dispose khi mở section; chưa có lưu và khôi phục vị trí đã dạo | Album/giới thiệu ngắn mở panel trong cảnh. Khi cần danh mục hoặc bài dài, lưu điểm dừng và có nút trở lại đúng chỗ; không bắt đi lại từ đầu |
| Tầng hình ảnh chưa liền | Cửa vào kem sáng; sections cũ xanh đen, hiệu ứng blur/glow và các lớp trang trí còn khác nhau | Thiết kế lại toàn bộ hệ giao diện theo khu vườn: navigation, album/player, gallery, nghề, Oracle và contact. Dữ liệu và playback giữ liên tục; giao diện cũ được thay bằng component mới đồng bộ |
| Quá nhiều cửa trước khi nghe | Live có đoạn mời nghe và một cửa xác nhận riêng. Garden còn thêm cửa vào và chọn bìa | Đường Garden đề xuất: Dạo vườn → chọn bìa → Nghe. Giữ nguyên thông điệp về AI trong panel; thống nhất trạng thái đã đọc để khách không gặp lại cửa xác nhận khi mở danh mục |
| Oracle bị đưa quá sâu | Trên live lịch hiện ở đầu; flow mới đặt ở hiên cuối | Giữ hiên là điểm kết tự nhiên, đồng thời có lối “Một lời hôm nay” từ cửa vào/menu. Khôi phục lịch ở DOM hiển thị; giữ engine và nội dung đã có |
| Phần nghề đến muộn | 74–90% mới tới bàn làm việc, trong khi khách thuê dịch vụ cần thấy năng lực sớm | Giữ thứ tự hành trình, tăng độ rõ của “Xem công việc” ngay cửa vào và điều hướng thường trực. Bàn nghề cần 3 thẻ dự án có bằng chứng, không chỉ vài đồ vật trang trí |
| Mobile thiếu nhân vật | Ở 390×844, phần chữ chiếm phần lớn màn đầu; ảnh vườn bắt đầu khoảng y=616, chưa có Li | Bố cục mới cần thấy Li minh họa/bìa và CTA sớm. Giữ cùng bộ nhận diện và micro-animation; nội dung đi thẳng, không tải Three.js theo phạm vi FLOW hiện tại |

Các giọng nhạc Anh Li, D’Li và [SEN]SẼ Đa Band vẫn cần truy cập như hiện có. Không biến tất cả thành một nhân vật người làm vườn chung rồi làm mất tên nghệ sĩ hoặc credits.

## Quyết định hình ảnh và camera đề xuất

**Một khu vườn 2.5D chạy bằng Three.js:** Li nét mực 2D, vật tương tác ở gần dựng 3D, cảnh xa dùng nền cố định hoặc các mặt phẳng có khoảng cách. Duy trì không khí nắng ấm và sạp gỗ của hình đã duyệt.

- Dựng thật sạp, chậu/cây, mặt đường gần, máy hát và các bìa. Độ dày, bóng tiếp xúc và vật thể che nhau tạo chiều sâu.
- Nếu dựng sạp 3D ở trước, phải có bản nền xa đã bỏ sạp/chậu tương ứng; không giữ một sạp trong ảnh rồi đặt thêm sạp thứ hai lên trên.
- Camera tiến và dịch ngang nhẹ; khởi điểm thử góc tương đối quanh Li không quá khoảng ±8–12°. Đây là giới hạn lookdev để thử, chưa là góc đã kiểm chứng. Không cho đi vòng sau lưng Li.
- Giữ ghế đi cùng sprite trong đoạn đầu. Chỉ tách ghế ra 3D khi có bản Li không ghế đúng pose; không dùng cả hai.
- Chậu phải được đặt theo đầu ngón tay hiện có. Tư thế hiện tại là tay hạ xuống; nếu chậu nằm quá xa hoặc quá thấp, câu “đang chăm cây” sẽ không đọc được. Kiểm tra bố cục trước, chưa cần thêm animation tay.
- Khung A: Li và chậu là điểm nhìn chính; sạp xuất hiện ở bên phải để hứa hẹn bước tiếp. Vùng sau mặt ít chi tiết.
- Khung B: sạp đủ lớn để đọc 6 bìa; Li có thể còn ở rìa khung. Mâm đĩa nhìn rõ, player không che bìa.
- Trong bước dựng bố cục giữ Li tĩnh. Sau khi đúng tỷ lệ, dùng layer/rig để tạo một phản hồi ngắn như chớp mắt hoặc nhìn khách; làm động tác tay khi anchor với chậu đã hợp lệ. Đây là phần của trải nghiệm đích. Không xoay/lắc nguyên cutout để giả diễn hoạt.
- Ưu tiên một trạng thái nắng đã duyệt. Chiều muộn là nâng cấp sau khi thử vật liệu: thay ánh sáng không tự sửa được bóng nắng đã bake trong ảnh nền. Không tint nhân vật đen trắng thành màu cam.

## Danh sách asset cần sản xuất

Kích thước/dung lượng dưới đây là mục tiêu để thử hình, không phải số đo đã đạt. Giữ master và xuất bản runtime riêng.

| Gói | Số lượng / đầu ra | Nguồn và phần còn thiếu | Ưu tiên |
|---|---|---|---|
| Hai khung dựng thử | 2 khung desktop: gặp Li / tới sạp | Ghép đúng Li, nền, bìa thật, chữ và vị trí player; khóa tỷ lệ, ánh sáng, độ giàu chi tiết trước diễn hoạt | P0 |
| Bộ giao diện mới | Hệ chữ/màu/vật liệu; navigation, album panel, player, gallery, thẻ nghề, contact và trạng thái tương tác | Thiết kế xuyên desktop/mobile; thay cả sections bên dưới cửa vào. Tái sử dụng engine nội dung, không giữ nguyên giao diện cũ trong vỏ mới | P0 |
| Nhận diện minh họa | Li chủ vườn và avatar/biểu trưng cho các danh tính âm nhạc cần hiển thị | Dùng cùng ngôn ngữ nét vẽ đã chọn; có thể biến thể từ master khi phù hợp. Thay ảnh chân dung đang dùng như UI; không sửa artwork album và tư liệu gốc | P0–P1 |
| Li runtime | 1 sprite alpha, cạnh dài khoảng 1024–1374 px tùy kích thước hiển thị; 1 bóng tiếp xúc và dữ liệu anchor | Alpha đã có; cần sạch viền, trắng đục, kiểm tra trên kem/xanh đậm/đất nung. Thử bản khoảng 850×1020 trước; chỉ hạ kích thước nếu mặt còn rõ | P0 |
| Không gian đầu | 1 bộ sạp + máy hát + chậu/cây + đường gần; 1 atlas vật liệu khoảng 1024² | Chưa có geometry. Có thể tạo bằng code hoặc GLB; tên bộ phận phải rõ. Mâm/vinyl/cần kim độc lập | P0 |
| Nền và cây che lớp | 1 nền xa; khoảng 2–3 cụm cây/lá alpha dùng chung atlas | Tái dùng hình đã chọn; cần xử lý nền bỏ các vật đã dựng 3D. Chọn ít cây đủ chiều sâu, không dựng toàn bộ từng lá trong cleanplate | P0 |
| Bìa sạp | 6 thumbnail khoảng 512², mục tiêu trung bình ≤60 KiB/bìa; 1 danh sách stable ID | Dùng artwork thật sau merge. Giữ bìa chủ đạo “Một Tần Số Khác”; 5 ô còn lại chọn qua cấu hình và có lối vào toàn bộ 26 album. Không hardcode 6 album đầu của mảng | P0 |
| Poster vào trang / bản nhẹ | 1 bản desktop và 1 crop mobile từ cảnh đã dựng đạt | Bổ sung Li và bìa thật vào poster cuối; không dùng ô trắng lookdev trên bản phát hành. Mục tiêu khoảng 250–350 KiB desktop, 120–200 KiB mobile | P0 |
| Rig phản hồi của Li | 1 file nguồn nhiều layer + JSON pivot; thân/đầu/tay/mắt và phần bù bị che | Chưa có. Làm sau khi khung tĩnh đúng; ít nhất một phản hồi ngắn cần có trong trải nghiệm đích. Không sinh nhiều pose độc lập dễ trôi mặt và tỷ lệ | P1 |
| Nhà kính | 6 hình tuyển chọn + 1 poster video từ nội dung thật | Kho hiện có 181 mục, đủ chọn bước đầu. Giữ tỷ lệ gốc; crop riêng thumbnail và mở bản đầy đủ khi bấm | P2 |
| Bàn nghề | 3 thẻ dự án, mỗi thẻ có ảnh đại diện + tên + vai trò + đóng góp/bằng chứng | `WORK` hiện chủ yếu là hành trình nghề; `VIDEOS` có tư liệu dự án. Cần liên kết ảnh/video đúng dự án và credits trước khi đặt lên bàn | P2 |
| Hiên cuối | 1 cụm đồ vật nhỏ: phong thư / lịch / ly nước | Dùng vật liệu chung; nối contact, Calendar/Oracle và liên kết Oracle độc lập đang có | P2 |

Anh chưa cần chuẩn bị thêm một bộ ảnh lớn để bắt đầu. Phần cần xác nhận sau khi em lập shortlist là **3 dự án nghề tiêu biểu và vai trò chính xác**; tận dụng kho tư liệu tác phẩm hiện hữu trước. Chỉ yêu cầu thêm tư liệu nếu dự án được chọn thực sự thiếu bằng chứng. Asset cần sản xuất mới tập trung vào minh họa, layer animation, model/vật liệu và bộ giao diện. Nhân vật Li giữ mẫu minh họa đã duyệt.

Một lỗi nguồn cần xử lý khi lập manifest: album “Hòa Bình Và Lặng Lẽ” hiện trỏ `uploads/hoa-binh-va-lang-le.jpg`, trong khi file local tên `uploads/hoabinhvalangle.jpg`. URL ảnh tên cũ trên live cũng trả HTTP 404. Không đưa đường dẫn thiếu vào texture sạp. Kiểm tra hình thực tế trước khi xác định mapping đúng.

## Ngân sách cho đoạn đầu

**Mục tiêu khoảng 3 MiB tải tăng thêm cho nền cảnh đầu khi khách chọn Dạo vườn; trần thử nghiệm 5 MiB.** Rig/layer phản hồi chưa có file nên cần đo và phân bổ lại phần Li/dự phòng sau xuất; không coi bảng này là báo giá dung lượng đã đủ cho mọi animation. Không tính nhạc/video khách chủ động mở. Poster vào trang thuộc ngân sách trang ban đầu, không cộng lại lần hai nếu đã cache.

| Thành phần | Dự trù KiB |
|---|---:|
| Engine đã nén qua HTTP | 450 |
| Li alpha | 450 |
| Atlas vật liệu | 350 |
| Cây/lá và nền xa dùng lại hoặc bản tối ưu tăng thêm | 200 |
| 6 bìa × 60 KiB | 360 |
| Geometry / dữ liệu cảnh | 250 |
| Bóng, hạt, chi tiết phụ | 64 |
| Controller / cấu hình | 80 |
| Dự phòng chất lượng hình và chênh lệch nén | 850 |
| **Tổng mục tiêu** | **3.054 KiB ≈ 2,98 MiB** |

Hai file Three vendored hiện tổng 2.120.885 byte thô; thử gzip cục bộ còn 419.491 byte (~410 KiB). Đây là phép nén offline, chưa chứng minh hosting sẽ trả gzip đúng. Nếu server trả bản thô, dự trù tăng thành khoảng 4,57 MiB, gần trần 5 MiB. Phải kiểm tra Network thực tế trước khi dùng phần dự phòng cho hiệu ứng. Khoản nền/cây 200 KiB khá chặt nếu phải thay nền mới; phần dự phòng được ưu tiên cho hình trước.

Texture budget cần tách khỏi dung lượng tải. Với RGBA8 + mipmaps, giả định một nền 1672×941, Li 850×1020, hai atlas 1024², sáu bìa 512² và bóng 512²: khoảng **32,4 MiB** trước dự phòng; đặt mục tiêu texture hoạt động khoảng **33–42 MiB**, dưới trần thử 64 MiB. Không bao gồm framebuffer và toàn bộ overhead GPU. Công thức kích thước × 4 × 4/3 theo [Three.js texture memory](https://threejs.org/manual/en/textures.html); cần đếm texture đang sống và [dispose đúng vòng đời](https://threejs.org/manual/en/how-to-dispose-of-objects.html).

Giữ trần ban đầu của PERFORMANCE.md: ≤100k triangles, ≤100 draw calls, DPR cân bằng ≤1,25; tắt render khi ẩn/không dùng; không postprocess nặng trong đoạn đầu. Đây là mục tiêu, chưa có đo FPS.

Ảnh bìa nguồn chưa đồng đều: 4 bìa mẫu 600² có kích thước 82–146 KB; “Tôi Hoạ Cả Thế Gian” 1254² gần 591 KB. Xuất thumbnail giúp kiểm soát tải và VRAM; không tải cả 26 bìa lớn hay 181 mục gallery để trưng 6 ô.

## Trình tự triển khai đề xuất

1. **Đồng bộ nền nội dung.** Đọc 4 commit mới; tích hợp album/audio map/font CJK và thay đổi bài hát vào phần Garden đang dở, bảo toàn thay đổi chưa commit. Kiểm tra bằng ID và số bài, không chỉ đếm album. Chưa sửa ở lượt đánh giá này.
2. **Chuẩn bị asset và hai khung A/B.** Chốt đúng Li, vị trí chậu, chiều sâu sạp, 6 bìa và khung nội dung mở ra. Kiểm tra thêm crop mobile. Đây là bằng chứng hình ảnh cho lựa chọn kỹ thuật.
3. **Làm vòng trải nghiệm ngắn và chuyển động.** Một renderer; vào vườn, cuộn tới sạp, chọn album, bấm Nghe, đóng panel, tiếp tục đúng vị trí. Thiết kế lại player/panel theo style mới; thêm chuyển động camera, cây, bìa, vinyl và phản hồi của Li khi rig đạt. Khôi phục Calendar; đồng bộ cửa nghe; giữ đường đi thẳng tới công việc/nội dung.
4. **Kiểm tra hành vi và tải.** Play/pause/seek/đổi bài, player xuyên mode, 20 vòng mở/đóng, keyboard/focus, back/forward/BFCache, reduced motion, loading cancellation và fallback. Cold/warm load, desktop/tablet/mobile; ghi thiết bị thật còn thiếu. Scene chỉ bật sau khi đạt.
5. **Đại tu phần còn lại.** Nhà kính → bàn nghề → hiên, toàn bộ sections/panel và mobile dùng cùng bộ giao diện, vật liệu và chuyển động đã thành công. Bổ sung động tác Li phức tạp hơn hoặc chiều muộn khi còn ngân sách và có ích cho trải nghiệm. Mục tiêu cuối là một website mới đồng bộ từ đầu đến cuối.

Không sinh thêm cả sáu panorama trước, không mua bộ model theo phong cách khác, không tạo video nền mới chỉ để lấp khoảng trống. Chi phí sáng tạo trước mắt nên đi vào **Li đúng nhận diện, sạp có chất liệu, bìa thật dễ chọn và nội dung mở ra liền mạch**.
