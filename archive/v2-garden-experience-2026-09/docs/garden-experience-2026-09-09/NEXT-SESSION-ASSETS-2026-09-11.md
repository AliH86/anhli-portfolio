# Garden — asset đã bổ sung và kế hoạch cho session sau

Cập nhật 11/09/2026 theo chỉ dẫn cuối: bổ sung asset, hoàn thiện kế hoạch; phần dựng model/scene và tích hợp đại tu tiếp tục ở session sau. Không commit/push/deploy.

## Brief đang có hiệu lực

- Đại tu giao diện và style xuyên suốt trang. Li bằng minh họa đen trắng; thay ảnh chân dung dùng như hero/avatar/trang trí. Giữ kho nhạc, tác phẩm, tư liệu, credits và các nội dung riêng của Li.
- Animation và Three.js là phần của trải nghiệm đích. Có thể dùng Blender trực tiếp để dựng những asset cần thiết rồi xuất GLB cho Three.js; không bắt buộc mọi hình khối đều viết bằng code.
- Giữ mạch sáu điểm dừng: cổng → góc chăm cây → sạp nhạc → nhà kính → bàn nghề → hiên. Đoạn triển khai đầu vẫn là góc chăm cây → sạp nhạc.
- **Game trứng/ấp/nở/gà được đưa khỏi bản hiện tại và khỏi kế hoạch phát hành Garden.** Game sẽ nối vào một giai đoạn xa hơn, chưa thiết kế UI, lời mời chơi, phần thưởng hay model trứng trong đợt này. Oracle/lịch hạt, Vedic và nội dung âm nhạc là các chức năng riêng, không bị xóa vì tên code cũ có chữ “egg”.
- Bản chất: một thế giới cá nhân có chủ nhà, âm nhạc tự sự, chiều sâu nghề và những điều nhỏ để khám phá/quay lại. Bộ máy dữ liệu và playback được bảo toàn; hình thức UI/DOM cũ không phải ràng buộc thẩm mỹ.

## Đã bổ sung thật trong session này

| Asset | File | Thông số / trạng thái |
|---|---|---|
| Nền xa mới, bỏ sạp và đồ vật gần | [Master PNG](assets/garden-distant-cleanplate-v1.png) · [WebP](assets/garden-distant-cleanplate-v1.webp) | 1672×941; PNG 2.836.647 byte; WebP 328.396 byte. Đã xem hình; chưa đặt trong scene |
| Li phiên bản web | [WebP alpha](assets/runtime-candidates/anhli-gardener-web-v1.webp) | 853×1024, 128.504 byte, alpha thật. Chuyển kích thước/định dạng từ master hiện có; chưa sửa viền, chưa rig |
| Sáu bìa album | [Thư mục và manifest](assets/runtime-candidates/manifest.json) | 6 × 512², tổng 262.462 byte. Giữ artwork và ID gốc; chỉ tạo bản web để thử bìa sạp |

Sáu bìa: **Một Tần Số Khác; Không Có Gì!!?!; Sau Một Mùa Sóng; Chuyện Của Trăng; Tôi Hoạ Cả Thế Gian; Another Stage.** Đây là lựa chọn để kiểm tra hình trên sạp, chưa thay thứ tự catalog hoặc danh sách album được quảng bá trên site. Sau đồng bộ dữ liệu, việc chọn bìa phải lấy qua stable ID.

Tổng bản web mới của nền + Li + 6 bìa là **719.362 byte, khoảng 703 KiB**. Đây là kích thước file trên đĩa của gói đã chuẩn bị, không phải tổng tải website hoặc tổng tải scene. Chưa có GLB, atlas vật liệu, rig hoặc benchmark FPS.

Ảnh gốc và các master cũ được giữ nguyên. Bản mới nằm trong thư mục review; chưa thêm preload hoặc đổi hình đang dùng trong website. [Manifest chính](asset-manifest.json) đã ghi trạng thái nền; [manifest bản web](assets/runtime-candidates/manifest.json) ghi ID, nguồn, kích thước, hash và phần QA còn lại.

### Nhận xét hình mới

- Đã bỏ sạp, record, máy hát, chậu lớn và bình tưới ở gần, nên tránh được một sạp trong ảnh chồng lên sạp 3D.
- Giữ nhà kính, đường đi, cây xanh, nắng ấm và chất liệu của hình đã chọn. Phía trước có khoảng đất/đá rộng để đặt bộ dựng.
- Đây vẫn là ảnh phẳng với ánh sáng và đường phối cảnh đã bake. Camera đầu cần hạn chế; nếu đường gần không khớp geometry, dùng phần cảnh xa và chuyển tiếp bằng mặt đất 3D. Chưa coi toàn bộ ảnh như không gian có thể đi vòng.
- Li bản web giữ cùng pose và nét mặt, còn ghế trong sprite. Cần kiểm tra viền trên kem/xanh đậm/đất nung ở kích thước hiển thị thật; chưa gọi là rig-ready.

## Chỉnh mã nguồn đã làm trước khi chốt sang session sau

Theo yêu cầu take out game trứng, trong `index.html` đã:

1. Bỏ nạp `css/egg-game.css`, `js/world-state.js`, `data/egg-game-config.js`, `js/egg-game.js`.
2. Bỏ cụm DOM `hiddenEgg` / `hiddenEggMessage` khỏi hero.
3. Nạp trực tiếp `css/portfolio-governor.css` và `js/portfolio-governor.js`, vì trước đây bộ này được tải vòng qua `egg-game.js`.

Giữ nguyên các file nguồn game và dữ liệu lưu của khách cho công việc tương lai; không xóa/reset localStorage. Chưa thay đổi Oracle hoặc bộ easter-egg nội dung khác. Kiểm tra giới hạn phạm vi tại [receipt](evidence/egg-removal-2026-09-11.json).

## Bộ model cần dựng ở session sau

| Bộ | Cấu trúc cần có | Vật liệu / chuyển động / đầu ra |
|---|---|---|
| Sạp gỗ | Khung, mặt bàn, mái vải, hai dây treo, kẹp, thùng đĩa; 6 sleeve plane riêng | Gỗ ấm, vải đất nung, mép bo có tiết chế. Bìa nhô/nghiêng khi hover hoặc focus. Xuất GLB + file `.blend` hoặc module Three.js tương đương |
| Máy hát | Thân, nắp, platter, vinyl, label và cần kim độc lập | Trục platter/vinyl ở tâm; cần kim có pivot thật. Đĩa quay khi `audioEl` đang phát, ngừng khi pause; không phát âm thanh riêng |
| Góc chăm cây | Chậu, đất, thân, 3–5 lá có anchor, bóng tiếp xúc | Chậu theo đầu ngón tay của Li; không đặt thêm ghế 3D khi còn ghế trong sprite. Lá phản hồi nhẹ; giữ vùng sau mặt ít chi tiết |
| Đường và cây che lớp | Một nền đất gần + khoảng 2–3 cụm cây/lá | Che chân ghế/bóng tự nhiên nhưng không che nội dung tương tác. Cây dùng chung vật liệu/instance; không tạo hàng trăm layer trong suốt |
| Li và rig phản hồi | Master đồng bộ canvas, thân/đầu/tay/mắt, phần bù bị che và JSON pivot | Bước đầu dựng tĩnh đúng tỷ lệ; sau đó ít nhất một phản hồi chớp mắt/nhìn khách bằng layer hợp lệ. Không lắc nguyên PNG |

Tên bộ phận đề xuất để Three.js nối rõ: `stall_root`, `sleeve_01..06`, `turntable_root`, `platter_pivot`, `vinyl`, `label`, `tonearm_pivot`, `planter_root`, `leaf_01..05`, `li_anchor`, `hand_target`, `contact_shadow`.

Giữ một quy ước tọa độ và đơn vị xuyên pipeline; ghi rõ phép đổi trục Blender → glTF. Áp dụng transform trước export khi phù hợp, kiểm tra normal/UV/alpha và tên node sau import. Vật liệu procedural trong Blender phải được bake hoặc có bản tương đương thực sự được GLB hỗ trợ; render đẹp trong Blender chưa đảm bảo Three.js nhìn giống.

### Chọn công cụ theo phần việc

- **Blender:** dựng sạp/máy hát/chậu, bo cạnh, UV, vật liệu, đặt pivot, xuất `.blend` và GLB. Dựng trong scene/collection riêng, giữ scene người dùng đang mở.
- **Three.js:** camera và hành trình, ánh sáng runtime, sự kiện hover/focus, chuyển động theo playback, tải/giải phóng scene và kết nối HTML.
- **Imagegen:** xử lý nền/layer minh họa khi thật sự cần; giữ cùng master, palette và góc nhìn. Nền xa của session này dùng built-in imagegen, không dùng API/CLI ngoài.
- **HTML/CSS:** chữ, nhãn album, nút, player, panel, gallery, nội dung dài và fallback. Thiết kế lại theo hệ Garden; giữ text rõ nét và truy cập bàn phím.

## Thứ tự thực hiện khi quay lại

1. **Nắm trạng thái repo trước khi sửa.** Đọc file này, `AGENT-RULES.md`, `SESSION-HANDOFF-2026-09-10.md`; chạy status/fetch. HEAD local hiện `5eacde1`; sau fetch đầu 11/09 origin/main ở `5dc754a`, hơn local 5 commit. Chưa merge/pull vào working tree.
2. **Đồng bộ nội dung mới nhất.** Đã có hai album mới và cập nhật audio map/font CJK. Riêng “Vị Muối Mặn” trên origin nay có 8 bài, thêm 餘像 · Dư Ảnh và 借火 · Mượn Lửa. Con số 6 bài của audit 10/09 là lịch sử. Kiểm tra ID/thứ tự/chuyển bài, bảo toàn Garden đang dở; không stage toàn bộ.
3. **Mở bộ asset chuẩn bị và dựng hai khung thật.** Khung A: Li/chậu, sạp gợi phía sau. Khung B: 6 bìa đủ rõ, máy hát và vị trí player. Thử cùng nhân vật minh họa trên nền màu. Kiểm tra crop mobile; không cần thêm concept mới.
4. **Dựng và export bộ model.** Dùng bảng trên, kiểm tra Blender → Three.js cho một vật trước khi làm cả cụm. Giữ file nguồn editable và output có version.
5. **Viết scene và nối nội dung.** `js/garden/scene.js` chưa tồn tại; giữ `SCENE_READY=false` cho đến khi tạo/test. Dùng API controller trong handoff, một audio element. Lưu vị trí khi mở/đóng nội dung. Khôi phục Calendar đang ẩn do bị đưa vào hero cũ.
6. **Animation và UI đồng bộ.** Li phản hồi sau rig, lá và bìa có trạng thái, đĩa theo playback. Thiết kế lại player/panel và phần dưới trang; mobile cùng style, motion nhẹ. Game trứng không có trong scene hoặc UI.
7. **Kiểm tra trước khi mở rộng.** Visual desktop/tablet/mobile, keyboard/focus, deep link/back/BFCache, play/pause/seek, loading error, reduced motion và vòng đời renderer/texture. Chỉ mở thêm nhà kính/bàn nghề/hiên sau khi đoạn đầu đạt.

## Ngân sách và điểm chưa biết

Giữ mục tiêu khoảng 3 MiB tải tăng thêm, trần thử 5 MiB cho cụm đầu; texture hoạt động thử ≤64 MiB, ≤100k triangle, ≤100 draw call, DPR cân bằng ≤1,25. Đây là mục tiêu chưa đo. Rig và model chưa có nên chưa thể nói đạt ngân sách.

Nền web mới 321 KiB lớn hơn khoản dự trù nền/cây 200 KiB trước đây; Li bản web 125,5 KiB thấp hơn khoản Li 450 KiB. Cần tính lại cả gói sau có geometry/atlas, không lấy việc nén riêng ảnh làm bằng chứng scene nhẹ.

MCP Blender được thử sau khi Anh nói mở Blender, nhưng tại thời điểm gọi vẫn không kết nối addon `127.0.0.1:9877`. Chưa đọc hoặc sửa scene UI. Blender CLI đã xác nhận 5.2.1 LTS trong một tiến trình riêng. Session sau kiểm tra lại ping/version/scene_info/viewport; kết nối thất bại không có nghĩa Blender chưa mở, có thể addon chưa Start.

## Prompt đã dùng cho nền xa

Mode: built-in imagegen. Edit target: `assets/garden-stall-cleanplate.webp`. Output gốc tại `/Users/alihuynh/.codex/generated_images/01a08c20-f917-7402-962c-d144bc5e73c8/exec-f77cd1d0-250d-45cc-96c3-050d079caf66.png`; đã copy vào bộ project, giữ nguyên output gốc.

> Use case: precise-object-edit. Asset type: distant environment backdrop for Anh Li Garden, a Three.js 2.5D website. The attached image is the approved garden style, palette, light, viewpoint and location reference. Create ONE clean environment background derived from this exact garden, wide landscape 16:9. Keep the small greenhouse in the distance, winding stone path leading toward it, warm sage and olive planting, butter yellow flowers, late afternoon soft golden light, and gentle crafted diorama quality. Remove the ENTIRE record stall and its roof, records, lamp, turntable, crates and cup from the right half, replacing the removed area with a quiet distant hedge and garden depth. Remove ALL large close foreground pots, the watering can, and foreground blurred leaves. The bottom 45 percent must be open, simple softly lit stone/earth ground with room to place a separate 3D stall on the right and a separate 2D gardener on the left, with no dark baked shadows from removed objects. Keep far foliage and greenhouse soft and low contrast. Perspective waist height, no overhead isometric, no fisheye. No people, no person silhouettes, no stool, no eggs, no chickens, no sign, no text, no album art, no additional buildings. Do not redesign the garden as a forest, cartoon park or fantasy world. Opaque image, not transparent. Deliver only the clean backdrop; no UI, no composite showing a model, no grid or labels.
