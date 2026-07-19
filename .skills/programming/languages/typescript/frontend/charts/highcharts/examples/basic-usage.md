# Highcharts Best Practices: Basic Usage

Best practices for creating interactive charts with Highcharts — the feature-rich SVG charting conventions for JS. Use when writing, structuring, or reviewing Highcharts — covers configuration, series/options, modules, accessibility, and performance.

## Scenario

Use this example as a starting point when applying **highcharts-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Creating Charts** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```js
import Highcharts from "highcharts";

const chart = Highcharts.chart("container", {
  title: { text: "Revenue" },
  series: [{ type: "line", name: "2024", data: [10, 20, 15] }],
  xAxis: { categories: ["Jan", "Feb", "Mar"] },
});
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
