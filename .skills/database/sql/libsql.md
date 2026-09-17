---
name: libsql
description: Best practices for using libSQL — the SQLite-compatible, embeddable database with replication. Use when designing local-first/edge-first data models, planning SQLite→libSQL migrations, or building replicated read/write tunnels — covers topology awareness, replication lag, and offline behavior.
---

# libSQL Best Practices

libSQL is **SQLite-first with replication**, not "Postgres-lite": a local embedded core plus remote URLs, primary/replica topology, and sync. Best practice is a **local-first, distributed-systems-aware** mental model — schemas must tolerate replication lag and eventual consistency, local reads are primary, and remote operations are treated as high-latency, potentially stale, and partition-prone.

---

## 1. Core Stack & Constraints

- **SQLite compatibility first** — do not rely on non-portable SQL features
- **Design schemas that tolerate replication lag**
- **Avoid assuming global serializable writes** — replicas can be stale
- Treat remote access as **higher-latency than local**
- Be explicit about **write paths** (primary vs replicas)
- **Avoid tight write loops over the network**; prefer idempotent writes
- **Assume partial connectivity is normal** — offline-first by design

```sql
-- Stable keys + constraints for local correctness; app handles sync/conflicts
CREATE TABLE notes (
  id      TEXT PRIMARY KEY,
  body    TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);
```

---

## 2. Data Modeling & Architecture

- Prefer **stable primary keys** (UUIDs where appropriate)
- **Avoid relying on write ordering across nodes**
- Design schemas to **minimize write conflicts**
- Normalize unless denormalization is deliberate; **keep schemas simple and evolvable**
- **Version schema migrations explicitly**; avoid schema churn in highly replicated setups
- Design for **merge-friendly data models** (last-writer-wins or explicit conflict resolution)

---

## 3. Integrity & Safety

- **Rely on SQLite constraints for local correctness**
- Understand **how constraints behave under replication** (unique/checks are local, not global)
- Use **transactions for all logical write units**
- **Avoid out-of-band DB file manipulation** while syncing
- Validate assumptions under **network partitions**
- **Treat replicas as potentially stale**; never assume instant global consistency

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

---

## Quick-Start Checklist

- [ ] SQLite-compatible SQL; no non-portable features without explicit note
- [ ] Stable PKs (UUIDs); schemas tolerate replication lag
- [ ] Conflict-minimizing, merge-friendly data model
- [ ] Local reads optimized; writes batched; no tight remote write loops
- [ ] Writes idempotent where possible; write path (primary vs replica) explicit
- [ ] Transactions per logical write unit; no out-of-band file manipulation
- [ ] Offline-first and partition scenarios tested; `updated_at`/sync metadata present
- [ ] Latency measured for read vs write; consistency expectations documented
