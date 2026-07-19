# 1. Setup and Babel

Focused reference for **emotion**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Setup and Babel

- React: `npm i @emotion/react @emotion/styled`.
- Zero-config works with Vite/webpack (`@emotion/babel-plugin` optional for previews and details).
- For SSR, configure an Emotion server instance (`createCache`, `@emotion/server`).

```bash
npm i @emotion/react @emotion/styled
npm i -D @emotion/babel-plugin
```

```javascript
// babel.config.js — gives readable labels and stable class names in dev
export default {
  plugins: [
    [
      '@emotion/babel-plugin',
      { sourceMap: true, autoLabel: 'dev-only', labelFormat: '[local]' },
    ],
  ],
};
```
