# Workflow notes

Focused reference for **hexagonal-architecture**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
