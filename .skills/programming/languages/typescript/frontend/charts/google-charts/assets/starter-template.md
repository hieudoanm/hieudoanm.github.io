# Google Charts Best Practices: Starter Template

A reusable starting point derived from the **1. Loading & Bootstrap** section of [Google Charts Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```js
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
  drawLineChart(data);
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
