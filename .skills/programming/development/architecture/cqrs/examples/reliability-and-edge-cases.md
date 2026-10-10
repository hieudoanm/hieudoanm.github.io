# CQRS Best Practices: 7. Eventual Consistency

## Source guidance

This example applies the **7. Eventual Consistency** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Consistency patterns** — handle eventual consistency:
- **Compensating actions** — implement compensating actions for failures:
- **Consistency checks** — implement consistency checks:

## Example

```typescript
class OrderService {
  async createOrder(command: CreateOrderCommand): Promise<void> {
    // Create order in write model
    const order = await this.writeRepository.create(command.data)

    // Publish event
    await this.eventBus.publish({
      type: 'OrderCreated',
      aggregateId: order.id,
      data: order
    })

    // Read model will be updated asynchronously
  }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for cqrs-pattern.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
