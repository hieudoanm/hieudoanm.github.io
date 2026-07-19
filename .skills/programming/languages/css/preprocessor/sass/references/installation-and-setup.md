# 1. Installation and Setup

Focused reference for **sass**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Installation and Setup

- Modern setup: `npm install -D sass` (Dart Sass). Legacy: Ruby Sass (deprecated).
- Cli: `sass input.scss output.css`; watch mode: `sass --watch`.
- Bundlers: Vite (`vite-plugin-sass`), Webpack (`sass-loader`), and Node API via the `sass` package.

```bash
npm install -D sass
npx sass src/styles/index.scss public/styles.css --watch
```

## 5. Nesting, `&`, and Extending

- & refers to the current selector context; common for BEM modifiers: .btn &:hover, &--primary.
- @extend inherits a selector's styles — prefer mixins over @extend (cleaner, no selector bloat).
- Beware nesting depth → specificity explosion; cap at 3 levels.

## 7. Media Queries and Breakpoints

- Nest media queries inside rules; Sass compiles them correctly to flat CSS.
- With maps: @include respond-to('md') { ... } via a mixin using @media (min-width: map-get(...)).
- Use min-width (mobile-first) and container-query support where sensible.
