# Garden house spatial-flow review · 13 September 2026

## User intent and status

Following the user's concern about credible garden-house/lakeshore flow, the user approved the next step: a plan and veranda sightline study. This is approval to investigate and visualize the proposal, not acceptance of a new built layout. No scene assets, coordinates, routes or production camera were changed.

The existing three-dimensional architecture QA is still the earlier draft. This review adds a schematic plan plus a conceptual section for comparing current and proposed relationships. It is not a new perspective render or scenic art proof.

## Source measurements

From `composition-lock.json`, `camera-study.json` and `build-garden-house.py`:

- House centre x−14,z−6; front door faces +x toward courtyard.
- Main wall footprint after the root's 90-degree rotation: about 5m in world x × 7m in world z. Approximate door x−11.42,z−4.3.
- Water marker x−18,z8; existing diagnostic water ellipse is 7.6×3.6m. It reads as a garden pond, not evidence of a continuous lakeshore.
- Existing house root y−2.848684; porch plank top = root + 0.20 + 0.13/2 = −2.583684m.
- Diagnostic water y = terrain height at x−18,z8 + 0.03 = −2.132039m.
- Therefore study water is about 0.452m above the finished porch surface. These are model values from provisional terrain, not surveyed or approved site levels. They do not prove the real view is blocked, but confirm that a coherent garden-to-water grade has not been authored.

## Proposed relationship, holding existing landmark centres

Arrival → courtyard edge → front-door threshold. Reception stays on the +x face.

A veranda turns around the house's +z corner and opens toward water. The concept adds roughly a 2m-deep strip along that face, connecting to a roughly 2m-wide reception veranda at +x. These envelopes are study allowances, not construction dimensions. House shell/corner openings, steps, roof/drainage and accessible grade need development after agreement.

The viewpoint is near x−14,z−1.4; water centre is approximately 10.2m away. Preserve a low planted view corridor; taller planting belongs behind/along the outer sides. The suggested section has a gradual grade from veranda ±0.00 toward water −0.65m. This is a new provisional relative level, not already implemented terrain.

The main guest approach follows the courtyard edge instead of scattering visitors among separate destination objects. A secondary garden path connects music/workspace/greenhouse and the existing Shows allowance. These lines communicate physical relationships, not new free-roaming game controls or navigation routes. Existing `GARDEN · MUSIC · SHOWS · VISUAL · STORY` remains unchanged.

## What this solves and does not solve

The veranda study connects arrival and the water-facing living space without relocating landmarks. It gives house detail and planting a functional brief: a clear entry, a sheltered place to sit, and an open view corridor.

It does not yet create a true lakeside setting. If “home overlooking a lakeshore” is the intended world identity, the water should eventually read as a continuous shore with the body of water continuing outside the view, while remaining secondary in Garden composition. That would change the diagnostic ellipse/terrain treatment; this review has not silently applied or treated it as approved.

Next conversation should assess this physical sequence and clarify pond-versus-continuous-shore intent. Only then build the relevant house/terrain envelope and verify the actual veranda view. Do not resume the failed scenic draft blindly.

## Evidence

Interactive comparison (thread visualization source):
`/Users/alihuynh/.codex/visualizations/2026/09/13/01a09952-eff1-72d0-8315-8b84c3d70725/garden-house-flow.html`

QA screenshots and receipt: `docs/qa/garden-flow-2026-09-13/`. Both states checked at desktop and 390px; primary toggle updates plan and section. No runtime errors or horizontal overflow. Section label was moved clear of the proposed water line during visual QA.


## Update after “ok, tiếp tục”

The proposed L-veranda and downward garden-to-water relationship have now been built in new scenic sources. Water is 0.65m below veranda; the old ellipse is replaced with an extended lake bank retaining its water marker. Browser ray check verifies the seated view reaches water. The diagram remains a historical proposal; current geometry/limitations are documented in `SCENIC-CHECKPOINT-2026-09-13.md`.
