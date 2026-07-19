# Apache Pulsar Best Practices: Starter Template

A reusable starting point derived from the **3. Reliability & Delivery Guarantees** section of [Apache Pulsar Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
