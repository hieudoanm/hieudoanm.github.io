# Implementation notes

Focused reference for **mysql**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Reliability, Performance & Operations

- Use **`EXPLAIN` / `EXPLAIN ANALYZE`** and monitor **slow query log**
- Add and validate indexes deliberately — every index costs writes
- **Avoid long-running transactions** (hold locks, grow undo)
- Tune **connection pools** (honor `max_connections`; pool below it)
- Understand **replication lag** and plan failover/recovery
- Test with **production-like data sizes**

```sql
EXPLAIN ANALYZE
SELECT id, total FROM orders WHERE user_id = 12345 AND status = 'paid';
```

---

## 5. General Rules of Thumb
