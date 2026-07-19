# Implementation notes

Focused reference for **hexagonal-architecture**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
