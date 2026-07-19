# Review checklist

Focused reference for **highcharts-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 6. Performance

- **Aggregate before render; `animation: false` for initial load of dense series.**
- **Limit series/points for the view; `turboThreshold` raised deliberately with bounded data.**
- **Rendering atomic: build the full options object once, then chart it (no per-frame `update`).**

---

## General Rules of Thumb

- **Declarative options = the contract; series/axes/tooltip explicit.**
- **Modules loaded deliberately (tree-shaken).**
- **Accessibility module on; titles/descs set.**
- **`chart.update()` over recreate; `destroy()` teardown.**
- **Aggregate data; build options once; animation off for dense.**

---

## Quick-Start Checklist

- [ ] `Highcharts.chart(container, options)`; series typed per semantics
- [ ] `plotOptions` defaults + per-series overrides; tooltip/legend configured
- [ ] Modules imported per-use (`highcharts-more`, exporting, heatmap)
- [ ] `accessibility.enabled` + `chart.description`; keyboard nav on
- [ ] `chart.update()` for refresh; `destroy()` on unmount
- [ ] Data aggregated; `animation:false` initial; options built once
