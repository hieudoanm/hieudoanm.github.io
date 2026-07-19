# Overview

Focused reference for **apache-trino-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
