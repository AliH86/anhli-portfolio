# Dandelion Hero Handoff

## What Changed

- Replaced the old hero visual direction with a dandelion field poster scene.
- Removed the visible ghost-reveal hero layer and current water/shader-led look from the hero surface.
- Added a separated theme skin layer so future themes can swap visuals without rewriting page content.
- Added dandelion wind particles across the hero and site.
- Added responsive hero art direction for desktop, square/tablet, and mobile ratios.
- Mobile hero now follows the older poster structure: portrait upper, content lower, gradient/grass transition between them.
- Extended dandelion from hero skin to full-site skin: palette, section texture, card/player tone, dividers, footer, frame decor.

## Key Files

- `index.html`
- `THEME_GUIDE.md`
- `images/hero/dandelion-field.png`
- `images/hero/anh-li-cutout.png`
- `images/hero/anh-li-cutout-softedge.png`
- `images/themes/dandelion/seed.svg`
- `images/themes/dandelion/corner-meadow.svg`
- `images/themes/dandelion/grass-line.svg`
- `images/themes/dandelion/paper-bloom.svg`

## Theme API

Themes are registered in `window.ANHLI_THEMES` and mirrored as `window.ANHLI_THEME_LIBRARY`.

Use:

```js
applyAnhLiTheme('dandelion', { persist: true });
applyAnhLiTheme('ocean', { persist: true });
```

Saved theme key:

```text
localStorage["anhli-theme"]
```

## Hero Layer Order

From back to front:

1. Field background
2. Atmosphere/grade/tint
3. Anh Li cutout
4. Dandelion seed wind
5. Foreground grass
6. Core content/CTA/nav

## Motion Behavior

- `body.no-motion` disables hero/theme motion and particles.
- `body.no-season` hides seasonal decoration while preserving content.
- Mobile no longer shows the automatic motion nudge tooltip because it can cover hero content.

## Current Visual Direction

- Desktop: wide meadow poster with Anh Li on the right and editorial text on the left.
- Square/tablet: portrait remains readable without being overly buried in grass.
- Mobile: inspired by the old hero poster composition, with portrait at the top and text below.
- Portrait skin is not retouched or color-filtered to avoid plastic skin.
- Cutout edge is softened through alpha feathering, not face smoothing.

## Verified

- HTML parse OK.
- Inline JS parse OK.
- Checked via local server at `http://127.0.0.1:8765/index.html`.
- Manually inspected mobile, square/tablet, and desktop ratios through localhost screenshots.

## Future Theme Direction

The architecture is ready for monthly/seasonal theme skins, for example:

- `dandelion`: current field, seeds, grass, soft green paper tone.
- `ocean`: future concept for `Cả Biển Trời Trong`, with ocean background, bubbles/fish/sea particles, and alternate Anh Li or D'Li cutout.

Future themes should add assets under:

```text
images/themes/<theme-name>/
```

Then register the theme object in `ANHLI_THEMES`.

## Full-Site Skin Notes

The dandelion theme now owns:

- Global palette tokens.
- Section backgrounds.
- Decorative line/corner assets.
- Player, album, gallery, work and contact card tones.
- Marquee/footer tone.

Future themes should follow the same asset slots instead of adding one-off CSS.
