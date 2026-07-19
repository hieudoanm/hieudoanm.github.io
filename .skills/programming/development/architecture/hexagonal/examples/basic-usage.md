# Hexagonal Architecture Best Practices: Basic Usage

Best practices for implementing hexagonal (ports and adapters) architecture. Use when designing, structuring, or reviewing hexagonal architecture — covers domain isolation, port interfaces, adapter implementations, and dependency management.

## Scenario

Use this example as a starting point when applying **hexagonal-architecture** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Domain Layer** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
