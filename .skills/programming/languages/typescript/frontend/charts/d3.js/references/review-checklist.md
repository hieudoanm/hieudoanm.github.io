# Review checklist

Focused reference for **d3-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Bound SVG elements to data count (1,000–10k OK; 100k = canvas territory):**
- **Canvas/`d3-shape` + `d3-geo` for dense; avoid per-frame DOM diffing.**
- **Draw large paths (`d3.line`/`d3.geoPath`) once; update attributes only, not geometry text.**

---

## General Rules of Thumb

- **General update pattern as the core; keyed data joins.**
- **Scales the mapping contracts; axes via `d3.axis*`.**
- **Structure SVG in groups; defs for gradients.**
- **`pointer` interactions; compose zoom/drag behaviors.**
- **Element-count-bound; canvas for 100k+ points.**

---

## Quick-Start Checklist

- [ ] Selection chain explicit; one element type per join
- [ ] `enter`/`update`/`exit` implemented with a stable key
- [ ] Scales (`time`/`linear`/`band`) + margin groups structured
- [ ] Axes via `d3.axis*`; ticks formatted
- [ ] Events via `pointer`; zoom/drag composed as behaviors
- [ ] Dense-data switch to canvas; geometry mutated, not re-stringed
