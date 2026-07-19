# Review checklist

Focused reference for **event-driven-architecture**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
