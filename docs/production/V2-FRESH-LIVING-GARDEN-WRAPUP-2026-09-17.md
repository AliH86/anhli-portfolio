# Fresh V2 — living garden follow-up

Local preview: http://127.0.0.1:8791/ . Runtime: `fresh/dist/`. Supersedes the previous polish checkpoint for continued local work. The accepted refinement ZIP and unrelated repository changes remain untouched. No commit, push, merge or deployment.

## Implemented from the follow-up notes

- Header order: **GHÉ CHƠI · NGHE NHẠC**.
- Standing Li is nearer the house, with feet on the path. Listening Li sits beside the stall. Opening the gallery keeps the existing gallery pose/location; closing it returns to idle or listening according to playback.
- Welcome copy is now a speech balloon with small symbols and rotating gentle lines. The small arrow requests another line. The balloon passes pointer events through to scenic hotspots.
- Floating music notes follow actual playback. They stop floating with the motion toggle and remain visible as a static playing indicator.
- Device-local clock and four automatic light phases: dawn 05–07, day 07–17, dusk 17–19, night otherwise. Clock button cycles Auto → Day → Night. No location or timezone permission is requested.
- Daytime bird silhouettes and a small night owl. Night has a cool grade and soft lantern halos.
- Independent **Tiếng vườn** toggle, off on entry. Sparse synthesized bird/wind/cricket/owl episodes occur every 110–210 seconds after the first opt-in sound. They can mix with songs at a quieter level. This is synthesized sound design, not recorded wildlife audio.

## Layer structure and animation

1. Far plane: sky plus distant foliage.
2. Middle plane: house, stall, path and remaining garden.
3. Water/soft lighting and small plants placed behind Li where appropriate.
4. Li and contact shadows.
5. Near plane: the original foreground foliage reprojected through its own mask, above Li; additional isolated plants and a masked canopy branch.
6. Color atmosphere, floating notes, object labels and dialogue; application controls above the scene.

`fresh/dist/assets/layers/layers.json` holds the editable source-space silhouettes. Six SVG masks split the accepted source art into complementary planes without changing the source WebP files. Portrait and landscape each have their own masks. All three pictures reuse the same source URL at the same cover registration. The far plane has sky and distant trees together; this is not yet a separate cutout for every painted tree or a clean sky-only plate.

The new canopy uses a generated color image plus a registered luminance matte. Lower plants reuse the existing transparent foliage asset, with softened bases. Independent 14–27 second loops give the plants different wind timing; buildings and ground remain still. Motion stops with the manual toggle, reduced-motion preference, hidden page, or an open content tray where applicable.

Asset originals and full selected prompts: `fresh/source-art/living-garden/PROMPTS.md`. Runtime canopy pair adds about 267 KB; all new runtime files together add about 292 KB before transfer compression. No framework or rendering engine was added.

## Verification

- 17/17 Node regression checks passed: prior 11 player/view tests plus 6 clock/ambient lifecycle tests.
- Browser inspected at desktop 1440×900, portrait 390×844, tablet 820×1180, landscape 844×390. Screenshots and receipts: `fresh/qa/living-garden-2026-09-17/`.
- Album selection remained paused until Play. Actual music played with the tray closed. Ambient context ran alongside the song; switching ambience off left the song playing with advancing time and unchanged volume.
- Night grade and owl visibility verified; a night owl sound episode was scheduled with its context running. Sound waveform generation was checked functionally, not independently judged by listening.
- Gallery changes Li to the gallery pose; plants pause behind the tray. Manual motion off produces `animation-name: none` on all six foliage elements.
- All newly referenced local files returned HTTP 200. Original art and data match the preceding polish SHA-256 manifest. Only `index.html` and `app.js` changed among previously existing runtime files; living-garden CSS/JS and layer assets are additions.

## Still limited

Physical iPhone/iPad/Android app switching, lock screen and browser-specific interruption behavior remain unverified. The native music element and Media Session support are retained; ambience never calls music pause/play or routes the song through Web Audio. Ambience silences itself when hidden. Background playback cannot be promised across every OS interruption or browser suspension.

Download deterrents from the previous pass remain UI-only. Public R2 audio URLs have not become private. Real access protection requires private storage and server-issued expiring access; none was deployed here. Previous embedded-video limitations and original-provider fallback links remain unchanged.

This local implementation is ready for visual review, not recorded as user-approved artwork or production deployment.
