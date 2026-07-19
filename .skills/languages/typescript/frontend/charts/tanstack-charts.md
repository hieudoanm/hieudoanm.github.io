---
name: tanstack-charts-best-practices
description: Best practices for building charts with TanStack Charts (formerly TanCharts) — the headless charting conventions for JS/React. Use when writing, structuring, or reviewing TanStack Charts — covers data/options model, axes, series, themes, performance, and updates.
---

# TanStack Charts Best Practices

TanStack Charts is the **headless charting library from the TanStack family** — you bring the rendering (`react-table`-style control: charts as composable primitives, canvas/SVG choice), powered by a **typed `data` + `series` + `axes` model and declarative options**. Practical TanStack Charts leans on **structuring data per axis semantics, declaring `series` with the options model, `axes` configuration explicit, and updating via the library's `chart.updateOptions` rather than recreation** — headless means you own rendering/hooks; the model stays the single source of truth.

---

## 1. The Data Model

- **Timeline data with causal keys; per-axis series mapped:**

```js
const series = [{ label: "Revenue", data: [120, 130, 95] }];
const axes = [...];   // bottom x, left y
```

- **Align data length/dimensions with axes; typed series data via generics.**
- **NaN/holes handled by the library's semantics — encode null as data, not absence.**

---

## 2. Chart & Options

- **Create a chart via builder; render with your renderer (canvas/SVG):**

```js
const chart = new Chart({ series, axes, renderer: RenderTypes.CANVAS });
```

- **Options model: `series`, `axes`, grid/edit via `chart.setOptions`:**

```js
chart.setOptions({ seriesOps: { ".": { line: { width: 2 } } }, axesOps: { x0: { tick: { format: d => d } } } });
```

- **The options object is the configuration contract — build it declaratively, update through the API.**

---

## 3. Axes & Layout

- **Axes declared per orientation (`x0`/`y0`), with scale + formatters:**

```js
axes: [{ id: "x0", position: "bottom", scaleType: "band", options: { tick: { format: (v) => v } } }]
```

- **`scaleType` semantic (band/time/linear); ticks formatted, never raw floats.**
- **Secondary axes/bands added only where the view earns the complexity.**

---

## 4. Themes & Styling

- **Rendering via your layer — theme = your invariables:**

```js
chart.setOptions({ theme: { colors: [["#2563eb","#dc2626"]], grid: { gridColor: "#e5e7eb" } } });
```

- **App palette centralized; style consistently across chart types.**
- **Canvas + SVG paths for the layer; interactive hits map through the chart's event model.**

---

## 5. Updates & Lifecycle

- **`chart.updateOptions(...)` for reactive changes (data/axes/theme):**

```js
chart.updateOptions({ series: [{ ...series[0], data: newData }] });
```

- **`chart.destroy()` on unmount; re-render via your rendering layer after option changes.**
- **React wrapper (`@tanstack/react-charts`) — the component owns the chart instance.**

---

## 6. Performance

- **Canvas renderer for dense series; SVG for crisp small dashboards.**
- **Cap N per series; aggregation before feed; `defer` interactions where hot.**
- **Bulk initial config once; incremental `updateOptions` afterwards (no full remount).**

---

## General Rules of Thumb

- **Data + series + axes as the typed contract.**
- **Options declarative; update via `updateOptions`.**
- **Axes explicit (scaleType/formatters); stylng centralized.**
- **You own rendering; the model stays the source of truth.**
- **Canvas for dense; incremental updates; destroy on teardown.**

---

## Quick-Start Checklist

- [ ] Series/axes structured per axis semantics; data typed
- [ ] Chart built declaratively; renderer chosen (canvas/SVG)
- [ ] Axes with `scaleType` + formatted ticks
- [ ] Colors/grid themed centrally; consistent palette
- [ ] `updateOptions` for refreshes; `destroy()` on unmount
- [ ] Down-sampled series; bulk options built once