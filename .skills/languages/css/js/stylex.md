---
name: stylex
description: StyleX — compile-time CSS-in-JS from Meta (previously the internal Facebook system), generating atomic CSS with minimal runtime.
---

StyleX is **Meta's CSS-in-JS solution (open-sourced as @stylexjs)** that **compiles atomic CSS at build time**, combining **fast atomic styles with no runtime**, full TypeScript types, and colocated styling with React.

## 1. Core Idea

- Define styles as **typed objects** with `create({ ... })` and use `stylex.props(styles.x)`.
- Compiler generates **atomic CSS classes** at build — avoided runtime class merging.
- Only used classes are emitted; duplication across components collapses automatically.
- Deterministic ordering via compiler, resolving specificity conflicts predictably.

## 2. Setup and Integration

- Dependency: `@stylexjs/stylex`, `@stylexjs/babel-plugin`, `@stylexjs/webpack-plugin` (or Vite/Nuxt adapters).
- Configure the compiler entry (`importPath`, `genConditionalClasses`, `unstable_moduleResolution`).
- Recommended with React/Vite; also supports TypeScript types via `@stylexjs/stylex`.

```bash
npm i @stylexjs/stylex
npm i -D @stylexjs/babel-plugin @stylexjs/webpack-plugin
```

```javascript
// babel.config.js — without this the compiler never runs and styles break
export default {
  plugins: [
    [
      '@stylexjs/babel-plugin',
      {
        dev: process.env.NODE_ENV !== 'production',
        importPath: 'node_modules/@stylexjs/stylex/lib/stylex.mjs',
        unstable_moduleResolution: { type: 'commonJS' },
      },
    ],
  ],
};
```

## 3. Stylex API

- `const styles = stylex.create({ root: { color: 'red', padding: 8 } });`
- Apply: `<div {...stylex.props(styles.root)} />`.
- Dynamic: `p => stylex.props(styles.root, isError && styles.error)`.
- Fonts, media queries, pseudo-selectors and `@` rules supported in objects.

```tsx
import type { ReactNode } from 'react';
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  root: {
    display: 'grid',
    gap: 8,
    padding: 16,
    borderRadius: 12,
  },
  title: { margin: 0, fontSize: 18, fontWeight: 600 },
});

type ArticleCardProps = { title: string; children: ReactNode };

export const ArticleCard = ({ title, children }: ArticleCardProps) => (
  <article {...stylex.props(styles.root)}>
    <h3 {...stylex.props(styles.title)}>{title}</h3>
    {children}
  </article>
);
```

```tsx
// conditional composition — always `stylex.props`, never string concatenation
const button = stylex.create({
  base: {
    paddingBlock: 8,
    paddingInline: 16,
    borderRadius: 8,
    ':hover': { filter: 'brightness(1.08)' },
    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
  },
  brand: { backgroundColor: '#6d28d9', color: '#fff' },
  ghost: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#6d28d9' },
});

type ButtonProps = { variant: 'brand' | 'ghost' };

export const PrimaryButton = ({ variant }: ButtonProps) => (
  <button {...stylex.props(button.base, button[variant])}>Save</button>
);
```

## 4. Theming and Tokens

- `stylex.defineVars({ colorBrand: 'red' })` returns CSS-variable-backed tokens.
- Use `stylex.themeable(tokens, theme)` per component for token mapping.
- Combine tokens and `p` values for full styles.

```ts
// tokens.stylex.ts — compiles to CSS variables, nothing at runtime
import * as stylex from '@stylexjs/stylex';

export const tokens = stylex.defineVars({
  colorBrand: '#6d28d9',
  colorSurface: '#ffffff',
  spaceLg: '1.5rem',
});

export const darkTokens = stylex.defineVars({ colorSurface: '#111827' });

// `themeable` maps token names onto the local style properties that use them
export const cardTheme = stylex.themeable(tokens, {
  backgroundColor: tokens.colorSurface,
  padding: tokens.spaceLg,
});
```

```tsx
// dark.stylex.ts — swap a token set at runtime with a single class
import * as stylex from '@stylexjs/stylex';
import { darkTokens } from './tokens.stylex';

const dark = stylex.createTheme({ ...darkTokens });

export const ThemeRoot = () => <div {...stylex.props(dark)}>…</div>;
```

## 5. Component Patterns

- Compose conditional styles with `stylex.props(...)` — never concatenate strings.
- `createStyled` not required; typically components create `styles` once at module scope.
- Prop-typed design: map `variant: 'primary' | 'ghost'` to style objects at call site.

```tsx
import * as stylex from '@stylexjs/stylex';
import { tokens, cardTheme } from './tokens.stylex';

// styles are created once at module scope, never inside the component
const styles = stylex.create({
  root: { ...cardTheme, cursor: 'pointer', ':hover': { filter: 'brightness(1.08)' } },
  primary: { backgroundColor: tokens.colorBrand, color: '#fff' },
  ghost: { backgroundColor: 'transparent', color: tokens.colorBrand, borderWidth: 1 },
});

type SaveButtonProps = { variant: 'primary' | 'ghost'; onSave: () => void };

export const SaveButton = ({ variant, onSave }: SaveButtonProps) => (
  <button type="button" onClick={onSave} {...stylex.props(styles.root, styles[variant])}>Save</button>
);
```

## 6. Performance and Trade-offs

- Zero runtime CSS logic: styles compile at build → bundled `stylex` runtime is tiny.
- Atomic class reuse shrinks CSS file; class counts grow but bytes stay similar.
- SSR works without special server extraction (classes deterministic).

## Common Pitfalls

- Forgetting the Babel/Vite plugin → styles won't transform and break.
- Conditional strings `className={condition ? 'x' : 'y'}` instead of `stylex.props`.
- Dynamic key lookups (`tokens[color] as object`) lose type safety.

```tsx
import type { Style } from '@stylexjs/stylex';
import { tokens } from './tokens.stylex';

const isError = true;
const colorName = 'colorBrand';

// Bad: not statically analysable — no atoms are generated at build time
const bad = <p className={isError ? 'error' : 'ok'}>Failed</p>;
const alsoBad = tokens[colorName] as unknown as Style;

// Good: the compiler sees every literal style it must emit
const styles = stylex.create({ error: { color: tokens.colorBrand } });
const good = <p {...stylex.props(styles.error)}>Failed</p>;
```

## General Rules of Thumb

- Colocate styles; keep them typed and token-driven.
- Compose variants via `stylex.props` conditionals, never template strings.
- Define tokens with `defineVars`/`themeable` for theming.

## Quick-Start Checklist

- [ ] Add dependencies + Babel/Vite plugin config.
- [ ] Use `stylex.create` + `stylex.props` in components.
- [ ] Define variables/tokens for colors/spacing/typescale.
- [ ] Apply conditional variants via `stylex.props`.
- [ ] Verify build emitted CSS and class names deterministic.
- [ ] Test SSR output (no runtime hydration mismatch).
