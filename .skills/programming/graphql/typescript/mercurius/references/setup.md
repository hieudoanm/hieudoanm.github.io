# 1. Setup

Focused reference for **mercurius**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Setup

- Deps: `fastify`, `mercurius`, `graphql`.
- Register: `fastify.register(mercurius, { schema, resolvers })` (or from files with `schema: './schema.gql'` + `resolvers`).

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

- Manual route: `POST /graphql` default; configure `path` and `ide` for GraphiQL in dev.
- Serve via `app.get('/status', ...)` separately; keep health endpoint outside GraphQL.
