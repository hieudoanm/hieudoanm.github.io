# MySQL Best Practices: Basic Usage

Best practices for designing, querying, and operating MySQL in production. Use when writing schemas, optimizing slow queries, reviewing indexes, planning migrations, or debugging locks/deadlocks — covers InnoDB, transactions, indexing, replication, and observability.

## Scenario

Use this example as a starting point when applying **mysql** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Constraints** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```sql
CREATE TABLE orders (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id    BIGINT UNSIGNED NOT NULL,
  total      DECIMAL(12,2) NOT NULL,
  status     VARCHAR(20) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_user (user_id)
) ENGINE=InnoDB;
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
