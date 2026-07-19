---
name: apache-kafka
description: Best practices for event streaming with Apache Kafka. Use when designing topics and schemas, building producers/consumers, choosing delivery semantics, debugging consumer lag, or planning streaming pipelines — treats Kafka as an event log and streaming backbone, not a queue or database.
---

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

- **Be explicit about delivery semantics** (at-most-once / at-least-once / exactly-once)
- Understand **producer acknowledgements (`acks`)** — `acks=all` for no silent loss
- Handle **retries and idempotence** correctly (`enable.idempotence=true`)
- **Commit offsets deliberately** — after processing completes, not before
- **Do not assume exactly-once without full pipeline support** (producer + consumer + downstream)
- **Design consumers to be idempotent** — duplicates and reprocessing are normal
- **Expect and handle reprocessing** (replaying from an older offset)

```java
// consumer: commit AFTER processing so a crash re-processes rather than skips
consumer.subscribe(Collections.singletonList("order.events"));
while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(200));
    for (ConsumerRecord<String, String> r : records) process(r.value()); // idempotent
    consumer.commitSync();   // at-least-once: commit after work
}
```

---

## 4. Performance & Operations

- **Balance partition count vs throughput** (partitions = parallelism; too many = overhead)
- **Monitor consumer lag continuously** (should trend to ~0, not grow unbounded)
- **Avoid hot partitions** — skew in keys causes single-partition hotspots
- **Tune batch size and linger appropriately** (batch = throughput, linger = latency)
- **Monitor disk usage and retention impact**
- **Plan for broker failures** (replicas, ISR, `min.insync.replicas`)
- **Test rebalance behavior** (consumer group joins/leaves)
- Explain **operational costs and risks** (brokers, storage, network)

---

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