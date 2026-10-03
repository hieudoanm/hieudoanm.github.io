---
name: matplotlib-best-practices
description: Best practices for plotting and visualization with Matplotlib — the plotting conventions for Python. Use when writing, structuring, or reviewing Matplotlib — covers figures/axes, styling, subplots, savefig, and interactive/exploratory use.
---

# Matplotlib Best Practices

Matplotlib is **the foundational plotting library in Python** — figure/axes objects give complete control from a minimal script up to publication figures. Practical Matplotlib leans on **the OO API (`fig, ax = plt.subplots()`; draw on `ax`) over stateful `pyplot`, explicit styling to a consistent theme, subplots composed deliberately, and `savefig` with explicit resolution/formats** — "always know which axes you're drawing on".

---

## 1. Figures & Axes

- **OO API — create the figure once, draw on axes:**

```python
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(8, 5))
ax.plot(x, y, label="series")
ax.set_title("Revenue")
ax.set_xlabel("Month")
plt.show()
```

- **`plt.subplots(nrows=1, ncols=2)` for side-by-side; `figsize` deliberate (not default for prints).**
- **Avoid the stateful `plt.gca()`/`plt.title` chain — bind the ax.**

---

## 2. Style

- **Aesthetic consistency — a named palette + coherent ticks/grid:**

```python
fig, ax = plt.subplots()
ax.set_facecolor("white")
ax.grid(True, which="both", axis="y", color="#eee")
ax.tick_params(axis="both", labelsize=9)
```

- **`cycler`/`Set2`-style colormaps over the default rainbow; labels + legend on every plot.**
- **Tick formatting via `matplotlib.ticker.FuncFormatter` where scale matters (sparse + readable).**

---

## 3. Subplots & Layouts

- **`fig, axes = plt.subplots(b, a, sharey=True, ...)` tagged loop over `axes.flat`:**
- **`tight_layout()`/`constrained_layout=True` for clean spacing; `fig.savefig(...)` at the end.**
- **Named subplot grids (`gridspec`) when rows/cols differ; keep axes sizes intentional.**

---

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