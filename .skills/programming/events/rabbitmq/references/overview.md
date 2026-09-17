# Overview

Focused reference for **rabbitmq**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
