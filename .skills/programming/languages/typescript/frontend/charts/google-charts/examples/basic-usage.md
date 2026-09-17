# Google Charts Best Practices: Basic Usage

Best practices for integrating Google Charts (gviz) — the hosted-chart conventions for JS dashboards. Use when writing, structuring, or reviewing Google Charts — covers loading, DataTable vs Array, options, events, and rendering/performance.

## Scenario

Use this example as a starting point when applying **google-charts-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Loading & Bootstrap** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```js
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
  drawLineChart(data);
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
