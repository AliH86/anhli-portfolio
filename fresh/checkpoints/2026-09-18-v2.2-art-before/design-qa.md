# V2.2 design QA · 18 September 2026

**Final result: passed**

This result covers local implementation and the inspected browser states. User art acceptance and physical iPhone testing remain separate; this is not a live/deployment receipt.

## Source and evidence

- Source visual truth: `/Users/alihuynh/Downloads/ChatGPT Image Sep 18, 2026, 07_57_20 AM (1).png` (scene) and `/Users/alihuynh/Downloads/ChatGPT Image Sep 18, 2026, 07_57_21 AM (2).png` (kit).
- User's later steering is authoritative: lighter art, honey/cream, vines/daisies on rims with dimensional shadow, translucent paper that reveals blurred scenery, opaque readable text.
- Implementation: `fresh/qa/v2.2/desktop-music-final.png`, browser rendered at **1672×941 CSS px, DPR 1**. Source **1672×941 px**, implementation **1672×941 px**; no density mismatch.
- State: music room, Untamed selected, playlist open, daytime, playback paused. Reference shows playing; play/pause icons intentionally reflect actual playback rather than forcing an illustrated state.
- Full comparison: `fresh/qa/v2.2/comparison-full.png`, 3344×941, reference left and implementation right.
- Focused comparisons: `comparison-nav.png`, `comparison-console.png`, `comparison-ledger.png`. Each crop keeps aspect ratio in an equal-sized containment box; this normalization is for inspection, not a pixel-difference metric.
- Responsive evidence: `mobile-music-final.png`, `mobile-sheet-final.png`, `mobile-night-final.png`, `landscape-sheet-final.png`, `mobile-gallery-final.png`, `tablet-gallery-final.png`, `laptop-final.png`, `story-final.png`.
- Final runtime checksum receipt: `fresh/checkpoints/2026-09-18-v2.2-review/hashes.json`.

## Findings, iteration history and fixes

No remaining actionable P0/P1/P2 findings in the inspected local states.

| Earlier finding | Severity / impact | Fix | Post-fix evidence |
|---|---|---|---|
| Wood was darker than user's updated direction; foliage too small/sparse | P1 art fidelity | Generated honey-wood variant and transparent L-shaped ivy/daisy asset, reusable corner placement and alpha shadows | desktop-music-final, story-final, comparisons |
| Parent opacity dimmed both material and text when playlist opened | P1 readability | Parent opacity 1; only vellum/background texture alpha; ink #51391f, blur 7px/5px | desktop-music-final, mobile-night-final |
| Navigation moved into the letter header because filter/backdrop established containing block | P1 overlap | Blur on inner material only; dialog uses box-shadow, fixed nav stays at viewport | story-final |
| Short landscape console extended to y404 in 390px viewport; desktop ledger covered transport | P1 persistent controls | Smaller shelf and dedicated short-landscape sheet with fixed transport; y285–359 controls in y8–380 sheet | landscape-sheet-final; console bottom386 |
| Night logo inherited pale text on light paper | P1 readability | Explicit dark ink in night selector | mobile-night-final |
| Closing after cross-room navigation reopened previous room | P1 navigation | Replace room entries; close clears hash to garden; regression test added | browser flow and test-polish close test |
| Mobile header could retain inert after sheet/room transition | P2 interaction | Reset queue dataset and header inert on open/cleanup, recompute responsive sheet on resize | mobile close/reopen + note-story flow |
| Laptop 1440 ledger right edge reached1446 | P2 overflow | Clamp negative offset to viewport gutter | laptop-final: right1420, console bottom819, viewport1440×900 |
| Gallery's pale active-tab text and minor horizontal scrollbar | P2 readability/overflow | Dark active ink and caption ink; clip only horizontal overflow in gallery/profile content | mobile-gallery-final shows corrected tab; final stylesheet removes scrollbar |
| Host overlapped shelf's left record | P2 layout | Music host x shifted left to scene-native .18 | desktop-music-final |

Historical intermediate evidence retained as `desktop-ledger-pass2.png`, `mobile-sheet-pass1.png`; these are not the final design.

## Required fidelity surfaces

**Fonts/typography.** Georgia serif matches the reference's editorial voice, with italic sign/letter lines. Existing GardenSans supports tiny metadata. Live HTML preserves Vietnamese marks and copy. The reference's handwritten lettering is interpreted with a readable serif rather than baking text into generated images. Album and long track names wrap; shelf labels may clamp visually while full accessible names remain. Small ledger text uses dark ink and no parent opacity. Night/day screenshots inspected.

**Spacing/layout.** Top-right nav, dominant selected record, side records, connected console and attached ledger form one music zone. Story is a paper letter and gallery a framed scrapbook. Five covers are visible at desktop with partial edges; mobile preserves horizontal browsing and provides quick navigation. Large controls, single sheet scroll body, safe-area/dvh/visualViewport. Native gallery/letter content scrolls separately from fixed headings. Desktop, laptop, tablet, portrait phone, landscape phone checked. No UI geometry claim is based only on source inspection.

**Colors/tokens.** Honey wood, brass, cream vellum and olive active states follow the user's brighter adaptation. Ink #51391f stays opaque over alpha .76 vellum and blurred scenery. Reduced-transparency and no-backdrop support provide opaque fallback. The reference's dark wood and opaque paper were intentionally superseded by later user steering. Decorative depth uses soft box/drop shadows without a black fullscreen overlay.

**Image quality/assets.** Real garden, host, artwork covers, profile/gallery images retained. Generated reusable material/corner/button assets are optimized WebP; alpha corners have clear interiors. No full-screen mockup substitutes for interactive UI. Standard icons are licensed Phosphor SVG files, not fabricated illustrations. Cover art differs from mock because actual published albums are the source of truth. Corners sit on rims, with contained intrusion outside text zones.

**Copy/content.** Real album names/track names remain unchanged; UI adds intimate Vietnamese labels. The 26/213 canonical correction has a separate source audit. No fabricated tracks, lyrics, timings, weather conditions or unpublished client-job content. Lyrics tab explicitly states absence. Empty favorites and empty search have meaningful copy; unavailable Play explains why.

**Icons/states/accessibility.** One coherent icon family; round controls use actual raster material. Play/pause, next/previous, progress, volume/mute, queue, close, focus and active states inspected. Native controls and labels retain keyboard access; Escape closes sheet before room. Mobile background elements inert only while sheet open. Reduced motion stops decorative movement without audio interruption. This is not a screen-reader, 200% text zoom or physical-device accessibility certification.

## Primary interactions and runtime checks

- Explicit Play; no autoplay on entrance/album browse. One native `<audio>` confirmed.
- Real R2 playback, currentTime advancement, next track, pause and keyboard seek; audio continued after closing room.
- Native scroll to track12 in 390×844 sheet: scrollTop283.5, last row bottom734.1, transport top738. Selected last track played; lyrics empty tab retained controls.
- Mouse drag changed shelf scrollLeft856→1284.5 while selected album ID stayed unchanged. Keyboard ArrowLeft moved focus to neighbor without changing selection.
- Search `cai ban nhau` found Cái Bàn Nhậu; quick picker with longest title; favorite filter add/remove and empty state.
- Profile opened from host note; gallery photos/lightbox/next image loaded; 18-item video list displayed. External full video playback not re-certified.
- Modal navigation reset, close-to-garden, reduced motion, day/night and opaque-text checks.
- Console `error`/`warn`: none in captured session (`browser-console.json`).
- `npm test`: 43/43. `prepare-content --verify-library`: 213 mapped files. Network audio probes:213/213. Baseline:500 files unchanged,5 changed,2 retired covers archived.

## Intentional deviations / remaining acceptance

The user requested adaptation to the existing brighter world rather than replacing it with the supplied scene. Therefore the original world/host geography and real album art remain, frame proportions fit actual content, and the new material system uses less dense foliage and lighter wood. Full hand-drawn host animations, weather simulation and a game portal are future hooks as specified in the brief. No unanswered implementation question is blocking local review.

Physical iPhone Safari keyboard/browser chrome, lock-screen/app-switch audio, thermal/battery and slow-network behavior still need device QA. Those cannot be concluded from a desktop viewport. User visual approval is still pending before live. No open P3 task is required for this local handoff; additional handwritten typography/different frame carving would be art variants only after review.

## Implementation checklist

- [x] Restore and audit source pipeline before catalog change.
- [x] Build shared art/components and responsive feature surfaces.
- [x] Inspect full and focused source/implementation comparisons.
- [x] Fix observed P0/P1/P2 issues and inspect affected states.
- [x] Retain data/asset checksum evidence and passing automated checks.
- [x] Freeze local review package; leave preview paused.
- [ ] User visual acceptance and real-device QA before live.
