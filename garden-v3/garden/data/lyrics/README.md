# Lời bài trên sạp nhạc

Cùng định dạng với V2.2 (`garden-v2/garden-lyrics.js`). Chỉ dùng lời do Ali đưa, có canh giờ thật theo bản thu; không đoán, không tự sinh.

1. Lấy `id` của bài trong `../catalog.json`.
2. Tạo file riêng trong thư mục này, tên chỉ gồm chữ, số, `_`, `-` (ví dụ `co-ai-nghe-khong.json`):

```json
{
  "trackId": "ID-CUA-BAI",
  "featured": true,
  "lines": [
    { "start": 12.4, "end": 16.1, "text": "dòng lời", "sub": "dòng dịch (không bắt buộc)", "section": "verse" }
  ]
}
```

   `start`/`end` tính bằng giây, theo thứ tự, không chồng nhau. `section` (không bắt buộc): `intro`, `verse`, `pre`, `chorus`, `bridge`, `outro`.
3. Thêm vào `index.json`: `"tracks": { "ID-CUA-BAI": "co-ai-nghe-khong.json" }`.

Bài không có trong `index.json` sẽ hiện "Bài này Li chưa chép lời lên sạp." kèm lời giới thiệu album.
