# Implementation notes

Focused reference for **mongodb**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
