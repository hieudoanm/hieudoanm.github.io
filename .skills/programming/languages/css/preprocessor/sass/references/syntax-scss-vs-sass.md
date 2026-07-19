# 2. Syntax: SCSS vs Sass

Focused reference for **sass**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Syntax: SCSS vs Sass

- **SCSS** (recommended): CSS-compatible syntax `@mixin`, `@use`, `.card { color: $color; }`.
- **Sass** (indented): significant whitespace, no braces/semicolons; legacy but still supported.
- Use SCSS for team familiarity and easier CSS diffing.

```scss
// components/_button.scss
@use "../tokens" as t;

.button {
  display: inline-flex;
  align-items: center;
  gap: t.$space-2;
  padding-inline: t.$space-3;
  border-radius: t.$radius-md;
  background: t.$color-primary;

  &:hover {
    filter: brightness(1.1);
  }

  &--ghost {
    background: transparent;
    border: 1px solid t.$color-primary;
  }
}
```
