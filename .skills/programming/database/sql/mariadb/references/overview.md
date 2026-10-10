# Overview

Focused reference for **mariadb**, excerpted from SKILL.md. The skill file remains the canonical guide.

# MariaDB Best Practices

MariaDB is a MySQL-compatible RDBMS that has diverged over time with its own storage engines (InnoDB, XtraDB, Aria, ColumnStore) and replication (standard primary–replica, Galera). Best practice is treating it as **independent infrastructure**: choose engines deliberately, treat MySQL compatibility as a decision rather than a guarantee, and validate schemas and topology under production-scale conditions.

---

## 1. Core Stack & Constraints

- Assume **modern MariaDB (10.6+)**
- **Choose storage engines explicitly** per workload
- **Always define primary keys**
- Use **transactions intentionally**
- Avoid relying on undocumented MySQL behavior or assuming **full MySQL 8 feature parity**
- When migrating from MySQL, **plan carefully and verify behavior** post-migration

```sql
-- OLTP: InnoDB for ACID + FKs; ColumnStore/Aria for analytics workloads
CREATE TABLE orders (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id    BIGINT UNSIGNED NOT NULL,
  total      DECIMAL(12,2) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;
```
