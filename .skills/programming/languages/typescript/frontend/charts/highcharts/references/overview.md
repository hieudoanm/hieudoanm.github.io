# Overview

Focused reference for **highcharts-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Highcharts Best Practices

Highcharts renders **feature-rich interactive SVG charts** — the `Highcharts.chart(container, options)` API with series, axes, tooltips, and modules. Practical Highcharts leans on **declarative `options` (series per data, axis config, accessibility), the module system loaded deliberately (`highcharts-more`, exporting, heatmap), and re-creation/`chart.update()` lifecycle discipline** — options are the contract; modules the extensions you genuinely use.

---

## 1. Creating Charts

- **`chart(container, options)` with declarative config:**

```js
import Highcharts from "highcharts";

const chart = Highcharts.chart("container", {
  title: { text: "Revenue" },
  series: [{ type: "line", name: "2024", data: [10, 20, 15] }],
  xAxis: { categories: ["Jan", "Feb", "Mar"] },
});
```

- **Series typed per semantic (line/column/area/pie); data arrays same length as axis labels.**
- **`useHighcharts` React wrapper or direct import — one pattern across the app.**

---

## 2. Configuration & Series
