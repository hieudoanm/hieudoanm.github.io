---
name: d3-best-practices
description: Best practices for data-driven documents with D3 — the powerful data-visualization conventions for JS. Use when writing, structuring, or reviewing D3 — covers selections, data joins, scales/axes, SVG structure, and performance.
---

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

- **The core mental model: join + enter + update + exit:**

```js
const circles = svg.selectAll("circle").data(data, (d) => d.id);

circles.enter().append("circle")
  .attr("r", 4)
  .merge(circles)
  .attr("cx", (d) => x(d.day))
  .attr("cy", (d) => y(d.value));

circles.exit().remove();
```

- **A stable key function (`.data(data, d => d.id)`) enables animated updates.**
- **Enter/update separated; updates mutate, enters build — never rebuild the whole SVG per change.**

---

## 3. Scales & Axes

- **Scales map data → pixels; the contract of the chart:**

```js
const x = d3.scaleTime().domain(d3.extent(data, d => d.date)).range([margin.left, width]);
const y = d3.scaleLinear().domain([0, d3.max(data, d => d.value)]).nice().range([height, margin.top]);
```

- **`scaleBand`/`scaleOrdinal` for categorical; `stroke`/`color` via scale where relevant.**
- **Axes via `d3.axisBottom(x).ticks(...)`; format ticks with `d3.format`, never raw floats.**

---

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

- **Bound SVG elements to data count (1,000–10k OK; 100k = canvas territory):**
- **Canvas/`d3-shape` + `d3-geo` for dense; avoid per-frame DOM diffing.**
- **Draw large paths (`d3.line`/`d3.geoPath`) once; update attributes only, not geometry text.**

---

## General Rules of Thumb

- **General update pattern as the core; keyed data joins.**
- **Scales the mapping contracts; axes via `d3.axis*`.**
- **Structure SVG in groups; defs for gradients.**
- **`pointer` interactions; compose zoom/drag behaviors.**
- **Element-count-bound; canvas for 100k+ points.**

---

## Quick-Start Checklist

- [ ] Selection chain explicit; one element type per join
- [ ] `enter`/`update`/`exit` implemented with a stable key
- [ ] Scales (`time`/`linear`/`band`) + margin groups structured
- [ ] Axes via `d3.axis*`; ticks formatted
- [ ] Events via `pointer`; zoom/drag composed as behaviors
- [ ] Dense-data switch to canvas; geometry mutated, not re-stringed