# Overview

Focused reference for **chart-js-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
