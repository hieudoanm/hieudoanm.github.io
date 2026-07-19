# Review checklist

Focused reference for **matplotlib-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Interaction & Iteration

- **`plt.show()` in notebooks/scripts; interactive backends for exploration.**
- **Annotated charts are products — every chart answers a question; title = the takeaway.**
- **Long dashboards: functions returning `fig, ax` encapsulate reusable chart logic.**

---

## General Rules of Thumb

- **OO API (`fig, ax`); draw on `ax`, never `plt.gca()` churn.**
- **Consistent style: palette, labels, legend, grid.**
- **layout (`tight_layout`) and export settings explicit.**
- **Plot type matches the data semantics.**
- **Every chart has a title (the insight) and axes labels.**

---

## Quick-Start Checklist

- [ ] `fig, ax = plt.subplots()`; draw on `ax`
- [ ] Consistent palette/theme; grid + labels + legend on each
- [ ] Subplot layout deliberate (`sharey`, `tight_layout`)
- [ ] Chart type matched to data (lines/bars/scatter/hist/KDE)
- [ ] `savefig(dpi=300, bbox_inches="tight")` for exports; vector formats for docs
- [ ] Titles/annotations answer the question; reusable `fig, ax` functions
