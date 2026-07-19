# 2. Layout Systems

Focused reference for **css**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Layout Systems

- **Flexbox** (`display: flex`) for one-dimensional distribution: alignment, wrapping, ordering.
- **Grid** (`display: grid`) for two-dimensional layout: columns/rows, `grid-template`, `auto-fit`/`auto-fill` for responsiveness.
- **CSS Multi-column**, `positioning` (static/relative/absolute/fixed/sticky), and float-free flow.
- Property selection: Grid for page structure, Flexbox for components and inline elements.

```css
.page-layout {
  display: grid;
  grid-template-areas: "sidebar content" "sidebar footer";
  grid-template-columns: 16rem minmax(0, 1fr);
  gap: 1.5rem;
}

.card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
}
```

## 8. Common Pitfalls

- !important/high-specificity sneak attacks making overrides painful.
- position: absolute stacks without room; collapsing margins without overflow context.
- Neglecting prefers-reduced-motion/color contrast/accessibility.
- Non-performant animations (animating width/height instead of transforms).
