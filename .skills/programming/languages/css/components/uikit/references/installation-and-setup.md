# 1. Installation and Setup

Focused reference for **uikit**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Installation and Setup

- CDN: `uikit` CSS/JS from CDN (unbundled builds for production).
- npm: `npm i uikit` — import `uikit/dist/css/uikit.css`, `uikit/dist/js/uikit.min.js` (+ `.uikit-icons.min.js` if using icons).
- Modular: `uikit/dist/js/uikit.js` and `uikit/dist/js/uikit-icons.js` allow selective `import { Icon } from 'uikit'`.

```bash
npm i uikit
```

```html
<link rel="stylesheet" href="/node_modules/uikit/dist/css/uikit.min.css" />
<script src="/node_modules/uikit/dist/js/uikit.min.js"></script>
<script src="/node_modules/uikit/dist/js/uikit-icons.min.js"></script>
```
