# Implementation notes

Focused reference for **rabbitmq**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
