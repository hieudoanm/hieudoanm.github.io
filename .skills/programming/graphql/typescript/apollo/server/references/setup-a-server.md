# 1. Setup a Server

Focused reference for **apollo-server**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Setup a Server

- Package: `@apollo/server`, `graphql`, and an HTTP integration (`@apollo/server/express4` or built-in standalone).
- Create `const server = new ApolloServer({ typeDefs, resolvers })`, `await server.start()`, `server.applyMiddleware({ app, path: '/graphql' })`.
- For a bare server: `ApolloServer` + Standalone HTTP: `httpServer.listen(4000)`.

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

- Subscriptions: set up an HTTP server and use `graphql-ws`/`subscriptions-transport-ws`.
