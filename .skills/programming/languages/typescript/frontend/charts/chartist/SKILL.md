---
name: chartist-best-practices
description: Best practices for creating charts with Chartist — the lightweight SVG charting conventions for JS. Use when writing, structuring, or reviewing Chartist — covers configuration, responsive, animation, plugins, and maintenance notes.
---

# Chartist Best Practices

Chartist.js is a **lightweight SVG-based charting library** — declarative config, CSS-styled (SVG into your stylesheet), and responsive-friendly. Practical Chartist leans on **declarative `data` + `options` per chart, styling through CSS of the generated SVG (`.ct-series`, `.ct-area`, `.ct-line`), setting the responsive scale via `X`/`Y` axis options, and awareness that Chartist's maintenance is legacy-slow — treat it as stable-but-frozen** — simple dashboards yes; heavy animation ecosystems look elsewhere.

---

## 1. Creating Charts

- **Constructor per chart; keep a reference:**

```js
import Chartist from "chartist";

const chart = new Chartist.Line(".chart", {
  labels: ["Jan", "Feb", "Mar"],
  series: [[10, 20, 15]],
}, {
  fullWidth: true,
  chartPadding: { right: 20 },
});
```

- **Series data as arrays; `low`/`high`/`axisX`/`axisY` in options set the scale.**
- **Element-bound `data` attribute accepts the config for no-JS first render.**

---

## 2. Styling via CSS

- **The library outputs structured SVG classes — style them, don't pixel-hack:**

```css
.ct-series-a .ct-line { stroke: #2563eb; stroke-width: 2px; }
.ct-series-b .ct-bar { fill: #dc2626; }
```

- **Y-axis/energy via `.ct-grid`/`.ct-labels` CSS; consistent palette per series letter.**
- **No camelCase inline styles — the CSS classes are the theme.**

---

## 3. Responsive & Scales

- **`responsive: true` + `fullWidth: true`; the SVG adapts to container:**
- **Set `axisX`/`axisY` (`labelInterpolationFnc`, `scale` min/max via `low`/`high`) for sensible ranges.**
- **Fixed container heights to avoid chart floor jumps.**

---

## 4. Animation & Plugins

- **SVG CSS animations supported; simple `animate` via `chart.on("draw", ...)` hooks:**
- **Legend/plugins pass through `plugins: [...]`; mixing fragile features keeps the trade-off visible.**
- **Don't depend on active bugfix velocity — feature parity with Chart.js/Recharts for complex need.**

---

## 5. Lifecycle & Integration

- **`chart.detach()` on component unmount (SVG removed cleanly):**
- **Update: `chart.update({series: [...]})` — reference the instance, avoid re-create storms.**
- **Events (`chart.on("created", ...)`) for post-creation hooks; keep DOM handlers for interactive extras.**

---

## General Rules of Thumb

- **Lightweight SVG; small dashboards fit, heavy chart stacks don't.**
- **Style via the generated CSS classes; palette in the stylesheet.**
- **Declarative options (`low`/`high`, interpolation) over fight-animating.**
- **`detach()` on teardown; `update()` over recreate.**
- **Treat Chartist as frozen — plan migrations for complex needs.**

---

## Quick-Start Checklist

- [ ] Constructor per chart with data + options; reference kept
- [ ] Series styling via `.ct-*` CSS classes; palette consistent
- [ ] `fullWidth`/responsive; axisScale (`low`/`high`) explicit
- [ ] Animation via CSS/draw hook (lightweight only)
- [ ] `chart.update()`/`detach()` lifecycle; no recreate storms
- [ ] Freeze-status documented; migration path if charts grow