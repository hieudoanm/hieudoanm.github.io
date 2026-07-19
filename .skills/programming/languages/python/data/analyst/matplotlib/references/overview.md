# Overview

Focused reference for **matplotlib-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
