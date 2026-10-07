---
name: sqlite
description: Best practices for using SQLite as an embedded application database. Use when designing schemas, choosing journal modes, writing queries, planning migrations, or debugging locking/concurrency — treats SQLite as a serious embedded database, not a server DB or toy.
---

# SQLite Best Practices

SQLite is a file-based, embedded SQL database — single-writer by design, with journaling (rollback/WAL) governing durability and concurrency. Best practice is treating it as a **serious embedded database**: explicit schemas, foreign keys on, WAL for concurrent reads, transactional batching, and no massaging into a multi-writer server role.

---

## 1. Core Stack & Constraints

- SQLite **3.x**
- Use **explicit schemas** — no implicit typing assumptions
- **Enable foreign keys explicitly** (`PRAGMA foreign_keys = ON;`)
- Prefer **WAL mode** for concurrent reads (`PRAGMA journal_mode = WAL;`)
- Use transactions for all multi-step writes
- **Do not use SQLite as a multi-writer server DB**; avoid high write concurrency
- Avoid abusing `TEXT` for structured data; be explicit about `NOT NULL` and defaults

```sql
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE invoices (
  id      INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  amount  REAL NOT NULL CHECK (amount >= 0)
);
```

---

## 2. Data Modeling & Architecture

- **Normalize unless denormalization is justified**
- Use proper primary keys — `INTEGER PRIMARY KEY` when appropriate, UUIDs when portability matters
- Avoid oversized tables with unindexed queries; prefer **simple schemas over clever tricks**
- Design schemas for **read patterns**
- Avoid **JSON blobs unless intentionally chosen**
- **Version schema migrations explicitly** — treat schema changes as real migrations

---

## 3. Integrity & Safety

- **Always enable foreign keys**
- Use transactions to preserve consistency; **batch writes inside transactions**
- **Never copy the DB file while it is open** — use the backup API or warm snapshot
- Understand **locking behavior** (single writer; `busy_timeout` for contention)
- Handle crashes via **journaling/WAL correctly** (`PRAGMA synchronous` deliberate)
- **Never assume concurrent writes are cheap**; validate input at the application layer

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

- **Know when SQLite is (not) appropriate** — embedded/local workloads yes; multi-writer server no
- **File-based implications are real** — backing up an open DB corrupts it
- **Explicit over implicit** — schemas, types, journal mode, transactions
- **Understand concurrency** — one writer; WAL unlocks concurrent readers

---

## Quick-Start Checklist

- [ ] Explicit schemas; foreign keys enabled; `NOT NULL` + defaults explicit
- [ ] WAL mode for concurrent reads; journaling understood
- [ ] Transactions around multi-step/batched writes; no per-row autocommit
- [ ] Not used as a multi-writer server DB; write concurrency kept low
- [ ] No in-place file copies while open — backup via API/snapshot
- [ ] Indexes on hot query columns; `EXPLAIN QUERY PLAN` validation
- [ ] Versioned migrations; `busy_timeout`/locking behavior understood
- [ ] Realistic data-size testing; synchronous/durability trade-offs documented
