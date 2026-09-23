# Asset manifest · Garden production

Status is per asset, not acceptance of the world. `draft` = study/source candidate; `proof` = ready for visual review; `approved` only after explicit approval; `integrated` means in the real portfolio runtime, not merely visible in a QA viewer.

## Latest checkpoint · 13 September 2026

Stall and greenhouse now have editable Blender sources and runtime GLBs, inspected in the new architecture QA viewer. Status **draft / architecture WIP**, not approved final art and not real-shell integration. Full notes: `ARCHITECTURE-CHECKPOINT-2026-09-13.md`; receipts/screenshots: `docs/qa/garden-architecture-2026-09-13/`.

| Asset | Source → runtime | Source parts / runtime meshes | Triangles / GLB bytes | Notes |
|---|---|---:|---:|---|
| Stall | `source/garden/production/garden-stall.blend` → `assets/garden/production/garden-stall.glb` | 166 / 22 | 23,556 / 1,651,476 | Timber/canvas, record bins, six named sleeves, new turntable with retained pivots. QA covers from existing catalog; no playback integration. |
| Greenhouse | `source/garden/production/garden-greenhouse.blend` → `assets/garden/production/garden-greenhouse.glb` | 219 / 12 | 16,952 / 1,239,496 | Individual glass panes, door pivot, benches/pots/plants. Alpha glass; reflection/AO pass pending. |
| Base-color studies | `source/garden/production/textures/` → packed in blend/GLB where used | 2 source PNGs | Timber 256×512; canvas 256×256 | Locally authored procedural textures; generator `scripts/build-garden-materials.py`; no external images. |
| Art direction reference | Archived original PPTX → extracted reference media | 14 slides | Hash in source provenance | User-supplied look/feel reference, not literal spatial blueprint. |

The entries below describe earlier checkpoints. Their original backlog statements are historical; the table above supersedes stall/greenhouse “not started”. Workspace, scenic terrain, host and final lighting remain pending. Existing house still needs silhouette/material refinement against the new board.

## Existing assets preserved

| Asset | Source | Runtime | Tool/source | State | Status | Geometry/texture/LOD | Notes |
|---|---|---|---|---|---|---|---|
| Old Garden pack | `source/garden/v1/garden-models-v1.blend` | `assets/garden/v1/garden-models-v1.glb` | Existing Blender source | Previous Garden slice | Existing; not approved for new proof | 717,428 bytes; inspect per-node before reuse; LOD not verified | Keep untouched; possible turntable/stall detail reuse, not authority for current world geometry |
| Old seated host | Original creation provenance not reverified | `assets/garden/v1/anhli-gardener-web-v1.webp` | Existing illustrated asset | Previous slice | Excluded from new host proof | 850×1000; 128,504 bytes; no production atlas | Visually inspected 12 Sep: seated, youthful, no glasses, strong manga treatment. Does not meet locked mature/glasses/standing arrival brief |
| Old backdrop | Existing source archive | `assets/garden/v1/backdrop.webp` | Existing flattened image | Previous slice | Reference only | 328,396 bytes | Not a substitute for a true scenic 3D world |

## Produced in checkpoint A

| Asset | Source | Runtime / evidence | Tool | State | Status | Geometry / textures / LOD | Optimization / provenance |
|---|---|---|---|---|---|---|---|
| Locked composition data | Archived user handoff + `source/garden/production/composition-lock.json` | Same JSON, QA only | Source transcription | A1–A7 metadata | draft pending numeric ambiguities | No geometry | User-supplied source; SHA-256 in provenance.json |
| Camera/elevation solution | `scripts/solve-garden-composition.py` | `source/garden/production/camera-study.json` | NumPy + SciPy | A1 and portrait diagnostics | draft | Four envelope centres; all x/z locked | Footing y and camera x/z are provisional; no approval implied |
| Terrain elevation + envelopes | `source/garden/production/garden-space-study.blend`; generator `scripts/build-garden-space-study.py` | `assets/garden/production/garden-space-study.glb` | Blender 5.2.1 | A1 diagnostics | draft | 36,830 triangles; 18,725 source vertices; no textures/LOD | 679,220 bytes GLB; generated locally from numeric study; exported with source metadata |
| Projection viewer | `docs/qa/garden-proof/index.html` | Same local QA page | Three.js + GLTFLoader | A1 / mobile alternatives | draft, QA-only | One renderer, demand rendering, DPR 1.5 | No application integration; no audio/player replacement |
| Frame evidence | `scripts/test-garden-composition.mjs` | `docs/qa/garden-proof/study-*.png` and receipts | Chrome / Playwright | A1 / portrait | diagnostic evidence | Frames are annotated camera studies | Confirms mobile clipping, not acceptance of mobile composition |

## Production backlog after camera decisions

Update: mobile camera/FOV and terrain adjustments are authorized. House source/runtime now exist: `source/garden/production/garden-house.blend` → `assets/garden/production/garden-house.glb`, built by `scripts/build-garden-house.py`. Status **draft** (not approved, not integrated into the portfolio). 152 editable source parts; 10 runtime meshes/materials; 21,194 triangles; 1,213,760-byte GLB; no image textures or LOD. Geometry includes curved clay tiles, gable timbers, built-in openings, shutters, panes, door, porch and steps. Generated locally; no external license dependency. QA at `house-a1.png`, `house-detail.png`, and `house-browser-receipt.json`. Texture/AO, facade details, slope contact and final lighting remain. Host/sap/greenhouse stay pending.

| Asset | Planned source → runtime | Tool | Target / status | Dependencies |
|---|---|---|---|---|
| Terrain + paths + water edge | `source/garden/production/` → `assets/garden/production/` | Blender | Garden; not started as final art | Grade/horizon/yard acceptance; current elevation mesh is a study |
| House / porch | `garden-house.blend` → `garden-house.glb` | Blender | Garden; architecture draft exported and viewed, not final | x−14,z−6; door +x; needs material/AO/light/composition pass |
| Stall / greenhouse / workspace | Same source/runtime split | Blender | Garden; not started | Approved camera envelope; authored geometry and material palette |
| Restrained show structure | Same source/runtime split | Blender | Visible Garden prop only; not started | x12,z6, platform 0.6; no truss, lighting rig or smoke |
| Vegetation / foliage | Source geometry and texture sheets → GLB/optimized textures | Blender + image workflow | Not started | Clear yard; species/style coherence; depth and scale variation |
| Host arrival still | `source/garden/production/host/` → `assets/garden/production/host/` when needed | Illustration/image workflow, then runtime sprite | Not started; no approved matching source located in current pack | Mature adult male, glasses, soft build, thin outlined pale flat colours; no anime mascot; standing A1; no 3D rig |
| Host motion / atlas | Same host source/runtime split | Illustration + Three.js | Deferred | Static Garden approval before animation |

No external stock asset has been licensed or downloaded. No Adobe/Firefly texture or new host image was generated in this checkpoint.


## Scenic checkpoint · 13 September 2026 · supersedes backlog status above

New `garden-house-scenic.blend` → `.glb`: 392 editable parts, 16 runtime meshes, 44,524 triangles, 1,329,512 bytes. New `garden-landscape-scenic.blend` → `.glb`: 1,567 editable parts, 22 runtime meshes, 469,698 triangles, 4,460,400 bytes. Sources under `source/garden/production/`, exports under `assets/garden/production/`. Packed procedural textures; Draco exports; no foliage LOD yet. Includes actual terrain, lake/bank, paths, workspace pergola, low show deck and planting. Existing house/study/stall/greenhouse remain unchanged. Status: scenic development, not final art or production-integrated. Host remains pending. See `SCENIC-CHECKPOINT-2026-09-13.md` and QA source/performance receipts.


## Host source · user style correction · 13 September 2026

`source/garden/production/host/host-lineart-v1.png`: built-in imagegen source following two newly supplied user monochrome references. Simplified face/glasses, flat black/white casual standing figure. Prompt, generation/source receipt and unchanged reference provenance adjacent. White-background RGB; alpha extraction and world integration pending. Supersedes the realistic colour candidates. Geometry/scenic assets from preceding checkpoint unchanged.


## Host QA integration · 13 September 2026

Accepted simple monochrome host now displays in separate Garden QA. Original RGB + imagegen opacity map in `assets/garden/production/host/`; source/prompt/integration receipt retained. Shader map/alphaMap, approx1.78m at yard edge with contact shadow. No standalone RGBA output; matte contour remains a polish point for large display. See `HOST-CHECKPOINT-2026-09-13.md`. Production shell remains untouched.


## 14 September 2026 · Scenic refinement and UI proof

New editable `garden-landscape-finish.blend` → GLB: 1,869 source mesh parts,22 runtime meshes,408,642 triangles,4,302,752 bytes; packed textures. New procedural feathered gravel texture under textures/finish, new tree crowns and lower grass. Previous sources/exports preserved. Desktop/portrait static plate PNGs in assets/garden/production/stills/2026-09-14 (1,960,706B /536,156B). Combined actual-shell QA at docs/qa/garden-ui-2026-09-14; development proof, not deployed or default-route integration. Details: GARDEN-UI-PROOF-2026-09-14.md.


## SHOWS local static scene · 14 September 2026

| Asset | Source/runtime | Tool | Dimensions / bytes | Status |
|---|---|---|---|---|
| SHOWS landscape | assets/garden/shows/v1/shows-desktop.png (source output copied unchanged) | built-in image_gen | 1672×941 / 3,136,576 | integrated local; visual approval pending; web compression pending |
| SHOWS portrait | assets/garden/shows/v1/shows-mobile.png (source output copied unchanged) | built-in image_gen | 941×1672 / 2,919,476 | integrated local; visual approval pending; web compression pending |

Garden artwork governs identity; portrait derives from new desktop image. Exact tool-output provenance and hashes adjacent in provenance.json; full prompts in SHOWS-ART-PROMPTS-2026-09-14.md. No host/GLB/client documentary image added. Only the matching responsive image is requested on SHOWS entry; cold Garden requests neither. These are static scenic plates with photographed depth, not independent foliage layers or a free-camera environment.
