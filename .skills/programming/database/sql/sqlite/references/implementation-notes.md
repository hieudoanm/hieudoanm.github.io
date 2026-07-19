# Implementation notes

Focused reference for **sqlite**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Reliability & Performance

- **Index frequently queried columns**; avoid full table scans in hot paths
- Validate queries with **`EXPLAIN QUERY PLAN`** (SQLite has no `EXPLAIN ANALYZE`)
- **Batch writes in transactions** — per-row autocommit is the main perf killer
- Avoid unbounded result sets; test with realistic data sizes
- Be explicit about `synchronous` settings and durability trade-offs

```sql
EXPLAIN QUERY PLAN
SELECT * FROM invoices WHERE user_id = 42;
```

---

## 5. General Rules of Thumb
