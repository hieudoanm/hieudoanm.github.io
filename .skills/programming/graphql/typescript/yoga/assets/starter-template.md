# Yoga: Starter Template

A reusable starting point derived from the **2. Setup** section of [Yoga](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
import { createServer } from 'node:http'

// Node: `yoga` is a request listener, so it plugs straight into node:http
createServer(yoga).listen(4000)

// Edge runtimes: it is also a fetch handler
Bun.serve({ port: 4000, fetch: yoga })

// Express: mount it as middleware
app.use('/graphql', yoga)
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
