---
name: fauna
description: Fauna — distributed multi-model database with relational query surface, temporal logs, and a graph-compatible API.
---

Fauna is a **serverless, distributed, multi-model database** offering **relational real-time consistency** with a **FQL (Fauna Query Language)** surface, temporal queries, and GraphQL compatibility, managed via a global API.

## 1. Core Concepts

- **Tables** hold documents; each document has a unique `ref`, a schema-driven shape, and automatic timestamps/versions.
- **FQL is the primary query language**: chaining structured operations with an elegant, C#-like syntax.
- **Temporal database**: every document keeps its full history via *time travel* — you can query any point in the past.
- **Consistency**: Fauna provides strong (linearizable) consistency for single-document reads/writes by default.
- **Serverless**: no server provisioning, auto-scaling, pay-per-query pricing model.

## 2. FQL Query Syntax

- Reads: `doc = DocumentWithVersion("product/123")`, `table.all()` vs `table.byId(id)`.
- Writes: `fql` `create`, `update`, and `delete` ops; batch with `compose`, `do`, or `map` for multiple ops.
- Query composition: use `map`, `filter`, `reduce`, `sort`, `first`, `select` on collections.
- Conditional logic: `If`, `Let`.
- Transactions: Fauna supports multi-document ACID transactions via FQL transactions and eventual consistency between query steps.

## 3. Data Modeling and Indexes

- **Indexes**: keep secondary lookups fast — create an index on the fields you query by (e.g., `by_user`, `by_status_created_at`).
- Model **relationships** explicitly using the document graph (like edges) rather than keeping arrays of ids awkwardly.
- Use **schemas** to validate shapes and create *freeform* or *schema* (strict) document definitions.
- **Temporal**: store the `ts` (timestamp) and version; use `DocumentVersion` / `Snapshot` to retrieve history.

## 4. Authorization

- Fauna has a role-based access control with **role documents** and built-in **JWT** client auth.
- Create collections then roles; attach *privileges* per collection/database.
- External signup/auth: Fauna has integrations; or wire your own JWT provider.

## 5. Operations and Deployment

- It is a managed service — no installation; use the web dashboard or CLI (`fauna` npm).
- Driver: official `fauna-js` (ESM, `FQL`, or legacy `fql-lite`).
- Deploy code with `fauna`/`fauna shell`; use respitory connection via the dashboard env vars.
- Backups: Fauna has automatic rollback/windowing; configure retention settings.

## 6. Common Pitfalls

- Using FQL like SQL with implicit JOINs on every document → documented read amplification.
- Indexing everything—individual index cost and schema drift.
- Forgetting temporal reads — you might overwrite a value and lose history if access is restricted.
- Building complex relational joins when a document-shaped graph fits better.
- Not understanding the pricing model (queries measured per read + compute units).

## General Rules of Thumb

- Use FQL's built-in document graph for relationships, not table-based joins.
- Design query-shaped indexes up-front; add only what queries need.
- Prefer strong consistency by default; relax only with measured need.
- Keep mutations transactional-atomic in the same query for multi-document invariants.

## Quick-Start Checklist

- [ ] Set up Fauna environment + npm driver (`@fauna/fauna-js`).
- [ ] Model collections and indexes around core queries.
- [ ] Design auth roles/privileges and client auth flow.
- [ ] Use FQL transactions for multi-document updates.
- [ ] Configure temporal retention and snapshot usage where relevant.
- [ ] Monitor query costs in dashboard; set budgets.
- [ ] Test serverless behavior relative to latency/consistency expectations.