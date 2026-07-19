# 2. Querying and Tuning

Focused reference for **mssql**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Querying and Tuning

- Use `SET SHOWPLAN_XML ON` or `SET STATISTICS IO/TIME ON` and SSMS's estimated execution plan to inspect performance.
- SARGable predicates: index-friendly `WHERE` clauses — avoid functions on columns (`WHERE YEAR(dt)=2024` becomes non-SARGable).
- Write **set-based** T-SQL over row-by-row loops; avoid manual loops for many rows.
- **Index hints**: restrict only with deep understanding of the plan; prefer letting the optimizer decide.
- Use **temporary tables**, CTEs, and `MERGE` for upsert logic (or `INSERT ... ON CONFLICT` in newer SQLite incompatible, here: SQL Server 2008+ upsert via MERGE).

```sql
-- SARGable: compare the bare column so the index on OrderedAt stays seekable
DECLARE @from date = '2026-01-01', @to date = '2026-04-01', @OrderId int = 1042;
SELECT o.OrderId, o.Total
FROM dbo.Orders AS o
WHERE o.OrderedAt >= @from AND o.OrderedAt < @to AND o.Status = 'paid'
ORDER BY o.OrderedAt DESC;   -- NOT WHERE YEAR(o.OrderedAt) = 2026

SET STATISTICS IO ON;        -- logical reads, not just the optimizer's guess
SET STATISTICS TIME ON;      -- CPU and elapsed time per statement

-- set-based upsert: one statement, one transaction, no cursor loop
MERGE dbo.OrderStatus WITH (HOLDLOCK) AS tgt
USING (VALUES (@OrderId, 'shipped')) AS src (OrderId, Status) ON tgt.OrderId = src.OrderId
WHEN MATCHED AND tgt.Status <> src.Status THEN UPDATE SET tgt.Status = src.Status
WHEN NOT MATCHED BY TARGET THEN INSERT (OrderId, Status) VALUES (src.OrderId, src.Status);
```
