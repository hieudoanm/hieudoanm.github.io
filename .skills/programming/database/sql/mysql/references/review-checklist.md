# Review checklist

Focused reference for **mysql**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **InnoDB + explicit PK + transactions** — the non-negotiables
- **Indexes follow query patterns**; validate with `EXPLAIN`
- **Deadlocks are operational reality** — short transactions, retry, monitor
- **Migrations are backward-compatible operations**, versioned and tested
- **Observe before tuning** — slow log, hit ratios, replication health

---

## Quick-Start Checklist

- [ ] InnoDB, always-on primary key, explicit transactions
- [ ] Proper data types; no oversized `VARCHAR`; no `SELECT *` in production
- [ ] Indexes validated with `EXPLAIN`; no over-indexing write-heavy tables
- [ ] Foreign keys intentional; no polymorphic schemas
- [ ] Isolation levels chosen deliberately; deadlock retry handled
- [ ] Least-privilege users; parameterized SQL; no plaintext secrets
- [ ] Slow query log + connection pool tuning; short transactions
- [ ] Replication lag understood; backups tested
- [ ] Versioned, backward-compatible migrations tested on prod-like data
