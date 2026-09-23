# V2 garden experience · 9–14 Sep 2026 · reference only

Classification: **superseded, useful reference only.** Do not restore into the live site.

This is the first "Dandelion Garden" attempt: a Three.js/Blender world with five destinations
(GARDEN / MUSIC / SHOWS / VISUAL / STORY), generated static routes and a monochrome ink host.
On 17 Sep 2026 Ali stopped it ("inspiration below average") and it was rebuilt from scratch as the
independent `fresh/` V2, which is what went live (V2 → V2.1 → V2.2, current `main` d058ee2).
Decision trail: `docs/decisions/DECISION-LOG.md`, `docs/production/V2-WRAPUP-AND-REBUILD-2026-09-17.md`.

It existed only as uncommitted work in the old clone `portfolio-garden-v2` on local branch
`codex/garden-experience-v2` (branch tip `5eacde1` = an ancestor of `main`, no unique commits).

## Why keep it

Li World V3 is a world again, so these are the only copies of: the Blender sources
(`source/garden/production/*.blend`, `source/garden/v1/*.blend`), the art-direction board
(`docs/ui-redesign-2026-09-12/source/art-direction/*.pptx`), the locked spatial handoff
(`docs/ui-redesign-2026-09-12/source/locked-handoff/`), the host line-art and prompts
(`source/garden/production/host/`), and the camera/composition locks (`source/garden/production/*.json`).

## Layout

Relative paths match the old clone root, so files inside this folder still reference each other correctly.

| Here | Old clone path | Notes |
|---|---|---|
| `index.html` | `index.html` (modified, never committed) | "Garden edition" single-file entry; `?classic` fell back to V1 |
| `music-data.js` | `music-data.js` (modified) | async `portfolioMusicReady` loader experiment |
| `about/ sap/ flat/ sky/` | same | **generated** by `scripts/build-redesign.mjs` (see `source/ui-redesign/route-build.json`) |
| `story/ visual/ works/` | same | redirect stubs to `about/` |
| `css/*.css` | same | 6 stylesheets of the experiment |
| `js/garden/ js/redesign/` | same | world/scene runtime and route view modules |
| `js/vendor/three/` | same | vendored three.js r186 (MIT, `LICENSE` included) + Draco decoder |
| `assets/garden/` | same | runtime derivatives (webp/glb) of `source/` |
| `source/` | same | Blender + authored sources (`garden-models-v1.blend1` backup dropped) |
| `docs/garden-experience-2026-09-09/`, `docs/ui-redesign-2026-09-12/` | same | `evidence/` screenshot folders dropped |
| `scripts/` | untracked `scripts/*.mjs|*.py` | builders + tests of this era; `build-cjk-fonts.mjs` dropped (identical to main) |

The Sep 13–14 docs in `docs/production/` (GARDEN-*, SCENIC-*, HOST-*, SHOWS-*, MUSIC-*) describe this
era and are kept at their original path at the repo root of this branch.

## To run it again (not needed for V3)

It also needs root files of that time (`garden-oracle-*.js`, `images/`, `uploads/`, `audio-map.js`,
`music-data-base.js`). Check out `5eacde1` in a scratch worktree, copy this folder over its root,
and restore `audio-map.js` / `music-data-base.js` from `5dc754a` (`git show 5dc754a:audio-map.js`).
The route builder also parses `const ALBUMS` from the `index.html` here.
