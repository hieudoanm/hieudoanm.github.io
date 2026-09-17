# Workflow notes

Focused reference for **chartist-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Styling via CSS

- **The library outputs structured SVG classes — style them, don't pixel-hack:**

```css
.ct-series-a .ct-line { stroke: #2563eb; stroke-width: 2px; }
.ct-series-b .ct-bar { fill: #dc2626; }
```

- **Y-axis/energy via `.ct-grid`/`.ct-labels` CSS; consistent palette per series letter.**
- **No camelCase inline styles — the CSS classes are the theme.**

---

## 3. Responsive & Scales
