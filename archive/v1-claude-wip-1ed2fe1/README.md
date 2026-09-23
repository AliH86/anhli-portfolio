# claude-wip · commit 1ed2fe1 · V1 single-file site · reference only

`1ed2fe14434c5a20ef9c95774cc72668f7bdf9e8` (Ali Huynh, 2026-06-29), parent `9255f3f` (on `main` history).
It only ever lived on the local branch `claude-wip` in the canonical clone; it was never pushed and is not in
`website-archives/2026-09-17-v1-before-garden/portfolio-history.bundle`. Preserved here on 2026-09-23
(Li World Phase 0.5) before the local branch was retired.

> feat: theme base token hoá + skin layer; share deep-link album/bài; nền thể loại dịu hơn; fix reveal tiêu đề; gallery Xem thêm

One file changed: `index.html` (+1341 / −100) of the V1 single-file site, retired from live on 2026-09-17.

## What is unique

| Part | Status |
|---|---|
| Share deep-link album/bài, softer genre backgrounds, heading reveal fix, gallery "Xem thêm" | Re-implemented on `main` in `bf4545f` (on the dandelion theme `a85da68`), fixed in `a8bfcbb`. Not unique. |
| **Theme base tokenisation**: RGB companions (`--amber-rgb`, `--pink2-rgb`) so every `rgba()` goes through a token | Unique, never on `main` |
| **SKIN LAYER**: campaign "lớp áo" per album/message: `:root[data-skin="…"]` token overrides, `.skin-decor` fixed decoration layer (empty by default), `?skin=name` URL switch, `window.setSkin(name)`, sample skin `sample` (teal) | Unique, never on `main` |

78 added lines never appeared in any `index.html` version on `main` after `9255f3f`. Almost all are the tokenised
`rgba(var(--amber-rgb),…)` rewrites and the skin layer; a handful are small variants of the deep-link code
(e.g. handling deep-links on inline data when `music-data.js` fails to load).
It is obsolete for V2 (different runtime) but is a worked example of per-album/campaign skins, a possible Li World idea.

## Files

- `claude-wip-1ed2fe1.bundle`: git bundle, exact commit and hash. Requires `9255f3f` (present in this repo).
  `git fetch archive/v1-claude-wip-1ed2fe1/claude-wip-1ed2fe1.bundle claude-wip:claude-wip`
- `1ed2fe1.patch`: `git format-patch` of the same commit. `git checkout 9255f3f && git am 1ed2fe1.patch`
  reproduces `index.html` byte for byte (verified).
