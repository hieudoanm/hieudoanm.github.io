---
name: graphql
description: GraphQL — query language and runtime for APIs that lets clients request exactly the data they need through a typed schema.
---

GraphQL is a **query language for APIs and a server-side runtime**. Clients request **exactly the fields they need** through a **single typed schema**, replacing chatty REST round-trips with a powerful, evolvable contract.

## 1. Core Concepts

- **Schema**: the contract — types, fields, and relationships, written in SDL (Schema Definition Language).
- **Resolver**: server function per field that returns data for that field, with types enforced by the framework.
- **Query / Mutation / Subscription**: three root operation types.
- **No over/under-fetching**: response mirrors the requested shape.
- **Introspection**: clients and tools can query the schema itself for autocomplete/documentation.

## 2. Schema Design

- Compose types, `interface`, `union`, enums, inputs, and scalars.
- Strong typing — each field has a type; nullable vs non-null (`String!`) encodes contract rigor.
- Use **_id / Global Object Identification** convention where useful (Relay spec) for consistent caching and refetching.
- Versioning: evolve instead of version — deprecate with `@deprecated(reason:)` rather than shipping v2 schemas.
- Naming: fields are camelCase by convention; mutations as verbs (`createUser`).

## 3. Queries and Mutations

- Query example: `{ user(id: 1) { name email posts { title } } }`.
- Mutations are designed with an **input and output pattern**: `mutation { createUser(input: {...}) { user { id name } } }`.
- **Arguments** everywhere: filtering, pagination via `first`/`after` (cursor-based) or `offset`/`limit`.
- **Connections** (Relay) standardize pagination with edges/nodes/pageInfo.
- **Null propagation**: a non-null field error bubbles to the nearest nullable ancestor.

## 4. Performance

- **N+1 problem**: resolvers that fire one DB query per parent row — solve with **DataLoader** (batching + caching per request) or joins in single resolvers.
- **Batching**: DataLoader `loader.load(key)` coalesces concurrent loads per tick.
- Cost/limiting: guard against expensive queries (depth, alias-count, complexity limits) before abuse.
- Use **persisted queries** for high-traffic clients and to reduce HTTP payload.

## 5. Architectures

- **GraphQL Gateway / Federation**: compose multiple microservices into one graph (Apollo Federation, Mercurius Federation).
- **Monolith-graph**: single server serving the whole schema, simplest to start.
- **Subscriptions**: real-time via WebSocket (`graphql-ws`) or SSE; keep them lightweight.
- Tooling: **GraphiQL/Playground**, **GraphQL Code Generator**, IDE plugins (Apollo/Bazaarvoice).

## 6. Common Pitfalls

- Resolver N+1 without batching — the performance cliff.
- Non-null fields propagated on a fragile upstream, causing cascading query failures.
- No limits on depth/aliases, enabling denial-of-service via query cost.
- Schema stubs with no real types: always design the contract first.
- Mutating inside a `Query` field — keep read/write separation.

## General Rules of Thumb

- Design graph-first around the client's data requirements, not the storage model.
- Use `interface`/unions judiciously; prefer concrete types when possible.
- Always add pagination and cursor strategies for lists.
- Centralize resolvers' data access behind loaders to avoid N+1.
- Add query-cost analysis and persisted queries in production.

## Quick-Start Checklist

- [ ] Design the typed schema (SDL) with queries, mutations, subscriptions as needed.
- [ ] Pick a server: Apollo Server, Mercurius (Fastify), graphql-yoga, graphql-go.
- [ ] Implement resolvers with DataLoader-style batching; avoid N+1.
- [ ] Add validation/limits: depth, aliases, complexity; enable persisted queries for prod.
- [ ] Add pagination (Relay connections recommended) for all list fields.
- [ ] Set up codegen and client caching (Apollo/URQL) — deterministic keys.
- [ ] Instrument per-resolver timing; monitor slow fields.
- [ ] Evangelize schema evolution over versioning.