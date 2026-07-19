# Review checklist

Focused reference for **chartist-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
