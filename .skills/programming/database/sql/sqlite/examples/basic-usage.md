# SQLite Best Practices: Basic Usage

Best practices for using SQLite as an embedded application database. Use when designing schemas, choosing journal modes, writing queries, planning migrations, or debugging locking/concurrency — treats SQLite as a serious embedded database, not a server DB or toy.

## Scenario

Use this example as a starting point when applying **sqlite** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Constraints** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```sql
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE invoices (
  id      INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  amount  REAL NOT NULL CHECK (amount >= 0)
);
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
