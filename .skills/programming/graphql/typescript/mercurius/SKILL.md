---
name: "mercurius"
description: "Mercurius — high-performance GraphQL adapter for Fastify, with schema, loaders, subscriptions, and federation support."
tags:
  - "programming"
  - "graphql"
  - "typescript"
  - "mercurius"
when_to_use: "Use when implementing, configuring, evaluating, or troubleshooting Mercurius in a project."
prerequisites:
  - "Basic familiarity with the project and the problem being addressed."
  - "For implementation, access to the relevant source code or development environment."
related_skills:
  - "../garph/SKILL.md"
  - "../yoga/SKILL.md"
  - "../../SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
Mercurius is a **GraphQL adapter for Fastify** (by Matteo Collina et al.) — fast (uses Fastify's serializer), **schema-based, with loaders, subscriptions, and Apollo Federation v1/v2 support**.

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

## 2. Schema & Resolvers

- **Schema** can be SDL string, file, or `buildSchema` programmatically.

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
input CreatePostInput {
  title: String!
  authorId: ID!
}
type Query {
  user(id: ID!): User
}
type Mutation {
  createPost(input: CreatePostInput!): Post!
}
```

- **Resolvers** map: `{ Query: { users: async () => [...] } }`.
- Fast path `fastify.graphql(query, variables)` for direct in-route calls.
- Context: build a Fastify-native hook (`onRequest`) to inject `app.decorate('graphqlContext')` for auth, DB access.

## 3. Loaders (Mercurius DataLoaders)

- Use **`loaders`** option: `{ User: { posts: async (queries, context) => batchLoad(...) } }` per type-field.

```ts
import { groupBy } from 'lodash-es'

// One batched round-trip per request; results come back in the order the parents were asked for
const loaders = {
  User: {
    posts: async (queries: Array<{ obj: User; args: { first?: number } }>) => {
      const rows = await db.posts.findByAuthorIds(queries.map(({ obj }) => obj.id)) // 1 query, not N
      const byAuthor = groupBy(rows, 'authorId')
      return queries.map(({ obj, args }) => (byAuthor[obj.id] ?? []).slice(0, args.first ?? 10))
    },
  },
}
```

- Loaders **batch + dedupe** per request group (like DataLoader), killing N+1.
- Return arrays matching the queries' `obj` order; handle edge cases (empty queries, nulls).
- Combine with a database `WHERE IN (...)` single round trip.

## 4. Subscriptions

- Enable `{ subscriptions: true }`; use `subscribe` + `onSubscribe` for auth.
- Define `Subscription` type with `subscribe: ...` returning AsyncIterator (e.g., `pubSub`).

```ts
import { PubSub } from 'graphql-subscriptions'

const pubSub = new PubSub()

const resolvers = {
  Subscription: {
    postAdded: {
      // asyncIterator bridges the resolver to the graphql-ws transport
      subscribe: (_parent, { authorId }: { authorId: string }) => pubSub.asyncIterator(`posts:${authorId}`),
    },
  },
  Mutation: {
    createPost: async (_parent, { input }: { input: CreatePostInput }, context) => {
      const post = await context.postService.create(input)
      await pubSub.publish(`posts:${post.authorId}`, { postAdded: post })
      return post
    },
  },
}

await app.register(mercurius, { schema, resolvers, subscription: true })
```

- Use the `mq`/`redis` pubsub adapter for multi-instance, or in-memory `graphql-subscriptions`.
- Under HTTP/WS: Mercurius exposes `/graphql` WS (graphql-ws) and an SSE mode for REST clients.

## 5. Federation & Composition

- **Mercurius Federation**: register `mercurius`, enable `federationMetadata`. Each service exposes `@key` fields; a gateway (Apollo Router or Mercurius gateway service) composes the supergraph.
- `resolveReference(reference)` required for entities (`User` referenced by `id`).
- Run `graphql` vi the **gateway** mode for a composed schema.

## 6. Error & Plugins

- Use Fastify plugins for logging (`fastify.log.info`), auth hooks, rate limiting.
- Error handling: wrap resolvers; Mercurius exposes `onError` hook for mutation or per-run formatting.
- Disable IDE in prod (`ide: false`); add CSRF/`rootValue` protections.

## 7. Common Pitfalls

- Forgetting `loaders` config → N+1 resolver storms on lists.
- Async resolver violating single-instance pubsub (Redis adapter needed in multi-node).
- Not decorating context in a Fastify-friendly way (decorate + expose instance).
- Not enabling `federationMetadata` before adding `@key` types.

## General Rules of Thumb

- Use Mercurius `loaders` for any list field to eliminate N+1.
- Pair subscriptions with Redis pubsub for horizontal scale.
- Keep Fastify life-cycle details in hooks; log everything through Fastify logger.
- Register once; reuse decorators for context, caching.

## Quick-Start Checklist

- [ ] `npm i fastify mercurius graphql`.
- [ ] Register with schema (SDL/file) + resolvers + context decoration.
- [ ] Add loaders for list-heavy fields; test N+1 gone via logging.
- [ ] Add subscriptions with a scalable pubsub (Redis for multi-instance).
- [ ] Enable federation if multi-service; define `@key` + `resolveReference`.
- [ ] Set `ide: false` in prod; add auth via hooks.
- [ ] Instrument request logging & tracing (Fastify logger / OpenTelemetry).