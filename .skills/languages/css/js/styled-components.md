---
name: styled-components
description: styled-components — CSS-in-JS for React with tagged template literals, theme support, and automatic critical CSS extraction.
---

styled-components is the **`styled`-first CSS-in-JS library for React**, building components from tagged template literals and **automatically extracting critical CSS** at runtime.

## 1. Setup

- Install: `npm i styled-components`.
- Babel: optional `babel-plugin-styled-components` for better debugging (component display names) and SSR.
- Micro-reify: `babel-preset-styled-components` improves bundle size in builds.

## 2. Creating Components

- `const Button = styled.button\` background: coral; font-size: 18px; \`;`
- Dynamic props: `styled.button(p => ({ background: p.primary ? 'coral' : '#fff' }))` — reuse `p.prop`.
- Extend existing: `styled(Button)\`...\``forwards a`className` automatically.

## 3. Theming

- `<ThemeProvider theme={theme}>` injects `theme`; consume with `p.theme` or `useTheme()`.
- Type-safe theme: declare `DefaultTheme` module augmentation.
- Per-instance variants via `attrs` (`attrs({ 'data-testid': 'x' })`).

## 4. Global Styles and Animations

- `createGlobalStyle\`body { margin:0; } \`` for resets — renders once.
- `keyframes` for reusable animation names.

## 5. SSR and Extraction

- With SSR, use `ServerStyleSheet` and `collectStyles`/`extractStyleTags` to render critical CSS into `<head>`.
- For static extraction at build (Next.js), use `babel-plugin` + `secret-interpolation` or framework integrations.
- Always hydrate the extracted styles on the client for same class names.

## 6. Performance Notes

- CSS-in-JS has runtime cost: render passes on every prop change; use memo/PureComponent where possible.
- Consider `styled-components/macro` for combinator/to-something-safe builds.

## Common Pitfalls

- Passing internal props into DOM (`shouldForwardProp` to filter).
- Server/client class mismatch when SSR extraction isn't wired.
- Compute functions referencing `props` wrongly (function form uses `returns`).

## General Rules of Thumb

- Use `styled` components for containers and simple primitives; `css` fragments from Emotion's sibling — but stick to one library.
- Keep prop-derived styles to a minimum for performance.
- Wire SSR extraction for any server-rendered app.

## Quick-Start Checklist

- [ ] Install and add the Babel plugin for development ergonomics.
- [ ] Build components with `styled.*` and dynamic props.
- [ ] Add `<ThemeProvider>` + typed theme.
- [ ] Add `createGlobalStyle` and `keyframes` where needed.
- [ ] Configure SSR style-sheet extraction or hydration.
- [ ] Verify no server/client class mismatch.
