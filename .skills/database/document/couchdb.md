---
name: couchdb
description: CouchDB — source-first JSON document database with HTTP API, multi-master replication, and map/reduce views.
---

CouchDB is a **JSON document database with a pure HTTP API**, built around **master-master replication** and an **MVCC** document model designed for offline-friendly, fault-tolerant applications.

## 1. Core Concepts

- **Documents** are JSON objects stored under a unique `_id` with a `_rev` (revision) token.
- **Databases** are collections of documents; views/indexes are per-database.
- **Replication** synchronizes databases between nodes or clients continuously or on demand.
- **MVCC**: document revisions are immutable; conflicts are resolved by application merge logic or by picking the latest valid revision.
- **Query via views**, defined as map/reduce functions written in JavaScript. Live listing with `_changes` and filtering with `_selector` (Mango).

## 2. Access via HTTP

- REST API: `GET/PUT/POST/DELETE /db/{docid}`.
- Maintenance: `GET /_all_dbs`, `_changes` feed, `_compact`, `_replicate`.
- Authentication: `Basic`, `JWT`, or `Cookie` (session) vs. `PW` / `Local` (DB setup). Use `_users` DB for `_design` docs? (Create dedicated users.)
- Use `ETag`/If-Match and `_rev` to implement optimistic concurrency: always send `_rev` on update; a `409 Conflict` means a revision mismatch.
- Bulk operations: `_bulk_docs` with `all_or_nothing`; transactions not supported — use independent documents.

## 3. Views and Indexes

- **Design documents** (`_design/*`) contain view functions; they run against a snapshot of the database (B-tree) and are rebuilt lazily via the `_view` endpoints.
- Map function: `emit(key, value)`; reduce optional: `sum`, `count`, or custom.
- For range lookups pass `startkey`/`endkey`, `include_docs=true`.
- Mango (Query Server) indexes (`_index`) provide `$eq`, `$gt`, `$regex`-style selectors; create via `_index` endpoint.
- Prefer views over full scan for hot paths; sparse views (only emit needed docs) reduce index size.

## 4. Conflicts and Replication

- Replication is asynchronous; each node can have different revision trees.
- **Conflicts** appear as `_conflicts` in a document; resolve by updating the base revision with merged content.
- Replicated conflicts must be resolved client-side; design the app to tolerate eventual consistency.
- Use filtered replication with `_selector`/filter functions to replicate subsets (e.g., per-user).

## 5. Operational Practices

- Run at least 3 nodes; use the cluster module (Paxos-based) for automatic sharding.
- Compact databases and views periodically: `_compact` and `_view_cleanup` release disk (tombstone overhead).
- Monitor via `_stats`, `_active_tasks`, Prometheus (`/ _metrics`).
- Store attachments either inline or in a separate blob store — attachments bloat replication and compaction.
- Backup via replication to a separate CouchDB instance or the snapshot tooling (e.g., `couchdb-dumps`).

## 6. Common Pitfalls

- Ignoring `_rev` and generating 409 conflicts — always marshal from latest revision.
- Building views that emit for every document — this creates huge indexes and slows replication.
- Using CouchDB as a relational DB with joins and transactions.
- Letting attachment blobs clog the database — prefer external storage or large `_attachment` limits.
- Not resolving conflicts: they silently accumulate and can cause data inconsistency.

## General Rules of Thumb

- Design for **eventual consistency and conflict resolution** first; CouchDB is intentionally final-less.
- Use views for stable, well-defined queries; use Mango for ad-hoc/exploratory filtering.
- Keep documents small and coarse-grained — one JSON document per business entity, not per field.
- Monitor compaction and tombstone growth; schedule compaction off-peak.

## Quick-Start Checklist

- [ ] Chose your transport: HTTP API or SDK (e.g., `pouchdb`, `couchbase` SDK, `nano`).
- [ ] Set up authentication (users DB, JWT/scoped users) and CORS allowances.
- [ ] Design documents with unique `_id`s and a revision-merge strategy.
- [ ] Add views/Mango indexes only for actual lookup patterns.
- [ ] Configure replication topology (master-master, filtered) with conflict handling.
- [ ] Plan compaction schedule and backup replication strategy.
- [ ] Enable monitoring for replication lag, disk usage, and tombstone overhead.
- [ ] Test offline behavior and synchronous merge paths before shipping.