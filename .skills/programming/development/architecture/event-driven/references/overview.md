# Overview

Focused reference for **event-driven-architecture**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
