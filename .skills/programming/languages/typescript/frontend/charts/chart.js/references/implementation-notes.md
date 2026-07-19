# Implementation notes

Focused reference for **chart-js-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
