---
name: mercurius
description: Mercurius — high-performance GraphQL adapter for Fastify, with schema, loaders, subscriptions, and federation support.
---

Mercurius is a **GraphQL adapter for Fastify** (by Matteo Collina et al.) — fast (uses Fastify's serializer), **schema-based, with loaders, subscriptions, and Apollo Federation v1/v2 support**.

## 1. Setup

- Deps: `fastify`, `mercurius`, `graphql`.
- Register: `fastify.register(mercurius, { schema, resolvers })` (or from files with `schema: './schema.gql'` + `resolvers`).
- Manual route: `POST /graphql` default; configure `path` and `ide` for GraphiQL in dev.
- Serve via `app.get('/status', ...)` separately; keep health endpoint outside GraphQL.

## 2. Schema & Resolvers

- **Schema** can be SDL string, file, or `buildSchema` programmatically.
- **Resolvers** map: `{ Query: { users: async () => [...] } }`.
- Fast path `fastify.graphql(query, variables)` for direct in-route calls.
- Context: build a Fastify-native hook (`onRequest`) to inject `app.decorate('graphqlContext')` for auth, DB access.

## 3. Loaders (Mercurius DataLoaders)

- Use **`loaders`** option: `{ User: { posts: async (queries, context) => batchLoad(...) } }` per type-field.
- Loaders **batch + dedupe** per request group (like DataLoader), killing N+1.
- Return arrays matching the queries' `obj` order; handle edge cases (empty queries, nulls).
- Combine with a database `WHERE IN (...)` single round trip.

## 4. Subscriptions

- Enable `{ subscriptions: true }`; use `subscribe` + `onSubscribe` for auth.
- Define `Subscription` type with `subscribe: ...` returning AsyncIterator (e.g., `pubSub`).
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