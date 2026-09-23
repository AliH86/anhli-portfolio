# Instruction cho lượt triển khai tiếp theo

## Nhiệm vụ

Xây prototype desktop Dandelion “góc chăm cây → sạp nhạc” theo FLOW.md, sau khi làm các P0 trong PERFORMANCE.md. Dùng nhân vật 2D đen trắng giữa không gian 3D màu, giữ player và nội dung hiện có. Không triển khai cả sáu cụm ngay. Không thay framework chỉ để có Three.js.

## Trước khi sửa

Làm trong repo `AliH86/anhli-portfolio` — thư mục `portfolio-garden-v2` của workspace hiện tại, không phải repo Oracle ở thư mục cha. Đọc AGENT-RULES.md, git status, fetch origin/main và so sánh HEAD. Mốc bản handoff này là `5eacde1`; nếu thay đổi, kiểm tra lại các vị trí code trước khi sửa. Không stage các thay đổi của người khác.

## Trình tự và điều kiện hoàn tất

1. **Ghi baseline, sửa P0 riêng.** Thay sync XHR bằng loader bất đồng bộ có readiness; thống nhất quyết định chạy trước import/src; dừng thật các loop decor. Giữ classic hoạt động và ghi Network/Performance trace. Không sửa nội dung album/Oracle trong bước này.
2. **Tạo adapter mỏng.** Thêm API nhỏ vào nơi đang sở hữu dữ liệu và DOM. Không gọi index album từ mesh, không scrape text để tìm bài, không chạy player thứ hai. Gallery có hàm private nên phải export có chủ đích, không giả định global có sẵn.
3. **Chốt asset sử dụng.** Kiểm tra alpha thật, silhouette trắng đục, khớp mặt và tỷ lệ. PNG lookdev trong bộ này chưa mặc nhiên là sprite hoàn tất. Dựng sạp/chậu/đĩa low-poly; gắn bìa thật từ catalog qua ID.
4. **Dựng vertical slice.** Một renderer, camera path giới hạn, Li cùng 6–8 bìa đầu, turntable, hạt ít. Có chọn album/nghe, mở danh mục đầy đủ, đóng panel, về classic. Tải theo mode, không tải Three mới ở classic/mobile.
5. **Nghiệm thu hình và hành vi.** Xem trực tiếp desktop/mobile; so nét nhân vật với ảnh mẫu, chân/ghế/chậu không xuyên nhau, camera không lộ cạnh cutout. Kiểm tra bàn phím/focus và đường đi nội dung.
6. **Nghiệm thu hiệu năng.** Theo PERFORMANCE.md; có số liệu thực và giới hạn rõ. Chỉ thêm các cụm còn lại khi vertical slice đạt. Ghi recap vào recap-anhli-portfolio.md. Không push/deploy trước khi Ali duyệt theo AGENT-RULES.

## Cấu trúc module đề xuất (chưa tồn tại)

```text
js/portfolio/boot.js              quyết định theme, mode, preference trước tải
js/portfolio/catalog-ready.js     Promise dữ liệu đã merge/sort, fallback
js/portfolio/experience-adapter.js nối scene với nội dung/player hiện có
js/portfolio/effects-lifecycle.js  start/stop/dispose theo trạng thái
js/garden/entry.js                dynamic import, lỗi → classic
js/garden/scene.js                một renderer, camera, raycast
js/garden/clusters/stall.js       geometry và hotspot sạp
js/garden/quality.js              preset + frame-time sampler
css/garden-experience.css         style chỉ thuộc Garden
assets/garden/                    chỉ asset web đã duyệt và tối ưu
```

Không di chuyển toàn bộ CSS/JS inline trong một lần. Đầu tiên export điểm nối từ code đang chạy; sau đó extract từng khối không đổi hành vi. File `experience.js`/`shader-bg.js` rời có thể là bản cũ không được main nạp; kiểm tra script tags trước khi sửa. Nếu dùng bundler sau này, giữ base path GitHub Pages `/anhli-portfolio/` và asset URL đúng.

## Hợp đồng adapter đề xuất — không phải API đã có

```ts
interface PortfolioExperience {
  ready: Promise<void>; // dữ liệu đã merge/sort hoặc fallback được chọn
  albums(): Array<{ id: string; name: string; cover: string }>;
  openAlbum(albumId: string): Promise<void>; // chỉ chọn/xem, không autoplay
  playTrack(albumId: string, trackId: string): Promise<void>; // user gesture
  openGallery(itemId: string): Promise<void>;
  openVideo(videoId: string): Promise<void>;
  openSection(id: 'about'|'work'|'contact'|'gardenCalendar'|'vedic'): void;
  subscribePlayer(fn: (state: {
    albumId: string|null; trackId: string|null; playing: boolean;
  }) => void): () => void;
}
```

- `selectAlbum(i,silent)` tại index.html:8734 và `playAt(j,albumIndex)` tại 8902 hiện có nhưng phụ thuộc DOM/state. Adapter chờ ready, tìm **ID ổn định** ra index hiện tại rồi gọi đúng hành vi; rà soát việc nhấn bài đang phát để không vô tình toggle pause. Giữ logic unlockMusicWorld, userPick và shuffle đúng ý người dùng.
- `openLb` tại 10375 nằm trong closure; export wrapper tại đúng closure với itemId ổn định, trả focus về nút nguồn khi đóng. Không gọi `window.openLb` như thể đã tồn tại.
- `openVideo(url,title)` tại 9398 hiện có; wrapper dùng ID trong catalog đã biết để lấy URL/title. Không chuyển chuỗi URL tùy ý từ mesh vào nội dung HTML.
- Một `#audioEl` duy nhất. Không iframe lại cả portfolio, không nhân đôi album catalog, không tái tạo Audio khi chuyển mode. Nếu đổi vị trí DOM của panel/player, kiểm tra mọi selector/observer phụ thuộc section cũ. Đóng panel không reset thời gian nghe.
- Sự kiện phát/dừng/đổi bài cập nhật scene; tránh polling cover mỗi N frame. Subscribe có unsubscribe. Bìa lỗi tải dùng fallback đã có, không mất khả năng nghe.

## Chế độ và vòng đời

State machine nhỏ: `classic → garden-loading → garden-active ↔ garden-panel → classic`; lỗi có đường về classic. `hidden`, `reduced-motion`, `quality`, `theme` là điều kiện độc lập. Controller nắm trạng thái; module decor không tự bật lại chỉ vì visibilitychange.

Mỗi module có `mount/start/stop/dispose`. `stop` hủy frame/timer; `dispose` còn nhả tài nguyên do module sở hữu, listener, observer và tác vụ đang tải. Callback sau unmount phải bỏ kết quả và nhả texture. Shared texture/material có chủ sở hữu hoặc đếm tham chiếu, không dispose khi scene khác vẫn dùng.

Governor đang khóa shaderSetPaused khi perf-balanced. Không gỡ khóa toàn cục để scene mới chạy: tách lifecycle Garden khỏi shader cũ, giữ giảm tải hiện tại. Chỉ một WebGL renderer hoạt động trong Garden; legacy vinyl bị gate trước init. Khi thoát Garden giải phóng scene trước khi classic khởi động lại hiệu ứng được phép.

## Tái dùng nội dung

Bìa/album giữ ID trong music-data-base.js và kết quả merge runtime. Snapshot có 23 album ở base, không khẳng định đó là toàn bộ catalog live. Album hero hiện dùng ID `f5fc153c-51b8-4583-bfe9-1fcc872aab85` — Một Tần Số Khác; không hardcode album khác từ ghi chú cũ. Cập nhật lựa chọn qua dữ liệu cấu hình hiện có.

Calendar/Oracle nhúng giữ engine, 78 hạt, nội dung và dialog hiện có. Repo dandelion-oracle giữ liên kết riêng. Nếu có chỉnh chức năng Oracle, đọc ORACLE-CONTENT-SYSTEM.md trước; prototype này chỉ nối vào giao diện có sẵn.

## Hoàn tất có nghĩa là

Asset đã đúng phong cách và có định dạng thực được xác minh; scene chạy được trên trình duyệt; nghe album thật bằng player cũ; mobile/classic không tải scene mới; deep link và theme còn đúng; không rò vòng lặp/tài nguyên sau chuyển mode; có benchmark và ảnh kiểm tra. Một ảnh render đẹp hoặc build thành công riêng lẻ chưa đủ.
