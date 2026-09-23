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
