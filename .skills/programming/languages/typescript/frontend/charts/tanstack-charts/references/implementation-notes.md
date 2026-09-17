# Implementation notes

Focused reference for **tanstack-charts-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
