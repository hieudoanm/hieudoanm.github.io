# D3 Best Practices: Starter Template

A reusable starting point derived from the **2. Data Joins (General Update Pattern)** section of [D3 Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```js
const circles = svg.selectAll("circle").data(data, (d) => d.id);

circles.enter().append("circle")
  .attr("r", 4)
  .merge(circles)
  .attr("cx", (d) => x(d.day))
  .attr("cy", (d) => y(d.value));

circles.exit().remove();
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
