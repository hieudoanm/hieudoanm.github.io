# Matplotlib Best Practices: Basic Usage

Best practices for plotting and visualization with Matplotlib — the plotting conventions for Python. Use when writing, structuring, or reviewing Matplotlib — covers figures/axes, styling, subplots, savefig, and interactive/exploratory use.

## Scenario

Use this example as a starting point when applying **matplotlib-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Figures & Axes** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```python
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(8, 5))
ax.plot(x, y, label="series")
ax.set_title("Revenue")
ax.set_xlabel("Month")
plt.show()
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
