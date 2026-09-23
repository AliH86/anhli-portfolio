# Fresh V2 — final visual review, 17 September 2026

Local preview: http://127.0.0.1:8791/ . Runtime: `fresh/dist/`.
This follows the user's “mostly ổn” feedback. It is ready for the requested final review; it is **not yet approved for going on air or deployed**. No commit, merge or push. Existing unrelated dirty work remains untouched.

## Changes

1. **Actual night paintings.** Generated relighting edits of both original paintings, preserving composition and object placement. Warm local lantern/house light, dark foliage, cool distant sky and water. Day and night plates crossfade over 1.8 seconds in the existing far/middle/near masks. Removed the blanket darkening filter and night overlay. Original day paintings and all masks are preserved. Canopy and planted sprigs still move independently.
2. **Animal exits.** Flying visitors enter and leave beyond the scene clipping boundary at full opacity. Bats make one continuous pass. Crickets move along the ground. Fireflies are grouped loosely by pond/low plants, approach from the nearby right edge, follow different small local paths and leave beyond the frame. Their light pulses; their whole body no longer fades out. Existing approved animal drawings preserved. Sparse randomized scheduling and sparrow pairs/occasional trios remain.
3. **Daily message from the original deck.** User confirmed using **all 78 existing cards**, correcting the earlier reference to 72. Heading is “Thông điệp ngẫu nhiên hôm nay cho bạn”. Removed the made-up mini message bank. The invitation opens a compact reading with the original card artwork, stable name, Nở/Khép state and original verbatim message. Uses the same local date, `anhli_garden_device`, hash, RNG and draw order as the original Oracle, presenting its first card. Reopening/reloading on the same browser/day gives the same result. A new local day recalculates it. Only the selected image loads. Storage unavailable: stable for the current page; persistence across a reload cannot be guaranteed. Ordinary quotes/tips remain random.
4. **Gallery pins and hearts.** Compact 5/4/2-column responsive masonry-style layout respects native image ratios. Image opens into a large pin view with previous/next navigation and heart toggle. Hearts persist per image ID in localStorage, with no invented public counts or backend/social sharing. Source images and metadata unchanged.
5. **Video location.** Existing 18 videos are in **Điều để dành → Video**, now a clearer labeled tab with play icon. Tested list and selection. Vimeo's external iframe remained blank in the test browser; playable external content is not certified. A prominent provider link appears above the iframe, and its height is capped, so the fallback remains reachable. No new video assets, uploads or hosting were introduced.
6. **Record restored.** The overlay had been approximately a small label rather than the whole record. It now spans the painted platter (108 source pixels portrait / 70 landscape), has visible grooves/label/light reflection, and rotates only while native music plays. Explicit CSS custom-property setting fixes platter foreshortening. Pausing pauses the record at its current angle. Reduced motion still takes precedence.

## Artwork and prompts

Built-in `image_gen.imagegen` used, no fallback CLI.
- `fresh/source-art/night/garden-desktop-night.png`
- `fresh/source-art/night/garden-mobile-night.png`
- Exact prompts: `fresh/source-art/night/prompts.json`
- Runtime `fresh/dist/assets/garden-desktop-night.webp` (292,920 bytes) and `garden-mobile-night.webp` (304,282 bytes).
- Existing Oracle artwork copied into `fresh/dist/assets/oracle/`; export is reproducible via `node fresh/scripts/build-daily-message.mjs`. It reads `garden-oracle-data.js`, `garden-oracle-profiles.js`, `garden-oracle-identities.js`, without altering them. Source hashes included in `fresh/dist/data/daily-messages.json`.

## Verification

`node --test fresh/scripts/test-polish.mjs fresh/scripts/test-garden-life.mjs fresh/scripts/test-wildlife.mjs fresh/scripts/test-final-review.mjs`

**26/26 pass**, including 300 comparisons against the legacy Oracle draw, content fidelity for all 78 cards, same-day reload, midnight change, blocked storage, transient fetch retry, no-fade boundary exits, music continuity and previous ambient/player cases.

Browser checks: desktop, 390×844 mobile, 820×1180 tablet and 844×390 landscape. Checked actual night plate opacity/loading, no horizontal overflow, gallery pin expansion, heart toggle/reload persistence, daily message artwork and same content after reload, record animation running while music time progresses and paused when audio pauses. The temporary test heart was removed. Screenshots and evidence: `fresh/qa/final-review-2026-09-17/`.

Original scenic/host/wildlife art and existing catalog/profile/gallery/video JSON retain their previous SHA-256 hashes. All 11 new/changed entry URLs checked returned HTTP 200. Current runtime manifest and before copies are saved with QA. Review snapshot: `fresh/checkpoints/2026-09-17-final-review/site.zip`.

## Review/release boundary

The user requested one final look before the next on-air step. Do not describe this revision as approved or deployed. Physical-device background audio and lock-screen behavior are still not certified. Public audio URLs and UI-only download deterrents are unchanged; private streaming protection remains unimplemented. The original full three-card Oracle route and synthesis engine are unchanged.
