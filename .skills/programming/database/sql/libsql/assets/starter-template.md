# libSQL Best Practices: Starter Template

A reusable starting point derived from the **1. Core Stack & Constraints** section of [libSQL Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```sql
-- Stable keys + constraints for local correctness; app handles sync/conflicts
CREATE TABLE notes (
  id      TEXT PRIMARY KEY,
  body    TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
