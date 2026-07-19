# Mssql: 3. Indexing

## Source guidance

This example applies the **3. Indexing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Clustered index**: defines physical order — typically on a monotonically increasing key (identity, rowguid) to avoid page splits.
- **Nonclustered indexes** on query columns; include **covering index** for queries that return only indexed columns.
- Composite indexes: order columns left-to-right; leading column should match the most selective/filtered predicate.
- **Filters**: filtered indexes for sparse data patterns reduce subject set and size.
- Use the **Database Tuning Advisor** (DTA) as a start, but hand-tune for real workloads; drop unused/duplicate indexes.

## Example

```sql
-- clustered index = physical row order; keep it narrow so the nonclustered ones can hold the key
CREATE UNIQUE CLUSTERED INDEX CX_Orders_OrderId ON dbo.Orders (OrderId);

-- covering index: INCLUDE payloads are read from the index, never the base table
CREATE NONCLUSTERED INDEX IX_Orders_OrderedAt
  ON dbo.Orders (OrderedAt DESC, Status)
  INCLUDE (Total)
  WHERE Status = 'paid';      -- filtered: smaller, and stays dense as the table grows
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for mssql.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
