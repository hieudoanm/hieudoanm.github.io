---
name: plotly-best-practices
description: Best practices for creating interactive scientific charts with Plotly.js — the trace-layout WebGL/SVG charting conventions for JS. Use when writing, structuring, or reviewing Plotly — covers traces, layout, updates, and performance.
---

# Plotly.js Best Practices

Plotly.js is **an interactive, WebGL-era chart library** — config = `traces` + `layout` + `config`, rendered via `Plotly.newPlot`/`react`. Practical Plotly.js leans on **typed `trace` arrays per data series, layout structure (axes/layout/showlegend), `Plotly.react` for updates over shake-in-the-wind re-plotting, and the WebGL/`scattergl` fast path for large N** — the data-to-trace mapping and the update discipline are the craft.

---

## 1. Traces & Layout

- **Traces are typed and explicit — one trace per series:**

```js
import Plotly from "plotly.js-dist-min";

const traces = [{ x, y, type: "scatter", mode: "lines+markers", name: "Revenue" }];
const layout = { title: "Revenue", xaxis: { title: "Month" }, yaxis: { title: "USD" } };

Plotly.newPlot("plot", traces, layout);
```

- **Multi-trace: distinct `name`/`mode`/`line.color` per series; stacked/bars via `barmode`.**
- **Layout: axes, legend, margins — the full scene in one `layout` object.**

---

## 2. Updating

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

---

## 6. Integration & Trust

- **Bundle selectively (`dist-min`, or `bundle.js`) to trim weight; tree-shake where possible.**
- **SVG default; WebGL opt-in where the data earns it.**
- **Version-pin; test across target browsers (WebGL context limits documented).**

---

## General Rules of Thumb

- **Traces + layout + config — the modeling contract.**
- **`Plotly.react`/`restyle` over `newPlot` churn.**
- **`scattergl` for dense; down-sample before upload.**
- **Events (`plotly_*`) for cross-filter; config gates the UI chrome.**
- **Pin versions; bundle lean; resize handled.**

---

## Quick-Start Checklist

- [ ] Typed traces (name/mode/color); layout structured
- [ ] `Plotly.react`/`restyle` for updates; no full redraws
- [ ] `scattergl`/WebGL for large series; down-sampled first
- [ ] Config gates toolbar/responsive; modeBar trimmed
- [ ] `plotly_click/hover/selected` handlers; listeners cleaned
- [ ] Version pinned; bundle lean; browser WebGL verified