# Garden implementation checkpoint — 10/09/2026

## Latest user direction and assets — 11/09/2026

Read [NEXT-SESSION-ASSETS-2026-09-11.md](NEXT-SESSION-ASSETS-2026-09-11.md) first. User clarified FULL illustrated redesign across the site, animation/Three.js included, with Blender allowed for model production. No real-person portrait UI; preserve actual portfolio content and personality. User then asked to finish asset preparation/planning now and leave scene/model implementation for the next session.

New distant backdrop PNG/WebP, optimized illustrated Li and six real album thumbnails are saved in this docs asset pack with source/ID manifests; not integrated or declared scene-ready. Egg hatch/chicken GAME is deferred and removed from current index loading/DOM. Governor now loads directly to preserve performance/Oracle portal functionality; game source files and saved state were retained. Oracle/calendar/Vedic content is not the egg hatch game.

Latest fetched origin/main is `5dc754a`, 5 commits ahead of local HEAD `5eacde1`, not merged. It adds two albums, track reassignment, font/audio updates, and two further tracks in Vị Muối Mặn (now 8 tracks on origin). Preserve uncommitted work and inspect before integration. No Blender UI scene was changed; MCP addon connection was unavailable at check time. `scene.js` still absent; `SCENE_READY=false`. No commit/push/deploy.

The remainder below is the historical implementation checkpoint; latest user scope above takes precedence.

User asked to wrap up and continue in next session. Work is INCOMPLETE, NOT ready to publish. No commit/push/deploy.

## User direction

Apply the new review.html art to the portfolio overhaul, use Three.js, replace incompatible old decorative video/theme flow. User authorized implementation. Do not change real music/video content. Follow existing FLOW.md, PERFORMANCE.md, IMPLEMENTATION.md: first vertical slice = gardener → record stall, not all six scenes.

## Repository and existing work

Correct repo: /Users/alihuynh/Claude/Projects/Anh Li Portfolion/portfolio-garden-v2 (AliH86/anhli-portfolio). Parent is a DIFFERENT Oracle repo; do not implement there. At session start fetched origin/main: 0 ahead / 0 behind, HEAD 5eacde1. Existing uncommitted recap and entire review docs folder belong to earlier work. Preserve them. Read AGENT-RULES.md and recheck status/fetch on resume.

## Changes in this session

- index.html: new HTML entrance and dormant Garden walk/dialog skeleton. Original #home retained hidden for compatibility hooks. Removed five inline legacy blocks (shader, hero video, music video background, disc overlay, old Three vinyl). Gated legacy wind/cursor/intro/typewriter/hero catalog render; changed old EQ RAF to event-driven guarded loop. Existing portfolio sections/catalog/player retained.
- music-data.js: async script loader + window.portfolioMusicReady, replacing sync XHR/eval. index exposes portfolioCatalogReady after audio-map readiness + merge/render/fallback. Fixed content version query params for these scripts. Needs failure/race regression testing.
- css/garden-experience.css: new cream/green editorial entry, new nav, walk/dialog responsive styles. Visual QA not completed.
- js/garden/entry.js: draft controller/adapter for mode, native album dialog, moving original drawer/player using return markers, reduced motion, focus return, scene lifecycle, existing album IDs and audio events. NOT exercised against a real scene. SCENE_READY=false explicitly gates unfinished 3D. Entry currently reads “Ghé sạp nhạc” and opens real music; no missing scene import occurs. Do not turn this flag on until scene.js exists and is tested.
- js/vendor/three/{three.module.js,three.core.js,LICENSE}: Three.js 0.186.0 from official npm tarball, local vendored unminified builds. Official release no longer had requested .min files. Consider bundling/minifying only if needed; no framework migration.
- assets/garden/entrance.webp: copy of approved cleanplate.
- assets/garden/anhli-gardener-alpha.png: imagegen background extraction from original master, preserves pose/white interiors. Needs actual alpha and edge QA, optimize to web sprite without overwriting source.

## IMPORTANT missing work

1. js/garden/scene.js DOES NOT EXIST. Build actual geometry, camera, raycasting/HTML hotspots, 6 real album thumbnails, gardener plane, contact shadow, shared renderer and disposal. Controller expects async createGarden({host,hotspots,adapter,reduced,onError}) returning setProgress, setDusk, setReduced, setRunning, dispose, diagnostics methods.
2. Proposed motion: gentle scroll from gardener to stall, foliage wind, record rotates only when media plays. Keep Li still until separate rig layers exist (do not wobble whole cutout). Day/dusk light in same garden; avoids incompatible ocean world. Controller has dusk UI but nothing renders yet.
3. Asset alpha validation + size optimization; thumbnail generation from actual catalog. No rig/3D model produced yet.
4. Audit old #home compatibility and calendar relocation code (calendar may move into hidden hero). Ensure calendar/eggs still accessible. Retained hidden DOM is a checkpoint, not final architecture.
5. Controller needs tests for canceled import/loading, repeated mode switches, dialog keyboard/focus, player continuity, back/forward/BFCache, new catalog errors, reduced motion toggles, deep links, mobile/tablet. Audio play/seek not tested.
6. Complete visual inspection desktop/tablet/mobile and measured performance. Old content style is largely retained, full-page art coherence still needs review.
7. Update preview review.html only after implementation evidence is real; current original review remains unchanged and says scene not implemented.

## Verification so far

- Baseline before changes: headless Chrome 1440×1000, 24 runtime albums, no page JS errors, resource transferSize sum 18,695,641 bytes after 2.5 s. This is localhost snapshot, NOT production/FPS benchmark. /tmp/garden-baseline.json and /tmp/garden-before.png (temporary, may disappear).
- node --check entry.js and music-data.js passed; git diff --check passed.
- Post-change browser smoke test could not run: localhost server stopped (ERR_CONNECTION_REFUSED). No post-change capture exists. Restart server and inspect before claiming runtime validation.

## Runtime / preview

Static server started at http://127.0.0.1:8766 (python3 -m http.server 8766 --bind 127.0.0.1), may need restarting.
Node: /Users/alihuynh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node
Playwright: /Users/alihuynh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs
Use chromium.launch({headless:true,channel:'chrome'}); bundled Chromium executable unavailable.
Sharp is in same node_modules directory.
Image original generated output: /Users/alihuynh/.codex/generated_images/01a086be-2e9d-7373-b5ee-3a05b2dd7a5c/exec-1324047f-04cf-41c0-8859-984999237db8.png

## Next session prompt

Continue Garden overhaul from this checkpoint. Read this file plus AGENT-RULES.md and implementation docs. Preserve uncommitted changes; build scene.js, test adapter/player and accessibility, fix compatibility regressions, visually inspect and measure before enabling SCENE_READY. User wants work carried forward, not a fresh audit of everything. No publishing until content approval under AGENT-RULES.md.
