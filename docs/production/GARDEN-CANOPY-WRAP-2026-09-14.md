# WRAP-UP · Canopy wind, parallax, transitions · 14 September 2026

User latest: “oki lah, hiện sẵn tiến trình điều chỉnh - em wrap-up nhé”. Stop here. Latest live usage98% five-hour /84% weekly; do not start new heavy work in this window. No reset credit used. Next continuation must read this checkpoint and recheck usage.

Preview remains http://127.0.0.1:8784/ in the existing tab. Do not create additional preview tabs; user already has5. Changes are local only. No commit, push or deployment.

Completed:
- Removed the duplicate photographic foreground layer that caused doubled plants during parallax. The backdrop picture is now either visible as fallback OR replaced in paint by a single opaque 2D image-effect canvas. No second moving background photograph is composited over it.
- Added garden-canopy.mjs: small native WebGL image displacement shader, no Three.js/GLB world. Locally masks high foreground branches and tree crowns; protects house, greenhouse, stall and pergola areas. Smoothly tapered displacement and leaf movement; source artwork remains unchanged. This is image warping, not articulated 3D branches or simulation.
- Current normal Garden has ONE lightweight effect canvas, superseding prior “zero canvas/no WebGL” notes. Approx30 draw updates/sec, capped DPR1.25, pauses off-route/hidden/paused; reduced motion shows ordinary static picture. GPU/context setup failure retains the image. Actual device GPU profiling and forced context-loss fallback tests are not completed.
- Increased depth separation: backdrop/host±13px horizontally, independent grass layer±31px; high near branches gain local parallax. Host retains the calibrated1.70m artwork, closer anchor and same ground transform. No host source or landmark center changes in this pass.
- Stronger grass sway, about−3 to+4.2deg desktop, lower mobile amplitude, staggered phases. Existing10 desktop/5 mobile photographic clusters preserved.
- Removed white tag boxes behind lower links, pause control and handwritten note; warm light lettering and a smooth darkened lower edge replace them. Mobile intro chip also removed. Main brown arrival CTA and approved scene retained.
- Added synchronous route transitions in shell.mjs: content fades/rises420ms and backdrop fades/settles600ms via Web Animations; header and real player remain outside those effects. Back/Forward/URL/focus update immediately. Reduced motion skips these effects. This is a UI/scene entry transition, not a continuous journey through authored new destination imagery.

Verification:
- scripts/test-garden-motion.mjs:9 passed, no page errors. Receipt/screens docs/qa/garden-canopy-2026-09-14/. Covers one background paint, crown clock, removed duplicate,1.70m calibration, grass timing, parallax/copy/ground, pause, route stop, reduced motion and touch layout.
- scripts/test-garden-routes.mjs: final13/13 PASS after switching route animation to synchronous rendering. Includes actual audio playback across routes/MAP, Back/Forward/reload,26albums, keyboard/lightbox/Sky,390/768/1280 layouts, no-JS/reduced motion. Final receipts/screens overwrite the current regression folder docs/qa/garden-stable-2026-09-14/regression/.
- Initial native View Transition attempt made legacy immediate-state assertions race; replaced by synchronous render plus non-blocking Web Animations. No native View Transition route code remains.
- Fresh desktop/mobile combined images also under docs/qa/garden-finish-2026-09-14/art-page/. Inspected desktop final composition; browser emulation is not real-device acceptance. git diff --check passed for tracked changes.

Current files: js/redesign/{garden-canopy,garden-motion,garden-plate,shell,view}.mjs, css/garden-plate.css, generated8route HTML. Existing mixed music/data work preserved. origin/main487e4fd, local HEAD5eacde1, behind6; no merge performed.

Next after usage refresh: user assessment of current wind/parallax; physical-device smoothness if available; then match destination scene imagery to approved Garden quality. MUSIC/SHOWS/VISUAL/STORY real content still works but has not received finished photographic world scenes in this pass. Do not restart the accepted art direction or host.
