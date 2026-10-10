# Node.js Runtime Best Practices: Starter Template

A reusable starting point derived from the **4. Process Lifecycle, Signals & Exit Codes** section of [Node.js Runtime Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
import { once } from 'node:events';

const server = createServer();
server.listen(PORT);
for (const sig of ['SIGINT', 'SIGTERM'] as const) {
  process.once(sig, async () => {
    server.close();
    await drainTasks(); // flush what's in flight
    process.exit(0); // exit AFTER graceful close
  });
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
