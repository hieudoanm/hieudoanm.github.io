# Review checklist

Focused reference for **tanstack-charts-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Performance

- **Canvas renderer for dense series; SVG for crisp small dashboards.**
- **Cap N per series; aggregation before feed; `defer` interactions where hot.**
- **Bulk initial config once; incremental `updateOptions` afterwards (no full remount).**

---

## General Rules of Thumb

- **Data + series + axes as the typed contract.**
- **Options declarative; update via `updateOptions`.**
- **Axes explicit (scaleType/formatters); stylng centralized.**
- **You own rendering; the model stays the source of truth.**
- **Canvas for dense; incremental updates; destroy on teardown.**

---

## Quick-Start Checklist

- [ ] Series/axes structured per axis semantics; data typed
- [ ] Chart built declaratively; renderer chosen (canvas/SVG)
- [ ] Axes with `scaleType` + formatted ticks
- [ ] Colors/grid themed centrally; consistent palette
- [ ] `updateOptions` for refreshes; `destroy()` on unmount
- [ ] Down-sampled series; bulk options built once
