# Overview

Focused reference for **couchdb**, excerpted from SKILL.md. The skill file remains the canonical guide.

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

```bash
# optimistic concurrency: create, then always send _rev back on update
curl -sS -X PUT "$CB/orders" -H 'Content-Type: application/json' \
  -d '{"_id":"order:1001","status":"pending","total":99.00}'

REV=$(curl -sS "$CB/orders/order:1001" | jq -r ._rev)

curl -sS -X PUT "$CB/orders/order:1001" -H 'Content-Type: application/json' \
  -H "If-Match: $REV" \
  -d "{\"_rev\":\"$REV\",\"status\":\"paid\",\"total\":99.00}"
```

```bash
services:
  couchdb:
    image: couchdb:3.5 # pin a stable version for reproducibility
    ports:
      - "5984:5984"
    environment:
      COUCHDB_USER: admin
      COUCHDB_PASSWORD: StrongPassword123!
    volumes:
      - couchdb_data:/opt/couchdb/data
```

Runnable: `examples/docker/compose/databases/documental/couchdb/docker-compose.yaml`

- Authentication: `Basic`, `JWT`, or `Cookie` (session) vs. `PW` / `Local` (DB setup). Use `_users` DB for `_design` docs? (Create dedicated users.)
- Use `ETag`/If-Match and `_rev` to implement optimistic concurrency: always send `_rev` on update; a `409 Conflict` means a revision mismatch.
- Bulk operations: `_bulk_docs` with `all_or_nothing`; transactions not supported — use independent documents.

## 3. Views and Indexes

- **Design documents** (`_design/*`) contain view functions; they run against a snapshot of the database (B-tree) and are rebuilt lazily via the `_view` endpoints.
- Map function: `emit(key, value)`; reduce optional: `sum`, `count`, or custom.
- For range lookups pass `startkey`/`endkey`, `include_docs=true`.
- Mango (Query Server) indexes (`_index`) provide `$eq`, `$gt`, `$regex`-style selectors; create via `_index` endpoint.
- Prefer views over full scan for hot paths; sparse views (only emit needed docs) reduce index size.

```javascript
// sparse view: only emit for documents that actually matter to this query
function ordersByCustomer(doc) {
  if (doc.type !== 'order' || !doc.customerId) return null; // no emit = not indexed
  emit([doc.customerId, doc.createdAt], {
    total: doc.total,
    status: doc.status,
  });
}
```
