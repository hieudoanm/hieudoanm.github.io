# Chartist Best Practices: Basic Usage

Best practices for creating charts with Chartist — the lightweight SVG charting conventions for JS. Use when writing, structuring, or reviewing Chartist — covers configuration, responsive, animation, plugins, and maintenance notes.

## Scenario

Use this example as a starting point when applying **chartist-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Creating Charts** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```js
import Chartist from "chartist";

const chart = new Chartist.Line(".chart", {
  labels: ["Jan", "Feb", "Mar"],
  series: [[10, 20, 15]],
}, {
  fullWidth: true,
  chartPadding: { right: 20 },
});
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
