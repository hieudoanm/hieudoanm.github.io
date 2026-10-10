# Implementation notes

Focused reference for **plotly-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Config & Interactivity

- **The `config` object gates UI chrome:**

```js
const config = { displaylogo: false, responsive: true, modeBarButtonsToRemove: ["lasso2d"] };
```

- **`scrollZoom`/`dragmode`/`hovermode` per purpose; toImage scale for exports.**
- **`Plotly.Plots.resize` on container changes; `react` re-lays responsively.**

---

## 5. Interaction & Events

- **`plotly_click`/`plotly_hover`/`plotly_selected` events drive cross-chart linking:**

```js
gdf.on("plotly_hover", (event) => highlightData(event.points));
```

- **Selection via `plotly_selected`/`event.points` read-backs — coupled cross-filter computed in the handler.**
- **Throttle heavy handlers; clean listeners on teardown.**
