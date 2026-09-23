# Nguồn nội dung V2.2

Đây là nguồn công bố duy nhất của `fresh/scripts/prepare-content.mjs`. Không đọc legacy root `index.html`, `music-data*.js`, `audio-map.js`, `origin/main` hay `MISSING-TRACKS.md` để trộn catalog.

- `catalog.json`: album/track đã công bố, cover, URL và `sourceFile` tương đối tới thư viện audio. Build bỏ `sourceFile` khi xuất runtime.
- `policy.json`: số lượng đã duyệt, ID đã loại, thư mục chưa công bố. Nếu cập nhật album, đối soát và cập nhật policy có chủ đích, rồi chạy tests.
- `profile.json`, `gallery.json`, `videos.json`: nội dung thật kế thừa; dữ liệu đầu phiên được giữ nguyên.

Từ `fresh/`: `npm ci`, `npm run build:content -- --verify-library`, `npm test`. Node >=22.13. `sharp` là dependency trong project, không trỏ cache Codex. Có thể đặt `MUSIC_LIBRARY` nếu thư viện chuyển chỗ. `CONTENT_OUT` cho JSON staging; assets được kiểm tra từ dist đã duyệt.

Nguồn audio thật mặc định: `~/Library/Mobile Documents/com~apple~CloudDocs/Downloads/My Suno_music`. Build không tự tải, upload hoặc công bố bài mới; URL audio phải được xác minh trước. `node scripts/audit-v22-audio.mjs` kiểm tra 32 byte đầu mỗi URL, không thay cho nghe duyệt nội dung.

`fresh/qa/v2.2/pipeline-restore/` và `fresh/checkpoints/` chỉ là lịch sử kiểm chứng. Không chạy extractor cũ để ghi đè dist.
