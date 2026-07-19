# MariaDB Best Practices: Starter Template

A reusable starting point derived from the **1. Core Stack & Constraints** section of [MariaDB Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```sql
-- OLTP: InnoDB for ACID + FKs; ColumnStore/Aria for analytics workloads
CREATE TABLE orders (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id    BIGINT UNSIGNED NOT NULL,
  total      DECIMAL(12,2) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
