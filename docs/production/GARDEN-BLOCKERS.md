# Garden production blockers · checkpoint A

## Current status — resolved by user direction

The user explicitly approved on 12 September: “cho phép, thật ra khi lên terrain sẽ có sai độ, anh ok, việc của em là dựa vào có thể cân tương đối để output ổn là đc”. Camera/FOV and terrain elevation can be adjusted to achieve a coherent visual output. Numeric frame measurements are reference aids, not a reason to block production. Keep landmarks, identity and composition intent. No further approval is required for routine camera fitting. The mobile issue below is historical diagnostic evidence, not an active permission blocker.

## DESIGN BLOCKER: portrait camera interpretation

Locked source: G-04 says same A1 anchor with FOV 52, and house/stall/host inside the 9:16 frame. G-01/G-05 specify A1 FOV 38 and desktop 16:9 landmark placement. Three.js uses vertical FOV; the source does not label the convention.

Keeping camera position/orientation unchanged under this convention gives the horizontal scale factor:

`(16/9 × tan(38°/2)) / (9/16 × tan(52°/2)) = 2.2312335`

Applying it directly to the source rectangles puts the house centre at x−20.28% and stall at x121.40% of the portrait frame. Both complete rectangles are outside the viewport. This result is independent of terrain, object dimensions and the fitted camera. The actual Blender GLB/Three.js view independently reproduces the clipping.

Evidence: `docs/qa/garden-proof/index.html`, reference-mobile.png, study-locked-mobile.png, projection-receipt.json, browser-receipt.json.

Concrete diagnostic alternatives, not proposed final acceptance:

- Keep 52° and move the camera: the current retreat study places house/stall centres inside, but makes the structures too small. It preserves direction/pitch, translates about 39.74m and does not match the reference sizes.
- Keep pose and use vertical FOV 94.84°: preserves desktop horizontal coverage but changes vertical scale and conflicts with the 52° number.

Decision received: dedicated camera/FOV fitting and relative terrain adjustments are authorized. The two diagnostic examples are not final mobile solutions. Neither has been applied to the portfolio.

## Other source ambiguities; not yet proven blockers

- World plate says origin is yard centre, while yard bounds x−6..8,z2..12 have midpoint (1,7). Keep the explicit ranges; do not shift coordinates.
- A1 prose says water is on the right of the frame; WP-01 places it at x−18,z8. The coordinate controls this study. Screen visibility has not passed.
- The complete x/z camera poses and terrain y values are not numeric locks in the source. The fitted values are study assumptions.
- Four A1 envelope centres meet tolerance, but size/silhouette, horizon, yard, host and UI clearance have not passed. The house study envelope is wider/taller than the target; do not mark A1 complete from centre metrics.
- A2 numeric lift test with the same x/z/yaw and geometry gives a maximum centre error of 3.12%, just outside 3%. This is a failed first candidate, not proof that no valid camera exists. A2/A3 still need a joint camera study; do not animate travel before that.

## ASSET BLOCKER

- No matching approved host asset was found in the inspected v1 pack. The existing youthful seated/no-glasses host conflicts with the mature illustrated standing arrival brief. A new source candidate must be produced and reviewed; generation is available, so this is a backlog dependency rather than a tool outage.

## TECH BLOCKER

- None for local Blender export or Three.js diagnostic rendering: both completed successfully.
- Prior release issues remain unverified: source-readable legacy confidential content and the Oracle identity error. This checkpoint neither resolves nor reclassifies them.


## 14 September 2026 · Startup finding narrowed

The historical `Missing Garden Oracle source data for identity 0` load-order bug was reproduced by delaying either cards or profiles, then fixed through ordered defer tags in the route source. Both delayed cases now produce 78 identities without page errors; content source files unchanged. Evidence: docs/qa/shows-2026-09-14/oracle-{before,startup}.json. This resolves that specific race only. Other release content/privacy checks, actual-device profiling, scenic approval and final host animation remain pending.
