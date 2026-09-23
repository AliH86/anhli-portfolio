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

# HISTORICAL · User accepted fresh refinement; wrapped up · 17 September 2026
**Wrap-up saved:** `docs/production/V2-FRESH-REFINEMENT-WRAPUP-2026-09-17.md`. Restorable static snapshot: `fresh/checkpoints/2026-09-17-accepted-refinement/site.zip` plus SHA-256 manifest. Next proposal: (1) physical-device experience/performance check, (2) media/content closure including blank embeds and13 unmapped tracks, (3) review release candidate and obtain publication approval. No next-step implementation started during wrap-up.

User approved execution, then steered: add host shadow/color matching/grass, lightweight glass, object hover lighting in place of big label buttons, and album layout options. Implemented in `fresh/dist/` only, plus this handoff. Preview http://127.0.0.1:8791/ . Read `fresh/README.md` and `fresh/qa/refinement-receipt.json`.

Accepted garden background preserved. Host is larger in scene-native coordinates; idle, seated listening and gallery-viewing sprite loops are integrated with actual transparency. Small plant clusters sway; water patch has subtle movement. Disc label centered on platter. Warm color filter, contact/cast shadows and tiny grass blades ground the host. This is lightweight 2.5D raster/CSS, not an actual real-time shader or full walking game.

Big scene labels replaced by object-sized hit zones with small discovery labels; light outline on hover/focus. Keyboard and mobile navigation retained. Bottom music tray has square cover, horizontal album shelf, Bìa lớn/Gọn layout controls, lightweight glass and entry/selection motion. Layout changes preserve music. No audio autoplay from album choice. Profile/résumé and gallery/photo/video compact trays implemented. Names: Vườn của Li / Cái Sạp Nhạc / Chuyện của Li / Những điều để dành.

Built-in imagegen pose generation initially produced baked checkerboard; technical extraction also failed. Accepted final RGBA atlas and foliage are copied under fresh/source-art, optimized atlases under fresh/dist/assets. Prompt provenance saved. No missing runtime art assets. Do not regenerate by default. Original gallery/catalog/profile JSON unchanged;18 original video links extracted. User warmly accepted the current refinement (“quá xá đã”) and requested wrap-up. Preserve this as the continuation baseline; this is not production/device certification.

Verified desktop1440×900/mobile390×844, explicit playback/pause and continued progress across layout switches, return to garden, pose activation, keyboard object opening, motion-off visible content. Source video embeds remained blank in in-app browser; fallback provider links visible, embedded playback not verified. Physical-phone thermal/battery performance remains unmeasured.13 unmapped tracks remain disabled.

No commit, push, merge or deployment. Existing mixed changes untouched; branch was behind6/ahead0 when fetched. Initial refinement backups remain fresh/qa/before-refinement. Preview viewport reset; tab6 retained. Continue from fresh build and current feedback, not historical scenic routes.

---

# HISTORICAL · Fresh V2 built locally · 17 September 2026

Latest user authorization: “portfolio cũng chỉ là 1 phần nằm trong đó ... cái gì ổn thì build.” Build the experience with music central and portfolio secondary. The new authorization supersedes earlier implementation pauses and requirements to retain old UI/player/host. Simplified meaningful animation is acceptable; performance is a priority.

**New independent application: `fresh/dist/`. Preview: http://127.0.0.1:8791/ .** See `fresh/README.md` and `fresh/qa/`. Do not resume old scenic routes by mistake.

Implemented: one garden, new desktop/portrait art, new four-state host, choose/place/explicit Play, one native audio player, in-garden résumé and gallery drawers. 28 albums / 226 tracks / 213 mapped URLs; 13 unmapped disabled honestly. 171 gallery images, all local references exist. No legacy runtime. Metadata is an extracted snapshot; audio stays in separate R2 store. Generated art is raster, not UE/Twinmotion or an editable 3D scene.

Verified locally: actual audio playback and elapsed progress, selection no-autoplay, closing drawer keeps playback, pause, rapid selection, image lightbox/next/Escape, profile and disabled missing links. Desktop1440×900, mobile390×844, portrait889×1150 visual review. Initial file bytes about465KB desktop/371KB mobile. No captured browser console errors. Not a physical-device performance or thermal certification; no full 213-track playback audit. Small host gesture loop and static environment are the current motion scope; richer character/environment motion is not claimed complete. User art acceptance is still open.

Next continuation should start with this build and the user's concrete feedback, then improve it or perform targeted physical-device QA. Preserve existing mixed uncommitted work. No merge, commit, push or deployment occurred. Server was started locally with `python3 -m http.server 8791 --bind 127.0.0.1 --directory dist` from `fresh/`.

---

# NEW AUTHORITATIVE DIRECTION · Fresh independent V2 · 17 September 2026

Read `docs/production/V2-FRESH-BUILD-BRIEF-2026-09-17.md` first. User clarified and selected the experience: one garden in view, a record stall with deliberate choose/place/play actions, profile/résumé and gallery inside the garden. No stage, scroll-led website, entry gate, or multi-scene tour. Wants spatial depth and emotional character/environment animation with real loops; 2.5D is acceptable.

User explicitly permits a fresh build without V1 code/UI/player/art or preservation of old scenic layouts/host assets. Only gallery images carry over by default; music connects to its separate store, with album/track metadata source still to verify. Profile/résumé remains required but must use verified facts and a new presentation. Do not import all legacy content/runtime. Do not delete or overwrite existing sources or mixed uncommitted work.

This supersedes the three unselected alternatives below and all historical keep-old-player/host/geography constraints for the new build. Experience direction is established; new art, stack and implementation are not yet approved or completed. Next: whole-garden desktop/mobile composition plus opened stall, with a small early motion proof before mass asset production. Existing tests do not establish new-build quality.

This turn updates brief/handoff/recap only. Fetch confirms behind6/ahead0; existing music/catalog/index changes preserved. No application edits, merge, commit, push or deployment.

---

# WRAP-UP · Art/experience reassessment · 17 September 2026

## Current authoritative instruction
Anh requests wrap-up, candid evaluation and rebuilding options because the current art and experience feel below average. Implementation is paused. Earlier Garden acceptance and the Shows → Visual → Story continuation below are historical, superseded instructions. Do not continue those destinations or produce new scene/sprite assets until a new direction is selected.

Read `docs/production/V2-WRAPUP-AND-REBUILD-2026-09-17.md` for the assessment and three proposed alternatives. Preferred proposal is an intimate 2.5D room/porch opening onto the garden, with real music, a photo album and a personal notebook; this is NOT a user-selected direction yet.

## Actual local implementation checkpoint
- Source navigation is GARDEN · MUSIC · ABOUT. About combines personal intro, résumé, original gallery (181 items) and video links (18). No individual project showcase pages. Retired works/works-how/visual/story routes redirect to About or its relevant section.
- Shows scene/modules/assets are retained on disk as history but are absent from active route navigation/runtime. Do not resume polishing them.
- Garden/Music scenic work and real shared music player remain. Host is still one pose: multi-gesture sprite loops have not been built. Keep the original monochrome identity. Scenery/layout review must precede finished effects and sprite production.
- About source: js/redesign/{about-view,about-media,legacy-about}.mjs, css/about.css, content/view/shell and scripts/build-redesign.mjs. legacy-about.mjs is generated from legacy source arrays, not hand-edited data.
- The About merge was implemented before this wrap-up but its handoff had not been saved. This header corrects that gap.

## Verification scope
Sep14 About receipt: 10 checks passed, errors empty, 3 viewport sizes; external embeds used fixtures, not verified third-party playback. Preservation receipt: 13 Garden/host/audio files unchanged during About work. These tests were not rerun on Sep17. Gallery mobile screenshot contains blank tiles; image-level visual QA is incomplete and the cause has not been diagnosed. Physical device performance is unverified.

Sep17 wrap-up read current source and inspected saved Garden/Music/About screenshots. Garden/Music screenshots retain the old five-item navigation; current three-item navigation is verified from source and the later About capture. Local HTTP preview was restarted and returns200 at127.0.0.1:8784, but in-app tab navigation remained on a connection-error document. Do not claim a successful fresh live visual review.

Git fetched Sep17: local codex/garden-experience-v2 is behind origin/main by6, ahead0. Read remote six-commit log (music/font changes), no merge. Existing mixed audio/catalog/index/UI changes preserved. This wrap-up edits project documentation only; no app code/art changes, commit, push or deployment.

## Next
Discuss/select among the three rebuilding approaches in the linked document. Then prove one desktop and one mobile composition using real content before expanding implementation. Retain player/catalog, original media/résumé and host source; rebuild visual hierarchy and meaningful interaction. Do not treat passing functional tests as visual acceptance.

---

# SHOWS static scenery + host animation requirement · 14 September 2026

## Latest direct instruction
Anh asked to recheck v2 checkpoint and continue, emphasizing 2.5D: finish all context/layout/scenery before animation effects; host needs multiple gestures AND sprite animated loops. See `docs/production/SCENIC-AND-HOST-SEQUENCE-2026-09-14.md` for mandatory acceptance and proposed gesture clips. New host artwork/atlas/loops have NOT been produced. Preserve approved monochrome identity, glasses, clothing, scale/grounding. Existing one-pose host is an interim state. SHOWS remains without host.

## Completed in this continuation
- Checked actual checkout, fetched origin/main and inspected six remote commits; local branch codex/garden-experience-v2 at5eacde1 remains behind origin/main487e4fd by6. Prior mixed catalog/audio/index/UI changes remain; no merge/commit/push/deploy.
- Garden already approved per the preceding handoff. MUSIC is near-final and still open to visual feedback. Latest “continue” authorizes the next scenery work; it is not recorded as automatic visual approval of MUSIC/SHOWS.
- Built SHOWS on actual local `/works/`: same-world afternoon timber stage, cottage/greenhouse/planting, two native generated compositions (1672×941 desktop,941×1672 portrait). No host or event-client imagery. Preserved three work categories, NDA/contact and method route; replaced six decorative blank moment tiles with the scenic view and honest project-material note.
- Added `js/redesign/shows-{view,scene}.mjs`, `css/shows-scene.css`; small hooks in view/shell and stylesheet in index; generated8routes. Lazy responsive art, static/no loop, route hide/resume, readable image-error fallback. Existing real audio survives navigation. PNGs are about3.14MB/2.92MB; web compression still pending.
- Route regression reproduced historical Oracle race: async identities could execute before cards/profiles. Changed three Oracle script tags in index to ordered defer and rebuilt routes. Weekly stays async; Oracle source content/meanings untouched. Deterministic800ms delay tests reproduce0identities+error before and78identities+no errors after.
- 32 protected files and13Garden-lock files hash-identical. Garden/Music scene code, CSS, source artwork and audio data unchanged.

## Evidence and review
Preview: http://127.0.0.1:8784/works/ . One new in-app preview was opened only after inventory showed no remaining localhost preview tabs, and marked deliverable. Reuse it.

`docs/qa/shows-2026-09-14/`:
- `acceptance-receipt.json`:12/12SHOWS checks, five viewports320×568,390×844,768×1024,844×390,1440×900; real player, back/reload, no-JS, reduced motion, lazy art and image failure.
- `regression-final/ui-receipt.json`:13/13full-site checks after ordered-defer fix, including8direct routes, real audio26albums, MAP, keyboard/lightbox/Sky, mobile, fallback and no page errors.
- `oracle-before.json` / `oracle-startup.json`: two intentionally delayed dependency cases before/after fix.
- `preservation-receipt.json`:32+13checks, no changed protected files.
- `shows-1440x900.png`, `shows-390x844.png`, full-page versions and3other viewport captures. Inspected desktop/portrait/full layout plus visible in-app preview. Device scope is Chrome emulation; no physical-phone performance/battery test.
- Earlier `regression/` retains the failed concurrent pre-fix run (Oracle race and a transient readiness timeout); final sequential run above is authoritative. No test failure was hidden or removed.

## Next exact work
1. Review the SHOWS static composition in the same Garden/Music family; refine only if feedback identifies a mismatch. Static art acceptance remains user-owned; tests do not approve aesthetics.
2. Continue VISUAL: same existing greenhouse/daylight, work-in-progress mood, real personal fragments/lightbox, light host presence; separate desktop/portrait composition. Then STORY: personal porch/evening scene, existing chapters/InnerWorld and subtle family traces. Keep real content and navigation.
3. Only after ALL backgrounds/layout/scenery are completed and reviewed, build selective effects plus real multi-gesture host source frames/atlas/runtime. Include idle/blink, welcome/invitation and context clips, clean first/last loop, grounded foot anchor, no character identity drift, lazy atlas, pause/off-route/hidden and reduced-motion static fallback. Do not substitute one-pose CSS sway for sprite animation.
4. Web image compression, physical-device profiling, Flat/accessibility and release-content checks remain. This pass fixes the Oracle load-order bug only, not blanket release readiness.

No usage stop was encountered; last live usage27%five-hour/4%weekly. Recheck next sustained continuation and honor95%save/handoff rule. No reset credit used.

---

# MUSIC near-final review checkpoint · 14 September 2026

## Authoritative continuation
The user's CONTINUATION NOTE after14Sep now approves Garden as the technical/visual baseline. It supersedes earlier “Garden approval pending” notes. Lock SCENIC2.5D WORLD + limited depth + unchanged illustrated host + selective effects + simple spatial navigation. Goal: simple, polished, personal, memorable; SEE → CHOOSE → ENTER → VIEW → RETURN. No free camera, no stronger Garden parallax/wind, no new low-poly world, no mass production of destination states. Navigation remains GARDEN · MUSIC · SHOWS · VISUAL · STORY. No JOURNEY destination. Family V1 is subtle objects/traces only, never a character/navigation system.

Order: Garden locked → MUSIC near-final → Garden/MUSIC review → SHOWS → VISUAL → STORY → Flat/mobile/performance/accessibility/release. Do not pass the MUSIC review gate without user acceptance. SHOWS work-led/minimal host; VISUAL quiet creative process/light host; STORY personal/memory/InnerWorld/current host. No commit/push/deploy authorized.

## Completed now
1. Saved Garden/source/audio hashes in docs/production/GARDEN-LOCK-2026-09-14/baseline.json.13 protected files all unchanged after MUSIC work; receipt under docs/qa/music-2026-09-14/baseline-preservation.json. Garden CSS, art, canopy/wind/parallax, calibrated host and audio data remain frozen.
2. Built MUSIC only, on actual local /sap/ route. Same cottage/greenhouse/garden and existing timber/cream-canvas record-stall language, photographed closer at quiet blue hour with warm practical light. Two new built-in imagegen desktop1672×941 and portrait941×1672 plates. No new universe, no fantasy music elements. The real album covers remain in the actual player; scenic record sleeves are illustrative artwork only.
3. Reused original host RGB+mask, no redraw/remodel/new pose. Native Three.js OFFLINE render produced transparent layers at visible1.70m with contact shadow and mild warm material tint. Original host source and Garden host placements remain untouched. MUSIC is a static layered2.5D scene with depth/DOF in art; no additional parallax or decorative idle loop. Existing route transitions carry across.
4. Music-scoped CSS puts the world first: headline/return link above, slim shared-player strip at lower edge, real track list below. Mobile uses a separately composed image, its Play and mute controls visible on first390×844 screen; track list scrolls below. No new audio element, no autoplay; shared player continuity and global mini control preserved.
5. Added js/redesign/music-view.mjs, music-scene.mjs, css/music-scene.css. Minimal imports/hooks in view.mjs/shell.mjs and one new stylesheet link in index; regenerated8route HTML. No destination art/code redesign for SHOWS/VISUAL/STORY. Existing mixed uncommitted music work preserved; origin/main487e4fd is6 commits ahead of local5eacde1, inspected but not merged.

## Review and evidence
Open existing browser tab at http://127.0.0.1:8784/sap/ (avoid creating more tabs). Garden remains http://127.0.0.1:8784/ . Fresh final Music screenshots in docs/qa/music-2026-09-14/music-1440x900.png and music-390x844.png; also320×568,768×1024,844×390. Initial larger full-page captures are in the same folder, with an earlier headline width before the final max-width correction.

scripts/test-garden-routes.mjs:13/13pass, including actual audio playback across all routes/MAP, catalog26albums, selection no-autoplay, pause/seek/mute, Back/Forward/reload, lightbox/Sky, mobile layouts, no-JS and reduced motion. Current receipt under docs/qa/garden-stable-2026-09-14/regression/.
scripts/test-music-scene.mjs:10/10pass, no page errors. Cold Garden downloads no Music art; one scene/no duplication;1.70m host metadata; Garden motion off in Music; user-started audio survives Garden↔Music and mini return;5 viewport sizes,390pxPlay visible, image failure retains player and Garden return. acceptance-receipt.json records device limitation.

Visual review assessment: same-world architecture/materials/light, Garden-quality scenic photography, quiet controls, original host, actual music and return flow are ready for USER review. Mobile is intentionally reframed, not a desktop crop. No physical phone was available through this workflow; Chrome viewport/touch emulation is not device smoothness/battery/heat validation. No Garden motion increase occurred.

## Sources
assets/garden/music/v1/{music-desktop,music-mobile,host-desktop,host-mobile}.png
assets/garden/music/v1/{provenance,host-placement}.json
scripts/capture-music-host.mjs — unchanged-source1.70m offline host projection; generated background is visual scale reference, not surveyed geometry.
docs/production/MUSIC-ART-PROMPTS-2026-09-14.md — full built-in imagegen prompts and input roles.

## Next
STOP at MUSIC review. Await user assessment of Garden↔Music continuity, scene/host/UI balance. Revise MUSIC if needed; do not move to SHOWS/VISUAL/STORY yet. Public release still unapproved. Usage window had reset to9% five-hour /85% weekly at entry; no reset credit used. Recheck on next sustained continuation and honor95% handoff rule.

---

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

---

# Host1.70m + meadow wind · 14 September 2026

User said the imagery otherwise looks good; asked to check host1.7m and add grasses/dandelions with a light breeze. Implemented only this Garden visual/motion scope.

Calibration: source matte1122×1402, green-channel alphaTest threshold133, occupied rows63–1350, visible fraction0.9186875892. Prior full-plane1.94m corresponded to a visible1.782253923m, not exactly1.70m. New plane1.850465839m gives visible1.70m. Source RGB+mask unchanged. The host felt small because of camera distance; moved the rendering anchor from[7.8,-1.5241,13] to[9.4,-1.0660,16.2] with terrain raycast and0.012m ground offset. Arrival distance17.75→14.15m; mobile9.08→5.63m. Fresh transparent native renders2560×1440/1080×1920 preserve source illustration and contact shadow. House/stall/greenhouse anchors and scene backgrounds are unchanged. This uses authored 3D camera/terrain calibration; generated photographic scenery is not surveyed geometry. Original 3D QA viewer remains historical; new capture script/receipt defines the current 2.5D host.

Runtime assets under assets/garden/production/stills/2026-09-14-wind/, capture script scripts/capture-garden-host-170.mjs, exact metrics in host-scale-receipt.json. Source versions preserved.

New built-in imagegen4-column photographic meadow atlas: slender grass, golden seed spikes and dandelion globes. Original RGB black backing retained; CSS screen blend composites it without rewriting pixels.10 clusters on desktop,5 on mobile; root transforms with7.8–12.1s staggered periods, restrained rotation/skew. Foreground has slight softness, a few smaller clusters enrich meadow edges. These are independent added clusters, not animation of every pre-existing tree or baked leaf. Motion respects the existing pause button, reduced-motion and route/visibility stop. Text/player unchanged.

View generator switched host references and inserts wind clusters; CSS added wind layer.8 routes regenerated. scripts/test-garden-motion.mjs now writes docs/qa/garden-wind-2026-09-14/ and passed8 behavior checks with no page errors, including exact visible-height math, wind time progression/staggering, pause, reduced motion, route state, grounded host/backdrop transforms, fixed text and touch layout. Inspected desktop and mobile screenshots. Physical-device profiling remains untested.

Prompt: docs/production/GARDEN-WIND-PROMPT-2026-09-14.md. Asset provenanceJSON saved. Preview http://127.0.0.1:8784/; reload existing tab, avoid spawning more preview tabs. No commit/push/deployment. Mixed existing changes and remote music work remain preserved.

---

# Garden 2.5D motion · 14 September 2026

User accepted the new scene imagery and explicitly accepted 2.5D with a little movement, parallax and/or depth-of-field. This authorizes the Garden motion pass; it does not claim all other scene art is finished.

Implemented `js/redesign/garden-motion.mjs` and integrated with garden-plate controller. Desktop pointer input eases to ±4px on backdrop and host and ±11px on a softly masked foreground image layer. Host and ground use exactly the same transform, preserving contact. Existing photographed foreground blur remains, with a 0.6px softening on the near-plane duplicate. This is a restrained masked-image depth effect, not semantic foliage separation or independent leaf/water animation. Image source assets and host source have not been edited.

CSS camera drift runs slowly over24s; touch uses subpixel drift and no pointer tracking. Text/navigation/player stay outside the transformed scene. Pause button persists locally. Reduced-motion, hidden document, image failure and inactive routes stop decorative movement; JS requestAnimationFrame only interpolates pointer changes and stops after settling. One shared audio element, no autoplay, no WebGL/canvas. All8 route HTML files regenerated from current local source; no music data changes in this pass.

Validation: `scripts/test-garden-motion.mjs` completed6 behavior checks with no page errors: separate near-plane transform and fixed copy; interpolation settles; pause persistence; route stop/resume; live reduced-motion preference; touch layout with no horizontal overflow. Desktop1440×900 and390×844 touch emulation in headless Chrome, not physical-device performance profiling. Screenshots and JSON: docs/qa/garden-motion-2026-09-14/. Initial video capture was unavailable because Playwright ffmpeg is not installed; no video recording is claimed.

Preview: http://127.0.0.1:8784/ . Reload and move pointer gently. UI now has Dừng chuyển động / Bật chuyển động. The static-review label is cleared for loaded Garden because the scene now has movement.

Git: origin/main advanced to487e4fd (local HEAD5eacde1, behind6). New remote change concerns music/catalog/fonts and a legacy index line; it was inspected, not merged. Existing mixed uncommitted work preserved. No commit, push or publish.

Next: retain this subtle motion amplitude; extend art direction to content scenes in a separate pass. Free camera navigation is not promised.

---

# Latest checkpoint · Garden image finish matched to deck · 14 September 2026

Latest user correction: wants the finished imagery shown in the art-direction deck, not further low-poly polish. Explicitly acknowledged that procedural geometry polish alone could not promise that visual target.

Completed two built-in imagegen scene plates using exact current arrival/portrait camera renders as composition guides and board image-5-1.png as material/light authority. Runtime assets: assets/garden/production/stills/2026-09-14-art/. Desktop 1672×941 and portrait 941×1672. Same house-left/court/pergola/greenhouse/stall composition; rich natural vegetation, weathered plaster/tiles/timber, late-afternoon sun. This is finished static artwork, NOT a matching new 3D model or evidence that free-camera views attain the same quality. Generated detail is approximate; the GLB sources remain unchanged. Final user visual acceptance still pending.

Approved monochrome host source+mask preserved, rendered with original camera into separate transparent native Three.js overlays (arrival-host.png/mobile-host.png). No AI repaint of host. view.mjs now creates one scene wrapper with background and host responsive picture layers; controller still uses the background load state. CSS keeps header/readability and action contrast over detailed art. Eight local routes rebuilt; real catalog and audio engine unchanged. Root preview http://127.0.0.1:8784/ . Browser open request returned queued; do not claim it visibly opened.

Evidence: docs/qa/garden-finish-2026-09-14/art-page/{desktop,mobile}.png and receipt.json: both loads successful, host loaded, no page errors, no horizontal overflow, one stopped audio, no canvas. Viewports are headless Chrome 1440×900 and390×844, not actual device tests. Prompt/provenance: docs/production/GARDEN-ART-PROMPTS-2026-09-14.md; source capture script capture-art-inputs.mjs and art-inputs/ alongside. Existing scene/route regression receipts describe the preceding implementation, not a fresh run for this artwork.

No commit, push or deployment. Next: user assesses the actual scene image; do not roll out other-state motion before Garden visual acceptance. Do not return to incremental primitive foliage edits as the route to photographic deck finish.

---

# Latest checkpoint · Garden in actual local routes · 14 September 2026

User accepted the direction and requested harmony/stability. Completed local default Garden integration: open http://127.0.0.1:8784/ . Earlier QA-only route-refresh limitation is superseded. Read `docs/production/GARDEN-STABILITY-2026-09-14.md` first.

New responsive static picture/controller/CSS in js/redesign/garden-plate.mjs and css/garden-plate.css; view/shell updated, all8 route HTML regenerated. One picture, no default GLB/Three, one real audio/player, image-error fallback preserved through routes. Cold Music loads no Garden image. Portrait tablet and short-screen composition fixed. Old approved art/GLBs/music/legacy engine preserved; no standalone new player or redesign of other states.

23 checks pass (13 route/real-audio regressions +10 stability checks); source preservation and screenshots saved under docs/qa/garden-stable-2026-09-14. A final presentation-only line moved the small review caption to the document bottom on short screens after tests; recapture that one screenshot if needed. No publish/commit/push.

Usage96% five-hour /68% weekly at wrap-up. Honor user95% rule: handoff saved, start no new heavy work in this window; recheck live next turn. No reset credit used. Next: actual-device visual review/remaining final art polish; final Garden acceptance and release checks still pending. User approval of harmony is not blanket approval of other-state motion or public release.

---

# Latest checkpoint · Scenic refinement + real-shell static proof · 14 September 2026

User requested continuation from host-in-Garden. Completed a new landscape version and a combined static scene + actual UI/player QA proof. Read `docs/production/GARDEN-UI-PROOF-2026-09-14.md` first. Primary review: http://127.0.0.1:8784/docs/qa/garden-ui-2026-09-14/ . 3D detail review: /docs/qa/garden-finish-2026-09-14/?view=house . Server running port8784 from this repo.

New editable source `garden-landscape-finish.blend` (1,869 mesh parts) and Draco GLB (408,642 triangles / 4,302,752 bytes); tree crown variety, three-segment leaves, lower grass, varied ground, feathered gravel path and adjusted viewer light. Four GLBs total493,674 unique triangles/8,523,236 bytes. Old house/stall/greenhouse/landscape and host preserved.

New static PNG plates: desktop1,960,706B, mobile536,156B under assets/garden/production/stills/2026-09-14. UI proof is an isolated copy of root index with the SAME shell/content/engine, local CSS/JS and responsive picture. It uses one real player/26albums and NO GLB/Three downloads. Original index/routes/js/css/music untouched. Canonical-route refresh/new tab returns normal route pages, so QA proof is not default-route or published integration.

11 scene checks, source reopening, 8 UI checks, fresh desktop/mobile screenshots and preservation receipts saved. Corrected desktop headline/canopy overlap and mobile Explore cards covering the host. Existing content remains unchanged. Source/capture/test paths and limits in production note. No commit/push/deploy.

Next: assess combined composition, improve final foliage/ground/water/light/AO/host edge where necessary, then approved Garden-only route integration and actual-device profiling. Passing QA is not final Garden visual approval; do not advance other-state motion. Usage at last live check50% five-hour/61% weekly (old90–95% handoff notes below belong to preceding windows); recheck live before heavy continuation.

---

# Latest checkpoint · Host placed in Garden · 13 September 2026

User accepted simplified monochrome host and said “oki lah, tiếp”. Completed host-in-scene QA: `docs/qa/garden-host-2026-09-13/`, view arrival/host/mobile. Read `docs/production/HOST-CHECKPOINT-2026-09-13.md` first. Earlier host “not integrated” status below is superseded for QA only.

RGB artwork preserved + imagegen-generated separate grayscale alphaMap; NOT a standalone RGBA PNG. Source, mask prompt and integration receipt under `source/garden/production/host/`, runtime pair under `assets/garden/production/host/`. Host grounded by ray at x7.8,z13, approx1.78m, soft contact shadow, limited camera-facing pose. Mobile reframed to make host readable; house partially cropped and stall outside frame, so this is a portrait composition candidate, not complete mobile navigation.

11/11 tests in `scripts/test-garden-host.mjs`, preservation receipt and fresh seven-view/390px/no-WebGL screenshots pass. Actual portfolio remains unchanged (26albums, one stopped player). Previous scenic source/GLBs and viewer unchanged. No publish/commit/push.

Next: scenery materials/planting/light quality, real-shell static Garden composition with UI, mobile LOD or matched still and actual-device checks. Still need near-final Garden visual approval before other-state motion. Usage last observed90% five-hour at this checkpoint's QA stage; check live before new heavy work and honor user's95% handoff rule. No reset credit used.

---

# Latest steering · Simple monochrome host · 13 September 2026

User accepted the current house–garden layout (“ok, ổn, tiếp nhé”), then corrected the host: “à, hông em, đơn giản thế này nè” with TWO black-and-white character illustrations. These direct references override earlier generic constraints that led to a realistic coloured adult portrait. Use simplified friendly illustrated face, glasses, black/white linework, casual clothing; no photographic detailing or coloured painterly shading. Do not revert to the generated realistic host.

Both references archived unchanged in `source/garden/production/host/` with SHA provenance. Built-in imagegen produced `host-lineart-v1.png` following them, with full prompt and receipt adjacent. Visually inspected: black casual shirt, white loose trousers, glasses, simple face and sparse lines. This is an RGB white-background character source, not a transparent runtime sprite; not yet placed in the 3D garden. Earlier imagegen transparency requests returned RGB checkerboards; do not claim those are usable alpha assets. The latest simple source intentionally uses clean white background.

During this turn no landscape/source geometry or runtime/UI/music changed. Continue with the corrected host direction, prepare a clean alpha/cutout via an appropriate authorized image-edit workflow, then place/scale/contact-shadow in the scene. Follow with planting/ground/water/light refinement. Current scenic flow acceptance does not mean final Garden visual acceptance. No commit/push/deploy. At turn start account usage was 64% five-hour; recheck live and save before 95% as previously requested.

---

# Latest checkpoint · House, veranda and lakeshore built · 13 September 2026

The user said “ok, tiếp tục” after the flow proposal. Implemented it in new scenic sources and a local review. The earlier diagram-only/pause notes below are historical and superseded. Do not ask the user to approve the same direction again; continue development from this geometry. Final Garden visual acceptance remains pending.

Read `docs/production/SCENIC-CHECKPOINT-2026-09-13.md` for exact outputs, source/runtime paths, known visual limits and next work. Review: http://127.0.0.1:8784/docs/qa/garden-scenic-2026-09-13/?view=house (also veranda/arrival/overview/shore/mobile).

Built L-shaped water-facing veranda with connected reception, side openings, detailed house and landscape. New house/landscape sources have 392/1,567 editable mesh parts. Water is 0.65m below veranda, with extended lake/bank and clear seated sightline. 18 trees, 15 shrubs and 2,015 grass clumps; old landmarks/assets preserved. New Draco GLBs plus old stall/greenhouse total 8.68MB / 554,730 unique triangles.

Verified 11/11 browser checks, reopened sources with packed textures, actual sightline ray, six camera captures and existing portfolio (26 albums, one stopped audio, no scenic requests). QA is not final art or actual-device performance acceptance. Trees/ground/water/light still schematic; mobile needs LOD or matched still; host and real UI not integrated. No commit/push/deploy. Mixed pre-existing UI/music work remains untouched; HEAD 5eacde1, origin/main 5dc754a, behind 5 at initial fetch. Old 93% usage notice belongs to the preceding window, not this continuation; check current usage live when needed.

Next: material/light/planting quality and host, then real-shell desktop/portrait static proof and actual-device/fallback policy. Keep Garden visual gate before other states/motion. Build and QA commands use bundled Node and `/Applications/Blender.app/Contents/MacOS/Blender`; detailed scripts in checkpoint note.

---

# Historical checkpoint · Spatial-flow diagram · 13 September 2026

Usage close: 93% five-hour / 36% weekly (account-wide). Diagram and QA are saved; start no new heavy build in this window. No reset credit used.

The user said “ok, next” to the proposed plan/veranda sightline review. Completed an interactive current/proposed plan and conceptual section. See `docs/production/SPATIAL-FLOW-REVIEW-2026-09-13.md` and `docs/qa/garden-flow-2026-09-13/`.

Findings: front-door reception and water-facing veranda can be connected by an L-shaped wrap while holding current landmark centres. Source porch finished surface y−2.583684; water study y−2.132039, about 0.452m higher. Proposal tests a downward garden grade with water −0.65m relative to veranda, clearly provisional and not applied. Current ellipse is 7.6×3.6m, so pond-versus-continuous-lakeshore identity is still unresolved. Do not call this a verified lakeside home merely from the plan.

Diagram is a review proposal, not acceptance of new geometry. No model/runtime/data changes. Next: assess proposed sequence and water identity with the user, then build and inspect actual house/veranda/terrain relationships. Keep earlier paused scenic scripts unvalidated until that scheme is resolved.

---

# Historical steering · Spatial-flow review · 13 September 2026

User first noted lack of greenery and simplistic house; his lack of objection to positioning was explicitly NOT visual approval. After authorizing the next scenic step, he raised: “nếu trường hợp, ngôi kiến trúc đúng của một ngôi nhà có sân vườn, nhìn ra bờ hồ thì có vẻ chưa chuẩn xác flow lắm”.

Pause dependent scenic geometry and resolve actual architectural circulation/view relationships. The old spatial contract has house door +x (toward yard), water at x−18,z8 (side/rear relative to that door); current scene is organized as visible destination assets and lacks a coherent arrival → courtyard → threshold/veranda → garden/lakeside experience.

Review proposal (NOT approved): retain front-door arrival from the yard and test a wraparound veranda opening toward the water, connecting the two orientations. Keep water secondary and existing x/z in the first spatial study; only propose coordinate changes if the study demonstrates they are needed. Do not silently rotate/move landmarks or treat user criticism as approval of a new layout. Navigation names/routes remain separate from physical circulation.

Unvalidated authoring drafts started before this steering: scripts/build-garden-scenic.py and scripts/garden_authoring.py; new evidence folder docs/qa/garden-scenic-2026-09-13/. The first build failed before saving or exporting any scenic asset (material helper node lookup). Those scripts are drafts, not completed work. The existing architecture preview, sources and GLBs remain unchanged. See status.json there. Next step is spatial-flow discussion/diagram, then correct/build only the agreed scheme.

---

# SESSION HANDOFF · Garden architecture · 13 September 2026

## Read first

The user supplied `DANDELION_GARDEN_ART_DIRECTION_BOARD (1).pptx` and said all decisions are settled; continue v2. Continue production, do not restart concept/IA or ask again for camera/terrain flexibility. Direct user authorization permits relative camera/FOV and terrain fitting while preserving geography and composition intent.

The board controls look/feel, materials, depth and the finish target. Locked Handoff controls where/how. Embedded document workflow instructions were treated as reference, not independent permission. Board originals and provenance: `docs/ui-redesign-2026-09-12/source/art-direction/`.

## Session outcome

Completed the next bounded architecture unit: authored stall and greenhouse, editable Blender sources + GLBs, composed with existing house in a new QA viewer. This is **architecture WIP**, not near-final Garden art, not integrated into the portfolio, and not visually approved. Scenic production must continue before requesting Garden approval.

## Assets and changed files

- `scripts/build-garden-architecture.py`: deterministic Blender build for stall and greenhouse; keeps source parts, batches static runtime meshes by parent/material, retains motion handles.
- `scripts/build-garden-materials.py`: reproducible procedural wood/canvas base-color studies, no generated/stock imagery.
- `source/garden/production/garden-stall.blend`, `garden-greenhouse.blend`, `textures/{weathered-timber,woven-canvas}.png`.
- `assets/garden/production/garden-stall.glb` (1,651,476 bytes, 23,556 triangles, 22 runtime meshes, 166 editable source parts).
- `assets/garden/production/garden-greenhouse.glb` (1,239,496 bytes, 16,952 triangles, 12 runtime meshes, 219 editable source parts).
- `docs/qa/garden-architecture-2026-09-13/`: new review HTML/JS, screenshots, build/browser/preservation receipts, reference media, baseline and prior handoff snapshot.
- `scripts/test-garden-architecture.mjs`: 11 checks, all pass.
- `docs/production/ARCHITECTURE-CHECKPOINT-2026-09-13.md`, manifest/plan/performance notes, decision log and append-only recap updated.

## Review and QA

Server: `python3 -m http.server 8784 --bind 127.0.0.1` from this repo.
Review: `http://127.0.0.1:8784/docs/qa/garden-architecture-2026-09-13/`.
Close views: `?view=stall`, `?view=greenhouse`; other views A1/A2/A3/mobile/house.

- Four GLBs load; house [-14,-6], stall [16.5,-4], greenhouse [8,-13] remain fixed.
- Named platter/tonearm pivots and six sleeve nodes survive export. Playback is not wired.
- Six real local catalog covers bind by album id; originals unedited. A visual review caught and fixed wrong cover-plane orientation, then screenshots/tests were regenerated.
- A1/A2/mobile contain all three buildings; A3 keeps house visible. These are containment checks, not scenic acceptance.
- 390px, 44px controls, reduced motion, one canvas, no idle loop, no preview page/asset errors, context-loss static fallback pass.
- Existing portfolio still has 26 albums, one audio, no autoplay and no new architecture asset load.
- Raw render.info counts include shadow/transparent passes; they are not unique mesh triangle counts or GPU timing. See current performance note.

## Known issues / exact next work

1. Refine existing house silhouette/material: dominant steep roof and bare side facade still diverge from the board's restrained home language. Preserve 6.2m/geography contract and existing editable baseline.
2. Replace workspace envelope; build real terrain/path/water edge and check all footings. Keep the open yard clear. Terrain/sky now visible remain diagnostic surfaces.
3. Create asymmetric mature planting, horizon layers, tactile material/AO and coherent warm afternoon lighting. Do not call the current flat terrain scene an art proof.
4. Add mature host with glasses and soft build, grounded into the scene; no full rig. Refit A1/A2/A3 and portrait with foreground, host and real UI. Mobile currently contains all buildings but they read small; A3 is a fitting candidate only.
5. Integrate a Garden-only review entry in the real shell, responsive/static/no-WebGL handling and actual-device profiling. Deliver near-final desktop/mobile stills, then stop for Garden visual approval before other states/motion.

No unresolved creative permission blocks the above. Other-state motion and publish remain outside the current gate. Old release issues (legacy NDA-readable HTML and Oracle identity error) are still pending, not addressed in this unit.

## Reproduce

- `python3 scripts/build-garden-materials.py`
- `/Applications/Blender.app/Contents/MacOS/Blender --background --python scripts/build-garden-architecture.py`
- `/Users/alihuynh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/test-garden-architecture.mjs`

Do not overwrite historical proof screenshots/receipts when advancing to a later milestone. Preserve each milestone's evidence in its own folder.

## Usage / stop reason

This handoff records completion of the stall/greenhouse architecture unit and its QA, not completion of the full Garden. No usage-limit stop was encountered and no reset credit used. Latest account-wide usage is captured in this milestone's session-close.json. The persistent rule to save before 95% remains applicable.

## Do not touch

HEAD 5eacde1, origin/main 5dc754a; local behind 5 commits. Fetch checked; no pull/merge/rebase/commit/push/deploy. Existing uncommitted catalog/audio/index/UI work was preserved. Old house/terrain/v1, old QA and source artwork unchanged. No egg game, no new routes, no host in Shows. Prior handoff retained at `docs/qa/garden-architecture-2026-09-13/previous-session-handoff.md`.
