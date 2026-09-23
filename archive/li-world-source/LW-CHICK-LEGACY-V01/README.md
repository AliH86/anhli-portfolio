# LW-CHICK-LEGACY-V01 · Bé Gà legacy source

Status: **source material for a future Li World adaptation. Not integrated into V2.**
Nothing here is referenced by `garden-v2/`, root `index.html` or any V2 runtime file.
Preserved on `source/v2-snapshot` on 2026-09-23 (Li World Phase 0 workspace unify).

## Contents

| Folder | Files | What it is |
|---|---|---|
| `generations-2026-08-02/` | 22 PNG, 20.8 MB | Original AI generations (`hf_*` = Higgsfield) plus `compilation.png`, a 3072×2088 contact sheet of the five poses. Copied from the local folder `Anh Li Portfolio/Pé-gà-asset/`. |
| `pixel-sprites-2026-08-21/` | 9 PNG + `egg-game.css` | Hand-cleaned pixel sprites on an exact grid: chick 64×69 (`chicken`, `-blink`, `-sleep`, `-surprise`, `-gift`), egg shell 74×91 (`egg-dormant`, `-warm`, `-ready`, `-cracked`). `egg-game.css` exposes the grid as `--chick-w/h`, `--egg-w/h`. Byte-identical to local commit `d146b18` in the canonical clone (never pushed). |

Checksums for every file: `docs/snapshot/preserved-files.tsv` (lineage `li-world-chick-legacy`).

## Poses

`compilation.png` (generation contact sheet): 1 idle (standing, red bandana) · 2 nháy mắt (smile/blink) ·
3 ngủ (sleeping, sitting) · 4 ngạc nhiên (surprised, arms up) · 5 ăn hạt (pecking a seed).

Pixel sprites: `chicken` idle · `chicken-blink` · `chicken-sleep` · `chicken-surprise` · `chicken-gift` (holding a
wrapped present). "Ăn hạt" has **no** pixel sprite yet; "gift" is not on the contact sheet.

## Related code already on `main` (V1 egg game, dormant in V2)

`js/egg-game.js`, `data/egg-game-config.js`, `css/egg-game.css`, `scripts/test-egg-game.mjs`,
`js/world-state.js` (`anhli.worldState` storage key), and the older 40 KB sprite set in `assets/game/egg/`.
Design context: `docs/PHASE-0-AUDIT.md` (27/07/2026). The garden V2 runtime never loads any of these.

## Rules for adaptation

- Keep the pixel grid: re-export the sprites if the display size changes; do not scale 64×69 / 74×91 in CSS.
- Treat `generations-2026-08-02/` as the master reference; `pixel-sprites-2026-08-21/` is the first runtime derivative.
- Give new versions a new identity (`LW-CHICK-V02`, …); leave this folder unchanged.
