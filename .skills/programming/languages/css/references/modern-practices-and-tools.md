# 7. Modern Practices and Tools

Focused reference for **css**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 7. Modern Practices and Tools

- Know the newer syntax: `:has()`, `color-mix()`, `@layer`, logical shorthands.
- Preprocessors (`sass`/`less`) and CSS frameworks (`tailwind`, `bootstrap`) are layer on top — core CSS still matters.
- Linters (`stylelint`) and Autoprefixer/`lightningcss` keep code consistent and cross-browser.
- Test in Chrome/Firefox/Safari; use DevTools for cascade, layout, and paint profiling.

```css
@layer reset, tokens, components, utilities;

@layer components {
  .badge {
    background: color-mix(in oklab, var(--color-primary) 15%, transparent);
    border: 1px solid color-mix(in oklab, var(--color-primary) 40%, transparent);
  }
}
```

## 4. Responsive Design

- Media queries: @media (min-width: ...), @media (prefers-color-scheme: dark), @media (prefers-reduced-motion: reduce).
- Mobile-first: base styles then min-width queries; adapt with clamp(), minmax(), fr, and aspect-ratio.
- Container queries (@container) let components respond to their own container size, not the viewport.
