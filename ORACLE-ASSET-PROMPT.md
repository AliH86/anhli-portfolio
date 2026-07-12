# Garden Oracle — master prompt tạo 78 artwork hạt

Đây là prompt bàn giao để Ali, Claude hoặc một phiên tạo ảnh khác sản xuất
artwork mà không cần lịch sử chat. Đọc `ORACLE-CONTENT-SYSTEM.md` và
`garden-oracle-data.js` trước khi điền biến.

## Reference style

Dùng card concept “Hạt gieo vào gió” bản 3D đã được Ali chọn làm **style
reference**, không dùng nó làm edit target. Chỉ học art direction, vật liệu,
ánh sáng, palette, border và độ hoàn thiện. Không sao chép hình hạt hoặc text
trong reference sang các card khác.

## Biến đầu vào cho mỗi hạt

- `{ID}`: số 0–77, chỉ dùng đặt tên file; không render vào ảnh.
- `{OPEN_NAME}`: tên Nở, dùng để hiểu ý; không render vào ảnh.
- `{CLOSED_NAME}`: tên Khép, dùng để đảm bảo artwork đọc được khi xoay; không
  render vào ảnh.
- `{CORE_STORY}`: câu chuyện lõi của hạt.
- `{VISUAL_MOTIF}`: chi tiết hình ảnh độc bản.
- `{ELEMENT}`: Fire / Water / Air / Earth.
- `{FAMILY}`: Major / Wands / Cups / Swords / Pentacles.

## Master prompt

```text
Use case: stylized-concept
Asset type: production artwork for one card in a 78-card Vietnamese Garden
Oracle system

Input image: use the approved “Hạt gieo vào gió” 3D card only as a style
reference for cinematic botanical rendering, premium materials, deep garden
palette, restrained gold linework and collectible-card finish. Do not copy its
seed silhouette or any text.

Create card artwork for seed {ID}.
Open identity for visual meaning only: {OPEN_NAME}.
Closed identity when the same artwork is rotated 180 degrees: {CLOSED_NAME}.
Core story: {CORE_STORY}.
Unique visual motif: {VISUAL_MOTIF}.
Element: {ELEMENT}. Family: {FAMILY}.

Scene: a deep forest-green near-black miniature garden void, subtle airborne
pollen and fine wind trails. One unmistakable dandelion seed is the hero. Give
it a unique seed body, pappus structure, posture and motion derived from the
core story and visual motif.

Style: premium cinematic botanical 3D sculpture with realistic macro detail,
organic translucent fibers, amber and sage lighting, tactile dark card surface,
and thin metallic botanical ornament. Elegant, intimate and contemporary; not
cartoon, not game fantasy, not a disguised Tarot illustration.

Composition: exact 4:5 portrait card. Build a vertically reversible,
top/bottom-balanced composition like a two-way playing card: the artwork must
remain intentional when rotated 180 degrees. Keep the central seed readable in
both orientations. Use restrained mirrored botanical border structure and
balanced garden details, while the seed itself remains organic rather than
perfectly mirrored.

State logic: produce ONE neutral master artwork that can represent Nở upright
and Khép after the website rotates it 180 degrees. Do not depict decay, death,
damage or horror. The reverse reading comes from orientation and the separate
UI label, not from generating a second image.

Layout safe zones: leave calm, dark negative space at both the top and bottom
for the website to overlay a small number and a two-line Vietnamese name/state
block. Keep important seed fibers and story details away from those overlay
zones.

Palette: #121B11 deep garden green, warm amber, pale sage and ivory, with a
subtle element-specific accent for {ELEMENT}; restrained saturation.

Hard constraints: NO text, NO letters, NO numbers, NO typography, NO logo, NO
watermark, NO people, NO zodiac wheel, NO recognizable Tarot symbols, NO card
name baked into the image. The subject must read as a dandelion seed before any
UI text is added. Keep visual continuity with the approved reference so all 78
cards clearly belong to one collection.
```

## Batch rules

1. Tạo từng hạt bằng một request riêng; không dùng nhiều output ngẫu nhiên của
   cùng một prompt để thay cho 78 prompt có motif khác nhau.
2. Làm và duyệt 5 hạt đại diện trước khi chạy đủ bộ: một Major và một hạt của
   mỗi nguyên tố.
3. Sau mỗi nhóm, kiểm tra contact sheet ở cả hướng 0° và 180°; loại hình có chữ
   giả, silhouette trùng, mất safe zone hoặc không còn giống hạt bồ công anh.
4. Lưu master lossless để chỉnh; bản web xuất WebP 4:5. Không ghi đè file đã
   duyệt. Tên gợi ý: `seed-{ID}-{slug}-v01.webp`.
5. Không batch 78 hình trước khi Ali duyệt nhóm mẫu. Chia theo 22 Major + bốn
   nhóm 14 để dễ checkpoint, review và tiếp quản giữa các agent.
