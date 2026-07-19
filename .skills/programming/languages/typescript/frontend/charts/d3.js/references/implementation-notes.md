# Implementation notes

Focused reference for **d3-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. SVG Structure

- **Groups (`<g>`) per layer: margins created once:**

```js
const plot = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
```

- **Plot layers separated (grid, axes, series, labels) for reuse; geometric elements typed (path/circle/line/rect).**
- **Defs (`<defs>`) for gradients/patterns; foreign domains stay SVG-only unless defs need HTML.**

---

## 5. Interaction & Re-render

- **Bind events in enter/update; `pointer` over `mouse` handlers where possible:**
- **`d3-zoom`/`d3-drag` as behavior modules — compose, don't hand-roll transforms.**
- **Re-render is a data join, not a `innerHTML` swap — the join preserves state.**

---

## 6. Performance
