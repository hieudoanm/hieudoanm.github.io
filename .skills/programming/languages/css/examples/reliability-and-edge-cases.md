# Css: 6. Performance and Maintainability

## Source guidance

This example applies the **6. Performance and Maintainability** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Use **CSS custom properties** (variables) for tokens: `:root { --color-primary: ... }`.
- `content-visibility: auto`, `will-change` (sparingly), and `contain` reduce paint cost for heavy pages.
- Reduce specificity wars: BEM or utility classes keep the cascade predictable.
- Critical CSS inline; defer full stylesheets for long pages.

## Example

```css
:root {
  --color-primary: oklch(55% 0.19 285);
  --color-surface: oklch(100% 0 0);
  --color-text: oklch(23% 0.02 285);
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-surface);
  border-radius: 0.5rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-surface: oklch(24% 0.02 285);
    --color-text: oklch(96% 0.01 285);
  }
}

.article-body {
  content-visibility: auto;
  contain-intrinsic-size: auto 800px;
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for css.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
