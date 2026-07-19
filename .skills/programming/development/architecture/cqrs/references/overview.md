# Overview

Focused reference for **cqrs-pattern**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
