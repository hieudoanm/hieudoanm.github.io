---
name: postgresql
description: Best practices for designing, querying, and operating PostgreSQL. Use when writing schemas or SQL, optimizing slow queries, choosing indexes, or planning migrations — covers MVCC, transactions, indexing, EXPLAIN, and safe schema changes.
---

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

## 2. Data Modeling & Architecture

- **Normalize by default; denormalize intentionally**
- Choose correct types: `uuid`, `timestamptz`, `numeric` — not oversized text
- Use constraints: `NOT NULL`, `UNIQUE`, `CHECK`
- **Database-enforced integrity over app-only checks** (FKs, constraints)
- Design schemas around **query patterns**, not entities alone
- **Avoid premature partitioning** — partition when row counts and retention demand it
- Version migrations explicitly; treat schema changes as **operational events**

```sql
CREATE TABLE orders (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES users(id),
  total       numeric(12,2) NOT NULL CHECK (total >= 0),
  status      text NOT NULL CHECK (status IN ('pending','paid','refunded')),
  created_at  timestamptz NOT NULL DEFAULT now()
);
```

---

## 3. Integrity & Safety

- Use **transactions** for multi-step operations
- Understand **isolation levels** and locking (`READ COMMITTED` default; `SERIALIZABLE` when needed)
- **Avoid long-running transactions** — they grow MVCC bloat and hold locks
- Be explicit about `ON DELETE` behavior (cascade/restrict/set null)
- **Back up before risky operations**; prefer logical safety over clever SQL tricks
- Warn loudly before `DELETE`/`UPDATE` without `WHERE`, `DROP`, or `TRUNCATE`

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = $1;
UPDATE accounts SET balance = balance + 100 WHERE id = $2;
COMMIT;
```

---

## 4. Reliability & Performance

- **Index based on real queries** — not guesses
- **Avoid over-indexing write-heavy tables** (every index costs writes)
- Use `EXPLAIN (ANALYZE, BUFFERS)` when optimizing; read `Seq Scan` vs `Index Scan`
- Be explicit about **pagination**; avoid unbounded result sets (keyset over OFFSET at scale)
- Know index types: **btree** (default), **gin** (arrays/JSONB), **gist/brin** (ranges, large tables)
- Consider **caching vs indexing** trade-offs and read/write ratios

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM orders WHERE user_id = $1 AND status = 'paid';
```

---

## 5. Security

- Parameterized queries against SQL injection — **always**
- Least-privilege roles; separate read/write users
- Never log or store secrets in plaintext; use column/database encryption as required
- Restrict production access; review grants and extension usage

---

## 6. General Rules of Thumb

- **Integrity lives in the database** — constraints > app-only checks
- **Deliberate indexes over guessing** — validate with `EXPLAIN (ANALYZE, BUFFERS)`
- **Additive, versioned migrations** — avoid destructive changes; warn before them
- **Row counts and workload drive design** — toy examples hide real problems
- **Explicit beats implicit** — explicit joins, explicit types, explicit transactions

---

## Quick-Start Checklist

- [ ] Parameterized queries; no `SELECT *`; explicit joins
- [ ] Proper types (`uuid`, `timestamptz`, `numeric`); constraints (`NOT NULL`, `UNIQUE`, `CHECK`)
- [ ] FKs + DB-enforced integrity over app-only checks
- [ ] Normalized by default; denormalized only with justification
- [ ] Additive, versioned migrations; destructive changes warned + backed up
- [ ] Indexes validated with `EXPLAIN (ANALYZE, BUFFERS)` against query patterns
- [ ] Explicit transactions; isolation understood; no long-running transactions
- [ ] Bounded/keyset pagination; no unbounded result sets
- [ ] Least-privilege roles; parameterized everywhere; no plaintext secrets
- [ ] Test with production-like data and row counts
