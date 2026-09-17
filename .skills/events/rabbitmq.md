---
name: rabbitmq
description: Best practices for message-driven workflows with RabbitMQ. Use when designing exchanges and queues, implementing producers/consumers, adding retries and dead-letter queues, or debugging message loss/backlog — treats RabbitMQ as a message broker for workflows, not an event log or data store.
---

# RabbitMQ Best Practices

RabbitMQ (AMQP) is a **message-queue-oriented broker**: messages are consumed and removed, routing is explicit via exchanges and bindings, and consumers provide backpressure through prefetch. Best practice is treating it as a reliable workflow broker, not a Kafka-style log or a store — model messages as commands/tasks, use DLQs and retry queues explicitly, ack deliberately, and design consumers to be idempotent.

---

## 1. Core Stack & Constraints

- Assume RabbitMQ **3.x**
- RabbitMQ is **message-queue–oriented**, not a log — messages are **consumed and removed**
- **Prefer explicit routing via exchanges** (direct, topic, fanout, headers)
- **Avoid unbounded queues** and **large messages**
- **Avoid long-running consumers without heartbeats**
- **Design for backpressure using prefetch**
- **Treat retries as explicit design, not magic**

```java
// Exchange + queue + binding
channel.exchangeDeclare("orders.direct", "direct", true);
channel.queueDeclare("orders.created", true, false, false, null);
channel.queueBind("orders.created", "orders.direct", "order.created");
```

---

## 2. Messaging & Exchange Design

- **Model messages around commands and tasks**, not free-form events
- **Choose exchange types intentionally**: `direct` (targeted), `topic` (patterned), `fanout` (broadcast)
- Keep **routing keys meaningful and stable**
- **Prefer multiple queues over complex bindings**
- Avoid **overly broad topic patterns** (`#`) without need
- **Use DLQs for failed messages**; **separate retry queues from primary queues**
- **Version message payloads deliberately** (schema-aware, tolerant readers)

```
order.created ──► orders.direct ──► orders.created.queue (consumer)
                         └──────► orders.audit.queue     (fanout target)
```

---

## 3. Reliability & Delivery Guarantees

- **Use acknowledgements explicitly**; understand **auto-ack vs manual ack**
- **Ensure idempotent consumers** — **expect duplicate deliveries**
- **Persist messages** that must survive broker restarts (durable queues + `PERSISTENT`)
- **Use quorum queues** where appropriate (replicated, HA)
- **Handle poison messages explicitly** — route to DLQ, don't silently drop
- **Never drop messages silently unless intentional**

```java
channel.basicQos(10);                       // prefetch = backpressure
channel.basicConsume(queue, false, (tag, delivery) -> {
    try {
        process(delivery.getBody());
        channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
    } catch (Exception e) {
        channel.basicNack(delivery.getEnvelope().getDeliveryTag(), false, false); // → DLQ
    }
});
```

---

## 4. Performance & Operations

- **Tune prefetch** to control throughput (trade-off: fairness vs concurrency)
- **Monitor queue depth and consumer rates**
- **Avoid hot queues** (single-key contention)
- **Scale consumers horizontally** (competing consumers on the same queue)
- Understand **cluster vs mirrored/quorum queues** and their costs
- **Monitor memory and disk alarms** (flow control, watermark)
- **Test failure and recovery scenarios**; document operational limits

---

## 5. General Rules of Thumb

- **Broker for workflows, not logs** — messages are consumed and gone
- **Explicit routing and explicit retries** — exchanges/DLX/retry queues are design, not magic
- **Idempotent consumers + manual ack** — duplicate deliveries are the default contract
- **Backpressure is real** — prefetch + monitoring over unbounded buffers

---

## Quick-Start Checklist

- [ ] Exchanges/routing explicit; queue names + routing keys stable and meaningful
- [ ] Messages modeled as commands/tasks; payloads versioned deliberately
- [ ] Manual acks with explicit success/failure handling; idempotent consumers
- [ ] Durability for critical messages; quorum queues for HA where needed
- [ ] DLQ + retry queues designed; poison messages not silently dropped
- [ ] Prefetch tuned; no unbounded queues; large messages avoided
- [ ] Queue depth, consumer rates, memory/disk alarms monitored
- [ ] Failure/recovery scenarios tested; operational limits documented