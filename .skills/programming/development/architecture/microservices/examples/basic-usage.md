# Microservices Architecture Best Practices: Basic Usage

Best practices for designing and implementing microservices architecture. Use when planning, structuring, or reviewing microservices — covers service design, communication, data management, and operational concerns.

## Scenario

Use this example as a starting point when applying **microservices-architecture** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Service Communication** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```typescript
// Service A calling Service B
async function getUserOrders(userId: string): Promise<Order[]> {
  const response = await fetch(
    `http://order-service/api/orders/${userId}`
  )
  return response.json()
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
