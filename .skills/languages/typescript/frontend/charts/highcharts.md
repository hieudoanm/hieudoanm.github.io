---
name: highcharts-best-practices
description: Best practices for creating interactive charts with Highcharts — the feature-rich SVG charting conventions for JS. Use when writing, structuring, or reviewing Highcharts — covers configuration, series/options, modules, accessibility, and performance.
---

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

- **Series/axes/legend/tooltip each configurable; options are documentation:**

```js
{
  tooltip: { shared: true },
  legend: { enabled: true },
  plotOptions: { line: { marker: { enabled: false } } },
}
```

- **`plotOptions` for shared series defaults; per-series overrides on top.**
- **Na-specific: `null`/gaps handled via `connectNulls`; stacking `stack: "x"` explicit.**

---

## 3. Modules & Add-ons

- **Load only what's used (`highcharts-more`, `exporting`, `heatmap`, `stock`):**

```js
import "highcharts/modules/exporting";   // export buttons/PDF
import "highcharts/highcharts-more";     // polar/gauge/range
```

- **Tree-shake modules in builds; watch license/version notes per module.**
- **Custom modules registered on the shared Highcharts instance only when shared.**

---

## 4. Accessibility & Themes

- **Built-in a11y module: `accessibility: { enabled: true }`; describe charts:**

```js
accessibility: { enabled: true, keyboardNavigation: { enabled: true } }
```

- **`<title>`/desc via options (`chart.description`) for the SR; focus visible.**
- **Theme via `setOptions` once (colors/fonts) — consistent branding, no per-chart hacks.**

---

## 5. Interaction & Refreshing

- **`chart.update({series: [...]})` for data refresh — no recreate churn:**

```js
chart.update({ series: [{ name: "2025", data: newData }] });
```

- **`chart.destroy()` on teardown; events (`chart.events.load`) for hooks.**
- **Drilldown/range scroll only where the interaction is user-lead.**

---

## 6. Performance

- **Aggregate before render; `animation: false` for initial load of dense series.**
- **Limit series/points for the view; `turboThreshold` raised deliberately with bounded data.**
- **Rendering atomic: build the full options object once, then chart it (no per-frame `update`).**

---

## General Rules of Thumb

- **Declarative options = the contract; series/axes/tooltip explicit.**
- **Modules loaded deliberately (tree-shaken).**
- **Accessibility module on; titles/descs set.**
- **`chart.update()` over recreate; `destroy()` teardown.**
- **Aggregate data; build options once; animation off for dense.**

---

## Quick-Start Checklist

- [ ] `Highcharts.chart(container, options)`; series typed per semantics
- [ ] `plotOptions` defaults + per-series overrides; tooltip/legend configured
- [ ] Modules imported per-use (`highcharts-more`, exporting, heatmap)
- [ ] `accessibility.enabled` + `chart.description`; keyboard nav on
- [ ] `chart.update()` for refresh; `destroy()` on unmount
- [ ] Data aggregated; `animation:false` initial; options built once