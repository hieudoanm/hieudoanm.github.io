# Overview

Focused reference for **postgresql**, excerpted from SKILL.md. The skill file remains the canonical guide.

# PostgreSQL Best Practices

PostgreSQL is a production-grade relational database built on MVCC, a planner/executor, and rich data types. Best practice is treating it as a **mission-critical system**: database-enforced integrity over app-only checks, deliberate indexes, safe (additive) schema changes, and queries tuned against real row counts and workload.

---

## 1. Core Stack & Constraints

- Assume **PostgreSQL 13+** unless stated otherwise
- Use **parameterized queries** — never string-interpolate values
- Use **explicit joins**; avoid `SELECT *`
- Prefer **additive schema changes**; version migrations explicitly
- Think in **row counts** — production data sizes unless told otherwise

```sql
-- Parameterized + explicit
SELECT id, email FROM users
WHERE status = $1 AND created_at > $2;
```

---
