# Implementation notes

Focused reference for **matplotlib-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Plotting Choices

- **Line/`scatter`/`bar`/`hist` mapped to data: time series = lines, categories = bars/box, distributions = hist/KDE.**
- **`ax.axhline`/`ax.axvline` for reference thresholds; annotate points with `ax.annotate`.**
- **Color as constant or category; avoid rainbow-defaults confusing classes.**
- **For comparisons: error bars/CI bands (`fill_between`) over point-spaghetti.**

---

## 5. Export & Sharing

- **`fig.savefig("out.png", dpi=300, bbox_inches="tight")` — dpi/formats explicit:**

```python
fig.savefig("rev.png", dpi=300, bbox_inches="tight")
```

- **Vector formats (PDF/SVG) for documents; PNG at target dpi for the screen.**
- **Fonts/Arial default OK; `rcParams` theme centralized for the repo.**

---
