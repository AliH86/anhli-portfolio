# Theme Skin Guide

The site is split into two layers:

- Core content: navigation, copy, sections, music/player/gallery/work/contact.
- Theme skin: hero background, hero cutout, foreground, particles, cursor tone, section decor.

The current active theme is set on `<body data-theme="dandelion">`.

## Runtime API

Themes are registered in `index.html` under `ANHLI_THEMES`.
The same object is also exposed as `ANHLI_THEME_LIBRARY` so future UI controls can list available themes without touching page content.

Use this in the browser console or future controls:

```js
applyAnhLiTheme('dandelion', { persist: true });
applyAnhLiTheme('ocean', { persist: true });
```

`persist: true` stores the selected theme in `localStorage` as `anhli-theme`.
On page load, the saved value is preferred over the default `body[data-theme]`.

## Theme Slots

Each theme should define:

```js
{
  label: 'Theme display name',
  heroBg: './images/themes/theme-name/hero-bg.png',
  heroBgPosition: 'center bottom',
  heroPerson: './images/themes/theme-name/person-cutout.png',
  particle: 'dandelion', // or 'ocean'
  cursor: 'mote',
  assets: {
    line: './images/themes/theme-name/line.svg',
    corner: './images/themes/theme-name/corner.svg',
    seed: './images/themes/theme-name/particle.svg',
    paper: './images/themes/theme-name/texture.svg'
  },
  vars: {
    '--theme-ink': '#183126',
    '--theme-leaf': '#516a39',
    '--theme-paper': '#fff7df',
    '--theme-haze': 'rgba(255,250,226,0.58)',
    '--theme-panel': 'rgba(255,250,226,0.34)',
    '--theme-rim': 'rgba(81,106,57,0.34)',
    '--theme-particle': '255,248,218'
  }
}
```

## Hero Layer Order

The dandelion theme keeps visual layers separated:

1. Foreground grass
2. Dandelion seed wind
3. Anh Li cutout
4. Field background
5. Core text/content above the decorative layers

## Asset Layout

Recommended future structure:

```text
images/themes/
  dandelion/
    hero-bg.png
    anh-li-cutout.png
    seed.svg
    corner-meadow.svg
    grass-line.svg
    paper-bloom.svg
  ocean/
    hero-ocean.png
    anh-li-ocean.png
    dli-ocean.png
    bubble.svg
    coral-corner.svg
    wave-line.svg
    water-bloom.svg
```

## Full-Site Skin Rules

Current dandelion skin affects:

- Global color tokens: `--ink`, `--amber`, `--text`, borders and glow.
- Section backgrounds.
- Section dividers and title lines.
- Cards, player, album drawer, gallery, work items and contact cards.
- Footer and marquee bands.
- Site-wide seed/texture layer.

Theme code should keep this rule: change palette, texture, assets and motion only; do not change content markup or business logic.

## Notes

- Portrait/cutout images should keep original skin texture. Do edge cleanup with alpha feathering, not face smoothing.
- Particle/cursor/decor are cosmetic layers only. Do not couple them to section content.
- `body.no-motion` disables theme motion layers.
- `body.no-season` hides theme decor while preserving the page content.
