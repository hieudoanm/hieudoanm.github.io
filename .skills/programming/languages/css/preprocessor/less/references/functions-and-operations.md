# 4. Functions and Operations

Focused reference for **less**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Functions and Operations

- Arithmetic: `@width: (100% / 3);` — works with compatible units.
- Built-ins: `lighten()`, `darken()`, `fade()`, `mix()`, `percentage()`, `math()`, `unit()`.
- Color functions and math make theming much easier than raw CSS.

```less
// Less 4 keeps maths only inside parentheses by default
@columns: 3;
@content-width: (100% / @columns);

.column {
  width: @content-width;
  background: lighten(@brand, 10%);
  border-color: fade(@brand, 40%);
  color: mix(@brand, #000, 80%);
}
```
