# NumPy Best Practices: Basic Usage

Best practices for numerical computing with NumPy — the array library conventions for Python. Use when writing, structuring, or reviewing NumPy — covers ndarray creation, broadcasting, vectorization, masks, dtypes, and performance.

## Scenario

Use this example as a starting point when applying **numpy-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Creating Arrays** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```python
import numpy as np
z = np.zeros((3, 4), dtype=np.float64)
seq = np.arange(0.0, 1.0, 0.1)
grid = np.linspace(0, 1, 5)
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
