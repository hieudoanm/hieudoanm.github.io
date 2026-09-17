# Implementation notes

Focused reference for **numpy-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Masks & Indexing

- **Boolean masks first-class; fancy indexing returns copies (know view vs copy):**

```python
mask = (data > 0) & (data < 10)
subset = data[mask]
```

- **`np.ix_` for orthogonal indexing; `.copy()` after any view-taking op that mutates.**
- **`np.allclose` for float equality; never `==` on floats except integers/both–same exact dtype.**

---

## 5. Memory & Performance

- **Views vs copies: `view()`/slicing returns views; loss of data writes requires `.copy()`.**
- **`np.save`/`np.load` (`.npy`) for arrays; `astype` before down/precision casts.**
- **`@out=` / `out=np.empty` for large in-place accumulation; avoid Python-scope churn on arrays.**
- **`np.lib.stride_tricks`/`sliding_window_view` for windowing — with the performance rules documented.**
- **Parallelism via NumPy's BLAS (no explicit threads needed); memoize the `as_strided` recipes.**

---

## 6. Integration & Testing
