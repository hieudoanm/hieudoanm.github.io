# Matplotlib Best Practices: Starter Template

A reusable starting point derived from the **1. Figures & Axes** section of [Matplotlib Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```python
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(8, 5))
ax.plot(x, y, label="series")
ax.set_title("Revenue")
ax.set_xlabel("Month")
plt.show()
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
