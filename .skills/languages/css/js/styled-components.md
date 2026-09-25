---
name: styled-components
description: styled-components — CSS-in-JS for React with tagged template literals, theme support, and automatic critical CSS extraction.
---

styled-components is the **`styled`-first CSS-in-JS library for React**, building components from tagged template literals and **automatically extracting critical CSS** at runtime.

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

## 2. Creating Components

- `const Button = styled.button\` background: coral; font-size: 18px; \`;`
- Dynamic props: `styled.button(p => ({ background: p.primary ? 'coral' : '#fff' }))` — reuse `p.prop`.
- Extend existing: `styled(Button)\`...\``forwards a`className` automatically.

```tsx
import styled from 'styled-components';

const Card = styled.section`
  display: grid;
  gap: 0.75rem;
  padding: 1.25rem;
  border-radius: 12px;
`;

type PrimaryButtonProps = { tone?: 'brand' | 'danger' };

export const PrimaryButton = styled.button<PrimaryButtonProps>`
  padding: ${({ theme }) => theme.space(2)}px;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  color: #fff;
  background: ${({ tone = 'brand', theme }) =>
    tone === 'brand' ? theme.colors.brand : theme.colors.danger};
`;
```

```tsx
// `tone` is styling-only — withConfig filters it before it reaches the DOM
const ElevatedCard = styled(Card).withConfig({
  shouldForwardProp: (prop) => prop !== 'tone',
})<{ tone?: 'brand' | 'muted' }>`
  box-shadow: 0 8px 24px rgb(0 0 0 / 0.12);
`;

// attrs inject static props and per-instance data without touching markup
const SaveAction = styled.button.attrs({ type: 'submit', 'data-testid': 'save' })`
  font-weight: 600;
`;
```

## 3. Theming

- `<ThemeProvider theme={theme}>` injects `theme`; consume with `p.theme` or `useTheme()`.
- Type-safe theme: declare `DefaultTheme` module augmentation.
- Per-instance variants via `attrs` (`attrs({ 'data-testid': 'x' })`).

```ts
// src/styled/theme.ts
export const theme = {
  colors: {
    brand: '#6d28d9',
    danger: '#b91c1c',
    surface: '#ffffff',
  },
  space: (steps: number) => steps * 8,
} as const;

export type AppTheme = typeof theme;
```

```ts
// src/styled/styled.d.ts — module augmentation makes `p.theme` typed everywhere
import 'styled-components';
import type { AppTheme } from './theme';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}
```

## 4. Global Styles and Animations

- `createGlobalStyle\`body { margin:0; } \`` for resets — renders once.
- `keyframes` for reusable animation names.

```tsx
import { createGlobalStyle, keyframes, styled } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: system-ui, sans-serif;
  }
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid #e5e7eb;
  border-top-color: #6d28d9;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
```

## 5. SSR and Extraction

- With SSR, use `ServerStyleSheet` and `collectStyles`/`extractStyleTags` to render critical CSS into `<head>`.
- For static extraction at build (Next.js), use `babel-plugin` + `secret-interpolation` or framework integrations.
- Always hydrate the extracted styles on the client for same class names.

```tsx
// server.tsx — one sheet per request, styles inlined in <head>
import type { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';

export const renderApp = (app: ReactElement) => {
  const sheet = new ServerStyleSheet();

  try {
    const html = renderToString(sheet.collectStyles(app));
    const styles = sheet.getStyleTags();
    return { html, styles };
  } finally {
    sheet.seal();
  }
};
```

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
