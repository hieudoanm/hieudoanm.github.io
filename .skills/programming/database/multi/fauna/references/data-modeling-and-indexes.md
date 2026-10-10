# 3. Data Modeling and Indexes

Focused reference for **fauna**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Data Modeling and Indexes

- **Indexes**: keep secondary lookups fast — create an index on the fields you query by (e.g., `by_user`, `by_status_created_at`).
- Model **relationships** explicitly using the document graph (like edges) rather than keeping arrays of ids awkwardly.
- Use **schemas** to validate shapes and create _freeform_ or _schema_ (strict) document definitions.
- **Temporal**: store the `ts` (timestamp) and version; use `DocumentVersion` / `Snapshot` to retrieve history.

```javascript
// relationships are explicit document refs — walk the graph, do not join
const orders = await client.query(FQL`
  Order.sorted()
    .filter(.customer.id == "cus_42" && .status == "paid")
    .take(20)
    .select({ id, total, ts })
`);
```
