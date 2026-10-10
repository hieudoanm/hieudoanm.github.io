# Implementation notes

Focused reference for **google-charts-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Options per chart family (`isStacked`, `pieHole`, `curveType`) — validate at render.**
- **`{%String format%}`/`prefix` values in axes; no raw floats in ticks.**

---

## 4. Events & Interaction

- **`google.visualization.events.addListener(chart, "select", fn)` for selection:**
- **`getSelection()`/`data.getValue(row, col)` read-backs — state at the chart, not the DOM text.**
- **Range/zoom only where the chart type ships it; keep interactions deliberate.**

---

## 5. Responsive & Re-render

- **Chart needs a parent width; re-draw on container resize (debounced):**
- **Redraw = `chart.draw(newOptions)` (or `google.visualization.events.trigger` on ready).**
- **Destroy via `clearChart()` on unmount to remove the DOM + listeners.**

---
