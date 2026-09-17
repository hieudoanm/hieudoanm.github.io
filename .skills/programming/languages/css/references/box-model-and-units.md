# 1. Box Model and Units

Focused reference for **css**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Box Model and Units

- Every element is a box: `content` + `padding` + `border` + `margin`.
- `box-sizing: border-box` includes padding/border in width/height — the default for modern resets.
- Units: relative (`rem`, `em`, `%`, `vh`, `vw`, `ch`) over absolute (`px`) for scalable, responsive UI.
- Logical properties (`margin-inline`, `padding-block`, `inset-inline`) adapt to writing direction.

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

.card {
  margin-inline: auto;
  padding-block: 1.5rem;
  max-inline-size: 40rem;
}
```

## 6. Performance and Maintainability

- Use **CSS custom properties** (variables) for tokens: :root { --color-primary: ... }.
- content-visibility: auto, will-change (sparingly), and contain reduce paint cost for heavy pages.
- Reduce specificity wars: BEM or utility classes keep the cascade predictable.
- Critical CSS inline; defer full stylesheets for long pages.
