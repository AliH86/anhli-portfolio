# Vườn của Li — local polish · 17/09/2026

Continues the accepted refinement checkpoint. Implemented locally and reviewed in the Codex in-app browser; this new pass is not yet user-approved. No commit, push, merge, deployment, or storage-permission changes.

Preview: http://127.0.0.1:8791/ . Runtime remains `fresh/dist/`. The earlier accepted ZIP is untouched. Runtime changes are limited to `index.html`, `app.js`, and new `polish.css`; existing styles, raster artwork, source files, and all catalog/gallery/profile/video JSON are unchanged.

## Đã làm

- Updated welcome copy: **Ghé vườn nhà Li chơi chút nha. / Nghe vài bài hát Li sáng tác.**
- Small, irregular foliage motion with distinct 23s/31s timing and rest intervals; smaller water movement. Existing hidden-page, open-tray and reduced-motion safeguards retained.
- Very light warmth placed in the artwork's coordinates around the stall/host, subdued hover outlines, stronger keyboard focus. Existing character scale, poses, ground shadows and grass preserved.
- Warmer sleeve-like trays, softer borders and cover shadows, larger mobile album artwork and touch controls.
- Gallery now presents full image proportions and simple paper borders without cropping artwork to a repeated portrait grid. Original order, lightbox, pagination and videos retained.
- Same-album taps preserve audio; switching to another album still waits for Play. Closing gallery restores idle/listening pose. Late video-data successes/failures cannot overwrite another tray. Focus returns after closing video or loading more photos.
- Fixed excess page height on short landscape screens. Versioned the changed script/style URLs so reloads pick up the polish.

## Background listening

One persistent native audio element remains outside content trays. Visibility changes only stop decoration. No audio pause/recreation is tied to hiding the page, changing layout, or closing a tray.

Added Media Session metadata, Play/Pause/Stop, previous/next, and seek actions. Unsupported actions safely fall back. On explicit Play, browsers exposing `navigator.audioSession` receive the `playback` category hint. Native play/pause and return-to-page state now reconcile with actual playback so interrupted audio does not leave a misleading Pause button.

References checked: [Media Session actions](https://developer.mozilla.org/en-US/docs/Web/API/MediaSession/setActionHandler), [AudioSession type](https://developer.mozilla.org/en-US/docs/Web/API/AudioSession/type).

**Not verified:** physical Safari/iPhone/iPad, Chrome/Android, app-switch/lock-screen playback, phone-call interruption recovery, battery or thermal behavior. A second in-app tab left the first track progressing from 39.01s to 96.49s, but did not expose a hidden-document state. This is not evidence of real OS background playback. The site cannot guarantee uninterrupted playback when the OS suspends/kills a browser or another app takes audio focus. Do not force autoplay to override user/OS interruptions.

## Song protection — exact current boundary

`controlslist="nodownload"` and suppression of the audio element's context menu discourage ordinary download controls. The page exposes no song-download button. These measures do **not** protect the underlying files. All existing mapped public R2 URLs remain unchanged and retrievable. No credentials were accessed and no bucket access was changed.

The concrete storage migration needed for stronger protection:

1. Inventory existing live consumers of the same R2 URLs, including the older portfolio, before disabling public access.
2. Serve music from a private bucket through a server endpoint that resolves stable track IDs. Keep storage credentials and the object map server-side.
3. Grant time-limited playback access and support byte-range seeking. Renew access without replacing the active audio element or interrupting playback. Test long listening and background resume before restricting existing links.
4. After the new path is verified and publication is separately approved, remove public object URLs from the client catalog and disable the public storage paths. Keep a rollback path for existing live consumers.

This migration is **not implemented or enabled**: it requires the actual hosting/storage access and a separately reviewed publication change. Signed URLs reduce persistent link sharing; a listener with valid access can still capture audio. No complete anti-download/anti-recording guarantee is possible for audio delivered to a listener.

Provider references: [R2 public access](https://developers.cloudflare.com/r2/buckets/public-buckets/), [presigned access](https://developers.cloudflare.com/r2/api/s3/presigned-urls/), [download control semantics](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList).

## QA

- In-app visual QA: desktop **1440×900**, phone viewport **390×844**, tablet viewport **820×1180**, landscape **844×390**. These are viewport simulations, not physical devices.
- Real browser audio observed for Có Ai Nghe Không, Quên Vầng Trăng Thề, Mảnh Tình Treo Trăng and Ngọn Đèn Ngoài Xa. Quên Vầng Trăng Thề progressed beyond two minutes through profile, tab and viewport/layout changes. All 213 mapped tracks were not individually tested.
- Tested explicit Play, Pause/resume, seek control, next track, repeated album changes, same-album preservation, tray closing, both layouts, gallery/lightbox, video fallback, résumé, Enter/Escape and focus restoration.
- Manual motion-off kept content visible with foliage animation `none`; the existing system reduced-motion CSS path is retained. OS-level reduced-motion emulation was unavailable in this browser interface.
- Eleven deterministic regression tests passed; browser console capture contained no warnings/errors. Initial same-album browser check failed; versioned module reload and retest passed. Both results are retained in the receipt.
- All **387 local runtime files** returned HTTP 200. Comparison to all **386 checkpoint entries** found only app.js/index.html modified and none missing; polish.css is the added file. Every existing artwork/data file is unchanged.
- Initial file budget approximately **658 KB desktop / 564 KB mobile**, about 11 KB above the checkpoint. This is file size, not load-time, memory, CPU, battery or GPU measurement. No raster assets, libraries or engines added.

Evidence: `fresh/qa/polish-2026-09-17/` contains screenshots, `browser-receipt.json`, `static-receipt.json`, `unit-tests.txt`, the final SHA-256 manifest, and before copies of the two edited runtime files. Test source: `fresh/scripts/test-polish.mjs`.

## Còn lại

Physical device background/lock-screen validation; actual storage protection migration; external video playback (Vimeo remained blank in the in-app browser while the source link was available); the existing 13 unmapped track URLs and factual currency of résumé. Do not classify unmapped tracks as missing storage files. The accepted earlier snapshot remains available for comparison.
