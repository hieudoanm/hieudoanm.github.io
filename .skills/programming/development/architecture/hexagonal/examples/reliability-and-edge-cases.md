# Hexagonal Architecture Best Practices: 3. Domain Layer

## Source guidance

This example applies the **3. Domain Layer** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Domain entities** — define core domain entities:
- **Domain services** — implement domain services:
- **Domain events** — define domain events:

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for hexagonal-architecture.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
