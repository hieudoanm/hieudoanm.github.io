---
name: google-charts-best-practices
description: Best practices for integrating Google Charts (gviz) — the hosted-chart conventions for JS dashboards. Use when writing, structuring, or reviewing Google Charts — covers loading, DataTable vs Array, options, events, and rendering/performance.
---

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

## 2. DataTable Semantics

- **Typed columns over raw arrays:**

```js
const data = new google.visualization.DataTable();
data.addColumn("string", "Month");
data.addColumn("number", "Revenue");
data.addRows([["Jan", 120], ["Feb", 95]]);
```

- **`addRole`/`{ role: "style" }` columns for per-point styling; `group`/`filter` for view transforms.**
- **Array-form via `new DataTable({cols, rows})` — but typed `addColumn` reads better.**

---

## 3. Charts & Options

- **Pick the class per semantics; render with explicit options:**

```js
const chart = new google.visualization.LineChart(el);
chart.draw(data, { title: "Revenue", hAxis: { title: "Month" }, vAxis: { minValue: 0 }, legend: { position: "bottom" } });
```

- **Options per chart family (`isStacked`, `pieHole`, `curveType`) — validate at render.**
- **`{%String format%}`/`prefix` values in axes; no raw floats in ticks.**

---

## 4. Events & Interaction

- **`google.visualization.events.addListener(chart, "select", fn)` for selection:**
- **`getSelection()`/`data.getValue(row, col)` read-backs — state at the chart, not the DOM text.**
- **Range/zoom only where the chart type ships it; keep interactions deliberate.**

---

## 5. Responsive & Re-render

- **Chart needs a parent width; re-draw on container resize (debounced):**
- **Redraw = `chart.draw(newOptions)` (or `google.visualization.events.trigger` on ready).**
- **Destroy via `clearChart()` on unmount to remove the DOM + listeners.**

---

## 6. Performance & Load

- **Hosted library — network weight; lazy-load the package on view:**
- **Aggregate data before render (wide tables = slow); cap rows for dashboards.**
- **Version-pin the loader revision to prevent drift surprises.**

---

## General Rules of Thumb

- **Loader + `setOnLoadCallback`; render after load.**
- **DataTable typed columns — the contract.**
- **Per-chart options explicit; events via `events.addListener`.**
- **Redraw on resize (debounced); `clearChart()` on teardown.**
- **Lazy-load + aggregate; pinned loader version.**

---

## Quick-Start Checklist

- [ ] `google.charts.load` + `setOnLoadCallback` wired
- [ ] DataTable with typed columns + roles styled deliberately
- [ ] Chart class per semantics; options explicit
- [ ] Events via `addListener`; `getSelection` read-backs
- [ ] Resize redraw debounced; `clearChart()` on unmount
- [ ] Lazy-load packages; rows aggregated; loader version pinned