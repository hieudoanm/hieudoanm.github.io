# Workflow notes

Focused reference for **couchdb**, excerpted from SKILL.md. The skill file remains the canonical guide.

```bash
# range read over the view: one customer, all their orders
curl -sS -G "$CB/orders/_design/orders/_view/by-customer" \
  --data-urlencode 'group=true' \
  --data-urlencode 'startkey=["cus_42"]' \
  --data-urlencode 'endkey=["cus_42",{}]' \
  --data-urlencode 'include_docs=true'
```

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
