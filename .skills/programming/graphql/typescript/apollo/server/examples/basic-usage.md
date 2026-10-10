# apollo-server: Basic Usage

Apollo Server — production GraphQL server (Node.js/TypeScript) with schema, resolvers, directives, federation, and tracing.

## Scenario

Use this example as a starting point when applying **apollo-server** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Setup a Server** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
