# Mssql: Starter Template

A reusable starting point derived from the **3. Indexing** section of [Mssql](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```sql
-- clustered index = physical row order; keep it narrow so the nonclustered ones can hold the key
CREATE UNIQUE CLUSTERED INDEX CX_Orders_OrderId ON dbo.Orders (OrderId);

-- covering index: INCLUDE payloads are read from the index, never the base table
CREATE NONCLUSTERED INDEX IX_Orders_OrderedAt
  ON dbo.Orders (OrderedAt DESC, Status)
  INCLUDE (Total)
  WHERE Status = 'paid';      -- filtered: smaller, and stays dense as the table grows
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
