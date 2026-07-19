# Implementation notes

Focused reference for **event-driven-architecture**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Event Delivery

- **At-least-once delivery** — ensure at-least-once delivery:

```typescript
class ReliableEventPublisher {
  async publish(event: Event): Promise<void> {
    let attempts = 0
    const maxAttempts = 3

    while (attempts < maxAttempts) {
      try {
        await this.messageQueue.publish('events', event)
        return
      } catch (error) {
        attempts++
        await this.delay(1000 * attempts)
      }
    }

    throw new Error('Failed to publish event after retries')
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
```

- **Idempotent handlers** — make handlers idempotent:

```typescript
class IdempotentEventHandler {
  private processedEvents = new Set<string>()

  async handle(event: Event): Promise<void> {
    if (this.processedEvents.has(event.id)) {
      return // Already processed
    }

    await this.processEvent(event)
    this.processedEvents.add(event.id)
  }

  private async processEvent(event: Event): Promise<void> {
    // Process event
  }
}
```

- **Dead letter queues** — implement dead letter queues:

```typescript
class DeadLetterQueue {
  async sendToDeadLetter(event: Event, error: Error): Promise<void> {
    await this.messageQueue.publish('dead-letter', {
      event,
      error: error.message,
      timestamp: new Date()
    })
  }
}
```

---

## 7. Event Sourcing

- **Event store** — implement event store:

```typescript
class EventStore {
  async saveEvents(aggregateId: string, events: Event[]): Promise<void> {
    // Check for concurrency conflicts
    const existingEvents = await this.getEvents(aggregateId)
    const expectedVersion = existingEvents.length

    if (expectedVersion !== this.getExpectedVersion(events)) {
      throw new ConcurrencyError()
    }

    // Save events
    await this.db.events.insertMany(events)
  }

  async getEvents(aggregateId: string): Promise<Event[]> {
    return this.db.events
      .find({ aggregateId })
      .sort({ version: 1 })
      .toArray()
  }
}
```

- **Snapshotting** — implement snapshotting for performance:

```typescript
class SnapshotStore {
  async saveSnapshot(aggregateId: string, snapshot: any): Promise<void> {
    await this.db.snapshots.updateOne(
      { aggregateId },
      { $set: { snapshot, timestamp: new Date() } },
      { upsert: true }
    )
  }

  async getSnapshot(aggregateId: string): Promise<any | null> {
    const result = await this.db.snapshots.findOne({ aggregateId })
    return result?.snapshot || null
  }
}
```

- **Event replay** — implement event replay:

```typescript
class EventReplayer {
  async replayEvents(aggregateId: string): Promise<void> {
    const events = await this.eventStore.getEvents(aggregateId)

    for (const event of events) {
      await this.eventHandler.handle(event)
    }
  }
}
```

---

## 8. Monitoring and Observability

- **Event tracking** — track event flow:

```typescript
class EventTracker {
  trackEvent(event: Event): void {
    this.metrics.increment('events.published', {
      type: event.type,
      source: event.source
    })
  }

  trackEventProcessing(event: Event, duration: number): void {
    this.metrics.histogram('events.processing.duration', duration, {
      type: event.type
    })
  }
}
```
