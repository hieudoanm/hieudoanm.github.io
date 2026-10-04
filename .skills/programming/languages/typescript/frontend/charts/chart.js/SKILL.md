---
name: chart-js-best-practices
description: Best practices for data visualization with Chart.js — the canvas-based charting conventions for JS dashboards. Use when writing, structuring, or reviewing Chart.js — covers configuration, datasets, options, plugins, responsive behavior, and performance.
---

# Chart.js Best Practices

Chart.js renders **canvas-based charts in the browser** — `new Chart(ctx, {...})` with datasets, scales, and options; responsive out of the box. Practical Chart.js leans on **a Chart-controller registry reuse pattern (`Chart.getChart(element)`), structured `datasets` with explicit colors/fill, option placement correct (global vs scales vs plugins), and `destroy`/`update` lifecycle discipline** — the canvas is the target; manage instance lifecycle or leak listeners.

---

## 1. Creating & Lifecycle

- **One chart per canvas; `new Chart(canvas, config)`; destroy on teardown:**

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

- **`Chart.getChart(canvas)` before re-creating — update, don't duplicate.**
- **`chart.data = newData; chart.update()` for updates — not new Chart instances per render.**

---

## 2. Datasets & Colors

- **Datasets self-describing: label, data, type (mixing), fill/color explicit:**

```js
datasets: [
  { label: "Revenue", data: rev, borderColor: "#2563eb", fill: false },
  { label: "Costs",   data: cost, borderColor: "#dc2626", fill: true },
]
```

- **Palette consistent across charts (centralize colors); `fill` deliberate (area vs line).**
- **Na balances: legend labels set; `tooltip`/`interaction` configured for the dataset.**

---

## 3. Scales & Axes

- **Scales config in `options.scales` — x/y objects with `ticks`, `title`, `min`/`max`:**

```js
options: {
  scales: {
    x: { title: { display: true, text: "Month" } },
    y: { beginAtZero: true, title: { display: true, text: "USD" } },
  },
}
```

- **`beginAtZero`/`suggestedMin` per semantics; time scale via `time` adapter for date axes.**
- **Placement multi-axis: `y1: { position: "right" }` only where genuinely read-worthy.**

---

## 4. Responsive & Layout

- **`responsive: true` default; `maintainAspectRatio: false` + a sized parent:**
- **Canvas inside a fixed-height container; call `chart.resize()` on container resize for SPA frameworks.**
- **`devicePixelRatio` set for crisper HiDPI exports (default 1 — toggle when needed).**

---

## 5. Plugins & Interaction

- **Plugins extend: tooltip, legend, custom draw (delayed):**

```js
options: { plugins: { tooltip: { mode: "index", intersect: false }, legend: { position: "top" } } },
```

- **Custom plugins registered once (module scope), not per-chart.**
- **Throttle drag/zoom if enabled; offscreen animations squad (`animation: false` for tables).**

---

## 6. Performance

- **Large datasets: down-sample/aggregate before render (Chart.js is canvas but still rsps).**
- **`decimation` plugin for streaming; `animation: false` for bulk updates.**
- **Reuse chart instances; destroy unused — repeated mounts leak canvas listeners.**

---

## General Rules of Thumb

- **One chart per canvas; update over recreate; destroy on teardown.**
- **Datasets explicit (label/colors); scales + tooltips configured.**
- **Responsive layout with sized parents; HiDPI when needed.**
- **Custom plugins module-scoped; animation off for high-frequency.**
- **Aggregate large data; reuse instances.**

---

## Quick-Start Checklist

- [ ] `new Chart` once per canvas; `destroy()` on unmount
- [ ] `update()` mutation over recreate; `Chart.getChart` guarded
- [ ] Datasets with explicit label/colors/fill; palette centralized
- [ ] `scales`/`plugins` configured; responsive + sized parent
- [ ] Aggregation before render; `animation:false` for streams
- [ ] HiDPI toggled where sharpness matters