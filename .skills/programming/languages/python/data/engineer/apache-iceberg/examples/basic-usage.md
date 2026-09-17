# Apache Iceberg Best Practices: Basic Usage

Best practices for open table formats with Apache Iceberg — the table-format conventions for data lakehouse infrastructure. Use when writing, structuring, or reviewing Iceberg tables — covers table creation, partitioning, snapshots, time travel, compaction, and maintenance.

## Scenario

Use this example as a starting point when applying **apache-iceberg-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Table Creation & Specs** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```sql
CREATE TABLE lake.orders (
  id bigint, user_id bigint, amount decimal(12,2), ts timestamp
)
PARTITIONED BY (days(ts));
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
