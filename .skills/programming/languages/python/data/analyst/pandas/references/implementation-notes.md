# Implementation notes

Focused reference for **pandas-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
