# Microservices Architecture Best Practices: Starter Template

A reusable starting point derived from the **6. Configuration Management** section of [Microservices Architecture Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```typescript
// Load configuration from environment
const config = {
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  },
  services: {
    orderService: process.env.ORDER_SERVICE_URL,
    paymentService: process.env.PAYMENT_SERVICE_URL
  }
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
