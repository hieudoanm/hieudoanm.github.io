---
name: numpy-best-practices
description: Best practices for numerical computing with NumPy — the array library conventions for Python. Use when writing, structuring, or reviewing NumPy — covers ndarray creation, broadcasting, vectorization, masks, dtypes, and performance.
---

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

- **Pandas data columns ↔ `df.to_numpy()`/`np.array(df)` cast explicitly (dtypes!).**
- **`np.testing.assert_array_equal`/`assert_allclose` in tests — exact float equality never.**
- **Seed/reproduce: `np.random.default_rng(seed)` over global `np.random`.**

---

## General Rules of Thumb

- **Whole-array ops and broadcasting over loops.**
- **`dtype` + `shape` are the contract; views vs copies explicit.**
- **Masks/`np.where` over conditionals; `allclose` for floats.**
- **Pandas interop via explicit `.to_numpy()`; tests use `assert_allclose`.**
- **Seeded RNG; read/write via `.npy` where re-use happens.**

---

## Quick-Start Checklist

- [ ] Explicit creators + intended `dtype`; shapes verified via `.shape`/`ndim`
- [ ] Broadcasting semantics; `reshape`/`newaxis` explicit alignment
- [ ] Vectorized masks/ufuncs; no per-element Python loops
- [ ] View-vs-copy tracked; `.copy()` before in-place mutation
- [ ] `np.allclose`/`assert_allclose` for float checks
- [ ] `default_rng(seed)`; pandas interop cast explicitly