# Workflow notes

Focused reference for **tanstack-charts-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```js
const chart = new Chart({ series, axes, renderer: RenderTypes.CANVAS });
```

- **Options model: `series`, `axes`, grid/edit via `chart.setOptions`:**

```js
chart.setOptions({ seriesOps: { ".": { line: { width: 2 } } }, axesOps: { x0: { tick: { format: d => d } } } });
```

- **The options object is the configuration contract — build it declaratively, update through the API.**

---

## 3. Axes & Layout

- **Axes declared per orientation (`x0`/`y0`), with scale + formatters:**

```js
axes: [{ id: "x0", position: "bottom", scaleType: "band", options: { tick: { format: (v) => v } } }]
```

- **`scaleType` semantic (band/time/linear); ticks formatted, never raw floats.**
- **Secondary axes/bands added only where the view earns the complexity.**

---
