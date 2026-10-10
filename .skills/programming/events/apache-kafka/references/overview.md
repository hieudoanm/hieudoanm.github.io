# Overview

Focused reference for **apache-kafka**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Apache Kafka Best Practices

Kafka is an **event log and streaming backbone** — immutable, append-only events retained independently of consumption, replayed freely, ordered per partition. Best practice is designing topics around business events with stable naming and versioned schemas, choosing partition keys intentionally, committing offsets deliberately, and building idempotent consumers because reprocessing and duplicates are the expected contract.

---

## 1. Core Stack & Constraints

- Assume Kafka **3.x**
- Kafka is **not** a request-response system and **not** a database
- **Prefer immutable events** — append-only by design
- **Avoid sharing topics between unrelated domains**
- **Avoid extremely large messages**
- **Avoid relying on message ordering across partitions** (ordering is per-partition only)
- **Treat reprocessing as a normal operation**
- Be explicit about **retention and cleanup policies**

```sh
# topic config
kafka-topics.sh --create --topic order.events \
  --partitions 12 --replication-factor 3 \
  --config retention.ms=604800000 --config cleanup.policy=delete
```
