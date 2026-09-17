# Overview

Focused reference for **google-charts-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Google Charts Best Practices

Google Charts (the `gviz`/`google.visualization` library) renders **hosted SVG charts from a `DataTable`** — load the loader, build the table, pick a chart class, render with options. Practical Google Charts leans on **the loader `google.charts.load("current", {packages:[...]})` + `setOnLoadCallback`, `DataTable` semantics (columns typed) over ad-hoc arrays, and explicit `options` per chart** — the data shape (`DataTable`) is the contract; options are the flavor.

---

## 1. Loading & Bootstrap

- **Static loader + callback — render only after load:**

```js
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
  drawLineChart(data);
}
```

- **Load packages you use (`corechart`, `bar`, `line`, `pie`, `table`…).**
- **Markup version: `data-google-charts` HTML attribute for low-JS dashboards.**

---
