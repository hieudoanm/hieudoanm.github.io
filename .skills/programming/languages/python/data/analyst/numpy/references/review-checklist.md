# Review checklist

Focused reference for **numpy-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
