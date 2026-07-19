# Implementation notes

Focused reference for **libsql**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Reliability & Performance

- **Optimize for local reads** — read path should not touch the network
- **Batch writes** to reduce sync overhead
- Index for real query patterns; **avoid large transactions over remote connections**
- Measure latency for **read vs write paths** separately
- **Test offline-first scenarios explicitly**; load-test with replication enabled
- Document **consistency expectations** per feature

---

## 5. General Rules of Thumb

- **SQLite semantics come first, replication second** — the core still behaves like SQLite
- **Eventually consistent, not transparently global** — design reads for local, writes for sync
- **Explicit topology** — know primary vs replica, and never assume freshness
- **Design for partition and staleness** — partial connectivity is the default, not the outage
