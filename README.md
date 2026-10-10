# Chaos Battle Lab

Meme auto-battler made for YouTube Shorts (@chaosbattleslab). HTML5 canvas, no build step.

Play online: https://hh-vibecode.github.io/chaos-battle-lab/

## Layout
- `index.html` — page shell + loading screen
- `css/game.css` — UI styles
- `js/boot.js` — loader: loading screen, lazy per-character assets, background prefetch
- `js/asset-groups.js` — asset path → load group (`critical` or a character key)
- `js/game.js` — the game
- `assets/audio`, `assets/img/<group>`, `assets/avatars/<char>`, `assets/vfx`, `assets/vfxlib`, `assets/ui`, `assets/fonts`
- `default_save.json` — default roster / VFX library loaded on first visit
- `tools/split_assets.py` — one-time tool that split the old single-file build

Run locally with any static server (e.g. `python3 -m http.server`), not by opening the file directly.
