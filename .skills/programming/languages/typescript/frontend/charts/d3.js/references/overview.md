# Overview

Focused reference for **d3-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# D3 Best Practices

D3 is the **granular data-visualization library** — selections + data joins + scales control the DOM you build. Practical D3 leans on **the general update pattern (`selectAll(...).data(d)` with enter/update/exit), scales (`d3.scaleLinear`/`scaleBand`) as the mapping contracts, and explicit SVG structure (groups, axes via `d3.axis*`)** — D3 gives you every knob; the discipline is the structure.

---

## 1. Selections

- **Chain selections explicitly; one target per selection:**

```js
import * as d3 from "d3";

const svg = d3.select("#chart")
  .append("svg")
  .attr("width", 800)
  .attr("height", 400);
```

- **`.select`/`.selectAll` semantics: first match vs all matches — choose deliberately.**
- **`.attr`/`.style`/`.classed`/`.text` for updates; `transition()` only where meaningful.**

---

## 2. Data Joins (General Update Pattern)
