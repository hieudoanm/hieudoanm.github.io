---
name: apache-pulsar
description: Best practices for event streaming with Apache Pulsar. Use when designing tenants/namespaces/topics, choosing subscription types, configuring schemas and retention, planning geo-replication, or debugging backlog/latency — treats Pulsar as a distributed log with cursor-based consumption, not an ephemeral queue.
---

# Apache Pulsar Best Practices

Pulsar is a **distributed log with cursor-based consumption** — messages are retained independently of consumption and read positions (cursors) are first-class state managed by subscribers. Best practice is tenant/namespace design for isolation and quotas, intentional subscription types (exclusive/shared/failover/key_shared), schema-based messages with safe versioning, and explicit retention/TTL management separated from consumption.

---

## 1. Core Stack & Constraints

- Assume Pulsar **2.x / 3.x**
- Pulsar is a **distributed log with cursor-based consumption** — retained independent of consumption
- **Topics are cheap; namespaces define limits** — use namespaces for quotas/isolation
- **Prefer schema-based messages**
- **Avoid treating subscriptions like ephemeral queues** — cursors persist
- **Explicitly manage retention and TTL** (storage is not free)
- **Understand BookKeeper storage costs** (replication, write amplification offload)

```sh
# tenant / namespace
pulsar-admin tenants create me
pulsar-admin namespaces create me/orders --clusters primary
pulsar-admin topics create-persistent-topic persistent://me/orders/order-events
```

---

## 2. Topic, Subscription & Schema Design

- **Design topics by domain and ownership**; use **namespaces for quotas and isolation**
- **Choose subscription type intentionally:**
  - `exclusive` — strict ordering, single consumer
  - `shared` — scale-out across consumers, no ordering guarantee
  - `failover` — one active consumer + standby
  - `key_shared` — ordered sharding by message key across consumers
- **Use schemas to enforce compatibility**; **version schemas safely** (backward/forward)
- **Avoid wildcard abuse without governance**
- **Plan retention separately from consumption**; **treat cursors as first-class state**

```
persistent://me/orders/order-events
  sub: "payment-service"  (key_shared, ordered per key, scaled consumers)
```

---

## 3. Reliability & Delivery Guarantees

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

## 5. General Rules of Thumb

- **Log + cursors, not queues** — retention and consumption are decoupled
- **Subscriptions are state** — type chosen by ordering/scale needs, managed explicitly
- **Storage is a real cost** — retention/TTL/tiered storage planned, not default
- **Idempotent consumers + DLQ** — the reliability contract

---

## Quick-Start Checklist

- [ ] Tenants/namespaces for isolation + quotas; domain-aligned topics
- [ ] Subscription type explicit per consumer (exclusive/shared/failover/key_shared)
- [ ] Schema-registered, safely versioned messages; no wildcard abuse
- [ ] Retention/TTL managed separately from consumption; tiered storage planned
- [ ] At-least-once understood; ack timeouts tuned; consumers idempotent
- [ ] DLQ configured for failed messages; backlog/lag monitored
- [ ] Persistent topics for durability; geo-replication policy explicit
- [ ] Broker/bookie failure tested; storage + write amplification sized; rebalancing handled