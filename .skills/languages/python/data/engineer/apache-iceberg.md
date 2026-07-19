---
name: apache-iceberg-best-practices
description: Best practices for open table formats with Apache Iceberg — the table-format conventions for data lakehouse infrastructure. Use when writing, structuring, or reviewing Iceberg tables — covers table creation, partitioning, snapshots, time travel, compaction, and maintenance.
---

# Apache Iceberg Best Practices

Iceberg is an **open table format for data lakes — ACID semantics, schema/propagation, snapshots of table state, and time travel on object storage.** Practical Iceberg leans on **partitioning designed around your access patterns (not imitation of old partitions), `PartitionSpec` set at creation (evolve-aware), snapshots as the version primitive (`AS OF` queries/expire), and routine maintenance (`optimize`/`expire_snapshots`/`remove_orphan_files`)** — governance and query speed are joined at the hip.

---

## 1. Table Creation & Specs

- **Declare schema + `PARTITIONED BY` at create — the partition spec is part of the identity:**

```sql
CREATE TABLE lake.orders (
  id bigint, user_id bigint, amount decimal(12,2), ts timestamp
)
PARTITIONED BY (days(ts));
```

- **Prune to access patterns: partition by the filter dimension most used; bucket by join keys.**
- **`PartitionSpec` can evolve but partition on the same dimension is cheap; avoid changing it casually.**
- **Format V2 default (required features: `equal-prune`, `snapshot` identity); use `WRITE V2` surfaced.**

---

## 2. Writes & Snapshots

- **Each commit creates a snapshot — atomic, isolated reads:**

```sql
INSERT INTO lake.orders VALUES (...);   -- snapshot → readers see consistent state
SELECT * FROM lake.orders FOR SYSTEM_TIME AS OF '<snapshot-id>';
```

- **`MERGE`/`COPY INTO` for upserts/Merged-final; `OVERWRITE` vs `MERGE` semantics differ — spot the intent.**
- **Idempotent writes: replace where the key says (no duplicate load when a job reruns).**
- **Concurrent writers handled by optimistic concurrency — commit retried by the writer protocol; design partitions so concurrent parts don't conflict.**

---

## 3. Partitioning & Data Layout

- **Transform-based partitioning: `days()`, `truncate(n)`, `bucket(n, col)` — not raw columns only:**
  - select `days()` for time-range filters, `bucket()` for high-cardinality keys.
- **Balanced: too few partitions = scan cost; too many = metadata churn.**
- **`files` below partitions bounded; compaction merges small files.**

---

## 4. Maintenance Tasks

- **Routine maintenance keeps "table health":**

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

- **Catalog (Hive/Hadoop/REST/Glue) manages the table metadata; REST catalog favored for multi-engine.**
- **Engine parity (Spark/Trino/Flink) on the same catalog — same metadata, same snapshots.**
- **Monitoring: snapshot count, orphan files, aggregate small-file counts; alert on drift.**
- **Tests: time-travel query reliability, concurrent-commit behavior, and compaction safety.**

---

## General Rules of Thumb

- **`PartitionSpec` by access pattern; transforms (days/bucket) over raw columns.**
- **Every write = a snapshot; idempotent commits; time travel enabled.**
- **Maintenance scheduled: rewrite files, expire snapshots, remove orphans.**
- **Concurrent commits via catalog optimistic concurrency; design to avoid conflicts.**
- **REST catalog + engine parity; retention policies documented.**

---

## Quick-Start Checklist

- [ ] Schema + `PartitionSpec` deliberate at creation (access-pattern-driven)
- [ ] Idempotent writes; `MERGE` for upserts; concurrency-commit protocol understood
- [ ] Snapshot-aware reads (`FOR SYSTEM_TIME/VERSION`); tags/branches for goldens
- [ ] Scheduled `rewrite_data_files`/`expire_snapshots`/`remove_orphan_files`
- [ ] REST catalog configured; engines share the same metadata
- [ ] Monitoring: snapshot/file-health alerts; GC retention documented