---
name: dgraph
description: Dgraph — distributed graph database with native GraphQL and DQL query support, built on a transactional key-value store.
---

Dgraph is a **distributed, horizontally scalable graph database** that exposes **native GraphQL** (and its own DQL), backed by a transactional key-value store and a query planner optimized for large graph traversals.

## 1. Core Concepts

- Data is stored as **triples**: subject → predicate → object, forming a native graph without a separate schema layer.
- **GraphQL** is the recommended query/mutation interface; DQL is the lower-level native language.
- **Schema** is defined via GraphQL SDL or DQL `schema{}`; indexes are declared in the schema, not inferred.
- **Transactions**: Dgraph supports optimistic ACID transactions (`@upsert` for edge upserts) — use `@id` for GraphQL to enable upsertable unique fields.
- **Alpha and Zero** processes: Zero manages the cluster metadata and transactions; Alpha holds the data shards.

## 2. GraphQL Usage

- Define types with fields and directives: `@id` for unique fields, `@index(trigram, hash)` for filterable fields.
- Query shapes mirror GraphQL; Dgraph auto-generates resolvers for `filter`, `order`, `first`/`offset`.
- Mutations: `add`, `update`, `delete` with nested mutation support.
- Use `@cascade` to return only fully-joined results; combine with `filter` for required-relations.

## 3. DQL (Native Query Language)

- DQL is JSON-like and closer to the data model: `query { user(func: eq(name, "Alice")) { name friends { name } } }`.
- Supports filters, pagination, sorting, and deep traversals with `@recurse(depth: N)`.
- Use `has()` for existence checks, `uid()` for specific nodes.
- DQL is useful for advanced graph patterns where GraphQL's type-centric model becomes limiting.

## 4. Schema and Indexing

- Indexes: `@index(hash)`, `@index(exact)`, `@index(trigram)`, `@index(term)`, `@index(fulltext)`.
- Choose the index by query pattern: `hash` for exact equality, `trigram` for substring/regex, `term` for word-based search, `fulltext` for search.
- Define `@reverse` on edges you traverse both ways.
- Use `@count` for predicates that appear frequently in aggregation queries.

## 5. Operations and Architecture

- Deploy as a cluster: `dgraph-ratel` for the UI, `dgraph zero` for metadata, `dgraph alpha` for data.
- Horizontal scale via `--shards N` and `--replicas R`; data is split across Alpha groups.
- Bulk-loading: use `dgraph live` or `bulk` to load from RDF/JSON/RDF-Quad files; for production, use `bulk` to pre-split, then `live`.
- Backups: `dgraph backup` to S3/GCS/local; restore with `dgraph restore`.
- Memory: tune `--cache_size_mb` on Alpha for query performance; provide enough RAM for hot data.

## 6. Common Pitfalls

- Not declaring indexes in the schema, then wondering why filters do a full scan.
- Over-fetching nested data with deep traversals; add pagination/limits.
- Using DQL where GraphQL suffices — GraphQL is more constrained and easier to maintain.
- Forgetting `@cascade` when you need strict join semantics.
- Ignoring `@upsert` and getting duplicate edges under concurrent mutations.

## General Rules of Thumb

- Start with GraphQL for CRUD; drop to DQL only for complex traversals.
- Define indexes and `@reverse` before production loads.
- Use `@upsert` with `@id` for idempotent creation and update patterns.
- Paginate aggressively in traversals — limit `first`/`offset`.

## Quick-Start Checklist

- [ ] Design the GraphQL schema with `@id`, `@index`, and `@reverse` directives.
- [ ] Use `dgraph live` or `bulk` for initial load; shard for production.
- [ ] Validate query plans with `EXPLAIN` in DQL or query metrics in the UI.
- [ ] Tune `--cache_size_mb` and provision RAM for the working set.
- [ ] Configure backup schedule (S3/GCS/local) and test restore.
- [ ] Monitor latency, rejected transactions, and memory usage.
- [ ] Use `@upsert` for idempotent writes under concurrency.