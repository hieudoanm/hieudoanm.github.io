# Overview

Focused reference for **mysql**, excerpted from SKILL.md. The skill file remains the canonical guide.

# MySQL Best Practices

MySQL is a client/server RDBMS whose behavior depends heavily on storage engine, isolation level, and locking. Best practice is respecting it as **critical infrastructure**: InnoDB by default, always-on primary keys, explicit transactions, deliberate indexes, versioned migrations, and observability over cargo-cult tuning.

---

## 1. Core Stack & Constraints

- Assume **modern MySQL (8.x)**
- Use **InnoDB** by default (ACID, FK support)
- **Always define primary keys**
- Use **transactions explicitly**; avoid implicit/default behavior
- Avoid `SELECT *` and unbounded queries in production

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
