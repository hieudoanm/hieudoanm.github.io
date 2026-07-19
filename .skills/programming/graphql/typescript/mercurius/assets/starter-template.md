# Mercurius: Starter Template

A reusable starting point derived from the **1. Setup** section of [Mercurius](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
