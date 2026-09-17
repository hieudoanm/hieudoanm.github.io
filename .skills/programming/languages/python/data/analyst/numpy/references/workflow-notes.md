# Workflow notes

Focused reference for **numpy-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Broadcasting aligns trailing dimensions:**

```python
a = np.zeros((3, 4))     # 3x4
r = a + np.array([1, 2, 3, 4])   # 1x4 → broadcasts rows
```

- **Check `shape`/`ndim` before ops; use `reshape`/`transpose`/`expand_dims` explicitly for alignment.**
- **`np.newaxis`/`None` for explicit singleton dims — document the intent.**

---

## 3. Vectorization

- **Vectorize the hot paths — masks, ufuncs, reductions:**

```python
scores = np.array([...])
passed = scores[scores >= THRESHOLD]          # boolean masking
fs = np.sqrt(np.sum(np.square(delta)))        # whole-array
```

- **No Python for-loops over element-by-element math; `np.where`, `np.select` for branches.**
- **`np.einsum`/matrix ops for tensor math; keep loops at the unit-of-work boundary, not per element.**

---
