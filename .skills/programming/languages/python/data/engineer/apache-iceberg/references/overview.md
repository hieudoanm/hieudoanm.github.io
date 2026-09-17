# Overview

Focused reference for **apache-iceberg-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
