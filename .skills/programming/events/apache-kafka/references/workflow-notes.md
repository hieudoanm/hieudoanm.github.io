# Workflow notes

Focused reference for **apache-kafka**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Topic & Data Modeling

- **Design topics around business events** (past-tense, domain-derived: `order.placed`)
- Use **clear, stable topic naming conventions**
- **Choose partition keys intentionally** — key selects the partition (ordering scope)
- **Do not over-partition prematurely** — partitions = parallelism but also overhead
- **Prefer append-only event schemas**; **version schemas explicitly** (Avro/Protobuf/JSON, Schema Registry)
- **Avoid breaking schema changes** (backward/forward compatible, tolerant readers)
- **Use compaction only when semantics require it** (latest-state topics, e.g. table snapshots)
- **Plan topic evolution as part of system design**

```
Topic: order.events
Key:   orderId  → all events for an order share a partition (ordered)
Value: { orderId, status, total, ts } (schema-registered, versioned)
```

---

## 3. Reliability & Delivery Guarantees
