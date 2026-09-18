---
name: pandas-best-practices
description: Best practices for data analysis with pandas — the DataFrame conventions for Python. Use when writing, structuring, or reviewing pandas — covers import/read, dtypes, indexing, transformations, clean pipelines, and performance.
---

# Pandas Best Practices

Pandas provides **the `DataFrame` (tidy, column-typed) as the core structure for data analysis in Python.** Practical pandas leans on **explicit input typing (`dtype` mapping at read), column/category naming discipline, vectorized column ops over row-wise `.apply`, and chained transforms with `assign`/`query` for readability** — a tidy DataFrame (each column a variable, each row an observation) is the model.

---

## 1. Reading & Clean Types

- **Declare dtypes at read — `dtype=`, `parse_dates=`, `usecols=` minimize post-import fixing:**

```python
import pandas as pd
df = pd.read_csv("events.csv", parse_dates=["ts"], dtype={"user_id": "string"})
```

- **`pd.read_parquet`/`to_parquet` for storage efficiency; explicit `dtype` maps for schema.**
- **Validate the first thousand rows: `.dtypes`, `df.head()`, `df["col"].unique()` — schema before transformation.**

---

## 2. Indexing & Selection

- **`.loc`/`.iloc` for label/position selection; boolean masks for filtering:**

```python
active = df.loc[(df["role"] == "admin") & (df["active"])]
```

- **`df.query("role == 'admin' and active")` for readable filters.**
- **Column selection by list `df[["a","b"]]`; avoid chained indexing (`.loc` requirement on writes).**
- **Set the index only when meaningful (time index for resampling/joins readability).**

---

## 3. Transformations

- **Column ops vectorized, `assign` for column-building:**

```python
(df
 .assign(amount = lambda d: d["price"] * d["qty"])
 .query("amount > 100")
 .groupby("region")["amount"].sum())
```

- **`groupby(...).agg({"amount": "sum", "count": "count"})` over frigid loop-hammers.**
- **`.apply` only for genuinely row-wise logic; measuring: `.transform`/`where`/`clip` replace loops.**
- **`map`/`replace` for categorical mapping; `cut`/`qcut` for binning.**

---

## 4. Tidy Data & Merges

- **One column per variable; pivot/unstack only to reshape the view, not the storage.**
- **`merge`/`join` with explicit `on=`/`how=`; check key cardinality post-merge (`.duplicated` on keys).**
- **`concat` for row appends; `pd.concat` with `ignore_index=True` where dup names don't matter.**
- **Long-over-wide decisions logged — remember `pd.melt`/`pivot` round-trips.**

---

## 5. Performance

- **Vectorized ops over loops; `df.to_numpy()` for NumPy math, back to columns after.**
- **`Categorical` dtype for low-cardinality string columns (memory + speed).**
- **`filters on date ranges` with a DatetimeIndex (`df.loc[df.index >= "2024-01-01"]`) — not string compares.**
- **Parallelism: `polars`-style alternatives or `swifter` only when numpy-vectorized paths exhausted.**

---

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