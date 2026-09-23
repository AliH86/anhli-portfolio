# Fresh V2 — wildlife, dialogue and layer corrections

Current local preview: http://127.0.0.1:8791/ . Runtime: `fresh/dist/`. Supersedes `V2-FRESH-LIVING-GARDEN-WRAPUP-2026-09-17.md` for continuation. No commit, merge, push or deployment.

## User feedback incorporated

The user supplied three close-ups showing detached vector grass under Li's shoes and duplicated foreground leaves protruding as hard strips at the lower scene boundary. Removed the separate shoe-grass SVG and the two oversized duplicate edge foliage elements. Original painted foreground remains, with its near-plane occlusion. The scenic container now has a single paint/clip boundary. Existing independent canopy and small planted clusters remain.

The user accepted the new animal illustrations, then corrected their behavior: no procession of every species, no arbitrary perches, small sparrow pairs/groups, quicker and more conversational birdsong. Preserve these illustrations; the acceptance does not certify every subsequent position or motion.

## Controls and dialogue

- Sun, moon and clock icons select day, night and automatic mode. There are no visible clock/control text labels; tooltips and accessible labels describe the controls.
- Automatic day is **05:30 inclusive to 17:30 exclusive**, using device-local hours/minutes. The other hours are night. No dawn/dusk phases remain. Checked every 15 seconds while visible and on returning to the page.
- Ambient sound has a music-note icon with an off slash and a pressed state. It starts off; songs retain their separate native audio element.
- Music UI uses “album nhạc” or “đĩa nhạc”. Selecting an album still never autoplays.
- Li introduces the actual selected album using its existing catalog description. The introduction appears next to a small Li portrait in the album tray and in his scene balloon after closing the tray. Clicking the same album refreshes its introduction without restarting playback.
- Balloon paper opacity is reduced; the refresh icon/button is removed. Ordinary lines, feature tips and gentle random messages rotate with rests. An occasional “Rút một lá” invitation lets the visitor request a message. These short conversational reflections are separate from the existing three-seed Oracle route; no personal reading, prediction, identity tracking, or legacy Oracle data changes were introduced.

## Wildlife behavior and habitats

Implementation and editable source coordinates: `fresh/dist/garden-wildlife.js`, exported `habitats` table. Portrait coordinates use the original **900×1200** image; landscape uses **1672×941**. Positions use the same cover registration as the scenery. Frame feet are anchored to perches instead of floating at arbitrary percentages.

- Day: one visiting species group at a time, followed by a random 27–60 second rest. Species selection is weighted/random, with reduced weight for the previous visitor. It is not a fixed species sequence.
- Sparrows: normally two, occasionally three (18% chance), arriving slightly apart and resting 26–44 seconds. Each has a distinct existing fence-post anchor. One group triggers one quick call/response chorus. One bird faces its companion after landing.
- Hummingbird: a single visitor hovering near the specified flowering patch; it returns toward the same side it entered.
- Butterfly: a small local circuit above a flower bed. Dragonfly: hover/move over pond water in portrait, above the birdbath in landscape. Neither is treated as a perched bird.
- Owl: one visitor per owl event, resting on an existing wooden fence post, then leaving. Bats only fly past the upper scene; they never enter a perched state.
- Cricket: emerges beside low plants, chirps, then fades back locally; no airborne path.
- Fireflies: two or three tiny separate lights near lower plants/water, with randomized offsets and rest periods.
- Dandelion seeds drift lightly during the day. Night lantern glow fluctuates gently, centered on the actual depicted lamps.

Animal state uses short Web Animations for arrival/hover/departure, plus CSS sprite frames. No per-frame JavaScript/rendering engine. Changing phase, opening a tray, hiding the page, changing layout, or disabling motion cancels stale paths/timers; reduced motion hides roaming wildlife. A cancelled day arrival cannot produce a later night chirp.

## Sound

Wind is sparse and soft. Sparrow choruses use eight uneven phrases over roughly five seconds, with short variable syllables and two pitch ranges for call/response, replacing the slow evenly spaced chirps. The group chorus starts on landing when ambience is enabled. Owl/cricket encounters have their own calls; unrelated sound types are spaced by at least four seconds, repetitions by at least 22 seconds. Additional wind/cricket episodes are scheduled 90–190 seconds apart. These remain synthesized effects, not wildlife recordings. Auditory naturalness remains for user listening feedback.

## Assets, tests and limits

- New imagegen artwork: two 4×4 sheets, eight animal species, four poses each. Each sheet uses a separate registered luminance matte because generated color files are RGB, not actual alpha PNGs. Source PNGs and exact prompts: `fresh/source-art/wildlife/`; optimized runtime files: `fresh/dist/assets/wildlife/`.
- Built-in `image_gen.imagegen` was used for both color sheets and both matte edits. Runtime sheets are 768×768 WebP. Day pair is about 410 KB, night pair about 291 KB, requested only as their phase's visitors appear. Files are shared across instances.
- 22 Node checks passed, covering player continuity, exact 05:30/17:30 boundaries, separate ambient lifecycle, selected-album copy, grouped perches, stale callback cancellation and bats never perching.
- Original scenic/host art and all existing data retain their prior SHA-256 hashes. New/changed runtime URLs returned HTTP 200. Evidence and screenshots: `fresh/qa/wildlife-2026-09-17/`.
- Browser checks cover desktop, mobile and tablet/landscape layout; they do not certify physical-device battery, all browser engines, or phone background playback. Private audio delivery remains unimplemented: the existing public URLs and UI-only download deterrents are unchanged.

The complete accepted refinement archive and previous QA receipts remain available. Current results are local and open to visual/motion feedback.
