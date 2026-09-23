# Garden scenic checkpoint · 13 September 2026

## Outcome and authorization

The user's “ok, tiếp tục” follows the house–yard–veranda–lakeshore proposal. Implemented that proposal as new editable source and a separate local 3D review. It supersedes the earlier pause and “not applied” status in the spatial-flow diagram. It is authorization to develop this scheme, not acceptance of the final Garden art.

Review: http://127.0.0.1:8784/docs/qa/garden-scenic-2026-09-13/?view=house

## Built

- House remains centred at x−14,z−6, door toward +x. Broader body and raised eaves retain the 6.2m height intent. Recessed side windows, stone plinth, gutters, downpipes, bench, shutters, lantern and a connected L-shaped veranda add depth and inhabited detail.
- Reception stays on the yard side. The veranda wraps to the water-facing side with seating and garden steps. Finished veranda y−2.583684 and water y−3.233684 give a 0.65m drop. This is a designed spatial relationship, not surveyed construction data.
- Replaced the little ellipse with an extended western lake and shaped bank; original water marker x−18,z8 stays within water. From the seated veranda viewpoint, an actual scene ray reaches the water before other geometry.
- Sculpted terrain, connected path branches, a workspace pergola/table, restrained timber show deck, 18 trees, 15 shrub clusters and 2,015 grass clumps. Open yard x[−6,8],z[2,12] remains free of planted trunks and props. Broad leaf and grass geometry is locally authored.
- New editable sources: `source/garden/production/garden-house-scenic.blend` (392 mesh parts), `garden-landscape-scenic.blend` (1,567 mesh parts). Textures are packed; source reopening verified. Old house, study, stall and greenhouse sources/exports remain unchanged.
- New exports: house 1,329,512 bytes / 44,524 triangles; landscape 4,460,400 bytes / 469,698 triangles. Runtime batches use material groups and Draco; editable sources are saved before batching. Existing stall and greenhouse remain in the review unchanged.
- New generators: `scripts/build-garden-scenic.py`, `scripts/garden_authoring.py`, `scripts/build-garden-scenic-textures.py`. Build with Blender 5.2.1; source textures are deterministic procedural studies, not stock or generated photos.
- Local Three r186 Draco loader/decoder under `js/vendor/three/`; URLs, SHA-256 and license included in `draco/provenance.json`, `README.md`, `LICENSE`. Loader import adapted to the existing relative module path. Uses one shared loader, two workers and disposal. Reference: https://threejs.org/docs/pages/DRACOLoader.html

## Verified and limits

`scripts/test-garden-scenic.mjs`: 11/11 pass; browser receipt includes actual checks and ray-hit evidence. Source audit passes. Six fresh screenshots inspected: arrival, overview, house, veranda, shore and mobile. 390px layout and no-WebGL screenshots also saved. Review has no JavaScript/shader/HTTP errors, no idle render loop, one canvas and six real catalog covers. Existing portfolio still has 26 albums, exactly one audio element, stopped playback and no new scenic requests.

Four GLBs total 8,680,884 bytes and 554,730 unique triangles. Renderer submissions include shadow passes: up to 150 draw calls / 1,110,518 submitted triangles. These are not GPU timings. This QA scene exceeds provisional mobile geometry/payload budgets and slightly exceeds the desktop unique-geometry aim; Draco reduces network size, not draw cost. No actual-device performance approval.

Visual inspection: the arrival/side-veranda relationship now reads and vegetation anchors the buildings. It still looks like a development render: tree crowns are too similar, foreground groundcover and shore materials are schematic, water has only a small ripple normal, lighting has no final AO/light bake. Portrait contains the house but landmarks read small and the stall sits at the edge. Do not label this mature poetic realism or near-final Garden.

## Next bounded work

1. Improve vegetation identity, natural bank/ground transitions and tactile material/lighting. Keep this accepted spatial direction and retain source editability.
2. Add the agreed adult host with glasses/soft build; fit final desktop/portrait views together with the actual UI, preserving one real player and content routes.
3. Prepare LOD/shadow policy or same-composition still for mobile. Measure on actual target devices during Garden-only integration.
4. Deliver the near-final static Garden proof for visual approval before other-state motion or full rollout. No publish/commit/push was performed in this checkpoint.

Evidence: `docs/qa/garden-scenic-2026-09-13/{browser-receipt,source-receipt,performance-receipt,preservation-receipt,capture-receipt}.json`. Earlier failed/draft logs are retained as history; current successful build is `build-web.log`.
