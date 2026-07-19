# Apache Kafka Best Practices: Starter Template

A reusable starting point derived from the **3. Reliability & Delivery Guarantees** section of [Apache Kafka Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```java
// consumer: commit AFTER processing so a crash re-processes rather than skips
consumer.subscribe(Collections.singletonList("order.events"));
while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(200));
    for (ConsumerRecord<String, String> r : records) process(r.value()); // idempotent
    consumer.commitSync();   // at-least-once: commit after work
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
