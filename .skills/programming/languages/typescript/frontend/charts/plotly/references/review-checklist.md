# Review checklist

Focused reference for **plotly-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 6. Integration & Trust

- **Bundle selectively (`dist-min`, or `bundle.js`) to trim weight; tree-shake where possible.**
- **SVG default; WebGL opt-in where the data earns it.**
- **Version-pin; test across target browsers (WebGL context limits documented).**

---

## General Rules of Thumb

- **Traces + layout + config — the modeling contract.**
- **`Plotly.react`/`restyle` over `newPlot` churn.**
- **`scattergl` for dense; down-sample before upload.**
- **Events (`plotly_*`) for cross-filter; config gates the UI chrome.**
- **Pin versions; bundle lean; resize handled.**

---

## Quick-Start Checklist

- [ ] Typed traces (name/mode/color); layout structured
- [ ] `Plotly.react`/`restyle` for updates; no full redraws
- [ ] `scattergl`/WebGL for large series; down-sampled first
- [ ] Config gates toolbar/responsive; modeBar trimmed
- [ ] `plotly_click/hover/selected` handlers; listeners cleaned
- [ ] Version pinned; bundle lean; browser WebGL verified
