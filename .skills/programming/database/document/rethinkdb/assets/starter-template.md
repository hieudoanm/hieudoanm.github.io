# Rethinkdb: Starter Template

A reusable starting point derived from the **2. ReQL Essentials** section of [Rethinkdb](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
