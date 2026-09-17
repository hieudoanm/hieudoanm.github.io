# Apache Iceberg Best Practices: Starter Template

A reusable starting point derived from the **1. Table Creation & Specs** section of [Apache Iceberg Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```sql
CREATE TABLE lake.orders (
  id bigint, user_id bigint, amount decimal(12,2), ts timestamp
)
PARTITIONED BY (days(ts));
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
