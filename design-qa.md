# V2.2 finish pass QA · 18 September 2026

Local and live browser checks: passed for the scoped refinements. Physical iPhone Safari acceptance: pending user retest.

Final scope and receipts: `docs/production/V2.2-FINISH-2026-09-18.md`; evidence: `fresh/qa/v2.2-resumed-finish/`. Live commit `d058ee2`.50 automated tests passed; 13 deployed resource hashes matched; laptop sign and 394×710 playlist smoke passed live without console warnings/errors. Local360×600,844×390 and1920×1080 checks passed. Growth starts with stems, then leaves and flowers; still mode disables all frame animation. Final profile leaves stay clear of text.

The earlier physical Safari report is not considered device-verified until the user retests the release. Background/lock-screen audio, heat/battery and real-device performance remain outside desktop viewport evidence. Latest screenshots are final implementation evidence, not user visual acceptance.

---

## Historical hotfix assessment

# V2.2 iPhone hotfix QA · 18 September 2026

final result: blocked

The physical Safari failure reported by the user is now addressed by a targeted geometry/visibility patch, with Chromium checks passing. **Physical Safari retest remains pending**, so the earlier generic passed assessment is not proof of iPhone acceptance.

Source evidence: the user's three attached iPhone screenshots in this task. Existing approved art references remain unchanged. Implementation and fix history: `docs/production/V2.2-IPHONE-HOTFIX-2026-09-18.md`. Browser-rendered evidence and measured responsive geometry: `fresh/qa/v2.2-iphone-hotfix/` (394×710,360×600,844×390 CSS pixels, DPR1). Screenshots are viewport captures without device chrome; they cannot be treated as1:1 full-device image diffs against the user screenshots.

- P1: music layer absent on the user's Safari. Replaced indefinite dimensions/nested fixed sheet with a definite dialog and inset sheet; disabled mobile top-layer fade dependence; set destination geometry before showModal. Local direct-entry/reopen/resize/list/transport tests pass. Blocker: verify the physical Safari retest.
- P2: scene labels and note overlap. Removed duplicate large mobile scenic labels, kept actual object hotspots and navigation; note/mini-player/navigation measured non-overlapping. Screenshot `phone-garden-mini.png`.
- P2: dense daily popup. Bounded scroll region and darker copy; screenshot `phone-daily.png`.

Fonts, colors, original image assets and content remain those of the approved art pass. This patch changes responsive spacing, positioning and visibility only.43 tests pass; local playback and console checked; publication receipt records the exact live files. Previous art comparisons and full report remain frozen in `fresh/checkpoints/2026-09-18-v2.2-art-review/`.

- [x] Preserve original art/content and before-hotfix snapshot.
- [x] Fix mobile geometry and overlap; test real browser scroll/play/reopen/resize.
- [x] Publish targeted repair under continuing user authorization.
- [ ] Confirm physical iPhone Safari retest; do not infer from Chromium.
