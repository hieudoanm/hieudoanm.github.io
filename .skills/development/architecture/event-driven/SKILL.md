---
name: event-driven-architecture
description: Best practices for implementing event-driven architecture. Use when designing, structuring, or reviewing event-driven systems — covers event design, messaging patterns, event sourcing, and event processing.
---

# Event-Driven Architecture Best Practices

Event-driven architecture is a paradigm where components communicate through events. Best practice is to design events carefully, implement proper messaging patterns, handle event ordering and delivery, and ensure system reliability and scalability.

---

## 1. Core Principles

- **Loose coupling** — components communicate through events, not direct calls
- **Asynchronous communication** — events are processed asynchronously
- **Event-driven** — system reacts to events rather than polling
- **Scalability** — event-driven systems scale naturally
- **Resilience** — event-driven systems are more resilient to failures

---

## 2. Event Design

- **Event naming** — use past tense for events that have occurred:

```typescript
// Good - past tense
interface UserCreatedEvent {
  type: 'UserCreated'
  userId: string
  email: string
  timestamp: Date
}

interface OrderCompletedEvent {
  type: 'OrderCompleted'
  orderId: string
  userId: string
  total: number
  timestamp: Date
}

// Bad - imperative
interface CreateUserEvent {
  type: 'CreateUser'
  userId: string
  email: string
}
```

- **Event schema** — define clear event schemas:

```typescript
interface Event {
  id: string
  type: string
  version: string
  source: string
  data: any
  metadata: {
    timestamp: Date
    correlationId: string
    causationId?: string
  }
}
```

- **Event versioning** — version events for backward compatibility:

```typescript
interface UserCreatedEventV1 {
  type: 'UserCreated'
  version: '1.0'
  data: {
    userId: string
    email: string
  }
}

interface UserCreatedEventV2 {
  type: 'UserCreated'
  version: '2.0'
  data: {
    userId: string
    email: string
    name: string
  }
}
```

---

## 3. Messaging Patterns

- **Publish/Subscribe** — implement pub/sub for event distribution:

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

- **Message queues** — use message queues for reliable delivery:

```typescript
class MessageQueue {
  async publish(queue: string, message: any): Promise<void> {
    await this.rabbitmq.publish(queue, message)
  }

  async subscribe(queue: string, handler: MessageHandler): Promise<void> {
    await this.rabbitmq.subscribe(queue, async (message) => {
      try {
        await handler.handle(message)
        await this.ack(message)
      } catch (error) {
        await this.nack(message)
      }
    })
  }
}
```

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

- **Event logging** — log events for debugging:

```typescript
class EventLogger {
  logEvent(event: Event): void {
    this.logger.info('Event published', {
      id: event.id,
      type: event.type,
      correlationId: event.metadata.correlationId
    })
  }
}
```

- **Event monitoring** — monitor event processing:

```typescript
class EventMonitor {
  async checkEventLag(): Promise<EventLagReport> {
    const producerOffset = await this.kafka.getConsumerOffset('events')
    const consumerOffset = await this.kafka.getConsumerOffset('events-consumer')

    return {
      lag: producerOffset - consumerOffset,
      timestamp: new Date()
    }
  }
}
```

---

## 9. Testing

- **Event testing** — test event handlers:

```typescript
describe('UserCreatedHandler', () => {
  it('should send welcome email', async () => {
    const handler = new UserCreatedHandler(emailService, profileService)
    const event = createMockEvent('UserCreated', {
      userId: '123',
      email: 'test@example.com'
    })

    await handler.handle(event)

    expect(emailService.sendWelcomeEmail).toHaveBeenCalledWith('test@example.com')
  })
})
```

- **Integration testing** — test event flow:

```typescript
describe('Event Flow', () => {
  it('should process event through handlers', async () => {
    const eventBus = new EventBus()
    const handler1 = new MockHandler()
    const handler2 = new MockHandler()

    eventBus.subscribe('UserCreated', handler1)
    eventBus.subscribe('UserCreated', handler2)

    const event = createMockEvent('UserCreated', {})
    await eventBus.publish(event)

    expect(handler1.handle).toHaveBeenCalledWith(event)
    expect(handler2.handle).toHaveBeenCalledWith(event)
  })
})
```

---

## 10. General Rules of Thumb

- **Event naming** — use past tense for events
- **Loose coupling** — keep components loosely coupled
- **Asynchronous processing** — process events asynchronously
- **Idempotent handlers** — make handlers idempotent
- **Event versioning** — version events for compatibility
- **Monitoring** — monitor event processing

---

## Quick-Start Checklist

- [ ] Event schemas defined with versioning
- [ ] Event bus or message queue implemented
- [ ] Event handlers implemented
- [ ] Event routing configured
- [ ] Event ordering strategy defined
- [ ] Reliable event delivery implemented
- [ ] Idempotent event handlers
- [ ] Dead letter queue configured
- [ ] Event tracking and monitoring
- [ ] Comprehensive testing
