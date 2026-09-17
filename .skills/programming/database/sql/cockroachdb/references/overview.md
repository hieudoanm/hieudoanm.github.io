# Overview

Focused reference for **cockroachdb**, excerpted from SKILL.md. The skill file remains the canonical guide.

# CockroachDB Best Practices

CockroachDB is a **distributed SQL database with Raft-based replication and serializable isolation** — not "Postgres with replicas". Best practice is distributed-systems-first thinking: distributed transactions by default with retries as normal behavior, latency-aware keys and queries, retry-safe application logic, and no single-node database assumptions.

---

## 1. Core Stack & Constraints

- **Distributed transactions by default** — serializable isolation is the norm
- **Expect higher latency than single-node databases**; avoid chatty transaction patterns
- **Design for serializable isolation** and retries under contention
- **Avoid hotspotting on primary keys** (monotonic sequences are a hotspot source)
- Be explicit about **regional placement** (regional tables, locality)
- Minimize **cross-region write amplification**; never assume local-only execution
- Expect schema changes to be **online but non-free**

```sql
-- Distributed-friendly keys: UUID primary keys, no monotonic sequences
CREATE TABLE orders (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  region     STRING NOT NULL,
  total      DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```
