# Overview

Focused reference for **sqlite**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
