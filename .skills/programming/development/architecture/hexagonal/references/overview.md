# Overview

Focused reference for **hexagonal-architecture**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
