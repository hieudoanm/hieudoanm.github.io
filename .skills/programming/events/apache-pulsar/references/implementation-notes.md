# Implementation notes

Focused reference for **apache-pulsar**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Understand at-least-once delivery** as the default
- **Expect redelivery on nack or timeout**
- **Use acknowledgement timeouts carefully** (too short → duplicate storms; too long → silent backlogs)
- **Design idempotent consumers** — redelivery is normal
- **Handle backlog growth explicitly** (lag monitoring, DLQs)
- **Use dead-letter topics when appropriate**
- **Rely on persistent topics for durability** (non-persistent only for fire-and-forget)
- **Understand replication guarantees** (geo-replication is eventual per namespace policy)

```java
// consumer with explicit ack and DLQ on repeated failure
Consumer<Order> consumer = client.newConsumer(Schema.JSON(Order.class))
        .topic("persistent://me/orders/order-events")
        .subscriptionName("payment-service")
        .subscriptionType(SubscriptionType.Key_Shared)
        .deadLetterPolicy(DeadLetterPolicy.builder().maxRedeliverCount(3).build())
        .subscribe();
while (true) {
    Message<Order> msg = consumer.receive();
    if (process(msg.getValue())) consumer.acknowledge(msg); else consumer.negativeAcknowledge(msg);
}
```

---

## 4. Performance, Scaling & Operations

- **Scale by adding brokers and partitions**
- **Tune batching and compression** for throughput vs latency
- **Monitor backlog, latency, and storage growth**
- **Understand BookKeeper write amplification** when sizing storage
- **Use tiered storage for long retention** (offload to object storage)
- **Plan for rebalancing and topic ownership** changes
- **Test broker and bookie failures**; monitor **geo-replication lag**

---
