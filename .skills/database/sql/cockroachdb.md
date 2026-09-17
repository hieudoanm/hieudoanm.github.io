---
name: cockroachdb
description: Best practices for operating CockroachDB as a distributed, globally consistent SQL database. Use when designing schemas, writing distributed queries, planning multi-region deployments, or migrating from Postgres — covers serializable isolation, distributed transactions, retries, and region-aware design.
---

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

---

## 2. Data Modeling & Architecture

- **Avoid monotonically increasing primary keys**; prefer UUIDs / well-distributed keys
- Design schemas to **reduce contention**
- Denormalize only when justified
- **Be careful with foreign keys in high-write paths** (parent/child contention)
- Plan schema changes explicitly
- **Design indexes for distributed execution**; consider **regional tables and locality**

---

## 3. Integrity & Consistency

- **Serializable isolation is the default—embrace it**, don't downgrade casually
- **Expect transaction retries under contention** (`40001 SQLSTATE` — retry with `max_retry` backoff)
- **Write application logic to be retry-safe** (transactions must be idempotent/rebuildable)
- Use **explicit transactions for correctness**
- Understand how **constraints are enforced globally** (across ranges; no scale down of integrity)
- Treat **clock skew and retries as normal behavior**, not anomalies

```sql
-- Retry loop in app: catch 40001, back off, re-run the transaction closure
func retryWrite(ctx, txn func(ctx) error) error { /* ... */ }
```

---

## 4. Reliability & Performance

- **Optimize queries to minimize node fan-out**
- **Batch writes inside transactions**; avoid long-running transactions
- Monitor **contention and retry rates** (`crdb_internal`, metrics)
- **Index carefully to avoid write amplification**
- Load-test with **realistic geography**; measure **tail latency, not just averages**
- Document **SLOs and consistency expectations**

---

## 5. General Rules of Thumb

- **It is a distributed database first** — latency, retries, and contention are first-class
- **Keys and schemas shape distribution** — hotspots and write amplification are design failures
- **Prepared for retries** — the DB will abort transactions under contention by design
- **Postgres compatibility is a starting point, not the model** — call out where reality differs

---

## Quick-Start Checklist

- [ ] UUID/distributed keys; no monotonic sequence PKs
- [ ] Serializable isolation embraced; timeout/retry handling in application code
- [ ] Transactions retry-safe (idempotent closure); chattiness minimized
- [ ] Regional placement explicit; cross-region write amplification minimized
- [ ] Indexes designed for distributed execution; FK use deliberate in hot paths
- [ ] Long-running transactions avoided; contention/retry metrics monitored
- [ ] Schema changes planned as online-but-costly operations
- [ ] Load tests with realistic geography; tail latency measured; SLOs documented
