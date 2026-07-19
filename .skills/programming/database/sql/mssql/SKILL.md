---
name: "mssql"
description: "Microsoft SQL Server — relational database management system with T-SQL, ACID transactions, indexing, and enterprise features."
tags:
  - "programming"
  - "database"
  - "sql"
  - "mssql"
when_to_use: "Use when implementing, configuring, evaluating, or troubleshooting MS SQL Server in a project."
prerequisites:
  - "Familiarity with the application’s data model and access patterns."
  - "For implementation, access to the database environment or representative schema."
related_skills:
  - "../mysql/SKILL.md"
  - "../postgresql/SKILL.md"
  - "../cockroachdb/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
Microsoft SQL Server is a **relational database management system** with a rich **T-SQL** dialect, **ACID transactions**, comprehensive indexing and concurrency controls, high availability, and analytics capabilities.

## 1. Core Concepts

- Databases contain **schemas** (e.g., `dbo`), tables, views, stored procedures, functions, and more.
- **T-SQL** is the query/procedural language. Queries often use `SELECT`, `FROM`, `JOIN`, `WHERE`, `GROUP BY`, `ORDER BY`, `TOP`.
- **Transactions**: `BEGIN TRAN`, `COMMIT`, `ROLLBACK`; isolation levels (read committed default) control concurrency behavior.
- **Schema-bound objects**: views, functions, and procedures encapsulate query logic inside the DB.
- **Availability**: Always On Availability Groups, log shipping, replication, and failover clustering for HA.

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

## 3. Indexing

- **Clustered index**: defines physical order — typically on a monotonically increasing key (identity, rowguid) to avoid page splits.
- **Nonclustered indexes** on query columns; include **covering index** for queries that return only indexed columns.
- Composite indexes: order columns left-to-right; leading column should match the most selective/filtered predicate.
- **Filters**: filtered indexes for sparse data patterns reduce subject set and size.
- Use the **Database Tuning Advisor** (DTA) as a start, but hand-tune for real workloads; drop unused/duplicate indexes.

```sql
-- clustered index = physical row order; keep it narrow so the nonclustered ones can hold the key
CREATE UNIQUE CLUSTERED INDEX CX_Orders_OrderId ON dbo.Orders (OrderId);

-- covering index: INCLUDE payloads are read from the index, never the base table
CREATE NONCLUSTERED INDEX IX_Orders_OrderedAt
  ON dbo.Orders (OrderedAt DESC, Status)
  INCLUDE (Total)
  WHERE Status = 'paid';      -- filtered: smaller, and stays dense as the table grows
```

## 4. Concurrency

- **SQL Server 2022+**: row-level locking and default read committed with snapshot under `READ_COMMITTED_SNAPSHOT`.
- Use **`HOLDLOCK`/`UPDLOCK`** hints for pessimistic updates vs optimistic concurrency handled by EF Core/config.
- Deadlocks are normal — write retry logic for failed transactions.
- `NOLOCK` hint reads dirty data — avoid unless a deliberate, non-durable query.

## 5. Operational Practice

- **Backups**: `BACKUP DATABASE`, differential, and transaction-log backups with recovery model FULL for point-in-time recovery.
- Monitor locks: `sys.dm_tran_locks`, `sys.dm_exec_requests`, check_blocked_by.
- **Index fragmentation**: `ALTER INDEX REORGANIZE`/`REBUILD` on a schedule; inspect via `sys.dm_db_index_physical_stats`.
- Memory: cap and tune max server memory; avoid OS memory pressure.
- Right-size `MAXDOP` and `Cost Threshold for Parallelism` for mixed workloads.

```sql
-- FULL recovery plus an unbroken log chain is what makes point-in-time restore possible
ALTER DATABASE shop SET RECOVERY FULL;
BACKUP DATABASE shop TO DISK = '/var/opt/mssql/backup/shop_full.bak' WITH INIT, COMPRESSION;
BACKUP DATABASE shop TO DISK = '/var/opt/mssql/backup/shop_diff.bak' WITH DIFFERENTIAL;
BACKUP LOG shop TO DISK = '/var/opt/mssql/backup/shop_log.trn' WITH NOINIT;  -- WITH INIT breaks the chain

-- fragmentation: only rebuild what is actually fragmented
SELECT s.name AS index_name, ps.avg_fragmentation_in_percent, ps.page_count
FROM sys.dm_db_index_physical_stats(DB_ID(), 'dbo', 'Orders', DEFAULT, 'LIMITED') AS ps
JOIN sys.indexes AS s ON s.object_id = ps.object_id AND s.index_id = ps.index_id
WHERE ps.avg_fragmentation_in_percent > 30;

ALTER INDEX IX_Orders_OrderedAt ON dbo.Orders REBUILD;  -- REORGANIZE is cheaper below ~30%
```

## 6. Common Pitfalls

- Missing or redundant indexes; using `SELECT *`.
- Fill factor puzzles without a concrete case (rarely needed).
- Implicit conversions of indexed columns (`WHERE int_col = '1'`) making indexes useless.
- `NOLOCK` everywhere for performance, shipping unbounded dirty reads.
- Rare/nonexistent point-in-time restore — missing log backups.

## General Rules of Thumb

- Index for the queries you measure, not speculative ones.
- Keep T-SQL set-based; batch large writes with `TOP`/chunks where possible.
- Use isolation levels that map to your concurrency needs (snapshot vs read committed).
- Never full-trust DTA; validate plans with actual stats.

## Quick-Start Checklist

- [ ] Design schema, clustered key, and secondary indexes per read patterns.
- [ ] Ensure SARGable predicates on hot queries (no functions on columns).
- [ ] Configure recovery model and backup schedule (full + diff + log for point-in-time).
- [ ] Enable `READ_COMMITTED_SNAPSHOT` for read-heavy concurrent workloads (or sequence apps).
- [ ] Set `MAXDOP`, memory, and tempdb files per workload.
- [ ] Add monitoring: index fragmentation, blocking, deadlocks.
- [ ] Run `STATISTICS IO/TIME`, examine and tune top queries.
