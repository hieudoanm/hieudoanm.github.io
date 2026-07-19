# Workflow notes

Focused reference for **apache-trino-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
