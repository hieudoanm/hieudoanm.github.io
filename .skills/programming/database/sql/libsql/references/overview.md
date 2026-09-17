# Overview

Focused reference for **libsql**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
