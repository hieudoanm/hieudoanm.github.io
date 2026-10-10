# Overview

Focused reference for **chartist-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
