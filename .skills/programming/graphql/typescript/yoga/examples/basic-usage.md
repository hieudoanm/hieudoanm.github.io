# yoga: Basic Usage

GraphQL Yoga — batteries-included, framework-agnostic GraphQL server for TypeScript, with subscriptions, file uploads, and plugins.

## Scenario

Use this example as a starting point when applying **yoga** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Setup** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
import { createServer } from 'node:http'

// Node: `yoga` is a request listener, so it plugs straight into node:http
createServer(yoga).listen(4000)

// Edge runtimes: it is also a fetch handler
Bun.serve({ port: 4000, fetch: yoga })

// Express: mount it as middleware
app.use('/graphql', yoga)
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
