# D3 Best Practices: Basic Usage

Best practices for data-driven documents with D3 — the powerful data-visualization conventions for JS. Use when writing, structuring, or reviewing D3 — covers selections, data joins, scales/axes, SVG structure, and performance.

## Scenario

Use this example as a starting point when applying **d3-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Selections** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```js
import * as d3 from "d3";

const svg = d3.select("#chart")
  .append("svg")
  .attr("width", 800)
  .attr("height", 400);
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
