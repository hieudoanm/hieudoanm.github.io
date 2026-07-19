---
name: emotion
description: Emotion — CSS-in-JS library with tiny runtime, flexible styling APIs (css, styled, keyframes), and compatibility with React and vanilla JS.
---

Emotion is a **CSS-in-JS library** with a **tiny runtime footprint**, offering both a **`styled`** API and a powerful **`css`** function, for React and plain JavaScript applications.

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

## 2. The `css` API

- `css` prop on React elements: `import { css } from '@emotion/react'` — `<div css={style}>`.
- Define styles with object syntax or template strings; labels via `label:` in objects.
- Objects support nested selectors, media queries, and the styled function pattern immediately.

```tsx
/** @jsxImportSource @emotion/react */
import type { ReactNode } from 'react';

const card = {
  label: 'card',
  display: 'grid',
  gap: '0.75rem',
  padding: '1.25rem',
  borderRadius: 12,
  '&:hover': { transform: 'translateY(-2px)' },
  '@media (min-width: 768px)': { padding: '2rem' },
};

type ArticleCardProps = { title: string; children: ReactNode };

export const ArticleCard = ({ title, children }: ArticleCardProps) => (
  <div css={card}>
    <h3 css={{ margin: 0, fontSize: '1.125rem' }}>{title}</h3>
    {children}
  </div>
);
```

## 3. The `styled` API

- `styled.div\`color: red;\``or`styled.div({ color: 'red' })`.
- Reuse with `shouldForwardProp`, dynamic `props` via function: `styled.div(p => ({ color: p.color }))`.
- Compose: `styled(Component)` (needs `className` forwarding).

```tsx
import styled from '@emotion/styled';

const Card = styled.section`
  display: grid;
  gap: 0.75rem;
  padding: 1.25rem;
  border-radius: 12px;
`;

// `tone` is styling-only — `shouldForwardProp` keeps it off the DOM node
const Surface = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'tone',
})<{ tone?: 'brand' | 'neutral' }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: ${({ tone = 'brand' }) => (tone === 'brand' ? '#6d28d9' : '#f3f4f6')};
  color: ${({ tone = 'brand' }) => (tone === 'brand' ? '#ffffff' : '#111827')};
`;
```

## 4. Global Styles and Keyframes

- `Global` component: `<Global styles={css\`body { margin: 0; }\`} />`.
- `keyframes`: `const spin = keyframes\`...\``gives a named animation to use in`animation: ${spin}`.

```tsx
import { Global, css, keyframes } from '@emotion/react';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const AppShell = () => (
  <>
    <Global
      styles={css`
        body { margin: 0; font-family: system-ui, sans-serif; }
        a { color: #6d28d9; }
      `}
    />
    <div css={css`animation: ${spin} 1.2s linear infinite;`} />
  </>
);
```

## 5. Theming

- `<ThemeProvider theme={theme}>` + `useTheme()` or `css={({ theme }) => ...}`.
- `emotion-theming` provides `<ThemeProvider>`; type-safe with generics `ThemeProvider<MyTheme>`.

```tsx
/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { ThemeProvider, useTheme } from '@emotion/react';

const theme = {
  colors: { brand: '#6d28d9', surface: '#ffffff', text: '#111827' },
  space: (steps: number) => steps * 8,
  radii: { md: 12 },
} as const;

type AppTheme = typeof theme;

const PrimaryButton = styled.button`
  padding: ${({ theme }: { theme: AppTheme }) => theme.space(2)}px;
  border: none;
  border-radius: ${({ theme }: { theme: AppTheme }) => theme.radii.md}px;
  background: ${({ theme }: { theme: AppTheme }) => theme.colors.brand};
`;

const SaveHint = () => {
  const active = useTheme<AppTheme>();
  return <span css={{ color: active.colors.text }}>Unsaved changes</span>;
};

export const App = () => (
  <ThemeProvider theme={theme}>
    <PrimaryButton>Save</PrimaryButton>
    <SaveHint />
  </ThemeProvider>
);
```

## 6. SSR and Performance

- With zero-config, styles inject at runtime; for SSR, use `@emotion/server` to `extractCritical`.
- Bundle smallest: tree-import only `@emotion/react` features; emotion is very small already.

```tsx
// server.tsx — extract critical CSS so server and client emit identical classes
import type { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import { CacheProvider } from '@emotion/react';

export const render = (app: ReactElement) => {
  const cache = createCache({ key: 'app' });
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);
  const html = renderToString(<CacheProvider value={cache}>{app}</CacheProvider>);
  const chunks = extractCriticalToChunks(html);
  return { html, styles: constructStyleTagsFromChunks(chunks) };
};
```

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
