# PostgreSQL Best Practices: Basic Usage

Best practices for designing, querying, and operating PostgreSQL. Use when writing schemas or SQL, optimizing slow queries, choosing indexes, or planning migrations — covers MVCC, transactions, indexing, EXPLAIN, and safe schema changes.

## Scenario

Use this example as a starting point when applying **postgresql** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Constraints** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```sql
-- Parameterized + explicit
SELECT id, email FROM users
WHERE status = $1 AND created_at > $2;
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
