# V2.2 art iteration · 18 September 2026

These are original generated PNG assets, produced with built-in ImageGen against the user's UI-kit and full-scene references. The garden, character, and actual catalog covers are preserved separately. Runtime derivatives are WebP in `dist/assets/ui/`.

| Source | Runtime use | Notes |
| --- | --- | --- |
| console-rim.png | Player, navigation, ledger, memory board, mini-player | 2136×491 RGBA; transparent aperture; nine-slice preserves corners across dimensions. |
| album-frame.png | Album sleeves and letter backing | 1254² RGBA. Native aperture ≈70.5%; nine-slice uses a narrower 20px border to avoid masking cover art. |
| stall-sign.png | Music heading over the awning | 1774×887 RGBA; transparent ropes/exterior, solid wooden face. Blank center holds live accessible UI heading. |
| letter-bouquet.png | Outside left edge of profile letter | 887×1774 RGBA; blank paper tag, tied daisies. Reduced on phones to protect reading width. |
| leafy-corner.png | Gallery rims and selected record corner | 1254² RGBA; center/bottom-right clear. Curved stems, varied small blooms; pointer-events disabled. |

All assets were visually inspected and verified for alpha. Rejected outputs with baked checkerboards were not shipped. Source PNGs are retained; runtime images use quality88–90/alpha100. No generated raster contains the catalog text.

Heading font: Dancing Script600, downloaded from the official Google Fonts CSS endpoint and self-hosted. Its OFL is shipped in `dist/assets/fonts/Dancing-Script-OFL.txt`; no runtime external font request. Main body/track text keeps Georgia and GardenSans for readability. Standard interface icons remain licensed Phosphor.

References: `ChatGPT Image Sep 18, 2026, 07_57_20 AM (1).png` (scene) and `ChatGPT Image Sep 18, 2026, 07_57_21 AM (2).png` (kit), in the user's Downloads folder.
