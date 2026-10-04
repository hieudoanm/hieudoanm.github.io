---
name: cqrs-pattern
description: Best practices for implementing Command Query Responsibility Segregation (CQRS) pattern. Use when designing, structuring, or reviewing CQRS implementations — covers command handling, query optimization, event sourcing, and eventual consistency.
---

# CQRS Best Practices

Command Query Responsibility Segregation (CQRS) is a pattern that separates read and write operations for a data store. Best practice is to implement CQRS when you have complex read/write requirements, optimize read models for queries, and handle eventual consistency properly.

---

## 1. Core Principles

- **Separation of concerns** — separate command (write) and query (read) models
- **Optimized read models** — design read models for specific query needs
- **Event-driven updates** — use events to synchronize read models
- **Eventual consistency** — accept eventual consistency between models
- **Scalability** — scale read and write operations independently

---

## 2. Architecture Overview

```text
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       ├──────────────┬──────────────┐
       │              │              │
       ▼              ▼              ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│  Commands   │ │   Queries   │ │   Events    │
└──────┬──────┘ └──────┬──────┘ └──────┬──────┘
       │              │              │
       ▼              ▼              ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│Write Model  │ │ Read Model  │ │ Event Store │
│(Database)   │ │(Database)   │ │  (Events)   │
└─────────────┘ └─────────────┘ └─────────────┘
```

- **Command side** — handles write operations and validation
- **Query side** — handles read operations and optimization
- **Event store** — stores events for state reconstruction
- **Synchronization** — events synchronize read models

---

## 3. Command Implementation

- **Command objects** — define commands as immutable objects:

```typescript
interface Command {
  id: string
  timestamp: Date
  type: string
  data: any
}

class CreateUserCommand implements Command {
  id = generateId()
  timestamp = new Date()
  type = 'CreateUser'
  data: {
    email: string
    name: string
  }
}
```

- **Command handlers** — implement command handlers:

```typescript
class CreateUserHandler {
  constructor(
    private eventStore: EventStore,
    private userRepository: UserRepository
  ) {}

  async handle(command: CreateUserCommand): Promise<void> {
    // Validate command
    this.validate(command)

    // Create aggregate
    const user = User.create(command.data)

    // Save events
    await this.eventStore.save(user.getUncommittedEvents())

    // Clear uncommitted events
    user.markEventsAsCommitted()
  }

  private validate(command: CreateUserCommand): void {
    if (!command.data.email) {
      throw new Error('Email is required')
    }
  }
}
```

- **Command bus** — implement command bus for routing:

```typescript
class CommandBus {
  private handlers = new Map<string, CommandHandler>()

  registerHandler(commandType: string, handler: CommandHandler): void {
    this.handlers.set(commandType, handler)
  }

  async execute(command: Command): Promise<void> {
    const handler = this.handlers.get(command.type)
    if (!handler) {
      throw new Error(`No handler for ${command.type}`)
    }
    await handler.handle(command)
  }
}
```

---

## 4. Query Implementation

- **Query objects** — define queries as read operations:

```typescript
interface Query {
  type: string
  parameters: any
}

class GetUserQuery implements Query {
  type = 'GetUser'
  parameters: {
    userId: string
  }
}
```

- **Query handlers** — implement query handlers:

```typescript
class GetUserHandler {
  constructor(private readRepository: UserReadRepository) {}

  async handle(query: GetUserQuery): Promise<UserReadModel> {
    return this.readRepository.findById(query.parameters.userId)
  }
}
```

- **Query bus** — implement query bus for routing:

```typescript
class QueryBus {
  private handlers = new Map<string, QueryHandler>()

  registerHandler(queryType: string, handler: QueryHandler): void {
    this.handlers.set(queryType, handler)
  }

  async execute(query: Query): Promise<any> {
    const handler = this.handlers.get(query.type)
    if (!handler) {
      throw new Error(`No handler for ${query.type}`)
    }
    return handler.handle(query)
  }
}
```

---

## 5. Read Model Optimization

- **Denormalized data** — design read models for specific queries:

```typescript
interface UserReadModel {
  id: string
  email: string
  name: string
  orderCount: number
  totalSpent: number
  lastOrderDate: Date
}
```

- **Materialized views** — create materialized views for complex queries:

```sql
CREATE MATERIALIZED VIEW user_order_summary AS
SELECT
  u.id,
  u.email,
  u.name,
  COUNT(o.id) as order_count,
  SUM(o.total) as total_spent,
  MAX(o.created_at) as last_order_date
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.email, u.name;
```

- **Caching** — implement caching for frequently accessed data:

```typescript
class CachedUserReadRepository {
  constructor(
    private repository: UserReadRepository,
    private cache: Cache
  ) {}

  async findById(id: string): Promise<UserReadModel> {
    const cached = await this.cache.get(`user:${id}`)
    if (cached) {
      return cached
    }

    const user = await this.repository.findById(id)
    await this.cache.set(`user:${id}`, user, 3600)
    return user
  }
}
```

---

## 6. Event Sourcing Integration

- **Event store** — implement event store for events:

```typescript
interface Event {
  aggregateId: string
  aggregateType: string
  version: number
  eventType: string
  data: any
  timestamp: Date
}

class EventStore {
  async save(events: Event[]): Promise<void> {
    // Save events to event store
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

- **Event handlers** — implement event handlers for read model updates:

```typescript
class UserCreatedHandler {
  constructor(private readRepository: UserReadRepository) {}

  async handle(event: Event): Promise<void> {
    const userReadModel: UserReadModel = {
      id: event.aggregateId,
      email: event.data.email,
      name: event.data.name,
      orderCount: 0,
      totalSpent: 0,
      lastOrderDate: null
    }

    await this.readRepository.save(userReadModel)
  }
}
```

- **Event bus** — implement event bus for event distribution:

```typescript
class EventBus {
  private handlers = new Map<string, EventHandler[]>()

  subscribe(eventType: string, handler: EventHandler): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, [])
    }
    this.handlers.get(eventType)!.push(handler)
  }

  async publish(event: Event): Promise<void> {
    const handlers = this.handlers.get(event.eventType) || []
    await Promise.all(handlers.map(handler => handler.handle(event)))
  }
}
```

---

## 7. Eventual Consistency

- **Consistency patterns** — handle eventual consistency:

```typescript
class OrderService {
  async createOrder(command: CreateOrderCommand): Promise<void> {
    // Create order in write model
    const order = await this.writeRepository.create(command.data)

    // Publish event
    await this.eventBus.publish({
      type: 'OrderCreated',
      aggregateId: order.id,
      data: order
    })

    // Read model will be updated asynchronously
  }
}
```

- **Compensating actions** — implement compensating actions for failures:

```typescript
class CompensationHandler {
  async handleFailure(event: Event): Promise<void> {
    switch (event.type) {
      case 'PaymentFailed':
        await this.compensateOrder(event.aggregateId)
        break
      case 'InventoryReservationFailed':
        await this.compensatePayment(event.aggregateId)
        break
    }
  }
}
```

- **Consistency checks** — implement consistency checks:

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
