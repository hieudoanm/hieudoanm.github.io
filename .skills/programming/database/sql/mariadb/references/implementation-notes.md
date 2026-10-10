# Implementation notes

Focused reference for **mariadb**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
