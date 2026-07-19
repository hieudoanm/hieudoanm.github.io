# Workflow notes

Focused reference for **pandas-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
