---
name: emotion
description: Emotion — CSS-in-JS library with tiny runtime, flexible styling APIs (css, styled, keyframes), and compatibility with React and vanilla JS.
---

Emotion is a **CSS-in-JS library** with a **tiny runtime footprint**, offering both a **`styled`** API and a powerful **`css`** function, for React and plain JavaScript applications.

## 1. Setup and Babel

- React: `npm i @emotion/react @emotion/styled`.
- Zero-config works with Vite/webpack (`@emotion/babel-plugin` optional for previews and details).
- For SSR, configure an Emotion server instance (`createCache`, `@emotion/server`).

## 2. The `css` API

- `css` prop on React elements: `import { css } from '@emotion/react'` — `<div css={style}>`.
- Define styles with object syntax or template strings; labels via `label:` in objects.
- Objects support nested selectors, media queries, and the styled function pattern immediately.

## 3. The `styled` API

- `styled.div\`color: red;\``or`styled.div({ color: 'red' })`.
- Reuse with `shouldForwardProp`, dynamic `props` via function: `styled.div(p => ({ color: p.color }))`.
- Compose: `styled(Component)` (needs `className` forwarding).

## 4. Global Styles and Keyframes

- `Global` component: `<Global styles={css\`body { margin: 0; }\`} />`.
- `keyframes`: `const spin = keyframes\`...\``gives a named animation to use in`animation: ${spin}`.

## 5. Theming

- `<ThemeProvider theme={theme}>` + `useTheme()` or `css={({ theme }) => ...}`.
- `emotion-theming` provides `<ThemeProvider>`; type-safe with generics `ThemeProvider<MyTheme>`.

## 6. SSR and Performance

- With zero-config, styles inject at runtime; for SSR, use `@emotion/server` to `extractCritical`.
- Bundle smallest: tree-import only `@emotion/react` features; emotion is very small already.

## Common Pitfalls

- Server/client class mismatch with runtime CSS — use extraction on SSR.
- Passing internal prop through `styled` without `shouldForwardProp`.
- Mixing Emotion and other CSS-in-JS (duplicate `cache`/`injectGlobal`).

## General Rules of Thumb

- Pick one API per component (`css` for fragments, `styled` for component primitives).
- Keep dynamic styles through props, not string concatenation, for caching benefit.
- Extract critical CSS on SSR.

## Quick-Start Checklist

- [ ] Install and configure Emotion (`@emotion/react`/`@emotion/styled` + optional babel plugin).
- [ ] Build components with `styled`/`css`.
- [ ] Add `<Global>` for base styles when needed.
- [ ] Wire `<ThemeProvider>` + theme object.
- [ ] Set up SSR extraction or verify runtime-injection approach.
- [ ] Verify SSR/hydration stability.
