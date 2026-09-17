# Workflow notes

Focused reference for **event-driven-architecture**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Event streaming** — use event streaming for high throughput:

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

---

## 4. Event Processing

- **Event handlers** — implement event handlers:

```typescript
class UserCreatedHandler implements EventHandler {
  async handle(event: Event): Promise<void> {
    const userCreated = event.data as UserCreatedEvent

    // Send welcome email
    await this.emailService.sendWelcomeEmail(userCreated.email)

    // Create user profile
    await this.profileService.createProfile(userCreated.userId)

    // Update analytics
    await this.analyticsService.trackUserSignup(userCreated.userId)
  }
}
```

- **Event routing** — implement event routing:

```typescript
class EventRouter {
  private routes = new Map<string, EventHandler[]>()

  addRoute(eventType: string, handler: EventHandler): void {
    if (!this.routes.has(eventType)) {
      this.routes.set(eventType, [])
    }
    this.routes.get(eventType)!.push(handler)
  }

  async route(event: Event): Promise<void> {
    const handlers = this.routes.get(event.type) || []
    await Promise.all(handlers.map(handler => handler.handle(event)))
  }
}
```

- **Event transformation** — transform events when needed:

```typescript
class EventTransformer {
  transform(event: Event): Event {
    switch (event.type) {
      case 'UserCreated':
        return this.transformUserCreated(event)
      case 'OrderCompleted':
        return this.transformOrderCompleted(event)
      default:
        return event
    }
  }

  private transformUserCreated(event: Event): Event {
    // Add additional data
    return {
      ...event,
      data: {
        ...event.data,
        createdAt: new Date()
      }
    }
  }
}
```

---

## 5. Event Ordering

- **Timestamp ordering** — use timestamps for ordering:

```typescript
class EventOrderer {
  orderEvents(events: Event[]): Event[] {
    return events.sort((a, b) =>
      a.metadata.timestamp.getTime() - b.metadata.timestamp.getTime()
    )
  }
}
```

- **Sequence numbers** — use sequence numbers for strict ordering:

```typescript
interface SequencedEvent extends Event {
  sequenceNumber: number
}

class EventSequencer {
  private sequenceNumber = 0

  sequence(event: Event): SequencedEvent {
    return {
      ...event,
      sequenceNumber: this.sequenceNumber++
    }
  }
}
```

- **Event grouping** — group related events:

```typescript
class EventGrouper {
  groupByAggregate(events: Event[]): Map<string, Event[]> {
    const groups = new Map<string, Event[]>()

    for (const event of events) {
      const aggregateId = event.data.aggregateId
      if (!groups.has(aggregateId)) {
        groups.set(aggregateId, [])
      }
      groups.get(aggregateId)!.push(event)
    }

    return groups
  }
}
```

---
