# Overview

Focused reference for **plotly-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
