# libSQL Best Practices: Basic Usage

Best practices for using libSQL — the SQLite-compatible, embeddable database with replication. Use when designing local-first/edge-first data models, planning SQLite→libSQL migrations, or building replicated read/write tunnels — covers topology awareness, replication lag, and offline behavior.

## Scenario

Use this example as a starting point when applying **libsql** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Constraints** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```sql
-- Stable keys + constraints for local correctness; app handles sync/conflicts
CREATE TABLE notes (
  id      TEXT PRIMARY KEY,
  body    TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
