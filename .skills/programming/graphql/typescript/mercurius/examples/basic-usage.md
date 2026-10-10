# mercurius: Basic Usage

Mercurius — high-performance GraphQL adapter for Fastify, with schema, loaders, subscriptions, and federation support.

## Scenario

Use this example as a starting point when applying **mercurius** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Setup** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
import Fastify from 'fastify'
import mercurius from 'mercurius'

const app = Fastify({ logger: true })

await app.register(mercurius, {
  schema: typeDefs, // SDL string, or './schema.gql'
  resolvers,
  graphiql: process.env.NODE_ENV !== 'production', // dev only
  context: (request) => ({ userId: request.headers['x-user-id'] ?? null }),
})

app.get('/status', async () => ({ ok: true })) // health check stays outside GraphQL

// Run a query in-process, no HTTP round-trip:
const { data } = await app.graphql('{ user(id: "1") { name } }')
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
