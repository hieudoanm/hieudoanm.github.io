---
name: hexagonal-architecture
description: Best practices for implementing hexagonal (ports and adapters) architecture. Use when designing, structuring, or reviewing hexagonal architecture — covers domain isolation, port interfaces, adapter implementations, and dependency management.
---

# Hexagonal Architecture Best Practices

Hexagonal architecture, also known as ports and adapters, is a pattern that isolates the core domain logic from external concerns. Best practice is to define clear port interfaces, implement adapters for external systems, and maintain strict dependency rules.

---

## 1. Core Principles

- **Domain isolation** — core domain logic is isolated from external concerns
- **Port interfaces** — define interfaces for external interactions
- **Adapter implementations** — implement adapters for external systems
- **Dependency inversion** — dependencies point inward toward the domain
- **Testability** — core logic is easily testable without external dependencies

---

## 2. Architecture Overview

```text
┌─────────────────────────────────────────────────┐
│                  Adapters                       │
│  ┌──────────────┐  ┌──────────────┐           │
│  │   Primary    │  │  Secondary   │           │
│  │  (Driving)   │  │  (Driven)    │           │
│  │              │  │              │           │
│  │ HTTP API     │  │ Database     │           │
│  │ CLI          │  │ Message Queue│           │
│  │ UI           │  │ External API │           │
│  └──────┬───────┘  └──────┬───────┘           │
└─────────┼──────────────────┼───────────────────┘
          │                  │
          └────────┬─────────┘
                   │
         ┌─────────▼─────────┐
         │     Ports        │
         │  (Interfaces)    │
         └─────────┬─────────┘
                   │
         ┌─────────▼─────────┐
         │     Domain       │
         │  (Core Logic)    │
         └───────────────────┘
```

- **Primary adapters** — driving adapters (API, CLI, UI)
- **Secondary adapters** — driven adapters (Database, Message Queue, External API)
- **Ports** — interfaces that define how the domain interacts with external systems
- **Domain** — core business logic without external dependencies

---

## 3. Domain Layer

- **Domain entities** — define core domain entities:

```typescript
// Domain entity
class User {
  constructor(
    private id: string,
    private email: string,
    private name: string,
    private createdAt: Date
  ) {}

  static create(email: string, name: string): User {
    return new User(
      generateId(),
      email,
      name,
      new Date()
    )
  }

  updateName(name: string): void {
    this.name = name
  }

  getId(): string {
    return this.id
  }

  getEmail(): string {
    return this.email
  }

  getName(): string {
    return this.name
  }
}
```

- **Domain services** — implement domain services:

```typescript
class UserDomainService {
  constructor(private userRepository: UserRepositoryPort) {}

  async createUser(email: string, name: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email)
    if (existingUser) {
      throw new Error('User already exists')
    }

    return User.create(email, name)
  }
}
```

- **Domain events** — define domain events:

```typescript
interface DomainEvent {
  id: string
  type: string
  aggregateId: string
  occurredAt: Date
  data: any
}

class UserCreatedEvent implements DomainEvent {
  id = generateId()
  type = 'UserCreated'
  aggregateId: string
  occurredAt = new Date()
  data: {
    userId: string
    email: string
    name: string
  }
}
```

---

## 4. Port Interfaces

- **Primary ports** — define interfaces for driving adapters:

```typescript
// Input port
interface UserApplicationServicePort {
  createUser(email: string, name: string): Promise<User>
  getUser(id: string): Promise<User>
  updateUser(id: string, name: string): Promise<User>
  deleteUser(id: string): Promise<void>
}
```

- **Secondary ports** — define interfaces for driven adapters:

```typescript
// Output port
interface UserRepositoryPort {
  save(user: User): Promise<void>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  delete(id: string): Promise<void>
}

interface EmailServicePort {
  sendWelcomeEmail(email: string): Promise<void>
}

interface EventPublisherPort {
  publish(event: DomainEvent): Promise<void>
}
```

- **Port contracts** — define clear contracts for ports:

```typescript
interface PortContract {
  validate(input: any): boolean
  transform(input: any): any
  handle(input: any): Promise<any>
}
```

---

## 5. Adapter Implementations

- **Primary adapters** — implement driving adapters:

```typescript
// HTTP API adapter
class UserHttpAdapter {
  constructor(private userApplicationService: UserApplicationServicePort) {}

  async createUser(req: Request, res: Response): Promise<void> {
    const { email, name } = req.body

    try {
      const user = await this.userApplicationService.createUser(email, name)
      res.status(201).json(user)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      const user = await this.userApplicationService.getUser(id)
      res.json(user)
    } catch (error) {
      res.status(404).json({ error: 'User not found' })
    }
  }
}
```

- **Secondary adapters** — implement driven adapters:

```typescript
// Database adapter
class UserRepositoryAdapter implements UserRepositoryPort {
  constructor(private db: Database) {}

  async save(user: User): Promise<void> {
    await this.db.users.insertOne({
      id: user.getId(),
      email: user.getEmail(),
      name: user.getName(),
      createdAt: new Date()
    })
  }

  async findById(id: string): Promise<User | null> {
    const record = await this.db.users.findOne({ id })
    if (!record) {
      return null
    }

    return new User(
      record.id,
      record.email,
      record.name,
      record.createdAt
    )
  }

  async findByEmail(email: string): Promise<User | null> {
    const record = await this.db.users.findOne({ email })
    if (!record) {
      return null
    }

    return new User(
      record.id,
      record.email,
      record.name,
      record.createdAt
    )
  }

  async delete(id: string): Promise<void> {
    await this.db.users.deleteOne({ id })
  }
}
```

- **External service adapters** — implement external service adapters:

```typescript
// Email service adapter
class EmailServiceAdapter implements EmailServicePort {
  constructor(private emailProvider: EmailProvider) {}

  async sendWelcomeEmail(email: string): Promise<void> {
    await this.emailProvider.send({
      to: email,
      subject: 'Welcome',
      body: 'Welcome to our platform!'
    })
  }
}
```

---

## 6. Application Services

- **Application service** — implement application service:

```typescript
class UserApplicationService implements UserApplicationServicePort {
  constructor(
    private userRepository: UserRepositoryPort,
    private emailService: EmailServicePort,
    private eventPublisher: EventPublisherPort
  ) {}

  async createUser(email: string, name: string): Promise<User> {
    const user = User.create(email, name)

    await this.userRepository.save(user)
    await this.emailService.sendWelcomeEmail(email)

    const event = new UserCreatedEvent()
    event.aggregateId = user.getId()
    event.data = {
      userId: user.getId(),
      email: user.getEmail(),
      name: user.getName()
    }

    await this.eventPublisher.publish(event)

    return user
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }

  async updateUser(id: string, name: string): Promise<User> {
    const user = await this.getUser(id)
    user.updateName(name)
    await this.userRepository.save(user)
    return user
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}
```

---

## 7. Dependency Management

- **Dependency injection** — use dependency injection:

```typescript
class DependencyContainer {
  private static instance: DependencyContainer
  private userRepository: UserRepositoryPort
  private emailService: EmailServicePort
  private eventPublisher: EventPublisherPort
  private userApplicationService: UserApplicationServicePort

  private constructor() {
    this.userRepository = new UserRepositoryAdapter(database)
    this.emailService = new EmailServiceAdapter(emailProvider)
    this.eventPublisher = new EventPublisherAdapter(messageQueue)
    this.userApplicationService = new UserApplicationService(
      this.userRepository,
      this.emailService,
      this.eventPublisher
    )
  }

  static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer()
    }
    return DependencyContainer.instance
  }

  getUserApplicationService(): UserApplicationServicePort {
    return this.userApplicationService
  }
}
```

- **Dependency rules** — enforce dependency rules:

```typescript
// Domain should not depend on adapters
// Adapters should depend on ports
// Application services should depend on ports
```

---

## 8. Testing

- **Domain testing** — test domain logic without adapters:

```typescript
describe('User', () => {
  it('should create user with valid data', () => {
    const user = User.create('test@example.com', 'Test User')

    expect(user.getEmail()).toBe('test@example.com')
    expect(user.getName()).toBe('Test User')
  })

  it('should update user name', () => {
    const user = User.create('test@example.com', 'Test User')
    user.updateName('Updated Name')

    expect(user.getName()).toBe('Updated Name')
  })
})
```

- **Port testing** — test ports with mock adapters:

```typescript
describe('UserApplicationService', () => {
  it('should create user', async () => {
    const mockUserRepository = createMockUserRepository()
    const mockEmailService = createMockEmailService()
    const mockEventPublisher = createMockEventPublisher()

    const service = new UserApplicationService(
      mockUserRepository,
      mockEmailService,
      mockEventPublisher
    )

    const user = await service.createUser('test@example.com', 'Test User')

    expect(mockUserRepository.save).toHaveBeenCalledWith(user)
    expect(mockEmailService.sendWelcomeEmail).toHaveBeenCalledWith('test@example.com')
    expect(mockEventPublisher.publish).toHaveBeenCalled()
  })
})
```

- **Adapter testing** — test adapters with real dependencies:

```typescript
describe('UserRepositoryAdapter', () => {
  it('should save user to database', async () => {
    const mockDb = createMockDatabase()
    const adapter = new UserRepositoryAdapter(mockDb)

    const user = User.create('test@example.com', 'Test User')
    await adapter.save(user)

    expect(mockDb.users.insertOne).toHaveBeenCalledWith({
      id: user.getId(),
      email: user.getEmail(),
      name: user.getName(),
      createdAt: expect.any(Date)
    })
  })
})
```

---

## 9. General Rules of Thumb

- **Domain isolation** — keep domain logic isolated
- **Port interfaces** — define clear port interfaces
- **Adapter implementations** — implement adapters for external systems
- **Dependency inversion** — dependencies point inward
- **Testability** — make core logic easily testable
- **Single responsibility** — each adapter has one responsibility

---

## Quick-Start Checklist

- [ ] Domain entities and services defined
- [ ] Port interfaces defined
- [ ] Primary adapters implemented
- [ ] Secondary adapters implemented
- [ ] Application services implemented
- [ ] Dependency injection configured
- [ ] Domain unit tests written
- [ ] Port integration tests written
- [ ] Adapter tests written
- [ ] Dependency rules enforced
