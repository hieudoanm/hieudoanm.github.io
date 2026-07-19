# Chart.js Best Practices: Basic Usage

Best practices for data visualization with Chart.js — the canvas-based charting conventions for JS dashboards. Use when writing, structuring, or reviewing Chart.js — covers configuration, datasets, options, plugins, responsive behavior, and performance.

## Scenario

Use this example as a starting point when applying **chart-js-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Creating & Lifecycle** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```js
import Chart from "chart.js/auto";

const chart = new Chart(ctx, {
  type: "line",
  data: { labels, datasets: [{ data, label }] },
  options: { responsive: true, maintainAspectRatio: false },
});

// on unmount
chart.destroy();
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
