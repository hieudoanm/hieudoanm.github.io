---
name: apache-trino-best-practices
description: Best practices for distributed SQL querying with Trino — the federated-query-engine conventions. Use when writing, structuring, or reviewing Trino SQL/queries — covers catalogs/schemas, query patterns, joins, bucketing, resource groups, and connectors.
---

# Apache Trino Best Practices

Trino is a **distributed SQL query engine for federated analytics across many connectors (Hive, Iceberg, Postgres, Kafka…)** — stateless, ANSI-ish, streaming results. Practical Trino leans on **catalog-qualified queries (`catalog.schema.table`), pushing work down (`filters`/joins at the source), correct join style (hash vs broadcast) aware of connector behavior, and bucketing on join keys for performance** — "push down, stream, and minimize shuffle" is the engine's discipline; the EXPLAIN is your map.

---

## 1. Catalog & Schema Model

- **`catalog.schema.table` — every table fully qualified; multiple catalogs joined in one query:**

```sql
SELECT u.id, e.amount
FROM warehouse.events e
JOIN postgres.public.users u ON u.id = e.user_id
```

- **Default catalog/schema set per-connection for readability — but the qualified form travels.**
- **Connector documents its semantics (Iceberg snapshots, Postgres pushdown limits) — know your source's lever.**

---

## 2. Query Patterns

- **Push filters/aggregations down — let the connector do the work; Trino streams:**

```sql
SELECT customer, SUM(amount)
FROM warehouse.orders
WHERE order_date >= DATE '2024-01-01'
GROUP BY customer;
```

- **Project-only columns (`SELECT col1`) we push; wide `SELECT *` hurts scanning costs.**
- **Trino is not OLTP — make each statement set-based; no procedural trip to the PostgreSQL loop.**

---

## 3. Joins & Performance Levers

- **Join style hints (`/*+ /* */` hints) where the planner mis-picks:**

```sql
SELECT /*+ broadcast(b) */ a.*, b.name
FROM big_table a JOIN small_table b ON a.id = b.id;
```

- **Broadcast small tables (BROADCAST hint); bucketed joins on the join key with matching bucket count.**
- **`EXPLAIN` / `EXPLAIN (TYPE DISTRIBUTED)` before heavy queries — identify shuffle vs pushdown.**
- **Skew handled by salt/re-keying; `session` `max_workers_per_task` tuned by roadmaps.**

---

## 4. Bucketing & Table Design

- **Bucketing pays on join keys; choose bucket count ≈ task parallelism:**

```sql
CREATE TABLE warehouse.orders
WITH (format='PARQUET', partitioned_by=ARRAY['dt'])
AS SELECT ...;
```

- **Partition by the filter-common dimension (`dt`), bucket by join keys.**
- **Parquet/ORC for scanning; `columnar` via connectors async — keep compaction reasonable.**

---

## 5. Resource Management

- **Resource groups/CGO provide fair execution — tag workloads (`SET SESSION resource_group`?) and bound concurrency:**

```
-- coordinator: resource groups cap concurrent queries per tenant/pipeline
```

- **Query timeouts + mem limits (`query.max-memory`, `query.max-total-memory-per-node`).**
- **`EXPLAIN (TYPE TIMINGS)` traces scheduling/execution hotspots; right-size `task.writer-count`.**
- **Keep coordinator lean (don't run heavy LS on it); separations per-tenant trusted.**

---

## 6. Governance & Reproducibility

- **Version-pin server/connectors; schema versioning in catalogs (`use catalog-versioned objects`).**
- **Idempotent DDL — `IF NOT EXISTS` / `IF EXISTS`; migrations via verified SQL.**
- **Golden-query regression suite against the same snapshot; security: least-priv accounts per catalog.**

---

## General Rules of Thumb

- **`catalog.schema.table` always; set-based statements.**
- **Push down filters/joins; keep `SELECT *` rare.**
- **Hints (broadcast) + bucketing on join keys; EXPLAIN distributed first.**
- **Resource groups bound tenants; timeouts/memory set.**
- **SQL migrated idempotently; versions pinned; least-priv connectors.**

---

## Quick-Start Checklist

- [ ] Fully-qualified `catalog.schema.table`; per-catalog semantics known
- [ ] Filters/pushdown exploited; projections narrow
- [ ] Join hints + bucketing matched; `EXPLAIN DISTRIBUTED` reviewed
- [ ] Table layout: partition by filter dimension, bucket by join key
- [ ] Resource groups + timeout/memory limits configure per tenant
- [ ] Idempotent DDL + versioned catalogs; golden-query regression tests