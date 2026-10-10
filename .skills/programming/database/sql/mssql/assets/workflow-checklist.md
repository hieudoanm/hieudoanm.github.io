# mssql: Workflow Checklist

A practical run sheet for applying [mssql](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Concepts: Databases contain **schemas** (e.g., dbo), tables, views, stored procedures, functions, and more
- [ ] 1. Core Concepts: **T-SQL** is the query/procedural language. Queries often use SELECT, FROM, JOIN, WHERE, GROUP BY, ORDER BY, TOP
- [ ] 2. Querying and Tuning: Use SET SHOWPLAN_XML ON or SET STATISTICS IO/TIME ON and SSMS's estimated execution plan to inspect performance
- [ ] 2. Querying and Tuning: SARGable predicates: index-friendly WHERE clauses — avoid functions on columns (WHERE YEAR(dt)=2024 becomes non-SARGable)
- [ ] 3. Indexing: **Clustered index**: defines physical order — typically on a monotonically increasing key (identity, rowguid) to avoid page splits
- [ ] 3. Indexing: **Nonclustered indexes** on query columns; include **covering index** for queries that return only indexed columns
- [ ] 4. Concurrency: **SQL Server 2022+**: row-level locking and default read committed with snapshot under READ_COMMITTED_SNAPSHOT
- [ ] 4. Concurrency: Use **HOLDLOCK/UPDLOCK** hints for pessimistic updates vs optimistic concurrency handled by EF Core/config
- [ ] 5. Operational Practice: **Backups**: BACKUP DATABASE, differential, and transaction-log backups with recovery model FULL for point-in-time recovery
- [ ] 5. Operational Practice: Monitor locks: sys.dm_tran_locks, sys.dm_exec_requests, check_blocked_by

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
