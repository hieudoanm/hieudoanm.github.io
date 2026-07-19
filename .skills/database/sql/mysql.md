---
name: mysql
description: Best practices for designing, querying, and operating MySQL in production. Use when writing schemas, optimizing slow queries, reviewing indexes, planning migrations, or debugging locks/deadlocks — covers InnoDB, transactions, indexing, replication, and observability.
---

# MySQL Best Practices

MySQL is a client/server RDBMS whose behavior depends heavily on storage engine, isolation level, and locking. Best practice is respecting it as **critical infrastructure**: InnoDB by default, always-on primary keys, explicit transactions, deliberate indexes, versioned migrations, and observability over cargo-cult tuning.

---

## 1. Core Stack & Constraints

- Assume **modern MySQL (8.x)**
- Use **InnoDB** by default (ACID, FK support)
- **Always define primary keys**
- Use **transactions explicitly**; avoid implicit/default behavior
- Avoid `SELECT *` and unbounded queries in production

```sql
CREATE TABLE orders (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id    BIGINT UNSIGNED NOT NULL,
  total      DECIMAL(12,2) NOT NULL,
  status     VARCHAR(20) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_user (user_id)
) ENGINE=InnoDB;
```

---

## 2. Data Modeling & Architecture

- **Normalize unless denormalization is justified**
- Use proper data types — avoid oversized `VARCHAR` and misuse of `TEXT`
- **Index based on query patterns**, not entity attributes
- Use **foreign keys intentionally** (never accidentally)
- Avoid polymorphic or ambiguous schemas
- Design schemas for the **read and write paths** together

---

## 3. Integrity, Security & Safety

- Use **transactions** to guarantee consistency; choose **isolation levels** deliberately (`REPEATABLE READ` default vs `READ COMMITTED`)
- **Handle deadlocks explicitly** — retry on `ERROR 1213`; keep transactions short
- Use **least-privilege** database users; never plaintext secrets
- Protect against **SQL injection** at the application layer (bind parameters)
- Restrict production access; **back up regularly and test restores**

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

- **InnoDB + explicit PK + transactions** — the non-negotiables
- **Indexes follow query patterns**; validate with `EXPLAIN`
- **Deadlocks are operational reality** — short transactions, retry, monitor
- **Migrations are backward-compatible operations**, versioned and tested
- **Observe before tuning** — slow log, hit ratios, replication health

---

## Quick-Start Checklist

- [ ] InnoDB, always-on primary key, explicit transactions
- [ ] Proper data types; no oversized `VARCHAR`; no `SELECT *` in production
- [ ] Indexes validated with `EXPLAIN`; no over-indexing write-heavy tables
- [ ] Foreign keys intentional; no polymorphic schemas
- [ ] Isolation levels chosen deliberately; deadlock retry handled
- [ ] Least-privilege users; parameterized SQL; no plaintext secrets
- [ ] Slow query log + connection pool tuning; short transactions
- [ ] Replication lag understood; backups tested
- [ ] Versioned, backward-compatible migrations tested on prod-like data
