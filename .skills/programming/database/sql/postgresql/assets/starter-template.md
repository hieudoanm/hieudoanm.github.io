# PostgreSQL Best Practices: Starter Template

A reusable starting point derived from the **2. Data Modeling & Architecture** section of [PostgreSQL Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```sql
CREATE TABLE orders (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES users(id),
  total       numeric(12,2) NOT NULL CHECK (total >= 0),
  status      text NOT NULL CHECK (status IN ('pending','paid','refunded')),
  created_at  timestamptz NOT NULL DEFAULT now()
);
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
