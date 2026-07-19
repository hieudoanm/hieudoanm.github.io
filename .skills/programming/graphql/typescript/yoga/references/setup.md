# 2. Setup

Focused reference for **yoga**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Setup

- Deps: `graphql-yoga`, `graphql`, `@graphql-tools/schema` (optional but recommended).
- Standalone: `const yoga = createYoga({ schema, graphiql: true }); Bun.serve({ fetch: yoga })` or Node `createServer`.

```ts
import { createServer } from 'node:http'

// Node: `yoga` is a request listener, so it plugs straight into node:http
createServer(yoga).listen(4000)

// Edge runtimes: it is also a fetch handler
Bun.serve({ port: 4000, fetch: yoga })

// Express: mount it as middleware
app.use('/graphql', yoga)
```

- With Express: `app.use('/graphql', yoga)`.
- Change path with `graphqlEndpoint`.
