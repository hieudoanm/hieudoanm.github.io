---
name: mariadb
description: Best practices for operating MariaDB in production. Use when designing schemas, choosing storage engines, migrating from MySQL, tuning replication/Galera, or planning backups — treats MariaDB as independent infrastructure, not a MySQL clone.
---

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

---

## 2. Data Modeling & Architecture

- **Normalize unless denormalization is justified**
- Select engines per workload — **OLTP vs analytics** differ
- Use correct data types deliberately
- **Index based on real query paths**; validate after schema changes
- Use **foreign keys intentionally**; avoid ambiguous/polymorphic schemas
- Design schemas for **long-term evolution**; version and test migrations

---

## 3. Integrity, Security & Safety

- Use **transactions** to ensure consistency; select **isolation levels** consciously
- **Handle deadlocks explicitly** — retry, keep transactions short
- Apply **least-privilege** database users; never plaintext secrets
- Restrict production access paths
- **Back up regularly and test restores**; treat **replication topology as part of safety**

---

## 4. Reliability, Performance & Operations

- Use **`EXPLAIN`** and engine-specific diagnostics
- Monitor **slow queries and lock waits**
- **Validate indexes after schema changes**
- Avoid long-running transactions
- Understand **Galera/replica behavior** (certification, lag, failover)
- Plan for **failover and recovery**; test with production-scale data
- Document **engine and configuration choices**

---

## 5. General Rules of Thumb

- **MariaDB is its own database** — verify MySQL assumptions that may not hold
- **Engines are a workload decision** — OLTP vs analytics must not be an accident
- **Compatibility is managed, not assumed** — test migrations
- **Explicit over implicit** — engines, types, transactions, indexes

---

## Quick-Start Checklist

- [ ] MariaDB 10.6+ targeted; engines chosen explicitly per workload
- [ ] Always-on primary key; explicit transactions; FK usage intentional
- [ ] MySQL compatibility assumptions verified; no undocumented-behavior reliance
- [ ] Indexes based on real query paths, validated with `EXPLAIN`
- [ ] Isolation levels conscious; deadlock retry handled; short transactions
- [ ] Least-privilege users; no plaintext secrets; production access restricted
- [ ] Backups tested; replication/Galera topology understood and monitored
- [ ] Failover plan; engine/config choices documented; prod-scale testing
