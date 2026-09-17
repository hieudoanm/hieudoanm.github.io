# Review checklist

Focused reference for **pandas-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Long Pipelines & Repro

- **Each step a named transform; `assign` chains keep the flow in one place.**
- **Peek with `df.sample(5)`/`info()`; log schema changes; write parquet checkpoints for big flows.**
- **Tests: `pytest` on helper functions with tiny frames; never test whole DF equality with floats — `assert_frame_equal(check_dtype=False)` where deterministic.**

---

## General Rules of Thumb

- **Types at read; one variable per column.**
- **Vectorized ops + `query`/`assign` over loops/apply.**
- **`.loc` for writes; boolean masks for filters.**
- **Check merge cardinality; categoricals for low-cardinality strings.**
- **Named steps, parquet checkpoints, seeded RNG.

---

## Quick-Start Checklist

- [ ] `dtype`/`parse_dates` at read; schema check first
- [ ] `df.loc`/boolean masks; no chained-index writes
- [ ] Column ops vectorized; `groupby().agg`; `.apply` only for row-wise logic
- [ ] Merges with explicit `on`/`how`; key cardinality verified
- [ ] Categorical dtype used; date range filters on DatetimeIndex
- [ ] Named `assign` steps + parquet checkpoints; small-frame tests
