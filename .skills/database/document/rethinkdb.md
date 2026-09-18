---
name: rethinkdb
description: RethinkDB — real-time JSON document database with ReQL query language and push-based change feeds forwarded to clients.
---

RethinkDB is a **JSON document database that pushes real-time updates to applications**, using the expressive **ReQL** query language and a JS/JSON-friendly data model. Its superpower is **changefeeds** for live-updating UIs without polling.

## 1. Core Concepts

- **Tables** hold JSON documents; documents are like rows with flexible schemas.
- **Databases** group tables; each table can be sharded and replicated per shard.
- **ReQL** is a fluent, chainable query language available in first-class drivers (JS, Python, Java, Ruby) — queries are composed programmatically, not as strings.
- **Changefeeds** allow subscribing to inserts/updates/deletes/validation results on a table or query result.
- Secondary indexes accelerate queries; primary index is by document `id`.

## 2. ReQL Essentials

- Chain operations: `table('users').filter({active: true}).pluck('name', 'email')`.
- Aggregations and grouping: `.group(...).count()`, `.sum(...)`, `.orderBy(...)`.
- Joins and data modeling: use compound secondary indexes (`index: [field1, field2]`) for efficient lookups.
- Range scans: `between(...)` with `index` parameter to avoid table scans.
- Write operations: `.insert`, `.update`, `.replace`, `.delete` with `conflict` policy (`'replace'`/`'update'`/`'error'`), and `durability` (`'hard'` default vs `'soft'`).

## 3. Secondary Indexes and Performance

- Add indexes via `table.indexCreate('field')`; drop unused indexes.
- Compound and multi indexes for common query shapes.
- **Avoid table scans** for predicates: always prefer a secondary index by adding `index: ...` to `filter`/`between`.
- The optimizer (`explain`) reveals query plans — use it to verify index usage.
- Changefeeds add overhead per query; batch frequent changes with `includeInitial` and `squash` intervals.

## 4. Changefeeds and Real-Time Model

- Subscribe like `table('chat').changes()`; pass `includeInitial: true` to seed state.
- Use `squash: true` or an integer interval (ms) to coalesce bursts of writes.
- Filter changefeeds to reduce payload: `changes().filter(...)` on the change object.
- For complex projections, compose changefeeds on a query, but keep the base query indexable.
- Maintain a client-side store (state) that applies change events to stay consistent.

## 5. Operations and Architecture

- Clustered deployment with **shard per table**, optionally replicated (`replicas: 2`).
- Table metadata on the cluster; use the web admin or driver for reconfigurations.
- **Memory & disk**: RethinkDB stores all data/working set in RAM; provision memory for the working set and tune `cache-size`.
- Unscheduled reads return backpressure to the client (`RethinkDBTimeoutError`) — design queries with limits (`limit()`, `maxBatchRows`) and use `no_reply` for fire-and-forget writes.
- Avoid blocking CPU-heavy reduce functions; prefer aggregation at the DB level.

## 6. Common Pitfalls

- Using changefeeds on full-table scans — filter early and index the feed's base query.
- Relying on table scans for predicates and seeing latency grow linearly.
- Treating updates as full-document replace (`.update` vs `.replace`).
- Hard durability for every download/upload burst without batching.

## General Rules of Thumb

- Design for real-time first: shapeless JSON with a `created_at`/`updated_at` timestamp for discovery.
- Index the filter/access patterns, not everything.
- Batch and `squash` changefeeds; never push per-event UI updates that overwhelm the client.
- Prefer sharding at table creation over post-hoc rebalancing to avoid heavy data movement.

## Quick-Start Checklist

- [ ] Set up driver SDK and connect with `r.connect` (persistent pool).
- [ ] Define tables, sharding, and secondary/compound indexes.
- [ ] Validate hot queries with `explain()` and check index usage.
- [ ] Implement changefeeds with `includeInitial`, `squash`, and a client store.
- [ ] Choose durability & conflict policies per write path.
- [ ] Provision RAM sized to the working set; monitor cache and RAM.
- [ ] Add monitoring for query latency, feed lag, and table sizes.