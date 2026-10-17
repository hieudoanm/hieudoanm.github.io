# pagify — UI/UX Design

## 1. Purpose

This document describes the UI tokens, layout, states, and accessibility of the pagify default theme.

The default theme is embedded in the binary with `go:embed` and controls layout, typography, colours, navigation, code blocks, tables, callouts, animations, responsive behaviour, and browser interaction. The Markdown parser knows nothing about these visual decisions.

## 2. Design Direction

The default design should feel:

- modern, minimal, polished, technical, readable, fast, calm, responsive

It prioritises:

1. readability
2. hierarchy
3. navigation
4. accessibility
5. performance
6. visual polish

Do not add visual effects merely because they are possible.

## 3. Layout

Desktop uses a **sidebar + content** layout. Mobile collapses into a simpler layout with accessible navigation. No fixed viewport size is assumed.

The stylesheet organises rules in this order:

1. Design tokens
2. Reset / base
3. Layout
4. Header
5. Sidebar
6. Markdown typography
7. Links
8. Code blocks
9. Tables
10. Blockquotes
11. Callouts
12. Navigation
13. Animations
14. Responsive behaviour
15. Dark mode
16. Accessibility

Use CSS custom properties for design tokens.

```css
:root {
  --bg: #ffffff;
  --surface: #fafafa;
  --text: #18181b;
  --text-muted: #71717a;
  --border: #e4e4e7;
  --accent: #2563eb;

  --content-width: 760px;
  --sidebar-width: 260px;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;

  --duration-fast: 150ms;
  --duration-normal: 250ms;
}
```

Prefer semantic variables over component-specific variables.

## 4. Components

Generated HTML is semantic and readable:

```html
<article class="markdown">
  <h1>Getting Started</h1>
  <p>...</p>
</article>
```

Use `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`. Avoid unnecessary wrappers.

## 5. States

Every page implements loading, empty, validation-error, and success states. Never show success before the operation confirms it.

## 6. Theme

Light and dark theme with a toggle. The preference persists across page loads. No flash of incorrect theme on load.

## 7. Animation

Animation is part of the default visual language. Prefer subtle CSS animations for page entrance, navigation transitions, hover states, expanding sections, modal appearance, theme transitions, and copy-button feedback. Always respect `prefers-reduced-motion: reduce`. Do not use JavaScript for animation when CSS can do it cleanly.

## 8. JavaScript

`script.js` provides progressive enhancement: code-copy buttons, client-side search, mobile drawer, theme toggle, active navigation state, interactive callouts. Each is a no-op when its file fails to load. Keep JavaScript framework-free.

## 9. No JavaScript Required for Basic Reading

A generated site must remain usable for reading Markdown, navigating pages, following links, viewing code, viewing images, and reading tables without JavaScript.

## 10. Accessibility

Accessibility is a product requirement:

- semantic HTML
- keyboard navigation
- visible focus states
- sufficient colour contrast
- reduced motion
- accessible buttons and navigation
- meaningful link text
- ARIA only when necessary

Do not use ARIA to compensate for poor HTML structure.

## Cross-references

- Architecture: [`04-architecture.md`](04-architecture.md)
- Tech stack: [`08-tech-stack.md`](08-tech-stack.md)
- Testing: [`09-testing-strategy.md`](09-testing-strategy.md)
