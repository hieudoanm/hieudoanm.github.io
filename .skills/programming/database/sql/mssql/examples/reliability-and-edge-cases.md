# Mssql: 5. Operational Practice

## Source guidance

This example applies the **5. Operational Practice** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Backups**: `BACKUP DATABASE`, differential, and transaction-log backups with recovery model FULL for point-in-time recovery.
- Monitor locks: `sys.dm_tran_locks`, `sys.dm_exec_requests`, check_blocked_by.
- **Index fragmentation**: `ALTER INDEX REORGANIZE`/`REBUILD` on a schedule; inspect via `sys.dm_db_index_physical_stats`.
- Memory: cap and tune max server memory; avoid OS memory pressure.
- Right-size `MAXDOP` and `Cost Threshold for Parallelism` for mixed workloads.

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for mssql.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
