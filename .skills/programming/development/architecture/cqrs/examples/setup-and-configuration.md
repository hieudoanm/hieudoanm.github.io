# CQRS Best Practices: 5. Read Model Optimization

## Source guidance

This example applies the **5. Read Model Optimization** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Denormalized data** — design read models for specific queries:
- **Materialized views** — create materialized views for complex queries:
- **Caching** — implement caching for frequently accessed data:

## Example

```typescript
interface UserReadModel {
  id: string
  email: string
  name: string
  orderCount: number
  totalSpent: number
  lastOrderDate: Date
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for cqrs-pattern.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
