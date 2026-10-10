# RabbitMQ Best Practices: 3. Reliability & Delivery Guarantees

## Source guidance

This example applies the **3. Reliability & Delivery Guarantees** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Use acknowledgements explicitly**; understand **auto-ack vs manual ack**
- **Ensure idempotent consumers** — **expect duplicate deliveries**
- **Persist messages** that must survive broker restarts (durable queues + `PERSISTENT`)
- **Use quorum queues** where appropriate (replicated, HA)
- **Handle poison messages explicitly** — route to DLQ, don't silently drop
- **Never drop messages silently unless intentional**

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for rabbitmq.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
