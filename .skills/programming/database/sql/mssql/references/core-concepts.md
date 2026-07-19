# 1. Core Concepts

Focused reference for **mssql**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Core Concepts

- Databases contain **schemas** (e.g., `dbo`), tables, views, stored procedures, functions, and more.
- **T-SQL** is the query/procedural language. Queries often use `SELECT`, `FROM`, `JOIN`, `WHERE`, `GROUP BY`, `ORDER BY`, `TOP`.
- **Transactions**: `BEGIN TRAN`, `COMMIT`, `ROLLBACK`; isolation levels (read committed default) control concurrency behavior.
- **Schema-bound objects**: views, functions, and procedures encapsulate query logic inside the DB.
- **Availability**: Always On Availability Groups, log shipping, replication, and failover clustering for HA.
