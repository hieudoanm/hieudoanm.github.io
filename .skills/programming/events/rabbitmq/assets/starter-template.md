# RabbitMQ Best Practices: Starter Template

A reusable starting point derived from the **3. Reliability & Delivery Guarantees** section of [RabbitMQ Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
