# CURRENT · V2.2 finish pass live · 18 September 2026

User resumed after the laptop pause. Finish pass is now live at https://alih86.github.io/anhli-portfolio/?v=22-garden2 , commit `d058ee25f2803d2d6d1562defbf928b769c165c3`. Pages build succeeded; 13 live resource hashes match. Live laptop sign and phone playlist smoke passed. 50 automated tests passed after resume; physical iPhone Safari retest remains pending.

Read `docs/production/V2.2-FINISH-2026-09-18.md` for final scope, evidence and release boundary. Source remains `fresh/dist/`; final package is `../website-releases/2026-09-18-v2.2-finish/`. Preserve unrelated development work. The paused/local status and older release entries below are historical, superseded by this entry. Next work should follow concrete user feedback on this live version.

---

## 2026-09-18 — PAUSED by user, V2.2 finish pass remains local

User is closing the laptop. Do not continue until they resume. Exact checkpoint: `fresh/checkpoints/2026-09-18-v2.2-paused-finish/`. Read `docs/production/V2.2-PAUSED-FINISH-2026-09-18.md` first. Latest laptop sign-animation fix is not yet rechecked; 50 tests passed before that last edit. Live is still `198184e`, not this local finish pass.

---

# CURRENT · V2.2 iPhone hotfix live · 18 September 2026

User physical-iPhone screenshots exposed overlapping garden labels/note and a blank music layer after V2.2 release. Targeted repair is now live at https://alih86.github.io/anhli-portfolio/?v=22-iphone1 , commit `198184ebc1bfd7ce44bc93a9859308a666b01712`. Pages build succeeded;6 live entry/code/style/catalog hashes match. **Physical Safari retest remains pending; do not claim it is verified from Chromium viewport QA.**

Read `docs/production/V2.2-IPHONE-HOTFIX-2026-09-18.md`. Music now has explicit visual viewport geometry, an inset playlist with independent scrolling and fixed transport, no mobile dialog fade dependency, and dimensions assigned before showModal. Compact garden note and measured mini-player/navigation spacing remove overlaps; duplicate large scenic labels hidden on phones while object hotspots remain.548 runtime files; only app.js/index.html changed and garden-mobile.css added; original art/catalog unchanged.43 automated checks, local flow/scroll/resize/audio checks and live394×710 playlist smoke passed.

Source: `fresh/dist/`. Clean release: `../portfolio-garden-v22-iphone-hotfix-2026-09-18/`. Package/publication/evidence: `../website-releases/2026-09-18-v2.2-iphone-hotfix/`. Previous version: `d00e69a`; before-hotfix checkpoint saved. Preserve mixed development work. Next: user's physical Safari retest, then concrete fixes if necessary.

---

# CURRENT · V2.2 live · 18 September 2026

User approved the revised art and explicitly requested publication. **V2.2 is live** at https://alih86.github.io/anhli-portfolio/?v=22-art2 . Release `d00e69a94d2c91d763ce4eff8e025417524ef343`; GitHub Pages build succeeded;56 live resources match release SHA-256.547 runtime files match the approved art checkpoint.43 regression tests and live browser smoke passed: entrance, explicit Play, one native audio, playback after room close, mobile playlist. Physical iPhone checks are now pending the user's testing.

Read `docs/production/V2.2-LIVE-WRAPUP-2026-09-18.md`. Source `fresh/dist/`; clean release worktree `../portfolio-garden-v22-release-2026-09-18/`; evidence `../website-releases/2026-09-18-v2.2/`. Checkpoint acceptance/publication receipts supersede historical pending/no-deploy snapshots below. Preserve mixed development work and wait for concrete iPhone feedback.

---

# CURRENT · V2.2 art review · 18 September 2026

The first art pass was rejected as too far from the references. The revised art/composition is in `fresh/dist/`, for user review at http://127.0.0.1:8792/#music . **Not user-approved; no commit/push/deploy.** Read `docs/production/V2.2-ART-REVIEW-2026-09-18.md` and `design-qa.md` first. The old review below is historical and its broad completion claim is superseded.

New `garden-art.css`, five authored art assets and a self-hosted handwritten font. Smaller physical shelf/player, hanging awning sign, translucent readable paper, bouquet letter and leaf-framed photo board. Real catalog/data and all existing art stay byte-identical to the start of this art round. Small entrance decode-stall fix has regression coverage.43 tests pass; physical-device QA and visual user approval remain outstanding.

Evidence: `fresh/qa/v2.2-art/`. Before: `fresh/checkpoints/2026-09-18-v2.2-art-before/`. Review package: `fresh/checkpoints/2026-09-18-v2.2-art-review/`. Do not rerun the legacy extractor into dist. Keep canonical26 albums/213 tracks,171 photos,18 videos; do not re-add retired ghost metadata.

---

# CURRENT · V2.2 local review · 18 September 2026

V2.2 is implemented in `fresh/dist/` and ready for the user's visual review at http://127.0.0.1:8792/#music . **No commit/push/deploy.** Live V2.1 remains unchanged. Start with `docs/production/V2.2-REVIEW-2026-09-18.md`, `docs/production/V2.2-UI-SYSTEM.md`, and `design-qa.md`.

Latest user direction: lighter honey/cream art; vine/daisy corners with shadows; translucent paper showing blurred garden; text must remain opaque and readable. Shared WebP materials/Phosphor icons, desktop carousel+ledger, dedicated mobile/landscape sheet, letter/profile and memory board are implemented. One native audio is retained.

Pipeline first restored exactly28 albums/226 tracks. Current canonical library proves two ghost albums absent: final26 albums/213 tracks;213 source files and213 network URLs verified. `fresh/content/` is the only publishing source; never rerun legacy extractor into dist. Gallery171/profile/videos18 unchanged.43 regression tests pass. Final package: `fresh/checkpoints/2026-09-18-v2.2-review/`; evidence: `fresh/qa/v2.2/`.

Physical iPhone Safari/keyboard, lock-screen/background playback, heat/battery and slow-network QA remain unverified. Lyrics production index stays empty; time/weather/host/new-zone hooks are ready, full weather/game/new animation assets intentionally deferred by brief. All unrelated dirty root work preserved. Any release must be from the frozen review checkpoint, only after explicit user live approval.

---

# HISTORICAL · V2.1 hotfix live · 18 September 2026

Live: https://alih86.github.io/anhli-portfolio/ . Commit `33f1c0c1f4e968781a4c2674797363d1b332059e`; Pages build succeeded; 18 live resources match checksums. Source remains `fresh/dist/` (507 files), now matching `fresh/checkpoints/2026-09-18-v2.1-mobile-hotfix/hashes.json`.

User reports came from iPhone 13 Pro Safari and Chrome laptop. Fixed native vertical scrolling in phone deck and all playlists; simplified HUD to a ⋯ disclosure, with native audio continuing through close/reopen. Added short doorbell; corrected logo focus and lowered host balloon. Mobile scenery/wildlife/wind stop under open trays; persistent ✦ motion controls remain available inside the HUD, plus a gentle host tip. Canopy now uses pre-baked native alpha. Album shelf has larger art and a wood lip. Lyrics/karaoke remain deferred.

Start with the consolidated `docs/production/V2.1-LIVE-WRAPUP-2026-09-18.md` (updated through the hotfix); implementation details remain in `docs/production/V2.1-MOBILE-HOTFIX-2026-09-18.md`. Clean release worktree: `../portfolio-garden-hotfix-2026-09-18/`; package and live receipts: `../website-releases/2026-09-18-v2.1-hotfix/`. 36 unit checks, seven Chrome/WebKit responsive scenarios, the close/reopen flow, release-prefix smoke and real live-site smoke passed. WebKit checks are desktop responsive tests, NOT physical iOS; phone heat/battery and real background/lock-screen playback still require the user's device. User has no tablet or Android.

---

# HISTORICAL · V2.1 live · 18 September 2026

The user explicitly authorized publication of the accepted V2.1 and deferred wording refinements and karaoke/lyrics to V2.2. Live: https://alih86.github.io/anhli-portfolio/ . Commit `3b80fa7d4159cb4b5e75c3877aba97047da7940d` is on main; Pages deployment succeeded. 17 deployed resources match release checksums. Real-site desktop/mobile viewport smoke passed, including no autoplay, R2 music continuing after tray close, one native player, day/night ambience, profile and gallery. This is not physical-device background/lock-screen certification.

Read `docs/production/V2.1-LIVE-WRAPUP-2026-09-18.md`. Clean release worktree: `../portfolio-garden-release-2026-09-18/`; release package/evidence: `../website-releases/2026-09-18-v2.1/`. Source checkpoint remains `fresh/checkpoints/2026-09-18-v2.1-review/`; 506 runtime hashes match. Lyrics index is empty and no karaoke is displayed. V1/V2 archives and unrelated development work remain intact. Continue V2.2 from this live baseline.

---

# HISTORICAL · V2.1 four-point review follow-up · 18 September 2026

## User acceptance · 18 September 2026

Ali confirmed: “ok, còn lại là wording, còn lại ổn nha”. The current V2.1 visuals, layout, motion, ambience and interaction are accepted, including all four review refinements. Remaining work is **wording only**. All 506 runtime files still match `fresh/checkpoints/2026-09-18-v2.1-review/hashes.json`; the reviewed archive is unchanged. Approval receipt: `fresh/checkpoints/2026-09-18-v2.1-review/acceptance.json`. No runtime copy was changed in this acknowledgment, and no publication was performed.

Ali accepted the rest of V2.1; four targeted refinements are complete locally: full host quotes without truncation (outside the scenery mask), more visible traveling gusts, continuous opt-in birds/crickets loops with soft joins, and two related music HUD groups (album + Li introduction; playlist + transport alongside). Runtime: `fresh/dist/`. Preview: http://127.0.0.1:8791/ . No commit/push/deploy.

Read the 18 September section at the top of `docs/production/V2.1-LOCAL-WRAPUP-2026-09-17.md`. Evidence: `fresh/qa/v2.1-review-2026-09-18/`; checkpoint: `fresh/checkpoints/2026-09-18-v2.1-review/`. 36 regression checks, 12 browser scenarios, five focused viewport checks and a real two-cycle ambience test passed; actual R2 playback sampled at three viewport sizes. Existing content/assets and the single native player are preserved. Physical-device background playback still requires device QA. The four follow-up changes are now accepted; only wording remains.

---

# HISTORICAL · V2.1 local implementation · 17 September 2026

V2.1 is implemented in `fresh/dist/` under the user’s explicit autonomous-build brief. Preview: http://127.0.0.1:8791/ . **No commit, push or deployment.** Read `docs/production/V2.1-LOCAL-WRAPUP-2026-09-17.md` and the copied `V2.1-USER-BRIEF-2026-09-17.md`.

Latest user direction: the playlist is a **continuous vertical dropdown, with one horizontal row per song**, not separate horizontal song cards. The host has reserved visible space; mobile lower-deck scrolling must not move UI over Li. Research and interaction details: `V2.1-MENU-RESEARCH-2026-09-17.md`.

33 checks and 12 browser scenarios pass; real R2 audio playback was sampled separately. Lyrics infrastructure is ready but the real lyrics index is empty pending author-supplied lyrics/timing. Physical mobile background playback and external video playback remain unverified. Catalog/gallery/profile/video/daily content is preserved. Final local checkpoint: `fresh/checkpoints/2026-09-17-v2.1-local/`. The last verified live release is V2 `64f76b3`, and its separate release worktree was left clean. Visual approval has not been claimed.

The autonomous V2.1 brief supersedes the previous “defer edits” instruction below. Older entries are historical records; retain them.

---

# HISTORICAL · Live wrap-up; improvements deferred · 17 September 2026

Ali says the live version is acceptable for now, with a few points to revise next session. **No further runtime edits this session.** Exact new feedback is not yet itemized; do not invent a confirmed bug list.

Read `docs/production/V2-LIVE-WRAPUP-2026-09-17.md` for the consolidated handoff, verified v1–v2 comparison, limits and prioritized suggestions. Those suggestions are not authorization to implement them automatically. Live remains `64f76b3` at https://alih86.github.io/anhli-portfolio/ . Runtime snapshot and v1 archive remain intact; reference: `fresh/checkpoints/2026-09-17-live-wrapup/checkpoint.json`.

The entries below preserve earlier work. The live release and this wrap-up take precedence over earlier pending-publication instructions.

---

# HISTORICAL · LIVE · 17 September 2026

**Live:** https://alih86.github.io/anhli-portfolio/ · release commit `64f76b313c67d6345cae48eaa87f66a244bce07b`. Ali explicitly authorized direct publication after the prior handoff; that instruction superseded the double-click checkpoint for this release. Push succeeded; GitHub Pages build/deploy succeeded: https://github.com/AliH86/anhli-portfolio/actions/runs/35208057344 .

Five live resource hashes match the release. Browser smoke verified real audio playback, no album-selection autoplay, a single audio element, continued playback after closing the tray, and the rotating record. No broken loaded images or captured console errors. Test playback was paused; live tab retained. Receipts: `../website-releases/2026-09-17/live-receipt.json` and `release-receipt.json`; screenshot: `fresh/qa/release-2026-09-17/live-garden.png`.

V1 remains intact at `../website-archives/2026-09-17-v1-before-garden/`; archives were checksum/CRC checked and the complete Git bundle verified again immediately before publication. No additional audio downloads. One-time deployment helper was archived after successful verification. Development checkout and release worktree remain separate; do not merge the mixed development workspace wholesale. The earlier preparation notes below are historical.

---

# HISTORICAL · V2 ready for publication · 17 September 2026

Ali approved the new look and publication. Final Vietnamese profile, interactive dandelion loading, full 78-card daily message, generated night scenery and accepted wildlife/gallery/player polish are in `fresh/dist/`. **31 checks pass.** See `fresh/qa/release-2026-09-17/`.

A clean release worktree was committed at `64f76b313c67d6345cae48eaa87f66a244bce07b`, branch `codex/garden-v2-release-2026-09-17`, in `../portfolio-garden-release-2026-09-17/`. No push yet. Per the repository's explicit double-click checkpoint, Ali runs `../website-releases/2026-09-17/01-LEN-AO-MOI.command`. It checks clean state and expected main, pulls then pushes, and verifies Pages. Read `../website-releases/2026-09-17/ĐỌC-TRƯỚC.md`. Do not report live without `live-receipt.json` passing or direct verification.

V1 and all pre-release local work are preserved in `../website-archives/2026-09-17-v1-before-garden/`. Ali says music already exists locally: do not download more. An earlier supplementary download completed before that message; it is labeled as a duplicate, not the primary music archive. No original local audio was altered.

Keep the development checkout's mixed uncommitted work untouched. New release runtime uses root `index.html` plus `garden-v2/`; old v1 assets remain in Git. Further runtime changes require a new release commit and updated helper SHA. The entries below are historical.

---

# Vườn của Li — fresh V2

Local independent build, 17 September 2026. User accepted the current refinement as the continuation baseline and requested wrap-up. Snapshot: `checkpoints/2026-09-17-accepted-refinement/site.zip` plus SHA-256 manifest. Next-step brief: `../docs/production/V2-FRESH-REFINEMENT-WRAPUP-2026-09-17.md`. Preview: http://127.0.0.1:8791/

## Current final review — 17 September 2026

Latest handoff: `../docs/production/V2-FRESH-FINAL-REVIEW-2026-09-17.md`. Actual relit night paintings, natural off-frame wildlife exits, daily message from all 78 approved cards (same date/device draw as Oracle), compact gallery pins with browser-local hearts, visible video source links and corrected spinning record. Awaiting the user's final visual approval; no deployment. Night originals and exact imagegen prompts: `source-art/night/`. Evidence: `qa/final-review-2026-09-17/`. Review checkpoint: `checkpoints/2026-09-17-final-review/site.zip`. Run `node --test scripts/test-polish.mjs scripts/test-garden-life.mjs scripts/test-wildlife.mjs scripts/test-final-review.mjs` (26 checks).

## Previous local wildlife and dialogue — 17 September 2026

Latest handoff: `../docs/production/V2-FRESH-WILDLIFE-WRAPUP-2026-09-17.md`. Fixes detached shoe grass and duplicated edge foliage; uses icon-only day/night/auto and ambience controls, exact 05:30–17:30 day hours, album-specific Li dialogue, occasional tips/messages, eight illustrated sprite species with mapped habitats and randomized small-group visits. The user accepted the animal drawings and requested more restrained, place-specific behavior. Source artwork/prompts: `source-art/wildlife/`; runtime sprites: `dist/assets/wildlife/`; evidence: `qa/wildlife-2026-09-17/`. Run `node --test scripts/test-polish.mjs scripts/test-garden-life.mjs scripts/test-wildlife.mjs` (22 checks).

## Previous local living garden — 17 September 2026

Latest follow-up: `../docs/production/V2-FRESH-LIVING-GARDEN-WRAPUP-2026-09-17.md`. Includes corrected header order, house/listening host placement, dialogue balloons, layered scene masks, independently moving foliage/canopy, local clock/day-night lighting, birds/owl and opt-in sparse ambience. The user explicitly requested day/night and sound in this follow-up. Originals and selected imagegen prompts live in `source-art/living-garden/`; QA lives in `qa/living-garden-2026-09-17/`. Run both suites with `node --test scripts/test-polish.mjs scripts/test-garden-life.mjs` (17 checks). Physical-device background playback and private audio delivery are still not completed or certified.

## Previous local polish — 17 September 2026

The accepted checkpoint above is preserved. The current `dist/` includes a subsequent polish pass, not yet user-approved or deployed. Read `../docs/production/V2-FRESH-POLISH-WRAPUP-2026-09-17.md` and `qa/polish-2026-09-17/` for changes, screenshots, and verification limits. Existing art and all data snapshots remain unchanged; no new raster assets or dependencies were added.

Copy now reads “Ghé vườn nhà Li chơi chút nha. Nghe vài bài hát Li sáng tác.” The player now supports Media Session metadata/actions and requests the playback audio category where supported. Hiding the page does not pause audio. Physical phone/tablet background playback and lock-screen controls remain unverified; browser/OS interruptions cannot be overridden reliably. `controlslist="nodownload"` and the audio-only context-menu suppression are UI deterrents, not file protection. Existing R2 audio URLs are still public; no storage permissions were changed.

Run regression checks with Node: `node --test scripts/test-polish.mjs` (11 tests). This covers async view cancellation, player continuity, Media Session handlers and visibility behavior with deterministic mocks; it does not substitute for real-device tests.

## Run

From this folder: `python3 -m http.server 8791 --bind 127.0.0.1 --directory dist`

Serve over HTTP; opening index.html through file:// will prevent JSON loading. The complete deployable static application is in `dist/`. No package installation, build step, WebGL engine or V1 runtime is required to run it. Hosting configuration is prepared, but this build has not been published.

## Experience

One garden with music stall, profile/résumé and gallery. No scrolling on the garden itself. Content drawers scroll internally. Portrait screens use a separate scenic composition. Album choice places the artwork on the record player, without loading or playing audio. Play is explicit. One native audio element handles playback, pause, seek, mute and next track; playback continues when the drawer closes. Changing albums or choosing a track stops the previous audio and waits for Play.

The scene uses newly generated raster artwork with depth already painted into it. The host has idle, seated-listening and gallery-viewing gesture loops. Scene-native scaling, static warm color grading, soft ground/cast shadows and small foreground grass help ground the character. These are sparse sprite frames, not walking or full skeletal animation. The record responds to actual playback. Two foreground foliage clusters sway gently; a small feathered patch moves over the water. Reduced motion, a manual motion switch and hidden-tab pausing limit decorative work. Host/foliage/water also pause behind open glass trays to limit backdrop recompositing. No continuous video, physics, shaders or real-time 3D rendering runs in the browser.

## Refinement interaction

Music opens as a compact bottom glass tray. The `Bìa lớn / Gọn` switch changes cover/spacing and tray size without resetting audio; its choice lasts for the page session. Album selection has a short entry transition and a cover-to-platter flight, disabled by reduced motion. The record is a small centered label instead of an oversized album image.

The house, stall and gallery board themselves are large click targets. Small labels preserve discoverability. A light outline draws on hover or keyboard focus; touch users can tap the object or bottom navigation. Warm glass uses only 8px desktop / 5px mobile blur, with opaque reduced-transparency fallback. No full-screen blur or WebGL shader is added.

`Chuyện của Li` holds the short profile and expandable résumé. `Những điều để dành` holds photos and source videos. Existing catalog/gallery/profile data snapshots remain byte-for-byte unchanged.

## Content and provenance

- New frontend, player, gallery viewer, scenery and host. No old runtime imported.
- 28 unique album IDs, 226 track entries, 213 audio URLs mapped to the existing external R2 store. Thirteen entries lack a mapped URL and are disabled with an explicit label. This does not establish that the files are absent from storage.
- Music metadata was extracted once from local source and fetched origin/main; remote album metadata was preferred, local-only audio mappings retained. Details in `qa/content-receipt.json`. Current JSON is a snapshot, not automatic synchronization.
- 171 original gallery images were converted into local thumbnails/full-size WebP. Eighteen original video links are included in a new video tab. At most one external iframe is mounted, only after selecting a video; opening it pauses music, and closing the tray removes it. No old gallery implementation ships.
- Résumé facts and email came from existing personal content; presentation and intro copy are new. Confirm factual currency before publishing.
- `source-art/` preserves original generated PNG artwork and the accepted RGBA pose/foliage additions. `generation-prompts-refinement.txt` records the built-in imagegen prompts and transparency repair provenance. Optimized WebP runtime versions are under `dist/assets/`. These are generated images, not UE5/Twinmotion renders or editable 3D scenes.
- `scripts/prepare-content.mjs` rebuilds data and gallery assets from parent-repository sources and current fetched origin/main. It needs Node and sharp; the current script uses this machine's bundled dependency path. It is not required to run the delivered app.

## Verification and limits

Read `qa/refinement-receipt.json` for the latest pass; `qa/browser-receipt.json` and `qa/static-receipt.json` document the initial build. External Vimeo/YouTube embedded players remained blank in the in-app browser; visible original-provider links are the fallback. Embedded video playback remains unverified. Actual browser playback was observed for Có Ai Nghe Không and Quên Vầng Trăng Thề. All 213 URLs have not been playback-tested. The separate shell network probe returned six 403s; browser playback succeeds, so those shell results alone must not be presented as broken storage.

The final initial file-size budget is recorded in `qa/refinement-receipt.json` (roughly 0.56 MB mobile / 0.65 MB desktop), excluding subsequent content/audio. The seated/gallery atlases load when needed; the same foliage asset is reused twice. This is a file-size budget, not a network timing or CPU benchmark. Gallery assets occupy about 22 MB on disk and load progressively, not on garden entry.

Desktop 1440×900, mobile 390×844 and portrait 889×1150 were visually checked. Physical iPhone/Android heat, battery, slow-network behavior and full browser matrix remain unmeasured. Browser console had no captured errors or warnings during the tested flows. Artwork remains open to user feedback; functional checks do not establish art approval.

No commit, push, merge or deployment. Existing V1/V2 files and unrelated work are retained.
