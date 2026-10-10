# Implementation notes

Focused reference for **apache-kafka**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
