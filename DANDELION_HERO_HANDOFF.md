# Dandelion Garden Hero Handoff

> **Ghi chú (12/7/2026):** file này giữ lại làm tham chiếu kỹ thuật cho các phiên
> hero/dandelion trước đó (toạ độ đĩa sống, video nền, v.v. — vẫn đúng, còn dùng
> được). Từ nay theo `AGENT-RULES.md` §6, mọi cập nhật/log phiên mới đi vào
> `recap-anhli-portfolio.md` (nguồn sự thật chung), **không** thêm mục mới vào
> file này nữa để tránh rải rác nhiều bản recap.
>
> **Cập nhật vị trí source (13/7/2026):** 7 layer PNG cũ không dùng runtime đã
> được chuyển khỏi repo sang
> `/Users/alihuynh/Claude/Projects/Anh Li Portfolion/source-archive/hero/dandelion-scene/`.
> File nền trùng byte `bg-dandelion-field.png` đã xoá; bản tracked tương ứng là
> `images/hero/dandelion-field.png`. Site hiện tại không tham chiếu source
> archive; không xoá hoặc add ngược archive khi Ali chưa yêu cầu.

## 2026-07-05 — LIVE PUSHED: dandelion hero video + music background polish

**Trạng thái cuối phiên**: ĐÃ PUSH LIVE lên `origin/main`.
- Commit live: `0ead184 Update dandelion hero and music section`
- Trước khi push có remote mới hơn local 4 commit (`622300d` là remote tip lúc
  fetch), đã `git fetch`, stash tạm `DANDELION_HERO_HANDOFF.md` + `tweaks-app.jsx`,
  rebase commit lên `origin/main`, pop stash lại, rồi push thành công.
- Staged/pushed đúng 8 file live: `index.html`, `experience.js`,
  `images/lab/d01.jpg`, `images/portraits/dli.jpg`,
  `images/hero/dandelion-garden/bg-meadow.webp`,
  `images/hero/dandelion-garden/plane-far.webp`,
  `images/hero/dandelion-garden/plane-mid.webp`,
  `videos/hero-dandelion-loop.mp4`.
- KHÔNG push scratch/demo/handoff/command files. Sau push vẫn còn local modified:
  `DANDELION_HERO_HANDOFF.md`, `tweaks-app.jsx`; và untracked scratch/demo như
  `hero-vinyl-live.html`, `hero-video-garden-preview.html`, `videos/hero-dandelion.mp4`,
  `videos/hero-dandelion-1080.mp4`, các `.command`, v.v.

**Hero hiện tại**:
- Hero dùng `videos/hero-dandelion-loop.mp4` (loop bake 15MB) qua `#hero-video-js`.
- Overlay đĩa sống cuối cùng trong `#hero-disc-live-js`:
  `const F={ W:1920, H:1080, cx:1540, cy:696, r:178 };`
  Ali chốt: size ổn, sau đó báo lệch trái nên chỉ đẩy `cx` từ 1512 lên 1540,
  giữ `cy=696`, `r=178`.
- Có debug/local-only query cho việc canh lần sau:
  `?pauseHero=1&debugDisc=1` sẽ pause hero ở frame 0 và vẽ guide vòng/tâm
  `.hgv-disc`. Query thường không bật guide và hero video play bình thường.
- Nav đã được tăng contrast vì chữ menu bị chìm trên vùng trời sáng: nav có
  gradient tối nhẹ + text-shadow; logo/link chuyển sang amber sáng hơn.

**Music section hiện tại**:
- `#music` có video nền mới Ali đưa:
  `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4`
- Đã bỏ scroll-scrub. Video nền giờ `autoplay` bằng JS khi vào gần section,
  `loop`, pause khi rời viewport/hidden, fade-in bằng `.music-scroll-bg.ready`.
- Vì nền xanh dương quá bật, đã hạ tone bằng CSS:
  `.music-scroll-video { filter:saturate(0.74) contrast(1.02) brightness(0.78) sepia(0.12) hue-rotate(16deg); opacity:0.78; }`
  và thêm gradient ấm/tối trong `.music-scroll-bg::before`.
- Album gate bị background giành spotlight nên đã tăng blur/tối:
  `.music-gate` dùng `blur(18px) saturate(0.9)` và background gần đen hơn;
  nội dung phía sau gate filter `blur(14px) brightness(0.34) saturate(0.48)`.

**Validation cuối phiên**:
- JS syntax check sạch bằng bundled Node.
- Browser local check: hero video play, music background `paused:false`, `loop:true`,
  console không error/warn.
- Live URL vẫn là GitHub Pages repo hiện tại; GitHub Pages có thể cần vài phút/cache.

## 2026-07-05 — WRAP UP phiên motion/video. Việc kế tiếp cho session mới

**Trạng thái**: mọi thứ LOCAL, CHƯA COMMIT/PUSH, Ali đã duyệt các phần chính
(hero video + đĩa sống đã "done" sau khi cân lại size). Chờ Ali chốt push.

**Chốt cuối phiên này**: đĩa sống thu về r=174 (94% của tiếp tuyến đo được —
bìa nằm lọt trong vành đĩa như nhãn thật, bản r=185 Ali chê to). Verify ở
viewport 1440: width 309→291px, tâm không đổi.

**VIỆC KẾ TIẾP Ali đặt cho session mới**: "ghép cái phần chỗ cái gốc cây có
cái đĩa vinyl" — composite cảnh GỐC CÂY RÊU có ĐĨA VINYL nằm trên (tham khảo
aesthetic footage quietpress: đĩa than trên gốc cây phủ rêu giữa thiên nhiên,
cánh hoa bay). Ngữ cảnh sẵn có cho việc này:
- Footage tham khảo: video CloudFront trong `quietpress/src/components/
  BoomerangVideoBg.tsx` và `hero-vinyl-live.html` (bản cũ trước khi thay bằng
  video của Ali) — chính là cảnh gốc cây + vinyl.
- Blender đang có trên máy, pipeline headless đã dựng sẵn (bake_loop.py trong
  scratchpad phiên trước — nhớ API Blender 5: se.strips, media_type='VIDEO').
  Addon MCP chạy tốt qua socket 127.0.0.1:9876 (MCP bridge của app hay treo —
  nói chuyện thẳng bằng python socket).
- PSD gốc + asset cutout trong ~/Downloads/anhli_dli_web_assets_4k_cutout/.
- Chưa rõ Ali muốn ghép vào ĐÂU (hero? section mới? video mới?) — HỎI TRƯỚC.

**Việc còn treo khác**: (a) hỏi Ali rồi dọn videos/hero-dandelion.mp4 44MB 4K
+ hero-dandelion-1080.mp4 (bản chưa loop) trước khi push — GH Pages không nên
chứa file 4K; (b) tối ưu video hơn nữa nếu cần (15MB → có thể re-render bitrate
thấp); (c) quietpress/ + hero-vinyl-live.html là demo/scratch, không thuộc site.

## 2026-07-05 (sáng) — Fix đĩa sống trôi góc + giãn nhịp thay bìa. LOCAL, CHƯA PUSH

Ali báo 2 bug từ bản 04/07: (a) đĩa hero thay bìa liên tục, (b) đĩa trôi lệch
lên góc trên-trái. Nguyên nhân (b) và một phần (a) là MỘT bug: `.hgv-disc-face`
mượn keyframe `hgaDiscSpin` của đĩa tĩnh cũ — keyframe đó có
`translate(-50%,-50%)` (đĩa cũ cần để canh giữa), còn face mới dùng inset:0.
Keyframe chỉ có `to` nên from = identity → animation NỘI SUY translate từ
0→-50% suốt 36s: mặt đĩa bò dần lên góc trên-trái rồi giật về, lặp mãi.
Fix: keyframe riêng `hgvSpin` (rotate thuần), và chuyển nhịp "nuốt" `hgvGulp`
lên wrapper `.hgv-disc` (nếu để trên face sẽ giành thuộc tính transform với
hgvSpin làm vòng xoay khựng). Auto-cycle giãn 14s→35s (Ali chê dồn dập).
Đã verify bằng Web Animations API (tua currentTime=9s → rotate đúng 90°,
translate luôn (0,0)); tab preview document.hidden nên đồng hồ animation bị
đóng băng — đừng tưởng nhầm là animation hỏng.
Launch config đổi port 8753→8754 (8753 bị server phiên chat cũ giữ).

## 2026-07-05 — Loop bake bằng Blender headless + "ĐĨA SỐNG" (bìa bay vào đĩa video). LOCAL, CHƯA COMMIT/PUSH

1. **Hết giật mây ở điểm nối video**: bake crossfade 1.5s đuôi→đầu bằng Blender
   HEADLESS (`/Applications/Blender.app/Contents/MacOS/Blender -b --factory-startup
   -P bake_loop.py` — không đụng session Blender đang mở). Blender 5.1 API mới:
   `se.strips` (không phải sequences), `new_effect(name,type,channel,frame_start,
   length,input1,input2)`, và PHẢI `image_settings.media_type='VIDEO'` trước khi
   set `file_format='FFMPEG'`. Output `videos/hero-dandelion-loop.mp4` (8.5s,
   điểm nối = 2 frame nguồn liên tiếp → liền mạch tuyệt đối). #hero-video-js
   đã trỏ sang file này.
2. **ĐĨA SỐNG (#hgvDisc + #hero-disc-live-js)**: overlay bìa album lên mặt đĩa
   trong video. Toạ độ đo từ frame render: tâm (1540,700) r185 trong khung
   1920×1080 — camera khoá cứng (kiểm bằng cross-correlation frame 1/127/255:
   lệch 0,0). JS quy đổi theo object-fit:cover + scale 1.05, re-place khi resize.
   Đáy overlay fade (mask 78%→96%) vì cỏ video che rim dưới. Album props giữ
   lại trên video (bỏ khỏi rule ẩn video-on), prop bấm được (pointer-events chỉ
   trên .hga-prop, KHÔNG trên stage inset:0 kẻo chặn click nút). Bìa bay vào
   đĩa: click prop hoặc auto-cycle 14s (bỏ qua khi hidden/no-motion/video ngủ).
   `--cover` nằm inline trên .hga-prop (không phải .hga-prop-cover).
   Nếu video đổi bố cục → đo lại 4 tiếp tuyến (script dump frame trong scratchpad
   transcript 05/07).
3. **Videos folder**: dùng hero-dandelion-loop.mp4 (15MB). hero-dandelion.mp4
   (44MB 4K gốc) + hero-dandelion-1080.mp4 (13.7MB, bản chưa loop) — CÂN NHẮC
   không push file 4K lên GH Pages (nặng repo); hỏi Ali trước khi xoá.

## 2026-07-04 (khuya) — VIDEO VÀO HERO THẬT của index.html. LOCAL, CHƯA COMMIT/PUSH

Ali hỏi "sao không trực tiếp ở hero portfolio" → tích hợp thẳng vào #home:
- `<video id="heroVideo">` (z2, sau poster-atmosphere, DƯỚI tint/vignette để
  chữ dễ đọc, dưới hạt heroWind z8). `preload="none"` + JS gán src rồi PHẢI
  gọi `video.load()` (bug đã gặp: gán src suông với preload=none thì trình
  duyệt không tải gì, canplay không bắn).
- `.video-on` trên .poster-hero khi canplay → `.hga-master-scene` +
  `.hero-album-stage` ẩn (opacity+visibility); cảnh tĩnh 2.5D = poster/fallback
  trong lúc tải và cho mobile/no-motion/reduced/saveData (các guard trong
  #hero-video-js; mobile ≤620px không tải video 13.7MB).
- Tự ngủ khi cuộn quá innerHeight*1.2 (rect check không IO), watchdog debounce
  800ms chống Chrome "save power" pause, MutationObserver theo nút no-motion.
- Preview-env note: guard chạy lúc load — tab preview mở viewport hẹp rồi mới
  resize sẽ bị guard chặn (reload sau khi resize là được). Trình duyệt thật OK.
- `hero-vinyl-live.html` giờ chỉ là scratch/reference phong cách quietpress
  (không còn là đường chính); có thể xoá khi Ali không cần nữa.
- Blender: addon CHẠY TỐT (socket 127.0.0.1:9876 trả lời get_scene_info),
  KHÔNG cần cài lại — chỉ MCP bridge của app treo (nó giữ connection nhưng
  tool call timeout). Khi cần Blender: nói chuyện THẲNG qua socket bằng
  python (json {"type":..., "params":...}), đừng chờ MCP tool.

## 2026-07-04 (tối) — Video hero của Ali + vinyl 3D chuyển vào player. LOCAL, CHƯA COMMIT/PUSH

1. **Ali render video cảnh dandelion** (Downloads/anhli-dandelion-vid2.mp4, 10s 4K
   44.5MB) — đã copy vào `videos/hero-dandelion.mp4` và transcode 1080p bằng
   `avconvert` (macOS built-in, KHÔNG có ffmpeg/node-brew trên máy) →
   `videos/hero-dandelion-1080.mp4` (13.7MB). `hero-vinyl-live.html` (trang
   preview riêng, không đụng index.html) đang dùng bản 1080p, loop thẳng
   (video ≥9s hoặc ≥2560px thì bỏ boomerang — bắt frame 4K/10s ngốn ~600MB RAM).
   Có watchdog debounce 800ms play lại khi bị pause ngoài ý muốn.
   Style trang này = ngôn ngữ quietpress (glass/fade-up/widget) + brand Anh Li.
   TODO trước khi ship thật: 13.7MB vẫn hơi nặng (cân nhắc Ali re-render 1080p
   bitrate thấp từ Blender, hoặc thêm poster + lazy phát khi vào viewport).
2. **Vinyl 3D "dung hoà" vào player** (Ali yêu cầu): #vinyl3d chuyển từ đầu
   #music vào TRONG `.np-vinyl` của #nowplaying, thế chỗ `.vinyl-disc` CSS
   phẳng qua `:has(.vinyl3d.on)` (không :has → canvas phủ lên trên, vẫn ổn).
   Texture bám bài ĐANG PHÁT (poll #playerCover img mỗi 45 frame, fallback
   album promote), camera kéo gần (0,1.35,3.7), tilt/bob giảm cho hợp box nhỏ.
3. **Chống đói IntersectionObserver**: preview tab bị che khuất thì IO không
   fire (đã xác minh: cả observe(body) cũng câm), Chrome còn pause video-only
   media ("save power") và screenshot đen — TOÀN BỘ là quirk môi trường preview,
   trình duyệt thật không bị. Dù vậy đã gia cố cho user thật: bootIO vinyl3d
   thêm fallback rect-check khi scroll; revealInView() giờ nhặt cả
   `.g-item:not(.gin)` (không để gallery kẹt vô hình nếu IO bị throttle).
4. **Blender MCP timed out** dù Ali đã mở app — addon server chưa start
   (cần bật trong sidebar addon > Start MCP server, port 9876). Việc dựng
   jewel case glTF thật vẫn treo chờ kết nối.

## 2026-07-04 — Hero tách 2 tầng parallax (2.5D) + motion/perf pass toàn trang. LOCAL, CHƯA COMMIT/PUSH

Ali yêu cầu nâng cấp "3D motion, art, tối ưu" (cảm hứng motionsites.ai). Bốn việc, tất cả local:

1. **Hero 2.5D**: master scene tách thành 2 plane cùng khung 2600×1462, export lại
   từ chính PSD nguồn bằng psd-tools (pipeline giống hệt bản master đang live, diff
   trung bình 0.26/255):
   - `plane-far.webp` = layer Background (đồng cỏ NGUYÊN VẸN phía sau case — parallax
     không lộ lỗ trống), scale:1.018 gốc bottom để có biên dịch chuyển.
   - `plane-mid.webp` = case + 2 nhân vật + cỏ chân case, alpha thật, KHÔNG scale
     (giữ đúng tỉ lệ Ali đã chốt). `.hga-feature-disc` chuyển vào TRONG plane-mid
     → đĩa và case không bao giờ lệch nhau được nữa.
   - JS: chỉ thêm ĐỘ LỆCH giữa tầng trong applyFx (bản inline #experience-js-inline
     là bản chạy thật; file experience.js rời chỉ là bản nguồn — đã sync cả hai).
     Cả cụm #heroGardenScene vẫn được dịch chung như cũ.
   - Mobile (≤620px): giữ nguyên ảnh phẳng master.jpg + mask như bản live, plane
     chỉ tắt background-image (KHÔNG display:none vì đĩa nằm trong plane-mid).
   - Nếu regenerate master: chạy lại script export plane (xem transcript 04/07)
     và đo lại đĩa như quy trình cũ.
2. **Perf**: preload hero theo media query (desktop 2 webp / mobile jpg),
   bg-meadow.jpg→webp (2 ref: --dandelion-bg + theme heroBg), nén tại chỗ
   images/lab/d01.jpg (1.35MB→254KB) + portraits/dli.jpg (1.29MB→101KB),
   lazy-load 4 ảnh ps-card + momo-qr. Lưu ý: #shaderHost không tồn tại trong DOM
   → shader nebula đang ngủ, không phải nguồn nóng máy.
3. **Scroll storytelling**: gallery gRise đổi sang `paused` + IO thêm `.gin` khi
   cuộn tới (armGallery() gọi SAU renderGallery() trong INIT — items render bằng JS);
   thêm wipe clip-path vào keyframe; welcome tách reveal từng dòng d1/d3;
   thanh scroll-progress amber trên cùng (#scrollProgress, update trong script chính).
4. **Vinyl 3D three.js** (#vinyl3d trong #music): decor góc phải, lazy import
   three@0.160 từ unpkg khi cuộn gần, desktop >1100px only, texture = cover album
   promote (đọc window.PORTFOLIO_MUSIC + #home dataset), quay nhanh khi
   body.playing, nghiêng theo con trỏ, CDN/WebGL lỗi → biến mất êm, section như cũ.
   Ali chưa duyệt aesthetic khối này — hỏi trước khi push. Blender MCP lúc đó
   không chạy; nếu Ali mở Blender có thể thay bằng asset glTF xịn hơn.

Đã verify preview localhost: desktop 1816×867 + 1440×860, tablet 900×1180,
mobile 390×844, console sạch, network đúng (desktop không tải master.jpg nữa).


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
