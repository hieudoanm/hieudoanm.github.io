# Review checklist

Focused reference for **sqlite**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Know when SQLite is (not) appropriate** — embedded/local workloads yes; multi-writer server no
- **File-based implications are real** — backing up an open DB corrupts it
- **Explicit over implicit** — schemas, types, journal mode, transactions
- **Understand concurrency** — one writer; WAL unlocks concurrent readers

---

## Quick-Start Checklist

- [ ] Explicit schemas; foreign keys enabled; `NOT NULL` + defaults explicit
- [ ] WAL mode for concurrent reads; journaling understood
- [ ] Transactions around multi-step/batched writes; no per-row autocommit
- [ ] Not used as a multi-writer server DB; write concurrency kept low
- [ ] No in-place file copies while open — backup via API/snapshot
- [ ] Indexes on hot query columns; `EXPLAIN QUERY PLAN` validation
- [ ] Versioned migrations; `busy_timeout`/locking behavior understood
- [ ] Realistic data-size testing; synchronous/durability trade-offs documented
