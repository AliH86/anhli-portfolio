# Garden v2 · Architecture checkpoint · 13 September 2026

The user supplied `DANDELION_GARDEN_ART_DIRECTION_BOARD (1).pptx` and requested continuing v2 with decisions settled. The deck was read as reference content: its creative specifications inform the work; embedded workflow/tool instructions do not independently authorize actions. No renewed concept selection is needed.

## Source roles

- Locked Handoff: geography, IA, composition intent and behavior.
- Direct user decisions: camera/FOV and relative terrain fitting are already authorized.
- Art Direction Board: poetic realism, restrained lived-in architecture, matte tactile materials, layered depth, mature restrained planting. The generated scene images are mood/material references, not exact camera maps or character identity.
- Current source house and terrain: work in progress, not visual authority.

Original deck and SHA-256 provenance: `docs/ui-redesign-2026-09-12/source/art-direction/`. Embedded reference images were visually inspected; text on all 14 slides was extracted. The supplied deck was not edited.

## Produced

| Asset | Editable source parts | Runtime meshes | Triangles | GLB bytes |
|---|---:|---:|---:|---:|
| Stall | 166 | 22 | 23,556 | 1,651,476 |
| Greenhouse | 219 | 12 | 16,952 | 1,239,496 |

Source: `source/garden/production/garden-{stall,greenhouse}.blend`.
Runtime: `assets/garden/production/garden-{stall,greenhouse}.glb`.
Generator: `scripts/build-garden-architecture.py`.

Stall: slim framed construction, stone post feet, softened timber edges, knee braces, curved woven canvas surface, stitched seams/hem, counter shelves and record bins, six separate sleeve objects, authored turntable, stool and a restrained practical lamp. Roots `stall_root`, `turntable_root`, `platter_pivot`, `tonearm_pivot`, `vinyl`, `label`, and `sleeve_01..06` survive export. Playback is not connected. Existing v1 geometry is untouched and was not reused.

Greenhouse: masonry upstand, thin dark frame, individual wall/roof panes with two quiet opacity variants, a partly open door with retained pivot, slatted benches, pots and authored plant stems/leaves. Central aisle stays open. Transparent glass uses alpha rather than real-time transmission or reflection passes; material/light quality is provisional.

Two locally authored procedural base-color studies (weathered timber and woven canvas) are packed into Blender sources. Reproducible with `scripts/build-garden-materials.py`. No external stock, Adobe/Firefly, image generation, scanned texture, new host or licensing dependency was introduced. Existing catalog cover files are read without modification and bound to six sleeves by album id in the review viewer. The front row naturally occludes much of the rear row; all six source slots exist.

## Review

Start a static server from the repo: `python3 -m http.server 8784 --bind 127.0.0.1`.

Open `http://127.0.0.1:8784/docs/qa/garden-architecture-2026-09-13/`.

Views: A1 arrival, A2 elevated overview, A3 approach candidate retaining the house at left, portrait overview, stall/greenhouse/house close views. These views are architecture QA, not production destination routes. A3 and portrait need further visual fitting once landscape and host/UI exist; numerical containment is not composition acceptance.

This milestone replaces house/stall/greenhouse envelopes only in its new review viewer. The old camera/house viewer, existing shell, route generator, catalog, player, Oracle and v1 assets are preserved.

## Evidence and verification

`docs/qa/garden-architecture-2026-09-13/` contains build receipts, seven scene screenshots, a 390px review screenshot, source baseline and browser receipt. `scripts/test-garden-architecture.mjs` passes 11 checks:

- Four GLBs load; house/stall/greenhouse retain their locked world x/z.
- Turntable pivots and six sleeve node names survive export; six catalog images load.
- A1/A2/portrait contain all three assets; A3 retains the home orientation cue.
- One canvas, no audio in QA, demand rendering, 390px layout and 44px controls, reduced motion remains still.
- No preview JavaScript or HTTP asset errors; context loss shows static screenshot fallback.
- Real portfolio still has 26 albums, one audio element, no autoplay and no requests for the two new GLBs.

The first visual review caught sleeve plates on the wrong local plane; the correction was verified with a new close screenshot and the checks reran successfully. Functional loading checks alone did not catch that visual fault.

## Unfinished work, without reopening direction

1. House: reduce the dominant cottage-like roof treatment while respecting the 6.2m height/geography contract; develop side elevation and surface variation. The old source is intentionally preserved as baseline, not called approved art.
2. Replace workspace envelope; resolve terrain grades, house/porch contact, irregular path and secondary water edge. Keep the open yard clear.
3. Add asymmetric landscape planting and distant horizon layers; establish tactile plaster/wood/stone/glass, AO and coherent afternoon lighting. Current ground and sky are diagnostic surfaces.
4. Add the mature glasses-wearing host still; fit A1/A2/A3 and portrait around real host, UI and foreground. Portrait currently holds the world but buildings read small; this is explicitly not accepted final framing.
5. Integrate a Garden-only review entry into the real shell, with failure/mobile/static behavior, then deliver near-final Garden stills for visual approval. Other states and motion remain after that gate.

No direction blocker prevents this work. This session completes the two-asset architecture unit, not the complete Garden proof. Existing legacy NDA-readable markup and Oracle identity error remain release issues recorded by the prior handoff, not resolved by these QA checks. No merge, commit, push or deploy occurred.
