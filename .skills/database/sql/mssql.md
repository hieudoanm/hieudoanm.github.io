---
name: mssql
description: Microsoft SQL Server — relational database management system with T-SQL, ACID transactions, indexing, and enterprise features.
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

## 3. Indexing

- **Clustered index**: defines physical order — typically on a monotonically increasing key (identity, rowguid) to avoid page splits.
- **Nonclustered indexes** on query columns; include **covering index** for queries that return only indexed columns.
- Composite indexes: order columns left-to-right; leading column should match the most selective/filtered predicate.
- **Filters**: filtered indexes for sparse data patterns reduce subject set and size.
- Use the **Database Tuning Advisor** (DTA) as a start, but hand-tune for real workloads; drop unused/duplicate indexes.

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