# Chart.js Best Practices: Starter Template

A reusable starting point derived from the **1. Creating & Lifecycle** section of [Chart.js Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
