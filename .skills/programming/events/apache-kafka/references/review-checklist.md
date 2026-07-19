# Review checklist

Focused reference for **apache-kafka**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 5. General Rules of Thumb

- **Log, not queue** — consumers read their own offset and replay freely
- **Order per partition, keys define it** — design partition keys as first-class
- **Duplicates and reprocessing are normal** — idempotent consumers by default
- **Schema evolution is mandatory** — registry + non-breaking changes

---

## Quick-Start Checklist

- [ ] Topics aligned to business events; stable naming; no cross-domain sharing
- [ ] Immutable, append-only events; schemas versioned (registry), non-breaking
- [ ] Partition keys chosen intentionally; no premature over-partitioning
- [ ] `acks`/idempotence correct for producers; explicit delivery semantics
- [ ] Offsets committed after processing; consumers idempotent
- [ ] Retention/cleanup policies explicit; compaction only where semantics need it
- [ ] Consumer lag monitored; hot partitions avoided; batching tuned
- [ ] Broker failure/rebalance scenarios tested; costs documented
