# Garden performance budget

These are provisional planning targets, not measured acceptance or authorization to degrade hero art. Revisit against actual devices and the approved static scene. Capture geometry, texture memory, GPU time and visual quality separately.

| Metric | Desktop planning target | Mobile planning target | Current diagnostic study |
|---|---|---|---|
| Draw calls | Aim ≤150 in settled Garden | Aim ≤80 or static fallback | See browser-receipt.json; 5–6 calls on captured views |
| Visible triangles | Aim ≤500k with authored LOD | Aim ≤180k or same-composition still | 36,830 exported triangles; actual visible count varies by camera/frustum |
| Initial Garden payload, excluding catalog/audio | Aim ≤12 MB, staged loading | Aim ≤6 MB, or optimized still first | 0.679 MB uncompressed GLB; no production textures |
| Texture memory estimate | Aim ≤128 MiB | Aim ≤64 MiB | Zero textures in GLB; not representative of production |
| DPR | Cap 1.5 initially; evaluate quality | Cap 1.25 initially | QA viewer fixed at 1.5 |
| Settled rendering | Render on demand until approved motion exists | Same, reduced motion fully still | No idle animation loop; checked in browser |
| Frame time | Target 60fps after interaction, measure p50/p95 | Target stable 30fps minimum on agreed device class | Not benchmarked; no runtime performance claim |
| Loading / failure | Progress + retry/static fallback; avoid blank canvas | Same hierarchy and touch UI | Production fallback not implemented by diagnostic viewer |

The study does not budget the existing duplicated legacy HTML, actual music/catalog images or Oracle payload. Those must be measured during runtime integration and release cleanup. Optimizing this envelope GLB is not a substitute for profiling the final world.


## Architecture checkpoint · 13 September 2026

- Four loaded GLBs: 4,783,952 bytes total; newly authored stall + greenhouse: 2,890,972 bytes. This is a QA bundle, not an initial production request policy.
- A1: 99 renderer-reported draw calls / 196,958 submitted triangles. A2/A3/portrait: 100 / 197,004. These counters include shadow and transparent passes; do not present them as unique scene geometry.
- QA capture used DPR 1 on desktop/headless viewport, configured cap 1.5. A resized desktop browser is not a real mobile GPU test.
- Six original catalog covers: 731,196 compressed bytes, approximately 11.0 MiB RGBA8 with full mip chains. This excludes embedded wood/canvas maps, shadow map, depth buffers and render targets.
- Current portrait review exceeds provisional 80-call/180k-submission targets. Production mobile must use a separately profiled shadow/LOD policy or same-identity static fallback; do not lower the approved art target silently.
- Demand rendering and reduced motion are verified; GPU frame time, device memory and production network budget remain unmeasured. No runtime performance acceptance is claimed.

Evidence: `docs/qa/garden-architecture-2026-09-13/performance-receipt.json` and browser receipt.


## Scenic checkpoint · 13 September 2026 · current candidate

- Four review GLBs: 8,680,884 bytes; 554,730 unique triangles. New house+landscape use Draco; decoder payload is additional (58,456-byte wrapper + 192,420-byte WASM, plus loader; JS fallback 512,465 bytes only when needed). Catalog covers and module/HTML payload remain additional.
- Camera-dependent submissions: 83–150 draw calls, 1,056,586–1,110,518 triangles including shadows. These are not unique geometry or a GPU benchmark.
- Desktop unique geometry is slightly over the ≤500k planning aim; mobile exceeds ≤180k/≤80calls/≤6MB planning targets. Do not ship this full candidate to mobile as accepted. Need LOD/shadow reduction or an optimized still with the same composition. Compression alone does not reduce GPU work.
- One renderer/shared decoder, on-demand rendering, reduced motion, context loss and unavailable-WebGL static fallback pass. DPR cap1.5; headless capture DPR1. Actual-device memory/frame-time and production network timing remain unmeasured.
- Evidence: `../qa/garden-scenic-2026-09-13/performance-receipt.json`, `browser-receipt.json`, `verified-frames.json`.


## 14 September 2026 · Current landscape + static proof

Four GLBs:8,523,236 bytes /493,674 unique triangles (excluding host/sky); desktop provisional geometry aim met, actual-device frame time remains unmeasured. Landscape final408,642 tris; intermediate324k draft superseded to improve leaf silhouettes. Static UI proof loads desktopPNG1,960,706B or portraitPNG536,156B; no GLB/Three/Draco. This excludes unchanged site HTML/fonts/catalog/audio. See garden-finish-2026-09-14/performance-receipt.json and garden-ui-2026-09-14/browser-receipt.json.
