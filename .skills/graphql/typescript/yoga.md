---
name: yoga
description: GraphQL Yoga — batteries-included, framework-agnostic GraphQL server for TypeScript, with subscriptions, file uploads, and plugins.
---

GraphQL Yoga (by The Guild, formerly `graphql-yoga`) is a **batteries-included GraphQL server** for Node/Edge environments. It is framework-agnostic, ships **SSE/WebSocket subscriptions, file uploads, and a powerful plugin system**, and pairs perfectly with tools like Envelop, Codegen, and GraphQL Tools.

## 1. Core Concepts

- **`createSchema`** (from `@graphql-tools/schema`) + **`createYoga`** to build a server with SDL + resolvers.
- Plugin architecture built on **Envelop** — hooks for every stage: `onParse`, `onValidate`, `onExecute`, `onSubscribe`, `onError`.
- Universal runtime: works in Node (Express/Fastify/Hono or standalone) and on Edge (Cloudflare Workers, Vercel).
- Supports **GraphQL over HTTP, WebSocket, and SSE** out of the box.

## 2. Setup

- Deps: `graphql-yoga`, `graphql`, `@graphql-tools/schema` (optional but recommended).
- Standalone: `const yoga = createYoga({ schema, graphiql: true }); Bun.serve({ fetch: yoga })` or Node `createServer`.
- With Express: `app.use('/graphql', yoga)`.
- Change path with `graphqlEndpoint`.

## 3. Schema & Resolvers

- Use `createSchema({ typeDefs, resolvers })` for schema-first; or `GraphQLSchema` directly.
- Resolvers: plain JS/TS objects; async anywhere; args/context injected.
- Context: build from `context: async ({ request, params }) => ({ user, loaders })`.
- Add middleware via plugins: `useLogger`, `useTiming`, `useAuth`, `useResponseCache`, `useGraphiQL`.

## 4. Subscriptions

- Add `Subscription` root type with `subscribe` returning an `AsyncIterable` (use `PubSub` from `graphql-yoga` or `graphql-subscriptions`).
- Yoga exposes WS and SSE during runtime; configure `subscriptions: { path, ... }`.
- For multi-instance, wire pubsub to Redis (`graphql-redis-subscriptions` or custom async iterator).

## 5. File Uploads

- Built-in multipart support for `GraphQLUpload` scalars.
- Declare the scalar: `scalar Upload`; resolver arg receives `File` objects wrapped in `FileUp` helpers.

## 6. Performance & Caching

- Use `useResponseCache` plugin (automatic) for GET-side caching.
- Enable persisted queries: `usePersistedOperations`.
- Compose with `@graphql-tools/stitching`/`merge` for modular schemas.

## 7. Common Pitfalls

- Using `graphql-yoga` v2 API with v3 (access `yoga.fetch`/`yoga.handleRequest` instead of legacy `handleRequest` in newer major versions).
- Forgetting subscriptions' async iterator errors are swallowed without logging.
- Uploads hitting default body size limits without configuring body size in the HTTP layer.
- Mixing SSE and WS semantics without knowing the client supports them.

## General Rules of Thumb

- Use `createSchema` for type-safe SDL + resolvers; leverage Envelop plugins.
- Prefer SSE for simple clients, WS for real-time both-ways.
- Keep context creation cheap (per request).
- Enable `graphiql: true` only in dev; gate production endpoints.

## Quick-Start Checklist

- [ ] `npm i graphql-yoga graphql @graphql-tools/schema`.
- [ ] `createSchema(typeDefs, resolvers)` + `createYoga({ schema, context })`.
- [ ] Serve standalone or integrate with Express/Fastify/Hono.
- [ ] Add subscriptions with PubSub + Redis for scale.
- [ ] Add `useResponseCache`, persisted queries for performance.
- [ ] Configure file uploads (`Upload` scalar + body size).
- [ ] Add auth/logging/timing plugins (Envelop).
- [ ] Gate GraphiQL in production.