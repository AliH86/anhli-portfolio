# Garden 2.5D motion · 14 September 2026

User accepted the new scene imagery and explicitly accepted 2.5D with a little movement, parallax and/or depth-of-field. This authorizes the Garden motion pass; it does not claim all other scene art is finished.

Implemented `js/redesign/garden-motion.mjs` and integrated with garden-plate controller. Desktop pointer input eases to ±4px on backdrop and host and ±11px on a softly masked foreground image layer. Host and ground use exactly the same transform, preserving contact. Existing photographed foreground blur remains, with a 0.6px softening on the near-plane duplicate. This is a restrained masked-image depth effect, not semantic foliage separation or independent leaf/water animation. Image source assets and host source have not been edited.

CSS camera drift runs slowly over24s; touch uses subpixel drift and no pointer tracking. Text/navigation/player stay outside the transformed scene. Pause button persists locally. Reduced-motion, hidden document, image failure and inactive routes stop decorative movement; JS requestAnimationFrame only interpolates pointer changes and stops after settling. One shared audio element, no autoplay, no WebGL/canvas. All8 route HTML files regenerated from current local source; no music data changes in this pass.

Validation: `scripts/test-garden-motion.mjs` completed6 behavior checks with no page errors: separate near-plane transform and fixed copy; interpolation settles; pause persistence; route stop/resume; live reduced-motion preference; touch layout with no horizontal overflow. Desktop1440×900 and390×844 touch emulation in headless Chrome, not physical-device performance profiling. Screenshots and JSON: docs/qa/garden-motion-2026-09-14/. Initial video capture was unavailable because Playwright ffmpeg is not installed; no video recording is claimed.

Preview: http://127.0.0.1:8784/ . Reload and move pointer gently. UI now has Dừng chuyển động / Bật chuyển động. The static-review label is cleared for loaded Garden because the scene now has movement.

Git: origin/main advanced to487e4fd (local HEAD5eacde1, behind6). New remote change concerns music/catalog/fonts and a legacy index line; it was inspected, not merged. Existing mixed uncommitted work preserved. No commit, push or publish.

Next: retain this subtle motion amplitude; extend art direction to content scenes in a separate pass. Free camera navigation is not promised.
