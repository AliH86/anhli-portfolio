# Dandelion Garden Hero Handoff

## 2026-07-01 PART 6 — Pushed live

Ali confirmed the visual and said to push. `finish-push.command` first failed:
`git pull` refused because an untracked local scratch file
(`dandelion-scene-view.html`, an old "preview-only, does NOT modify
index.html" experiment file from an earlier session) collided with a
same-named file that origin/main already had from Ali's own separate commits
(`Add dandelion scene view shell` → … → `Hide album controls and add rotating
disc shimmer`). Those 5 remote commits never touched `index.html` — confirmed
via `git show --stat` on each — so they were unrelated to this hero work.
Fixed with `retry-push.command`: removed the stale local
`dandelion-scene-view.*` files, pulled again (clean auto-merge this time,
`ort` strategy, only added the file back from origin), then pushed. Live now
at https://alih86.github.io/anhli-portfolio/ — confirmed via fetch (page
title/meta mentions "The Anhli Muse's Dandelion Garden").

Lesson: before running any push script, check `git status` for untracked
files that might collide with remote-only files of the same name — this
sandbox's Terminal automation can't type through an interactive git prompt
(click-tier only, no keyboard), so a stuck `read -p` after a failed pull will
just hang forever until the Terminal window is closed manually.

## 2026-07-01 PART 5 — Second PSD re-edit (better case/disc ratio), final disc measurement, committed

Ali adjusted the PSD again in Photoshop for a better case/disc proportion
(saved to her Downloads copy again, ~2 min after the PART 4 save — always
check that folder's mtime before assuming the uploaded copy is current).
Re-flattened, regenerated `dandelion-scene-master.jpg` a third time.
Re-measured the disc against the new case size the same way as PART 3/4
(cropped+gridded tangent points on all 4 sides): center ≈78.9%/51.4% of
`.hga-master-scene`, diameter ≈23.6% — kept the `rotate(2deg)` static tilt
from PART 4 since the case's in-plane rotation didn't change, only its size.
Verified nested cleanly in the case rim at rest and mid-spin (screenshotted
both). Ali signed off ("ổn là commit") — committed to git (not pushed; ask
before pushing live).

## 2026-07-01 PART 4 — Ali re-edited PSD (figure moved) + disc tilt + grass blur + mobile mask fix

Ali opened the PSD herself in Photoshop and moved the standing figure so his hand
no longer touches the disc (saved back to her Downloads copy of the PSD, newer
mtime than the uploaded one — always check that folder for a fresher save
before assuming the uploaded copy is current). Re-flattened it and replaced
`dandelion-scene-master.jpg`. Since the figure no longer reaches the disc, the
PART 3 hand-patch hack is gone (`.hga-hand-patch` removed from CSS + HTML,
`hand-patch.png` unused on disk now).

Four more rounds of feedback, all fixed:
1. **Disc still read as off-center vs the case's base ("cao hơn đĩa base") and
   needed a slight tilt.** Re-measured the case's physical disc rim on the new
   master image (tangent points top/bottom/left/right via cropped+gridded
   close-ups — center ≈78.6%/51.7% of `.hga-master-scene`, diameter ≈22.3%)
   and, since the case itself sits with a very slight in-plane rotation, added
   a static `rotate(2deg)` to `.hga-feature-disc`'s base transform (kept the
   spin keyframe going 2deg→362deg so the animation loop still closes
   cleanly). Verified via zoomed screenshot: disc now nests into the case's
   bottom rim instead of floating high above it.
2. **Grass on the floating album props looked pasted ("hơi xấu" at the
   edges).** Root cause: the real-photo background already has depth-of-field
   blur, but `grass-clump-3.png` was compositing perfectly sharp — the crispness
   mismatch was the tell, not the cutout edges themselves. Fixed by adding
   `filter:blur(1.6px) saturate(0.85) brightness(1.04)` to `.hga-prop::after`,
   dropping opacity 0.98→0.82, and shrinking its footprint
   (`height:62%→48%`, `left/right:-18%→-14%`, `bottom:-24%→-16%`) so less of
   it shows and what's left blends into the photo's own bokeh.
3. **Mobile scale bug.** The mobile mask on `.hga-master-scene`
   (`mask-image:linear-gradient(to right, transparent 0 58%, #000 74% 100%)`)
   was tuned for the OLD figure position. After Ali moved the figure, his
   silhouette now falls inside that 58–74% transition band, so he was
   partially visible again through the "hidden" side at mobile widths — same
   category of bug as the disc, caused by not re-measuring against the new
   image. Fixed by pushing the transition to `transparent 0 74%, #000 88%
   100%`, confirmed clear via direct pixel-crop of that 74–100% band (nothing
   but case/disc in it) and confirmed live at a 400×850 resized Chrome window
   (no more figure ghosting on the right edge).
4. **Testing method note:** `mcp__claude-in-chrome__navigate` intermittently
   still mangles `file://` URLs (prepends `https://`), which can leave a tab's
   frame in an "error page" state for the extension's own tools even though
   the real rendered content looks fine via computer-use screenshots — very
   confusing, produces false "the fix didn't work" signals. If a mask/CSS fix
   doesn't seem to visually update after a hard reload, don't trust that tab —
   close it (`tabs_close_mcp`) and open a genuinely fresh one
   (`tabs_context_mcp{createIfEmpty:true}` → `resize_window` → `navigate`)
   before concluding the fix is wrong.

## 2026-07-01 PART 3 — Disc re-measure + hand z-order fix

Ali reported after PART 2 shipped: "nó phải có thứ tự layer, cái đĩa bị lệch,
và nó đè lên cái người đang đứng" (needs layer order; disc is misaligned;
it's covering the standing figure). Both were real, both fixed:

1. **Disc position was measured off the wrong asset.** The `left:79.2%;
   top:50.46%; width:23.6%` numbers in PART 2 were carried over from the old
   `giant-cd-case.png` measurement, never re-measured against
   `dandelion-scene-master.jpg` once that became the actual displayed image.
   Re-measured directly on the master JPEG's pixels (found the disc's silver
   rim tangent points on all 4 sides via cropped/gridded close-ups, not
   eyeballed): true center ≈ (2042.5, 746.5) px, radius ≈ 294.5px in the
   2600×1462 image → corrected to `left:78.6%; top:51%; width:22.7%`.
2. **Standing figure's hand sits right at the disc's top-left rim.** In the
   flattened photo his hand/fingers dangle in front of the case's top rail,
   right where the disc CSS circle starts — but `.hga-feature-disc` is a flat
   DOM element with no depth-awareness, so it always painted over those
   pixels. Fix: `hand-patch.png` — a small cutout of just that hand/sleeve
   area, traced out of `dandelion-scene-master.jpg` itself (so pixels match
   exactly, no color-matching needed) via brightness-threshold masking, saved
   to `images/hero/dandelion-garden/hand-patch.png`. Added as
   `.hga-hand-patch` — `position:absolute; left:65.0%; top:23.26%;
   width:11.15%; height:12.31%` of `.hga-master-scene` — placed **after**
   `.hga-feature-disc` in DOM order so it paints on top and restores the
   correct front-to-back read. Verified via zoomed screenshot: fingers are
   visible again in front of the disc at all rotation angles.

If the master image is ever regenerated, both of these need to be re-done:
re-measure the disc's rim tangent points (crop + grid overlay, read the pixel
coords by eye — brightness-based edge detection was unreliable here since the
disc surface, case frame, and rail are all similar gray tones), and re-crop
the hand patch to match the new pixel position.

## 2026-07-01 PART 2 — Architecture change: master image replaces CSS composite

Ali uploaded `01_bg_dandelion_meadow_clean_3840x2160.psd` (the layered source
file behind asset 02). Opened it with `psd-tools` (`pip install psd-tools
scipy --break-system-packages`) and found it's not just a background — it's
the FULLY assembled scene: both figures, the giant CD case, and the grass all
already composited and color/light-matched together via real Photoshop
"Harmonize" smart objects. Flattening the whole PSD
(`psd.composite()`) reproduces the reference image almost exactly.

**Everything in PART 1 below (separately-positioned dli/anhli/case/grass CSS
layers, the warm-light glow hack, the grass-clump grounding hack) has been
REMOVED and replaced** with one element:

```css
.hga-master-scene {
  width: min(100%, 177.8vh);
  aspect-ratio: 2600/1462;
  background: url('./images/hero/dandelion-garden/dandelion-scene-master.jpg') center bottom/100% 100% no-repeat;
}
```

`dandelion-scene-master.jpg` = the flattened PSD, resized to 2600px wide,
saved in `images/hero/dandelion-garden/`. Because this element keeps the
image's exact native aspect ratio at any size, the whole cluster scales as
one locked unit at any viewport — this is the real, permanent fix for the
"khoá tổng, scale tổng" ask (every previous per-breakpoint hand-tuning was
a workaround for not having this).

**Still dynamic (not baked into the image):**
- `.hga-feature-disc` — the promoted album cover, spinning, positioned at
  `left:79.2%; top:50.46%; width:23.6%` of `.hga-master-scene` — these
  numbers were measured directly off the master JPEG's pixels (found the
  disc hub, not eyeballed). Re-measure the same way if the master image is
  ever regenerated.
- `#heroAlbumStage` — the small floating album cards (`.hga-prop-*`), driven
  by `ALBUMS`/`data-supporting-albums`. These can't be baked into a static
  image since they reflect live data, so they're still a separate CSS layer
  with their own grounding shadow + grass-clump-3.png overlay.

**Mobile (`max-width:620px`):** Ali does not want the figures shown faded/
blended on mobile (explicit feedback, see PART 1 #5). Since it's now one flat
photo instead of a live composite, this is done with a mask instead of
hiding the whole element: `.hga-master-scene` gets
`mask-image:linear-gradient(to right, transparent 0 58%, #000 74% 100%)`
which crops out the left ~62% of the image (where the figures stand) and
keeps only the case/disc side visible as a small dim ambient element. Not
yet screenshotted at real mobile width — same Chrome-is-read-only limitation
as before, ask Ali to verify on her phone.

**Extra assets pulled from the PSD** (via `layer.composite()` per layer,
copied into `images/hero/dandelion-garden/`): `grass-clump-1/2/3.png` (real
Photoshop cutouts of the small grass/dandelion clumps, replacing an earlier
hand-cropped-from-asset-02 attempt that had a fake-looking CSS radial mask).
The PSD also contains the case as its own layer ("Layer 3", slightly
rotated) and both figures together as "Group 1" if finer isolated assets are
ever needed again — reopen the PSD with psd-tools rather than re-asking Ali
for exports.

**Known limitation hit this session:** tried to get Adobe's tools
(`image_select_by_prompt`) to build a cleaner grass mask before the PSD was
found — Adobe's stated limitation is real: no generative/photo-compositing
tool exists in that connector (only selection + color-adjustment tools), and
there's no "bake mask into alpha channel" tool either, so that path was a
dead end. The PSD made it moot, but worth remembering: don't reach for Adobe
compositing tools for this kind of task again unless a "convert mask to
alpha PNG" capability shows up.

## 2026-07-01 PART 1 — Bug-fix pass (superseded by PART 2 above, kept for history)

Ali reported (in order): disc misaligned with case art, disc too small, sitting
figure "floating" with fake-looking legs, album props "floating" (repeated
complaint, ~8th time), mobile figure treatment looks broken, and asked for a
grass-cutout to ground the figures. All fixed locally, NOT pushed. Still no
git commit/push — same hard rule as always, confirm with Ali first.

**1. Disc alignment/size — root cause found, fixed with measured values.**
`giant-cd-case.png` (1200×1173) has the CD art baked into the case artwork.
Measured directly on pixels (not eyeballed): true disc center = `54.25%,
50.5%` of the image box, true outer diameter = `67.1%` of image width. Old
code had `left:61.4%, top:51.2%, width:61.5%` (wrong center) then a first
fix pass wrongly computed `width:59.6%` (undersized — a saturation-based
edge detector missed the shadowed/desaturated side of the disc). Current
`.hga-feature-disc` values (54.25% / 50.5% / 67.1%) were verified by drawing
the circle back onto the source PNG and eyeballing pixel-perfect overlap —
see this was an actual measurement, not a guess, if it ever drifts again
re-derive from the PNG rather than tweaking blind.

**2. Figures "pasted on" — was intentional-but-wrong CSS, now toned down.**
`.hga-dli`/`.hga-anhli` had brightness/saturate/contrast filters pushing them
toward gray, plus an early bottom mask-fade (starting at 76-89% of image
height) meant to blend feet into grass — instead it faded out real leg/shoe
pixels. Now both are near-natural color (brightness .98, saturate 1) with the
mask fade pulled to 96-97% (just the last couple percent, for antialiasing).

**3. Figures "floating" (ngồi/đứng như bay) — real bug, not just style.**
`anhli-sitting.png` and `dli-standing-back.png` both have transparent padding
below the actual feet (6.27% and 4.02% of image height respectively) baked
into the PNG. Since CSS `bottom:` anchors the image's *box* edge, that dead
space pushed the visible shoes up off the ground line. Fixed by tight-cropping
both to their real alpha bbox → `anhli-sitting-tight.png`,
`dli-standing-back-tight.png` (index.html now points at the `-tight` files;
originals kept on disk, unused). If a future pose/asset swap reintroduces this,
check `im.getbbox()` on the new PNG before wiring it in.

**4. Grounding — no grass-cutout asset exists in the source pack.** Checked
`/Users/alihuynh/Downloads/anhli_dli_web_assets_4k_cutout/` (README lists 01,
02, 03, 04, 05, 06, 07 — **05_sitting_back_black_suit_acrylic_stool... was
never actually delivered, only 01/02/03/04/06/07 exist on disk**, worth asking
Ali about if the back-view sitting pose is ever needed). There's no dedicated
grass/foliage cutout. Instead, cropped small grass-only patches directly out
of `02_foreground_dandelion_overlay...png` (the same asset Ali rejected as a
*full-width* foreground — used here only as small tuft crops, not full-width)
→ saved as `images/hero/dandelion-garden/grass-tuft-1.png` and `-2.png`
(feathered top edge via alpha ramp so they blend, no hard rectangle edge).
Wired in as: two new `<img class="hga-layer hga-grass hga-grass-*">` elements
positioned at each figure's foot (see `.hga-grass-dli`/`.hga-grass-anhli` CSS,
values are empirical/eyeballed off screenshots — nudge left/right/bottom if a
pose changes), plus a shared `.hga-prop::after` background-image on every
album prop's front-bottom edge (fixes all props at once, not per-instance).

**5. Mobile — Ali does NOT want a faded/partial composite of the two figures.**
Explicit instruction: "cho 2 thằng fade out biến mất luôn đi" — just hide them
outright on `max-width:620px`, don't try to blend. `.hga-dli`, `.hga-anhli`,
and the two grass tufts are now `display:none` together in that media query.
Case/meadow stay as ambient background only.

**Still open / not verified:**
- Mobile (390×844) fixes above are reasoned from CSS math, NOT screenshotted —
  the Chrome tab used for QA this session is read-only (extension automation
  can't resize windows or navigate file:// URLs reliably; Finder double-click
  + computer-use screenshot was the only working path, and that only shows
  whatever size the real Chrome window happens to be). Ask Ali to check on an
  actual phone or a resized window before calling mobile done.
- Tablet portrait (900×1180) still uses the OLD partial-opacity treatment for
  `.hga-anhli` (see `@media (max-aspect-ratio:1.18)` block) — this was flagged
  weak before this session and was NOT touched this pass. Given Ali's mobile
  feedback (#5 above), she may want the same "just hide, don't blend" approach
  here too — confirm before changing.
- `.hga-prop-3` was repositioned from `left:42vw` (hidden behind the sitting
  figure) to `left:15vw` to balance the composition left/right — confirm this
  reads correctly once tablet/mobile is checked, since it's a desktop-only
  value (no tablet/mobile override currently, inherits through).

## Current Workspace

Project root:

```text
/Users/alihuynh/Claude/Projects/Anh Li Portfolion/anhli-portfolio
```

Local page to inspect:

```text
file:///Users/alihuynh/Claude/Projects/Anh%20Li%20Portfolion/anhli-portfolio/index.html
```

GitHub repo:

```text
AliH86/anhli-portfolio
```

Important instruction from Ali:

```text
Do not commit or push anything until Ali explicitly confirms the visual is done.
```

## User Goal

Rebuild the first hero into a music garden scene inspired by the provided reference:

- Golden dandelion meadow.
- Giant transparent CD jewel case sitting close to the grass.
- Promoted album shown on the main disc face and rotating.
- Standing D'Li / muse figure leaning an arm on the top edge/corner of the jewel case.
- Sitting Anh Li figure in correct proportion, not tiny.
- Smaller album props lying on the grass, not floating.
- Foreground dandelion overlay must not look fake, oversized, or pasted on. If it cannot be handled well, keep it removed.
- The scene needs layered depth but not messy layer stacking.
- Architecture should allow future theme swaps without breaking this dandelion theme.

Current promoted album:

```text
Mỹ Vị Nhân Sinh
album id: b1021057-56bd-49e8-a1fb-5af4d69c2c0e
cover: uploads/My-vi-nhan-sinh.jpg
```

Secondary album Ali also mentioned as possible future promote:

```text
Chuyện Tình Này...Nó Lạ...
album id: debb379c-7814-426c-8409-abe0f0a43215
cover: uploads/chuyen-tinh-nay-no-la.jpg
```

## Current Changed Files

Modified:

```text
index.html
tweaks-app.jsx
DANDELION_HERO_HANDOFF.md
```

New generated/local asset folder:

```text
images/hero/dandelion-garden/
```

Files inside:

```text
images/hero/dandelion-garden/bg-meadow.jpg
images/hero/dandelion-garden/foreground-dandelions.png
images/hero/dandelion-garden/giant-cd-case.png
images/hero/dandelion-garden/anhli-sitting.png
images/hero/dandelion-garden/dli-standing-back.png
images/hero/dandelion-garden/album-pack.png
```

Original source assets from Ali:

```text
/Users/alihuynh/Downloads/anhli_dli_web_assets_4k_cutout/01_bg_dandelion_meadow_clean_3840x2160.png
/Users/alihuynh/Downloads/anhli_dli_web_assets_4k_cutout/02_foreground_dandelion_overlay_3840x2160_true_alpha.png
/Users/alihuynh/Downloads/anhli_dli_web_assets_4k_cutout/03_giant_cd_case_sky_disc_true_alpha_4096.png
/Users/alihuynh/Downloads/anhli_dli_web_assets_4k_cutout/04_anhli_sitting_black_suit_acrylic_stool_true_alpha_4096.png
/Users/alihuynh/Downloads/anhli_dli_web_assets_4k_cutout/06_standing_back_black_suit_pose_true_alpha_4096.png
/Users/alihuynh/Downloads/anhli_dli_web_assets_4k_cutout/07_album_cd_pack_sheet_true_alpha_4096.png
```

## Current Implementation Shape

In `index.html`, hero section now has:

```html
<section class="hero poster-hero" id="home"
  data-hero-skin="dandelion"
  data-promoted-album="b1021057-56bd-49e8-a1fb-5af4d69c2c0e"
  data-supporting-albums="debb379c-7814-426c-8409-abe0f0a43215,c6672b33-6803-4fa3-8c9d-900d15dfaf2d,35ce4803-2ec5-405a-abdb-4a4a2cbf64a1,549189a6-43bd-4112-b3cc-f6a05105b082">
```

Hero layer stack:

```text
poster-field: meadow background
hero-garden-scene:
  hga-haze
  hga-main-object: giant jewel case + rotating promoted disc
  hga-dli: standing back pose
  hga-anhli: sitting Anh Li
  heroAlbumStage: album props generated from ALBUMS
poster-foreground: hidden for now because Ali said the big grass clump looked bad
hero tint/vignette/content
```

Hero data functions added near the music render code:

```text
HERO_GARDEN_DEFAULT
cssUrlValue()
findAlbumById()
makeHeroSupportCase()
renderHeroGarden()
```

`renderMusic()` calls:

```js
renderHeroGarden(ALBUMS);
```

`tweaks-app.jsx` currently promotes `Mỹ Vị Nhân Sinh` and calls `window.renderHeroGarden(list)` if available.

## What Was Fixed In Latest Pass

- Removed/disabled ugly foreground dandelion PNG layer.
- Added subtle bottom ground veil instead of giant pasted grass.
- Moved main CD/case down to sit closer to grass.
- Re-centered promoted album cover inside the disc area.
- Replaced broken rotation behavior with `hgaDiscSpin`, using `transform: translate(-50%, -50%) rotate(...)`.
- Made album props lie on grass with perspective and reduced opacity.
- Rescaled standing and sitting figures.
- Added tablet/mobile breakpoint behavior so desktop proportions do not simply scale down and collide with text.

## Current Visual QA Notes

Desktop 1816x867 looked acceptable after the last pass:

- CD is grounded.
- Standing figure arm touches the top case edge.
- Sitting figure is no longer tiny.
- Album props are on grass, not floating.
- Main disc shows promoted cover.

Tablet portrait still may need further art tuning:

- The scene is intentionally faded/backed off so it does not eat text.
- Sitting figure can still feel slightly ghosted because the transparent jewel case and disc pass behind/near him.
- If improving tablet, prefer reducing or hiding the sitting figure on portrait ratios rather than letting it overlap the CD.

Mobile is simplified:

- Shows standing/case as a subtle background element.
- Hides sitting figure and album props.
- This is acceptable unless Ali asks for richer mobile hero.

## Suggested Next Tasks For Claude Code

1. Open the local page and inspect the hero at these sizes:

```text
1816x867
2048x1152
900x1180
390x844
```

2. Fine-tune only the dandelion hero CSS block around:

```text
index.html
search: HERO COMPOSITE — real dandelion garden asset stack
```

3. Keep the foreground PNG disabled unless you can make it subtle. Ali hated the previous foreground grass.

4. Do not revive old classes unless needed:

```text
hero-person-wrap
hero-album-garden
garden-piece
hg-object
```

There is older CSS still present in the file for historical theme attempts. Avoid adding more overlap. Prefer the new `hga-*` classes.

5. If the main CD face looks too opaque or too cover-like, reduce:

```css
.hga-feature-disc { opacity: ... }
.hga-feature-disc::after { opacity: ... }
```

6. If the standing hand is not on the case at a specific viewport, adjust together:

```css
.hga-main-object { right, bottom, width }
.hga-dli { right, bottom, height }
```

7. If the sitting figure overlaps awkwardly on portrait tablet, consider:

```css
@media (max-aspect-ratio: 1.18) and (min-width: 621px) {
  .hga-anhli { opacity:0.32; left:30vw; }
}
```

or hide it for tablet portrait if needed.

8. Run checks before reporting back:

```text
git diff --check
Parse inline scripts in index.html
Visual screenshots at desktop/tablet/mobile
```

## Validation Already Run

These were clean after the last edit:

```text
git diff --check
Parsed 6 inline scripts without syntax errors.
```

## Git State Warning

There are unrelated/untracked files in the working tree. Do not clean them. Do not reset hard.

Known current status includes:

```text
M index.html
M tweaks-app.jsx
?? images/hero/dandelion-garden/
```

There are also other untracked files such as scripts, old handoff/docs, and dandelion-scene files. Leave them alone unless Ali specifically asks.

Again:

```text
No commit. No push. Ask Ali first.
```

## Ready-To-Paste Prompt For Claude Code

```text
Bạn đang tiếp tục dự án Anh Li portfolio tại:
/Users/alihuynh/Claude/Projects/Anh Li Portfolion/anhli-portfolio

Việc cần làm: tiếp tục kiểm tra và tinh chỉnh hero dandelion garden ở trang đầu theo hướng art-directed, không phải chỉ xếp layer.

Yêu cầu thẩm mỹ:
- Giống tinh thần ref: đồng bồ công anh vàng, giant transparent CD jewel case nằm sát cỏ, hai nhân vật trong vest, album props nằm trên cỏ.
- Main promoted album hiện tại là Mỹ Vị Nhân Sinh, id b1021057-56bd-49e8-a1fb-5af4d69c2c0e, cover uploads/My-vi-nhan-sinh.jpg.
- Mặt disc chính phải dùng cover album promoted và xoay.
- CD/case phải có trọng lượng, sát đất, không bay.
- Nhân vật đứng phải gác tay lên cạnh trên jewel case.
- Nhân vật ngồi phải đúng tỉ lệ với nhân vật đứng, không tí hon, không bị nuốt bởi CD/case.
- Album nhỏ phải nằm trên cỏ, không floating như UI card.
- Foreground bồ công anh trước đó bị chê xấu/phô, hiện đang disabled. Đừng bật lại nếu chưa làm được tinh tế.
- Cần giữ cơ chế theme tách biệt để sau này đổi theme/promote album không ảnh hưởng theme khác.

File chính:
- index.html
- tweaks-app.jsx

Asset hero hiện tại:
- images/hero/dandelion-garden/bg-meadow.jpg
- images/hero/dandelion-garden/giant-cd-case.png
- images/hero/dandelion-garden/anhli-sitting.png
- images/hero/dandelion-garden/dli-standing-back.png
- images/hero/dandelion-garden/album-pack.png
- images/hero/dandelion-garden/foreground-dandelions.png

Trong index.html, tìm block:
HERO COMPOSITE — real dandelion garden asset stack

Ưu tiên chỉnh các class hga-*:
- .hga-main-object
- .hga-feature-disc
- .hga-dli
- .hga-anhli
- .hga-feature-album
- .hga-prop-1 / 2 / 3

Không commit, không push khi chưa được Ali chốt. Chỉ sửa local, chụp/kiểm visual, rồi báo lại.

Kiểm tra bắt buộc:
- desktop 1816x867
- desktop 2048x1152
- tablet 900x1180
- mobile 390x844
- git diff --check
- parse inline scripts index.html
```
