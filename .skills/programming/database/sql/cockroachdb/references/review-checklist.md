# Review checklist

Focused reference for **cockroachdb**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
