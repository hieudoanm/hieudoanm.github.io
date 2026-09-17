# Workflow notes

Focused reference for **matplotlib-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
