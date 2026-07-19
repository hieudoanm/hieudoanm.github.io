# 2. ReQL Essentials

Focused reference for **rethinkdb**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. ReQL Essentials

- Chain operations: `table('users').filter({active: true}).pluck('name', 'email')`.
- Aggregations and grouping: `.group(...).count()`, `.sum(...)`, `.orderBy(...)`.
- Joins and data modeling: use compound secondary indexes (`index: [field1, field2]`) for efficient lookups.
- Range scans: `between(...)` with `index` parameter to avoid table scans.
- Write operations: `.insert`, `.update`, `.replace`, `.delete` with `conflict` policy (`'replace'`/`'update'`/`'error'`), and `durability` (`'hard'` default vs `'soft'`).

```javascript
const conn = r.connect({ host: 'db', port: 28015 });

// compound index => ordered range scan, no table scan
const recent = await conn
  .table('orders')
  .between(
    { left: 'cus_42', right: r.minval },
    { left: 'cus_42', right: r.maxval },
    { index: 'customer_created' }
  )
  .orderBy({ index: 'customer_created' })
  .filter(r.row('status').eq('paid'))
  .pluck('id', 'total', 'created_at')
  .limit(50);
```
