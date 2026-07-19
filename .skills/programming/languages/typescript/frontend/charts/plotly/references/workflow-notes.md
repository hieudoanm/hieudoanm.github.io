# Workflow notes

Focused reference for **plotly-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`Plotly.react(div, data, layout)` — diffing update (preserves state, fast):**

```js
Plotly.react("plot", newTraces, newLayout);
```

- **`Plotly.restyle`/`Plotly.relayout` for sparse attribute updates (single trace color, axis range).**
- **Never full `newPlot` per refresh — that's a full redraw and state loss.**

---

## 3. Performance for Large Data

- **`type: "scattergl"` / `scatter3d`/WebGL renderers for 100k+ points:**

```js
const traces = [{ x, y, type: "scattergl", mode: "lines" }];
```

- **Down-sample/`fps` keep interactivity: `layout.dragmode/toggle` mindful of re-plotting.**
- **`frame`/animations only for genuinely animated dashboards; cap frames in updates.**

---
