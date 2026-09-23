# Three.js có làm trang quá nặng không?

**Có thể làm được, với điều kiện cảnh vườn thay thế phần trang trí đang chạy và được tải theo nhu cầu.** Chỉ cộng thêm một thế giới 3D lên toàn bộ video, shader, đĩa và hạt hiện có sẽ tăng rủi ro giật/nóng máy. Chưa có benchmark FPS để khẳng định máy nào chạy mượt.

Kiểm tra ngày 09/09/2026 tại source `5eacde1`, repo `AliH86/anhli-portfolio`; có quan sát DOM live. Xem [số liệu nguồn](evidence/source-snapshot.json) và [DOM](evidence/live-dom.json). Kích thước file trên đĩa không phải dung lượng thực tải qua mạng. Không dùng số DCL/Load từ báo cáo cũ làm baseline hôm nay.

## Điều đã có — tiếp tục sử dụng

- Site HTML/CSS/JS thuần. `index.html` 607.410 byte, nhiều CSS/JS inline; chưa cần chuyển framework để làm 3D.
- Three.js đã được import động cho đĩa ở `index.html:11099`, renderer tại `11141`. Đây là một hiệu ứng nhỏ, chưa chứng minh đủ sức chạy cả khu vườn.
- Hero có preload AVIF theo thiết bị; dữ liệu Garden Oracle đã có các script async. Không làm lại hai việc này như thể còn thiếu.
- `js/portfolio-governor.js` đã có chế độ nhẹ, giảm shader, chặn video trên một số thiết bị, quan sát long task. Nó được nạp từ `js/egg-game.js`; khi bóc tách đừng vô tình làm mất governor.
- Audio hiện có `preload="none"`, dùng audio map/R2. Giữ một player và nguồn dữ liệu hiện có.

## Thứ tự giảm tải đề xuất

| Ưu tiên | Bằng chứng hiện tại | Thay đổi cụ thể | Kiểm tra sau sửa |
|---|---|---|---|
| P0 · Tải nhạc không chặn luồng chính | `music-data.js:9` dùng XHR với `false`, rồi eval response | Nạp base script bất đồng bộ bằng Promise; chờ ready rồi mới merge/sort và dựng catalog. Giữ fallback và báo lỗi. Không chỉ đổi `false` thành `true` | Mạng chậm/lỗi vẫn mở trang; album không mất hoặc nhân đôi; thứ tự và ID không đổi |
| P0 · Quyết định chế độ trước khi tải media | `index.html:10927` gán hero video, preload auto, load trước khi kiểm tra class `no-motion` trong playback guard. File video 14.952.530 byte (~14,26 MiB). DOM quan sát có no-motion nhưng video vẫn có src | Kiểm tra mode/theme/reduced-motion/saveData trước import và gán src; ở Garden không khởi tạo hero video/đĩa cũ/shader cũ. Chuyển mode phải ngăn watchdog tự bật lại | Cold load bản nhẹ và Garden: không có request hero MP4 hoặc renderer cũ. Đây là mục cần đo Network, không khẳng định toàn file đã tải từ DOM |
| P0 · Chỉ một chủ thể điều khiển hiệu ứng | Nhiều loop và visibility handlers riêng. `mountWind` còn requestAnimationFrame trước guard; CSS ẩn chưa chắc dừng loop. Music background có nhánh play khi tab hiện lại | Bộ điều phối start/stop/dispose thống nhất. Điều kiện chạy gồm mode + section đang thấy + tab hiện + preference. Tách audio có chủ đích khỏi decorative video | Đổi tab/mode/panel không đánh thức cảnh cũ; ngoài viewport dừng frame, nhạc vẫn theo ý người dùng |
| P1 · Giải phóng texture và tránh kết quả tải cũ | `index.html:11229–11232` đổi map của đĩa nhưng không thấy dispose map trước; callback bất đồng bộ có thể về sai thứ tự | Theo dõi quyền sở hữu/shared material, nhả texture khi hết tham chiếu; token tải mới nhất, dispose kết quả quá hạn. Unmount hủy observers/listeners, geometry/material/renderer do module sở hữu | Đổi album và bật/tắt cảnh 20 vòng; số texture/geometry không tăng vô hạn sau warm-up, bìa khớp album |
| P1 · Cache theo phiên bản nội dung | `Date.now()` trong audio-map, music loader/base và synthesis khiến URL đổi mỗi lần | Dùng version nội dung/build cố định cho asset bất biến; đổi version khi publish. Nếu daily synthesis cần mới, xác minh dữ liệu đã có đủ ngày rồi version đúng phạm vi | Lần ghé lại dùng cache; publish nhạc/lịch mới vẫn nhận đúng, không giữ dữ liệu cũ |
| P2 · Bóc module theo tính năng | Trang nhiều script inline; có file rời cũ không được main load | Tách theo ranh giới và thứ tự: bootstrap/governor → data readiness → adapter → scene mới. CSS scene riêng; chỉ extract CSS chung khi đã kiểm tra cascade | Không nạp cả bản inline lẫn file cũ, không đổi giao diện classic ngoài chủ đích |
| P2 · Ảnh và tải từng cụm | Catalog base có 23 album, UI có bước merge/sort riêng; nhiều ảnh trên đĩa | Sạp dùng 6–8 thumbnail thật trước, bìa lớn khi mở; model/textures cụm sau chỉ tải gần điểm đến. Giữ ảnh source, tạo bản web riêng | Không request cả gallery/album full-size lúc vào; mở bìa vẫn đủ nét |

## Kiến trúc nhẹ nhưng vẫn có chiều sâu

Một canvas WebGL, một renderer và một lịch render chung. Cụm vật thể có lifecycle và bộ nhớ đệm giới hạn. Li là mặt phẳng 2D đặt ở tọa độ 3D, nhận một bóng tiếp xúc riêng; camera chỉ đi trong góc đã kiểm tra để không lộ nhân vật mỏng. Tay/mắt có layer riêng ở giai đoạn rig, không bóp méo nguyên PNG.

Dựng low-poly đường đi, chậu, sạp, turntable và khung kính; bake bóng/AO. Lá và hạt dùng mesh/instance đơn giản. Bìa album là texture thật trên plane; chữ và điều khiển là HTML. Bản đầu không cần SSAO/SSR/DOF, physics tổng quát hoặc bloom toàn màn hình. Chỉ thêm FX khi nhìn thấy lợi ích và còn ngân sách.

**WebP/AVIF nhỏ trên mạng không đồng nghĩa nhỏ trong GPU.** Ví dụ RGBA8 2048×2048 là 16 MiB cho base level, khoảng 21,3 MiB nếu có đủ mipmap. Texture phải giới hạn kích thước và vòng đời, không chỉ đổi đuôi file. [Three.js: texture lifecycle](https://threejs.org/manual/en/how-to-dispose-of-objects.html).

## Ngân sách thử nghiệm — chưa đo đạt

| Hạng mục | Mục tiêu khởi điểm |
|---|---|
| Classic vào trang | ≤2 MiB transferred, không tính nhạc/video do khách chủ động mở; xác lập baseline rồi điều chỉnh thực tế |
| Gói Garden mở đầu | ≤5 MiB tăng thêm gồm engine, geometry, texture của cụm đầu; không tải trước khi vào Garden |
| Cụm kế tiếp | Khoảng ≤2 MiB tăng thêm; chỉ prefetch khi sắp tới và đường truyền cho phép |
| GPU đang dùng cho texture | Ước tính ≤64 MiB ở preset cân bằng; đo số texture và kích thước, không xem JS heap là VRAM |
| Hình học / draw calls | ≤100k triangle, ≤100 draw calls ở góc nặng nhất của prototype; số này là trần thử, chưa là cam kết |
| Pixel ratio | Balanced cap 1,25; rich tối đa 1,5 trước benchmark. Giảm render scale trước khi giảm chất lượng nội dung |
| Khung hình | Mục tiêu gần 60 FPS khi tương tác; nếu sustained <30 FPS thì hạ chất lượng/đề nghị bản nhẹ. Báo median và p95 frame time |
| Nhàn rỗi / ẩn | Chuyển động nền có thể 20–30 FPS; cảnh tĩnh render-on-demand; tab ẩn/scene không hoạt động: 0 frame |

Ba lựa chọn: **Bản nhẹ**, **Vườn cân bằng**, **Vườn nhiều hiệu ứng**. Reduced motion là lựa chọn riêng, không tự tắt lại khi đổi chất lượng. Governor hiện tại dựa long task chưa đủ đánh giá GPU; bổ sung frame-time sampler có warm-up, cửa sổ nhiều giây và hysteresis, không đổi preset liên tục khi vừa tải model.

## Cách đo trước khi mở rộng

1. So sánh cùng viewport/mạng/máy cho classic trước và sau, Garden balanced, Garden rich; ít nhất desktop iGPU, một máy mạnh hơn và điện thoại thật. Khi thiếu máy thì ghi thiếu, không thay bằng kết luận từ giả lập.
2. Cold cache và warm cache: Network transferred/request count, LCP, thời gian phản hồi khi chọn album. Performance trace: long tasks và frame time khi cuộn qua đoạn nặng. Ghi browser/OS/DPR cùng kết quả.
3. Test 20 vòng đổi album, mở/đóng panel và chuyển mode: kiểm tra renderer.info, listener/loop, JS heap sau ổn định; không dùng renderer.info như phép đo VRAM chính xác.
4. Tab nền → trở lại, resize, reduced motion, saveData, lỗi model, WebGL context lost: giữ nội dung và fallback hoạt động. Test phát nhạc qua thao tác người dùng trên cả mobile/desktop.
5. Chỉ mở rộng cảnh khi prototype đạt ngân sách đã thống nhất; nếu không, giảm pixel/texture/postprocess trước rồi đo lại. Không tiếp tục chất thêm cảnh để “tối ưu sau”.

Nguồn kỹ thuật: [giải phóng tài nguyên Three.js](https://threejs.org/manual/en/cleanup.html), [dispose geometry/material/texture](https://threejs.org/manual/en/how-to-dispose-of-objects.html), [độ phân giải render](https://threejs.org/manual/en/responsive.html), [lazy-load video](https://web.dev/articles/lazy-loading-video). Các nguồn giải thích nguyên tắc; không xác nhận hiệu năng cụ thể của portfolio.
