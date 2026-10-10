# 3. Selectors and Specificity

Focused reference for **css**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Selectors and Specificity

- Selector types: type, class, `id`, attribute, pseudo-class (`:hover`, `:focus`, `:nth-child`), pseudo-elements (`::before`, `::after`).
- Specificity: inline styles > IDs > classes/pseudo-classes > types. `!important` escapes the cascade — avoid overuse.
- `cascade` and `inheritance` control which rule wins; `:root`/custom properties and `@layer` structure the cascade (`@layer` in 2022+).
- Use `:where()`/`:is()` with lowest/highest specificity respectively.

```css
/* :where() scores 0 — reset without raising specificity */
:where(h1, h2, h3) {
  margin-block: 0;
}

/* :has() styles a parent based on its descendants */
.field:has(:user-invalid) {
  outline: 2px solid var(--color-danger);
}
```

## 5. Typography, Colors, and Effects

- Typography: font-family, font-size, line-height, font-weight; @font-face/font-display: swap for webfonts.
- Colors: hex, rgb()/rgba(), hsl(), lab()/oklch(); custom properties centralize theming.
- Effects: gradients, shadows, filters, backdrop-filter; animation via transition/@keyframes (GPU-friendly transform/opacity for smoothness).
