# mssql: Basic Usage

Microsoft SQL Server — relational database management system with T-SQL, ACID transactions, indexing, and enterprise features.

## Scenario

Use this example as a starting point when applying **mssql** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Querying and Tuning** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
