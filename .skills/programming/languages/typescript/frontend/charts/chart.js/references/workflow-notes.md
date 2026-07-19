# Workflow notes

Focused reference for **chart-js-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
