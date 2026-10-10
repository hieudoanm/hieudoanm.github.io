# 1. Installation and Setup

Focused reference for **bootstrap**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Installation and Setup

- CDN (quick start): `<link>` CSS + `<script>` bundle for components needing JS.
- npm: `npm i bootstrap` — import `bootstrap/dist/css/bootstrap.min.css` and the JS bundle.
- Sass theming: import `bootstrap/scss/_functions.scss`, `_variables.scss`, then override variables before importing the rest.
- For React: use `react-bootstrap` components; for Angular, `ng-bootstrap`.

```bash
npm i bootstrap
```

```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
```
