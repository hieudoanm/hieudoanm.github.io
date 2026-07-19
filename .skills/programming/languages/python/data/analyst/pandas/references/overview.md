# Overview

Focused reference for **pandas-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
