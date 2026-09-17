# SQLite Best Practices: Starter Template

A reusable starting point derived from the **1. Core Stack & Constraints** section of [SQLite Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```sql
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE invoices (
  id      INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  amount  REAL NOT NULL CHECK (amount >= 0)
);
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
