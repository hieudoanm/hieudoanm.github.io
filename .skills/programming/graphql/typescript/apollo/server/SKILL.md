---
name: "apollo-server"
description: "Apollo Server — production GraphQL server (Node.js/TypeScript) with schema, resolvers, directives, federation, and tracing."
tags:
  - "programming"
  - "graphql"
  - "typescript"
  - "apollo"
  - "server"
when_to_use: "Use when implementing, configuring, evaluating, or troubleshooting Apollo Server in a project."
prerequisites:
  - "Basic familiarity with the project and the problem being addressed."
  - "For implementation, access to the relevant source code or development environment."
related_skills:
  - "../client/SKILL.md"
  - "../../../SKILL.md"
  - "../../garph/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
Apollo Server is the **reference GraphQL server for Node.js/TypeScript** (uses `@apollo/server`). It provides a **typed schema, resolvers, context, directives, error formatting, subscriptions, and Apollo Federation** support.

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

## 2. Schema & Resolvers

- **typeDefs**: SDL via `gql` template literal (Tagged template with the `graphql` package) or a schema string.
- **resolvers**: object mapping field to functions; type-wise, return promises for async work.
- Groups by type: `Query`, `Mutation`, plus per-type resolvers for nested fields (avoid N+1).
- **Arguments/inputs**: validate via SDL types; non-null (`!`) where required.

```graphql
type User {
  id: ID!
  name: String!
  posts(first: Int = 10, after: String): [Post!]!
}
type Post {
  id: ID!
  title: String!
  author: User!
}
input CreateUserInput {
  name: String!
  email: String!
}
type Query {
  user(id: ID!): User
}
type Mutation {
  createUser(input: CreateUserInput!): User!
}
```

- **Context**: per-request object (auth user, DB client, DataLoaders) from `context: async ({ req }) => ({ user, loaders })`.

```ts
import DataLoader from 'dataloader'
import { GraphQLError } from 'graphql'

type Context = {
  user: SessionUser
  userService: UserService
  loaders: { userById: DataLoader<string, User> }
}

const resolvers = {
  Query: {
    user: async (_parent: unknown, { id }: { id: string }, context: Context) => {
      if (id === '') {
        throw new GraphQLError('id must not be empty', { extensions: { code: 'BAD_USER_INPUT' } })
      }
      return context.loaders.userById.load(id)
    },
  },
  Mutation: {
    createUser: (_parent, { input }: { input: CreateUserInput }, context: Context) =>
      context.userService.create(input),
  },
}

// Fresh loader per request: batches and dedupes every userById lookup in the operation
const createContext = (user: SessionUser, userService: UserService): Context => ({
  user,
  userService,
  loaders: { userById: new DataLoader<string, User>((ids) => userService.findByIds([...ids])) },
})
```

## 3. Advanced: Directives, Cost, and Errors

- Custom directives: define `GraphQLDirective` (implement `visitSchema`/transform) for e.g., `@auth`, `@cache`.
- **Error shaping**: `formatError` hook to map internal errors to client-safe messages (don't leak stack traces).

```ts
import { unwrapResolverError } from '@apollo/server/errors'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Runs on every error before it leaves the server: shape it, never leak internals
  formatError: (formatted, error) => {
    logger.warn({ err: unwrapResolverError(error) }, 'graphql error')
    return { message: formatted.message, path: formatted.path, extensions: { code: formatted.extensions?.code } }
  },
})
```

- `AuthenticationError`, `ForbiddenError`, `UserInputError` etc. from `@apollo/server`/`apollo-server-errors` give meaningful status codes.
- Cost limiting: use `apollo-server-plugin-response-cache` and manual query-depth/complexity checks in `context`.

## 4. Data Fetching / Resolver Patterns

- **DataLoader** in context: instantiate per request to batch `resolve` calls.
- Model resolvers on **services** (DB adapters) rather than raw SQL in resolvers.
- Use `DataSource`-style classes (`apollo-datasource`) that live per request for caching/queries.
- For large nested graphs, return **entity types** and let nested resolvers fetch only needed data.

## 5. Apollo Federation

- **Subgraph** / **Supergraph**: each microservice owns a partial schema; **Apollo Router** composes the supergraph.
- Need `@apollo/server`, `@apollo/subgraph`, and inheritance patterns (`@key`, `@external`, `@requires`, `@provides`, `@extends`).
- Canonical entities: `resolveReference(reference, context)` returns the full object from a node by key.
- Federation v2: `@shareable`, `@interfaceObject`; route-level gateway via Router.

## 6. Performance & Monitoring

- Use `@apollo/server` tracing: `tracing: { includeUnusedVariables }`, `engine`/reporting to Apollo Studio (or Prometheus).
- Persisted queries for safe, cheap, high-traffic clients.
- **Batching**: enable `batchEnabled: true` in `applyMiddleware` (send multiple ops) — but usually N-1 queries are the issue; fix with DataLoader.
- Set sensible `VARIABLES`/payload limits; enable `csrfPrevention` and `logger`.

## 7. Common Pitfalls

- Skipping `await server.start()` before `applyMiddleware` → runtime 500s.
- Returning `null` vs throwing for nullable fields (client gets `null` + no error vs error).
- Leaking internal errors via `formatError` default (stack traces).
- Forgetting DataLoader → N+1 avalanche.
- Not validating input beyond SDL types (injection, huge payloads).

## General Rules of Thumb

- Constrain the schema; design resolvers against services + DataLoaders.
- Handle errors via GraphQL-typed errors + `formatError` for safety.
- Enable tracing/metrics from day one; monitor P95 field latency.
- Use subscriptions/streaming only where real-time is the point.
- Keep schema evolution-friendly: deprecate, do not break.

## Quick-Start Checklist

- [ ] `npm i @apollo/server graphql`; scaffold server (standalone or Express integration).
- [ ] Design typeDefs (SDL) with proper nullability & directives.
- [ ] Implement resolvers + context (auth, DB, DataLoaders).
- [ ] Add `formatError` (no stack leaks) and typed Apollo errors.
- [ ] Enable CSRF prevention and payload/query limits.
- [ ] Add response cache plugin and persisted queries for high traffic.
- [ ] Wire DataLoader per request to prevent N+1.
- [ ] Add tracing/metrics (Apollo Studio or instrumentation).