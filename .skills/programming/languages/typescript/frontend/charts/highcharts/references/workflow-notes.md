# Workflow notes

Focused reference for **highcharts-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Series/axes/legend/tooltip each configurable; options are documentation:**

```js
{
  tooltip: { shared: true },
  legend: { enabled: true },
  plotOptions: { line: { marker: { enabled: false } } },
}
```

- **`plotOptions` for shared series defaults; per-series overrides on top.**
- **Na-specific: `null`/gaps handled via `connectNulls`; stacking `stack: "x"` explicit.**

---

## 3. Modules & Add-ons

- **Load only what's used (`highcharts-more`, `exporting`, `heatmap`, `stock`):**

```js
import "highcharts/modules/exporting";   // export buttons/PDF
import "highcharts/highcharts-more";     // polar/gauge/range
```

- **Tree-shake modules in builds; watch license/version notes per module.**
- **Custom modules registered on the shared Highcharts instance only when shared.**

---
