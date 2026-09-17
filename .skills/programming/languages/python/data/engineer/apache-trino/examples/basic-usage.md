# Apache Trino Best Practices: Basic Usage

Best practices for distributed SQL querying with Trino — the federated-query-engine conventions. Use when writing, structuring, or reviewing Trino SQL/queries — covers catalogs/schemas, query patterns, joins, bucketing, resource groups, and connectors.

## Scenario

Use this example as a starting point when applying **apache-trino-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Catalog & Schema Model** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```sql
SELECT u.id, e.amount
FROM warehouse.events e
JOIN postgres.public.users u ON u.id = e.user_id
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
