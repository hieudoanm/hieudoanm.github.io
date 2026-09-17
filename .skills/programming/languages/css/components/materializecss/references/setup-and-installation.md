# 1. Setup and Installation

Focused reference for **materializecss**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Setup and Installation

- CDN: include CSS + JS (choose the minified build from the official CDN).
- npm: `npm i materialize-css` (import CSS; add JS bundle manually).
- Sass: `@use "materialize-css/sass/materialize"` with variable overrides for theming.

```bash
npm i materialize-css
```

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
```
