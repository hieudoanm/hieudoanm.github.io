# Review checklist

Focused reference for **google-charts-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Performance & Load

- **Hosted library — network weight; lazy-load the package on view:**
- **Aggregate data before render (wide tables = slow); cap rows for dashboards.**
- **Version-pin the loader revision to prevent drift surprises.**

---

## General Rules of Thumb

- **Loader + `setOnLoadCallback`; render after load.**
- **DataTable typed columns — the contract.**
- **Per-chart options explicit; events via `events.addListener`.**
- **Redraw on resize (debounced); `clearChart()` on teardown.**
- **Lazy-load + aggregate; pinned loader version.**

---

## Quick-Start Checklist

- [ ] `google.charts.load` + `setOnLoadCallback` wired
- [ ] DataTable with typed columns + roles styled deliberately
- [ ] Chart class per semantics; options explicit
- [ ] Events via `addListener`; `getSelection` read-backs
- [ ] Resize redraw debounced; `clearChart()` on unmount
- [ ] Lazy-load packages; rows aggregated; loader version pinned
