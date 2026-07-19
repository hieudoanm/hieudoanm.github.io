# Workflow notes

Focused reference for **d3-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
