# Overview

Focused reference for **tanstack-charts-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
