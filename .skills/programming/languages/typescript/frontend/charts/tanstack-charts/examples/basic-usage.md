# TanStack Charts Best Practices: Basic Usage

Best practices for building charts with TanStack Charts (formerly TanCharts) — the headless charting conventions for JS/React. Use when writing, structuring, or reviewing TanStack Charts — covers data/options model, axes, series, themes, performance, and updates.

## Scenario

Use this example as a starting point when applying **tanstack-charts-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. The Data Model** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```js
const series = [{ label: "Revenue", data: [120, 130, 95] }];
const axes = [...];   // bottom x, left y
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
