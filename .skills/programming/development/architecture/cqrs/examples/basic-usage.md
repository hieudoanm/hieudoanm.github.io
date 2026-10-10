# CQRS Best Practices: Basic Usage

Best practices for implementing Command Query Responsibility Segregation (CQRS) pattern. Use when designing, structuring, or reviewing CQRS implementations — covers command handling, query optimization, event sourcing, and eventual consistency.

## Scenario

Use this example as a starting point when applying **cqrs-pattern** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Command Implementation** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
