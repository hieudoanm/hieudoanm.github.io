# MariaDB Best Practices: Basic Usage

Best practices for operating MariaDB in production. Use when designing schemas, choosing storage engines, migrating from MySQL, tuning replication/Galera, or planning backups — treats MariaDB as independent infrastructure, not a MySQL clone.

## Scenario

Use this example as a starting point when applying **mariadb** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Constraints** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```sql
-- OLTP: InnoDB for ACID + FKs; ColumnStore/Aria for analytics workloads
CREATE TABLE orders (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id    BIGINT UNSIGNED NOT NULL,
  total      DECIMAL(12,2) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
