# Couchbase: Starter Template

A reusable starting point derived from the **2. Access Patterns** section of [Couchbase](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```sql
-- scope + collection keeps the query on one indexed path
SELECT META(c).id, c.name, c.total
FROM `my_bucket`.`store`.`orders` AS c
WHERE c.status = "paid" AND c.createdAt > $since
ORDER BY c.createdAt DESC
LIMIT 50;
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
