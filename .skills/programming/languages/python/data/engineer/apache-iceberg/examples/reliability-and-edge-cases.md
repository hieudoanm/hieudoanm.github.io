# Apache Iceberg Best Practices: 4. Maintenance Tasks

## Source guidance

This example applies the **4. Maintenance Tasks** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Routine maintenance keeps "table health":**
- **`expire_snapshots` honors retention; `older_than` > the longest still-referenced read.**
- **`rewrite_manifests`/`rewrite_data_files` condense many small files; schedule via airflow quiet-window.**

## Example

```sql
CALL lake.system.rewrite_data_files(table => 'lake.orders');
CALL lake.system.expire_snapshots(table => 'lake.orders',
                                  older_than => TIMESTAMP '2024-01-01');
CALL lake.system.remove_orphan_files(table => 'lake.orders');
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for apache-iceberg-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
