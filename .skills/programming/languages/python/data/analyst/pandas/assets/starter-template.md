# Pandas Best Practices: Starter Template

A reusable starting point derived from the **3. Transformations** section of [Pandas Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```python
(df
 .assign(amount = lambda d: d["price"] * d["qty"])
 .query("amount > 100")
 .groupby("region")["amount"].sum())
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
