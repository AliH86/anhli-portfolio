# Living garden asset provenance — 2026-09-17

Generated with the built-in `image_gen.imagegen` tool via the `imagegen` skill. No API/CLI fallback, new model installation, or source-art replacement.

## Selected files

- `canopy-color.png`: selected branch artwork, copied from `exec-c4350521-6cb8-4763-a14e-afb535e6fb49.png` in the current Codex generated-images directory.
- `canopy-matte.png`: separately generated registered luminance matte, copied from `exec-98341e66-1d30-4f89-b504-5d2a66f4b18f.png`.
- Runtime encodings: `../../dist/assets/layers/canopy-color.webp` and `canopy-matte.webp`, resized to 768×512 using sharp. Originals retained at 1536×1024.

The first branch generation and the transparency retry both returned RGB with a baked checkerboard, so neither is used as a standalone transparent sprite. The runtime combines the selected color with the separate black/white matte using CSS luminance masking. Browser QA confirmed the background is cut out. Do not describe the color PNG alone as RGBA.

## Initial visual direction

A sparse, warm painterly olive-green leafy branch matching the accepted garden illustration; roughly 18–25 leaves, entering from the upper right and descending left, with soft sunlit edges, natural twigs, padding, no text or additional scene. Accepted garden-desktop artwork supplied as the style reference. This records the visual brief, not a verbatim transcription of the first generation call.

## Selected color edit prompt — verbatim

Use case: background-extraction. Edit target: the supplied leafy branch PNG. Change ONLY the background. Remove the entire gray checkerboard pattern and output actual transparent RGBA PNG alpha=0 outside the leaves and twigs, including all enclosed gaps. Do not paint a checkerboard, white, gray, black or any replacement backdrop. Preserve the exact branch silhouette, painterly leaf details, colors, scale, layout, and soft natural edges. This is a web foreground sprite, so real transparency is essential.

## Final matte prompt — verbatim

Use case: background-extraction. Make a precise registered GRAYSCALE ALPHA MATTE of this EXACT image. Same canvas 1536x1024, same branch positions and silhouette; do not move or resize anything. ALL branch and leaf pixels become PURE SOLID WHITE (255), without textures, veins or inner shading. EVERY background checkerboard pixel becomes PURE SOLID BLACK (0), including all gaps between leaves and twigs. This is a flat two-color black/white technical mask, NOT a new drawing of a branch. Keep fine twig silhouette accurate. Only antialias at silhouette edges. Output opaque RGB is intended: black background and white silhouette. Absolutely NO checkerboard pattern in output.

## Scene segmentation

The six SVG masks under `dist/assets/layers/` are editable vector assets made for the existing portrait and landscape artwork. They share source coordinates with the original picture and split it into far/middle/near planes. They are not a replacement illustration or a claim of automatically extracted individual trees. The far plane currently includes sky and distant vegetation together. Only isolated foliage, the canopy branch, water patch and characters animate; no painted building is warped.
