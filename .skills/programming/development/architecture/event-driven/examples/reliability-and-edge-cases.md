# Event-Driven Architecture Best Practices: 3. Messaging Patterns

## Source guidance

This example applies the **3. Messaging Patterns** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Publish/Subscribe** — implement pub/sub for event distribution:
- **Message queues** — use message queues for reliable delivery:
- **Event streaming** — use event streaming for high throughput:

## Example

```typescript
class EventBus {
  private subscribers = new Map<string, Set<EventHandler>>()

  subscribe(eventType: string, handler: EventHandler): void {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, new Set())
    }
    this.subscribers.get(eventType)!.add(handler)
  }

  unsubscribe(eventType: string, handler: EventHandler): void {
    this.subscribers.get(eventType)?.delete(handler)
  }

  async publish(event: Event): Promise<void> {
    const handlers = this.subscribers.get(event.type) || []
    await Promise.all(handlers.map(handler => handler.handle(event)))
  }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for event-driven-architecture.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
