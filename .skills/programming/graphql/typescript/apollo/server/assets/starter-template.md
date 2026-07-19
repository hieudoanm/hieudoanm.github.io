# Server: Starter Template

A reusable starting point derived from the **1. Setup a Server** section of [Server](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs, resolvers } from './schema'

const server = new ApolloServer({ typeDefs, resolvers })

// startStandaloneServer calls start() for you; an Express / node:http integration
// must `await server.start()` before the middleware is ever mounted.
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ user: await authenticate(req.headers.authorization) }),
})
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
