# Event-Driven Architecture Best Practices: Basic Usage

Best practices for implementing event-driven architecture. Use when designing, structuring, or reviewing event-driven systems — covers event design, messaging patterns, event sourcing, and event processing.

## Scenario

Use this example as a starting point when applying **event-driven-architecture** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Event Design** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```typescript
// Good - past tense
interface UserCreatedEvent {
  type: 'UserCreated'
  userId: string
  email: string
  timestamp: Date
}

interface OrderCompletedEvent {
  type: 'OrderCompleted'
  orderId: string
  userId: string
  total: number
  timestamp: Date
}

// Bad - imperative
interface CreateUserEvent {
  type: 'CreateUser'
  userId: string
  email: string
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
