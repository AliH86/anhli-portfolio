# Garden scenery + real-shell static proof · 14 September 2026

## Outcome

Continued from the accepted house/garden flow and approved simple monochrome host. Built a new landscape version and combined fresh scene renders with the actual existing HTML shell/content/player in an isolated QA copy. No original index, route, JS/CSS engine, music data, approved artwork or earlier geometry was changed.

Primary review: http://127.0.0.1:8784/docs/qa/garden-ui-2026-09-14/
3D detail review: http://127.0.0.1:8784/docs/qa/garden-finish-2026-09-14/?view=house

## Scene changes

- Three crown profiles, asymmetric main/secondary branches and layered foliage replace the repeated umbrella-like crowns. Three-segment leaf strips preserve silhouette better than the initial two-segment optimization; this final version has 408,642 landscape triangles (the intermediate 324k version is superseded).
- Lower, less obstructive grass, darker varied ground and a warmer bank transition. Procedural RGBA gravel map softens path boundaries while keeping geometry, paths, water level and landmark positions.
- Viewer light balance adjusted: warmer restrained sun, less hemisphere fill and lower water metalness. This is a development light pass, not a final light bake or photoreal material acceptance.
- House/porch, stall, greenhouse and monochrome host are preserved. Water remains 0.65m below veranda; ray sightline and open yard still pass.
- New source `source/garden/production/garden-landscape-finish.blend`: 1,869 editable mesh parts, textures packed. Export `assets/garden/production/garden-landscape-finish.glb`: 22 meshes, 408,642 triangles, 4,302,752 bytes.
- Build scripts `scripts/build-garden-finish.py`, `scripts/build-garden-finish-texture.py`; generator uses the existing helper/camera study and outputs a new source rather than rewriting approved files.

## UI proof and performance boundary

`build-garden-ui-proof.mjs` copies the existing root HTML engine/shell into `docs/qa/garden-ui-2026-09-14/index.html` with the root-relative base and adds only local proof CSS/JS. The same content, MAP, route handling and single existing audio element run in that document. It is NOT a second player, rewritten UI mockup, default-route integration or deployed site.

Static plate files in `assets/garden/production/stills/2026-09-14/`: desktop 1,960,706 bytes, portrait 536,156 bytes. Source screenshots are generated directly from the new Three scene with the caption hidden (capture-plates.mjs). Picture media selection uses the portrait on narrow screens. No GLBs/Three/Draco are loaded by the static proof. PNG size is not total site payload; existing HTML/music/catalog/fonts still load.

Four GLBs total 8,523,236 bytes / 493,674 unique triangles, excluding host/sky. That is below the provisional desktop 500k geometry aim, but no actual-device GPU performance approval is claimed. Full 3D is still a separate diagnostic viewer; mobile proof uses a still.

Headline uses #23261f on light sky; desktop copy avoids the foreground canopy, header stays readable, Explore cards sit below the host. Mobile keeps MAP reachable and allows vertical/horizontal browsing; the mini-player follows the Explore content instead of covering its cards. Portrait crop still prioritizes host/home/workspace, with the stall outside the picture; it remains reachable through the actual navigation.

The QA shell navigates with the existing history/routes while the document stays loaded. Refreshing a canonical route or opening a destination in a new tab uses the existing normal route page, not this proof. Do not describe it as production-integrated. A later approved implementation should wire the plates/scene into the route builder deliberately.

## Verification

11/11 `test-garden-finish.mjs` checks pass: fixed geography, levels, seated ray to water, planting clear of yard, host placement/visibility, real covers, idle rendering, 390px, reduced motion and unavailable/lost-WebGL fallback. Reopened Blender source with all used external images packed: pass.

8/8 `test-garden-ui-proof.mjs` checks cover actual 26-album shell, one stopped player, no 3D downloads, scene load and ink headline, Explore/MAP keyboard behavior, Music/album selection without player remount/autoplay, route return, portrait layout, reduced motion/no-WebGL and no unhandled script errors. Fresh screenshots cover desktop/mobile arrival/Explore, mobile MAP and Music. Preservation SHA receipt confirms all starting assets/source/engine files unchanged.

## Remaining work

The scene is visibly improved but still a stylized development render: foliage species detail, near-ground texture variation, water/reflections, final light/AO and host mask contour can improve. No near-final visual approval is claimed from passing technical tests. Review this combined UI composition before moving to final Garden art/route integration. Other-state motion, public release and actual-device performance acceptance remain pending. No commit/push/deploy.
