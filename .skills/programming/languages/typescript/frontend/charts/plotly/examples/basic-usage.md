# Plotly.js Best Practices: Basic Usage

Best practices for creating interactive scientific charts with Plotly.js — the trace-layout WebGL/SVG charting conventions for JS. Use when writing, structuring, or reviewing Plotly — covers traces, layout, updates, and performance.

## Scenario

Use this example as a starting point when applying **plotly-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Traces & Layout** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```js
import Plotly from "plotly.js-dist-min";

const traces = [{ x, y, type: "scatter", mode: "lines+markers", name: "Revenue" }];
const layout = { title: "Revenue", xaxis: { title: "Month" }, yaxis: { title: "USD" } };

Plotly.newPlot("plot", traces, layout);
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
