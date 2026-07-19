# CockroachDB Best Practices: Starter Template

A reusable starting point derived from the **1. Core Stack & Constraints** section of [CockroachDB Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```sql
-- Distributed-friendly keys: UUID primary keys, no monotonic sequences
CREATE TABLE orders (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  region     STRING NOT NULL,
  total      DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
