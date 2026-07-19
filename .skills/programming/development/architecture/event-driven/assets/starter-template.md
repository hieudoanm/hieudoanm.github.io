# Event-Driven Architecture Best Practices: Starter Template

A reusable starting point derived from the **3. Messaging Patterns** section of [Event-Driven Architecture Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```typescript
class EventStream {
  async produce(topic: string, event: Event): Promise<void> {
    await this.kafka.produce(topic, event)
  }

  async consume(topic: string, handler: EventHandler): Promise<void> {
    await this.kafka.consume(topic, async (event) => {
      await handler.handle(event)
    })
  }
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
