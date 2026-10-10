# Event-Driven Architecture Best Practices: 2. Event Design

## Source guidance

This example applies the **2. Event Design** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Event naming** — use past tense for events that have occurred:
- **Event schema** — define clear event schemas:
- **Event versioning** — version events for backward compatibility:

## Example

```typescript
interface Event {
  id: string
  type: string
  version: string
  source: string
  data: any
  metadata: {
    timestamp: Date
    correlationId: string
    causationId?: string
  }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for event-driven-architecture.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
