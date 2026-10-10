# Overview

Focused reference for **numpy-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# NumPy Best Practices

NumPy is **the array computing core of the Python data stack** — homogeneous `ndarray`s with vectorized ops and broadcasting. Practical NumPy leans on **explicit array constructs (`np.array`/`np.zeros`/`np.arange`), vectorization over loops (batch semantics), broadcasting semantics understood (`shape` checks before ops), and immutable shape/dtype hygiene** — "an array is a vector of numbers, plus a contract about `dtype` and `shape`". Performance wins arrive from whole-array ops, not from fighting the library.

---

## 1. Creating Arrays

- **Explicit creators over ad-hoc lists; `dtype` chosen deliberately:**

```python
import numpy as np
z = np.zeros((3, 4), dtype=np.float64)
seq = np.arange(0.0, 1.0, 0.1)
grid = np.linspace(0, 1, 5)
```

- **`np.array(...)` from existing data; `np.copy` on views that mutate — never alias surprises.**
- **`dtype` matters for storage/precision — `int64`/`float64` defaults unless justified.**
- **Ragged/enheterogeneous data belongs in pandas/objects, not ndarrays.**

---

## 2. Broadcasting & Shapes
