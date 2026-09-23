# V2.2 art and layout QA · 18 September 2026

final result: passed

This is the agent's local review-readiness assessment for the revised art adaptation. **User visual acceptance is pending; this is not a live-release or physical-device certification.** The previous art pass was rejected for visible drift and is superseded by this iteration. Passing functional tests alone did not justify its earlier completion claim.

## Source, state and comparison evidence

Source visual truth:
- `/Users/alihuynh/Downloads/ChatGPT Image Sep 18, 2026, 07_57_20 AM (1).png` — scene, 1672×941 pixels.
- `/Users/alihuynh/Downloads/ChatGPT Image Sep 18, 2026, 07_57_21 AM (2).png` — component kit.
- User corrections: brighter existing art; vines, leaves and daisies on frame edges; dimensional shadows; translucent paper with blurred background; fully readable text.

Runtime: `fresh/dist/`, http://127.0.0.1:8792/#music . Main screenshot: `fresh/qa/v2.2-art/desktop-music.png`, 1672×941 pixels from a 1672×941 CSS viewport at DPR1. Source and implementation have equal pixel dimensions, no density resampling. Music room, Untamed selected, playlist open, daytime, paused. Reference shows playing; implementation reflects its actual playback state and requires explicit Play.

All evidence below is in `fresh/qa/v2.2-art/`:
- `comparison-reference.png`: full reference left / implementation right, 3344×941.
- `comparison-before-after.png`: previous implementation left / revised implementation right.
- Focused pairs: `comparison-navigation.png`, `comparison-sign.png`, `comparison-player.png`, `comparison-ledger.png`, `comparison-story.png`, `comparison-gallery.png`. Crops retain aspect ratio in equal containment boxes; these are visual comparisons, not pixel-difference scores.
- Final desktop states: `desktop-music.png`, `desktop-story.png`, `desktop-gallery.png`. Day/night readability: `desktop-night.png` plus mobile evidence.
- Responsive: `mobile-music.png`, `mobile-playlist.png`, `mobile-playlist-bottom.png`, `mobile-long-title.png`, `mobile-story.png`, `mobile-gallery.png` at390×844; `tablet-playlist.png` at820×1180; `landscape-playlist.png` at844×390; `native-window.png` at1120×1148. A360×667 viewport was also visually inspected, without a separate saved screenshot.
- Some responsive/night captures precede the final small navigation-material and corner-decoration adjustments; final desktop and native-window captures include those adjustments.

## Findings and iteration history

No remaining actionable P0/P1/P2 issue was observed in the inspected local states within the brighter-art adaptation scope. This does not classify the result as a literal1:1 scene reproduction or predict user approval.

| Earlier finding | Severity / impact | Change | Post-fix evidence |
|---|---|---|---|
| Large rectangular shelf dominated the garden; thin regular frames and repeated tiny foliage diverged visibly from ref | P1 art/composition | Removed enclosing shelf box, introduced compact wood ledge, transparent carved album frames, layered selected-cover leaves | before/after, full comparison, desktop-music |
| Sign floated above the stall and typography lacked the handwritten character | P1 hierarchy | New rope-hung honeywood sign over awning; live Dancing Script title, small legible kicker | comparison-sign, native-window |
| Player was too tall with scattered progress and controls | P2 proportions | Organic carved rim; desktop record/progress group left, controls centered, queue/volume right; responsive sheet retained | comparison-player, mobile and landscape playlist |
| Navigation undersized and inactive surfaces looked like glass rather than wooden plaques | P2 material/scale |217px desktop tabs at wide breakpoint, textured wood inactive plaques, cream active paper, carved shared rim | comparison-navigation, desktop-music |
| Letter and gallery lacked sufficient botanical edge decoration | P2 art fidelity | True-alpha daisy bouquet/twine tag on letter; asymmetric ivy corners and handwritten paper label on gallery; wood backer and shadows | comparison-story, comparison-gallery, mobile-story/gallery |
| Narrow portrait desktop inherited cramped landscape geometry; host head crowded logo | P2 responsive layout | Aspect-ratio-specific full-width lower music group; portrait sign and host positions adjusted | native-window; tablet-playlist |
| Mobile queue button wrapped; small sheet needed protected transport | P2 interaction/layout | Single-line label and existing fixed sheet controls; final-row scroll inspection | mobile-music, mobile-playlist-bottom, landscape-playlist |
| Loaded host image could hang entrance while optional decode promise remained pending after viewport change | P1 entry reliability | Bound decode optimization to750ms; retain load/error gate; regression for unresolved decode |43/43 tests, successful subsequent entrance/reloads |

Prior first-pass fixes and their evidence (modal navigation, transparent backgrounds, landscape bounds, inert reset, overflow and catalog audit) are preserved in `fresh/checkpoints/2026-09-18-v2.2-art-before/design-qa.md` and the historical `docs/production/V2.2-REVIEW-2026-09-18.md`. Their functional evidence is separate from the rejected first art assessment.

## Required fidelity surfaces

**Fonts and typography.** Self-hosted Dancing Script600 adds handwritten sign/category/letter/gallery accents; licensed font and OFL included. Georgia remains the readable serif for longer text and track names; GardenSans supports small metadata. Vietnamese marks are live text. Long album title wraps, playlist rows remain legible, full accessible names are retained where shelf labels clamp. Decorative imagery does not bake in required interface text.

**Spacing and layout.** Selected record is dominant, neighboring covers smaller; a thin ledge connects the record group to the compact player. Navigation, sign and console now have materially closer proportions to reference. Frame padding keeps foliage out of text areas. Desktop side ledger becomes an overlay at narrower widths and an independent sheet on phones. Gallery uses three desktop columns, two mobile; actual images retain their aspect ratios. Letter and gallery scroll real content instead of shrinking it into the reference's short note/collage.

**Colors and tokens.** Honey wood, brass, cream and olive follow user steering. Background alpha/blur is separate from fully opaque text. Strong content ink is #51391f. Theoretical conservative black-backdrop calculations for the selected paper/text pairs yield5.48:1 player,6.15:1 ledger,6.21:1 profile; `contrast.json` records the assumptions. These numbers are not a whole-app WCAG claim. Actual day/night and mobile text were visually inspected. Reduced-transparency and unsupported-backdrop fallbacks remain.

**Image quality and art.** Five new true-alpha raster assets provide organic carved wood, transparent record aperture, hanging sign, bouquet and leafy corners; optimized WebP is served, source PNGs retained. Album frame uses9-slice borders to preserve cover area. Leaf/bouquet shapes and shadows were inspected for matte artifacts and text overlap. Existing world, host, covers and portfolio works are unchanged. Phosphor remains the coherent standard icon set. No full-screen mockup replaces the working UI.

**Copy and content.** Real catalog, titles, durations and portfolio copy are unchanged in this art iteration. All data hashes and existing asset hashes match the before-art checkpoint. There are26 albums/213 tracks and171 gallery images/18 videos from the earlier canonical content audit. No fabricated ref albums or quotes substituted for real work. Unavailable/empty states retain explanatory copy; no invented lyrics or weather data.

**Affordances and accessibility.** Active tab/record state, readable close/play/queue controls, keyboard labels and focus treatment retained. One native audio element persists; no autoplay. Music controls remain visible in the bottom of phone sheets. Reduced motion and inert behavior are preserved. Full assistive-technology/200% text zoom certification is outside this check.

## Interaction and preservation evidence

-43/43 automated tests passed (`regression.txt`), including unresolved image-decode regression.
- Browser explicit Play advanced real audio to8.25s; Next selected the next real track and duration; Pause worked. One native audio element observed.
- Quick picker selected the longest album title; header wrapped to two lines, body remained scrollable.
-390×844 sheet scrolled to its last row: last row bottom734.8, transport top739/bottom835, body width390.
-844×390 landscape: sheet x10/y8/824×372; transport y287–361 remained in viewport.
- Profile/gallery transitions, actual imagery, mobile crops, day/night ink and tall desktop host/logo separation inspected.
- Final browser error/warn log: none. Preview left paused with playlist open; temporary viewport override reset.
- `preservation.json`:539 baseline files,547 final files;4 pre-existing runtime files changed,8 new files, no removals, all prior data/art hashes identical.

## Expected differences and remaining review

The existing garden composition, host, real album art and actual portfolio content intentionally remain. Ref material language is adapted into the brighter world and lighter translucent paper requested by the user. Letter/gallery density reflects real content. Residual P3 art judgment includes botanical density and the precise warmth/carving compared with the illustrative reference; the user can judge these from full and focused comparisons. No claim of exact visual equivalence is made.

Physical iPhone/Safari, lock screen, app switching, Bluetooth, slow network and thermal/battery QA remain unverified. Desktop viewport tests cannot establish those outcomes. User approval is still required before any live step.

## Implementation checklist

- [x] Save exact before-art checkpoint and preserve unrelated changes.
- [x] Replace art assets and adjust key proportions/materials.
- [x] Compare full view and six focused regions, fix observed P1/P2 findings.
- [x] Inspect responsive/day/night/readability and real playback states.
- [x] Pass regression suite and preserve real data/old assets by checksum.
- [x] Prepare local review report and frozen runtime receipt.
- [ ] User art approval and physical-device acceptance before live.
