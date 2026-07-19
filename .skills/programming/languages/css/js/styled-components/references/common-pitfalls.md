# Common Pitfalls

Focused reference for **styled-components**, excerpted from SKILL.md. The skill file remains the canonical guide.

## Common Pitfalls

- Passing internal props into DOM (`shouldForwardProp` to filter).
- Server/client class mismatch when SSR extraction isn't wired.
- Compute functions referencing `props` wrongly (function form uses `returns`).

## 4. Global Styles and Animations

- createGlobalStyle\body { margin:0; } \`` for resets — renders once.
- keyframes for reusable animation names.

## 5. SSR and Extraction

- With SSR, use ServerStyleSheet and collectStyles/extractStyleTags to render critical CSS into <head>.
- For static extraction at build (Next.js), use babel-plugin + secret-interpolation or framework integrations.
- Always hydrate the extracted styles on the client for same class names.
