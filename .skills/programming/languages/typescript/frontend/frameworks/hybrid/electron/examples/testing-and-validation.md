# Electron Best Practices: 8. Testing

## Source guidance

This example applies the **8. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Spectron for E2E testing** — test Electron apps with Spectron:
- **Unit testing** — test main and renderer processes separately
- **IPC testing** — test IPC communication between processes

## Example

```typescript
import { Application } from 'spectron'

const app = new Application({
  path: '/path/to/app'
})

await app.start()
const window = await app.client.getWindowCount()
await app.stop()
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for electron-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
