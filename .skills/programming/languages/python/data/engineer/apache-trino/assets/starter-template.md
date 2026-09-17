# Apache Trino Best Practices: Starter Template

A reusable starting point derived from the **2. Query Patterns** section of [Apache Trino Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```sql
SELECT customer, SUM(amount)
FROM warehouse.orders
WHERE order_date >= DATE '2024-01-01'
GROUP BY customer;
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
