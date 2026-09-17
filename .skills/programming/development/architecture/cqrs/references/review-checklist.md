# Review checklist

Focused reference for **cqrs-pattern**, excerpted from SKILL.md. The skill file remains the canonical guide.

```typescript
class ConsistencyChecker {
  async checkConsistency(): Promise<ConsistencyReport> {
    const writeModelCount = await this.writeRepository.count()
    const readModelCount = await this.readRepository.count()

    return {
      consistent: writeModelCount === readModelCount,
      writeModelCount,
      readModelCount,
      timestamp: new Date()
    }
  }
}
```

---

## 8. Testing

- **Command testing** — test command handlers:

```typescript
describe('CreateUserHandler', () => {
  it('should create user and save events', async () => {
    const handler = new CreateUserHandler(eventStore, userRepository)
    const command = new CreateUserCommand({
      email: 'test@example.com',
      name: 'Test User'
    })

    await handler.handle(command)

    const events = await eventStore.getEvents(command.id)
    expect(events).toHaveLength(1)
    expect(events[0].type).toBe('UserCreated')
  })
})
```

- **Query testing** — test query handlers:

```typescript
describe('GetUserHandler', () => {
  it('should return user read model', async () => {
    const handler = new GetUserHandler(readRepository)
    const query = new GetUserQuery({ userId: '123' })

    const result = await handler.handle(query)

    expect(result).toBeDefined()
    expect(result.id).toBe('123')
  })
})
```

- **Event testing** — test event handlers:

```typescript
describe('UserCreatedHandler', () => {
  it('should create user read model', async () => {
    const handler = new UserCreatedHandler(readRepository)
    const event = {
      type: 'UserCreated',
      aggregateId: '123',
      data: { email: 'test@example.com', name: 'Test User' }
    }

    await handler.handle(event)

    const user = await readRepository.findById('123')
    expect(user).toBeDefined()
    expect(user.email).toBe('test@example.com')
  })
})
```

---

## 9. General Rules of Thumb

- **Separate models** — maintain separate read and write models
- **Optimize reads** — design read models for specific query needs
- **Event-driven** — use events to synchronize models
- **Accept eventual consistency** — design for eventual consistency
- **Test separately** — test command and query sides separately
- **Monitor consistency** — monitor consistency between models

---

## Quick-Start Checklist

- [ ] Command and query models separated
- [ ] Command bus and handlers implemented
- [ ] Query bus and handlers implemented
- [ ] Read models optimized for queries
- [ ] Event store implemented
- [ ] Event handlers for read model updates
- [ ] Eventual consistency handled
- [ ] Compensating actions implemented
- [ ] Consistency monitoring
- [ ] Comprehensive testing
