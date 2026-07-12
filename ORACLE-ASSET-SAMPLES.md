# Garden Oracle — 5 prompt mẫu để duyệt trước khi batch 78

Đây là bước 3 trong trình tự triển khai của `ORACLE-CONTENT-SYSTEM.md` §7:
"Làm prototype artwork 4:5 không chữ cho cùng nhóm mẫu". Biến điền từ
`garden-oracle-profiles.js` (schema draft, cùng session). Dùng master prompt
và mọi ràng buộc trong `ORACLE-ASSET-PROMPT.md` — file này chỉ điền biến, không
đổi prompt gốc.

Trước khi chạy: đính kèm card "Hạt gieo vào gió" bản 3D v2 Ali đã chọn làm
style reference cho phiên tạo ảnh. Chạy từng hạt một request riêng (không dùng
nhiều output ngẫu nhiên của cùng một prompt). Sau khi có 5 ảnh, kiểm tra contact
sheet ở cả hướng 0° và 180° trước khi báo Ali duyệt — xem checklist ở cuối file.

---

## 1 — Major — id 0 — Hạt gieo vào gió / Hạt bay vô hướng

```text
Use case: stylized-concept
Asset type: production artwork for one card in a 78-card Vietnamese Garden
Oracle system

Input image: use the approved "Hạt gieo vào gió" 3D card only as a style
reference for cinematic botanical rendering, premium materials, deep garden
palette, restrained gold linework and collectible-card finish. Do not copy its
seed silhouette or any text.

Create card artwork for seed 0.
Open identity for visual meaning only: Hạt gieo vào gió.
Closed identity when the same artwork is rotated 180 degrees: Hạt bay vô hướng.
Core story: Before every beginning there is a moment when the seed has already
left the stem but the wind has not yet decided where to carry it — the same
moment you face before a new job, a new relationship, or a big decision, not
knowing the destination, only knowing you have already let go of where you
stood. When the release is a genuine reach toward something new, it becomes a
trustworthy beginning; when it is only an escape from something being left
behind, it becomes an aimless flight.
Unique visual motif: a warm amber, gold-lit dewdrop resting at the seed's core
exactly where the stem has just separated from the dried seed pod below; the
seed tilts low as if just released from its stem, not yet committed to one
wind direction, its trailing pappus still flared backward like the visible
trace of the release that just happened.
Element: Air. Family: Major.

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
subtle air-element accent (pale silver-blue wind trails); restrained saturation.

Hard constraints: NO text, NO letters, NO numbers, NO typography, NO logo, NO
watermark, NO people, NO zodiac wheel, NO recognizable Tarot symbols, NO card
name baked into the image. The subject must read as a dandelion seed before any
UI text is added. Keep visual continuity with the approved reference so all 78
cards clearly belong to one collection.
```

Tên file gợi ý: `seed-0-hat-gieo-vao-gio-v01.webp`.

---

## 2 — Fire (Wands) — id 24 — Hạt thấy gió mang tin về / Hạt đợi tin mà quên nhìn xa

```text
Use case: stylized-concept
Asset type: production artwork for one card in a 78-card Vietnamese Garden
Oracle system

Input image: use the approved "Hạt gieo vào gió" 3D card only as a style
reference for cinematic botanical rendering, premium materials, deep garden
palette, restrained gold linework and collectible-card finish. Do not copy its
seed silhouette or any text.

Create card artwork for seed 24.
Open identity for visual meaning only: Hạt thấy gió mang tin về.
Closed identity when the same artwork is rotated 180 degrees: Hạt đợi tin mà
quên nhìn xa.
Core story: This seed perches on a tall stem, looking out over a wide sky where
distant winds are carrying news home — the outcome of something you invested
in long ago: a project, a relationship, a long-term plan. When the view stays
open, you see both the incoming news and other opportunities forming around
you at the same time. When the view narrows to a single point of waiting, you
risk missing everything else opening up right beside you.
Unique visual motif: the seed rests at the tip of a tall slender stem, tilted
outward toward a horizon of faint golden light trails and drifting pollen
motes that read as incoming signals; the front half of its pappus fans wide
open as if scanning the distance, while the rear half stays gathered and calm.
Element: Fire. Family: Wands.

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
subtle fire-element accent (warm ember-orange glints in the distant light
trails); restrained saturation.

Hard constraints: NO text, NO letters, NO numbers, NO typography, NO logo, NO
watermark, NO people, NO zodiac wheel, NO recognizable Tarot symbols, NO card
name baked into the image. The subject must read as a dandelion seed before any
UI text is added. Keep visual continuity with the approved reference so all 78
cards clearly belong to one collection.
```

Tên file gợi ý: `seed-24-hat-thay-gio-mang-tin-ve-v01.webp`.

---

## 3 — Water (Cups) — id 43 — Hạt rời vũng nước đã cạn nghĩa / Hạt quay lại vũng nước đã cạn

```text
Use case: stylized-concept
Asset type: production artwork for one card in a 78-card Vietnamese Garden
Oracle system

Input image: use the approved "Hạt gieo vào gió" 3D card only as a style
reference for cinematic botanical rendering, premium materials, deep garden
palette, restrained gold linework and collectible-card finish. Do not copy its
seed silhouette or any text.

Create card artwork for seed 43.
Open identity for visual meaning only: Hạt rời vũng nước đã cạn nghĩa.
Closed identity when the same artwork is rotated 180 degrees: Hạt quay lại
vũng nước đã cạn.
Core story: This seed stands at the edge of a puddle that has run dry of
meaning — a place that once was enough to sustain it but no longer is, even
though water is still visible there. It is the image of a job, a relationship,
or a habit you know you have outgrown. When the seed truly turns and walks
away, even without understanding every reason, that is courage, not giving up.
When it keeps turning back toward the old puddle out of fear of the unknown,
it stays trapped somewhere that stopped being enough long ago.
Unique visual motif: the seed sits at the rim of a small dark reflective
puddle with faint dry, cracked soil around its edge; its body is angled
mid-turn, caught between two moments — one side of its pappus still heavy and
damp, leaning back toward the puddle, the other side already fanned dry and
light as if it has just caught a new current of wind.
Element: Water. Family: Cups.

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
subtle water-element accent (cool moonlit blue-green reflections in the
puddle); restrained saturation.

Hard constraints: NO text, NO letters, NO numbers, NO typography, NO logo, NO
watermark, NO people, NO zodiac wheel, NO recognizable Tarot symbols, NO card
name baked into the image. The subject must read as a dandelion seed before any
UI text is added. Keep visual continuity with the approved reference so all 78
cards clearly belong to one collection.
```

Tên file gợi ý: `seed-43-hat-roi-vung-nuoc-da-can-nghia-v01.webp`.

---

## 4 — Air (Swords) — id 55 — Hạt theo gió sang bờ yên hơn / Hạt mang gió cũ sang bờ mới

```text
Use case: stylized-concept
Asset type: production artwork for one card in a 78-card Vietnamese Garden
Oracle system

Input image: use the approved "Hạt gieo vào gió" 3D card only as a style
reference for cinematic botanical rendering, premium materials, deep garden
palette, restrained gold linework and collectible-card finish. Do not copy its
seed silhouette or any text.

Create card artwork for seed 55.
Open identity for visual meaning only: Hạt theo gió sang bờ yên hơn.
Closed identity when the same artwork is rotated 180 degrees: Hạt mang gió cũ
sang bờ mới.
Core story: This seed is crossing a stretch of restless wind toward a calmer
shore — the image of moving into a new phase: a new job, a new home, a steadier
rhythm of life. The crossing is slow but sure, with nothing dramatic about it.
When the seed flies light, carrying only what is truly needed, it is genuinely
arriving at the new shore. When it still trails old threads — old hurts or
habits not yet released — it is only carrying the old wind into a new place,
without truly having left the old one behind.
Unique visual motif: the seed glides low across a flat, mirror-dark
water-like void, its forward path calm and smooth with fine parallel wind
lines; a few trailing fibers on its far side are visibly snagged with thin
darker filament threads, as if being dragged along, in contrast to the clean,
gathered pappus at the front.
Element: Air. Family: Swords.

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
subtle air-element accent (pale silver-blue wind trails); restrained saturation.

Hard constraints: NO text, NO letters, NO numbers, NO typography, NO logo, NO
watermark, NO people, NO zodiac wheel, NO recognizable Tarot symbols, NO card
name baked into the image. The subject must read as a dandelion seed before any
UI text is added. Keep visual continuity with the approved reference so all 78
cards clearly belong to one collection.
```

Tên file gợi ý: `seed-55-hat-theo-gio-sang-bo-yen-hon-v01.webp`.

---

## 5 — Earth (Pentacles) — id 70 — Hạt kiên nhẫn chờ luống đất chín / Hạt sốt ruột đào lại luống chưa chín

```text
Use case: stylized-concept
Asset type: production artwork for one card in a 78-card Vietnamese Garden
Oracle system

Input image: use the approved "Hạt gieo vào gió" 3D card only as a style
reference for cinematic botanical rendering, premium materials, deep garden
palette, restrained gold linework and collectible-card finish. Do not copy its
seed silhouette or any text.

Create card artwork for seed 70.
Open identity for visual meaning only: Hạt kiên nhẫn chờ luống đất chín.
Closed identity when the same artwork is rotated 180 degrees: Hạt sốt ruột
đào lại luống chưa chín.
Core story: This seed lies still in a bed of soil it planted with its own
effort, waiting for the right time to grow — the image of something that
needs a long stretch of time to bear fruit: a job, a skill, a relationship
being built gradually. When the seed is patient enough to stay put, its roots
are quietly growing even though nothing is visible yet. When it grows
impatient and digs up its own soil to check, it breaks the very process it
needed to wait for, forcing everything to start over.
Unique visual motif: the seed is half-embedded in dark, rich soil, a few fine
translucent fiber tendrils reaching downward like young roots instead of
flaring upward as usual pappus does; a faint warm golden glow pulses subtly
just beneath the soil surface, hinting at unseen growth, with tiny flecks of
moss and mineral scattered around it.
Element: Earth. Family: Pentacles.

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
subtle earth-element accent (deep mossy green-brown undertones in the soil);
restrained saturation.

Hard constraints: NO text, NO letters, NO numbers, NO typography, NO logo, NO
watermark, NO people, NO zodiac wheel, NO recognizable Tarot symbols, NO card
name baked into the image. The subject must read as a dandelion seed before any
UI text is added. Keep visual continuity with the approved reference so all 78
cards clearly belong to one collection.
```

Tên file gợi ý: `seed-70-hat-kien-nhan-cho-luong-dat-chin-v01.webp`.

---

## Checklist duyệt (theo ORACLE-ASSET-PROMPT.md, mục "Batch rules")

- [ ] Cả 5 ảnh đọc được là hạt bồ công anh trước khi biết tên.
- [ ] Không có chữ/số/logo/watermark giả trong ảnh nào.
- [ ] Bố cục cân hai đầu — kiểm tra ở cả 0° và xoay 180°, không có chi tiết kể
      chuyện quan trọng lọt vào safe zone trên/dưới.
- [ ] Không silhouette nào trùng nhau giữa 5 hạt.
- [ ] Vẫn giữ liên hệ thị giác rõ với reference "Hạt gieo vào gió" (cùng một
      bộ sưu tập, không lệch phong cách).
- [ ] Ali xác nhận độ rõ trước khi mở rộng theo đợt 22 + 4×14.
