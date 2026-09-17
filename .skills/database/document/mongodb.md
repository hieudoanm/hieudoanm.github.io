---
name: mongodb
description: Best practices for schema design and operations with MongoDB. Use when modeling documents, choosing embed vs reference, designing indexes, building aggregation pipelines, or preparing for scale — treats MongoDB as a schema-designed document database, not schemaless storage.
---

# MongoDB Best Practices

MongoDB is a document database whose performance hinges on **schema design**, not SQL-style normalization. Best practice is designing documents around **query patterns**: embed for one-to-few, reference for fan-outs, index deliberately, never scan collections, and plan shard keys before scaling.

---

## 1. Core Stack & Constraints

- MongoDB **6+**
- **Design schema before writing queries**
- **Avoid unbounded document growth** and deeply nested arrays
- Avoid documents approaching the **16MB size limit**
- **Always define indexes intentionally**; no collection scans in production
- Avoid **dynamic field names** unless required; avoid `$where`/server-side JS
- Use **transactions only when truly needed** (single-document ops are atomic)
- Treat **ObjectId usage deliberately** (id-sortable but reveals timing)

```js
// Embed for one-to-few; reference for many-to-many / large fan-outs
{
  _id: ObjectId("..."),
  user: "alice",
  addresses: [{ type: "home", street: "..." }], // embedded
  orderIds: [ObjectId("...")]                   // referenced
}
```

---

## 2. Data Modeling & Architecture

- Model data around **query patterns**, not entities
- **Prefer embedding for one-to-few** relationships; **referencing for many-to-many or large fan-outs**
- Keep documents **self-contained** when possible; avoid `$lookup` unless justified
- Design for **read performance first**
- **Version document schemas explicitly**; use soft deletes intentionally
- Avoid **polymorphic documents** unless well-documented

---

## 3. Security & Data Integrity

- **Never expose MongoDB directly to the public internet**
- Enable **authentication + role-based access control**; least-privilege users
- **Validate data at the application layer**; consider **schema validation (`$jsonSchema`)**
- Encrypt sensitive fields if required
- Be explicit about **consistency and durability expectations** (write concern, read concern)

```js
db.runCommand({
  collMod: 'orders',
  validator: {
    $jsonSchema: { bsonType: 'object', required: ['_id', 'total'] },
  },
});
```

---

## 4. Reliability & Performance

- **Index all frequently queried fields**; understand index selectivity
- Monitor **slow queries and query plans** (`db.currentOp`, profiler)
- **Avoid N+1 query patterns** (batch reads, aggregation)
- Use **safe pagination** — bounded `skip` or stable keys, not unbounded skips
- **Plan shard keys before scaling** (high-cardinality, evenly distributed, no monotonic hotspot)
- Test aggregation pipelines with **realistic data volumes**

---

## 5. General Rules of Thumb

- **Schema first, queries second** — design is the product, not an afterthought
- **Embed or reference by access pattern**, not purity
- **Indexes are mandatory** — production reads must not scan
- **Scale is designed in** — shard keys and document size decided upfront

---

## Quick-Start Checklist

- [ ] Schema designed from query patterns before code
- [ ] Embed vs reference chosen by cardinality/access; documents bounded
- [ ] No unbounded document growth; `$lookup`/nested arrays used deliberately
- [ ] Indexes on all hot query fields; no production collection scans
- [ ] Pagination safe (bounded skip/search-after); no N+1
- [ ] Shard key planned before scaling; no monotonic hotspots
- [ ] Auth/RBAC enabled; db not internet-exposed; input validated app-side
- [ ] Aggregation tested with production-like volumes; write/read concerns explicit
