# Review checklist

Focused reference for **chart-js-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Large datasets: down-sample/aggregate before render (Chart.js is canvas but still rsps).**
- **`decimation` plugin for streaming; `animation: false` for bulk updates.**
- **Reuse chart instances; destroy unused — repeated mounts leak canvas listeners.**

---

## General Rules of Thumb

- **One chart per canvas; update over recreate; destroy on teardown.**
- **Datasets explicit (label/colors); scales + tooltips configured.**
- **Responsive layout with sized parents; HiDPI when needed.**
- **Custom plugins module-scoped; animation off for high-frequency.**
- **Aggregate large data; reuse instances.**

---

## Quick-Start Checklist

- [ ] `new Chart` once per canvas; `destroy()` on unmount
- [ ] `update()` mutation over recreate; `Chart.getChart` guarded
- [ ] Datasets with explicit label/colors/fill; palette centralized
- [ ] `scales`/`plugins` configured; responsive + sized parent
- [ ] Aggregation before render; `animation:false` for streams
- [ ] HiDPI toggled where sharpness matters
