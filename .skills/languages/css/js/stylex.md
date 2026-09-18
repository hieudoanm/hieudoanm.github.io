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

## 3. Stylex API

- `const styles = stylex.create({ root: { color: 'red', padding: 8 } });`
- Apply: `<div {...stylex.props(styles.root)} />`.
- Dynamic: `p => stylex.props(styles.root, isError && styles.error)`.
- Fonts, media queries, pseudo-selectors and `@` rules supported in objects.

## 4. Theming and Tokens

- `stylex.defineVars({ colorBrand: 'red' })` returns CSS-variable-backed tokens.
- Use `stylex.themeable(tokens, theme)` per component for token mapping.
- Combine tokens and `p` values for full styles.

## 5. Component Patterns

- Compose conditional styles with `stylex.props(...)` — never concatenate strings.
- `createStyled` not required; typically components create `styles` once at module scope.
- Prop-typed design: map `variant: 'primary' | 'ghost'` to style objects at call site.

## 6. Performance and Trade-offs

- Zero runtime CSS logic: styles compile at build → bundled `stylex` runtime is tiny.
- Atomic class reuse shrinks CSS file; class counts grow but bytes stay similar.
- SSR works without special server extraction (classes deterministic).

## Common Pitfalls

- Forgetting the Babel/Vite plugin → styles won't transform and break.
- Conditional strings `className={condition ? 'x' : 'y'}` instead of `stylex.props`.
- Dynamic key lookups (`tokens[color] as object`) lose type safety.

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
