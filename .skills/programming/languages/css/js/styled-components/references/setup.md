# 1. Setup

Focused reference for **styled-components**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Setup

- Install: `npm i styled-components`.
- Babel: optional `babel-plugin-styled-components` for better debugging (component display names) and SSR.
- Micro-reify: `babel-preset-styled-components` improves bundle size in builds.

```bash
npm i styled-components
npm i -D babel-plugin-styled-components
```

```json
// babel.config.json — displayName gives readable class names, ssr enables sheet reuse
{
  "plugins": [
    [
      "babel-plugin-styled-components",
      { "displayName": true, "fileName": false, "pure": true, "ssr": true }
    ]
  ]
}
```
