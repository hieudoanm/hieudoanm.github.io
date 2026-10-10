# Implementation notes

Focused reference for **apache-iceberg-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```sql
CALL lake.system.rewrite_data_files(table => 'lake.orders');
CALL lake.system.expire_snapshots(table => 'lake.orders',
                                  older_than => TIMESTAMP '2024-01-01');
CALL lake.system.remove_orphan_files(table => 'lake.orders');
```

- **`expire_snapshots` honors retention; `older_than` > the longest still-referenced read.**
- **`rewrite_manifests`/`rewrite_data_files` condense many small files; schedule via airflow quiet-window.**

---

## 5. Time Travel & Governance

- **`FOR SYSTEM_VERSION`, `FOR SYSTEM_TIME`, and branch/tag management for reproducible reprocessing:**

```sql
SELECT * FROM lake.orders FOR VERSION AS OF 987654321;
```

- **Tags/branches for "golden" releases — mundane audits rely on stable snapshots.**
- **Schema evolution backward-safe (add-nullable, in-place); use `ALTER TABLE ... ADD COLUMN`.**
- **GC/retention policies documented; snapshots cost objects unless expired deliberately.**

---

## 6. Engines & Ops
