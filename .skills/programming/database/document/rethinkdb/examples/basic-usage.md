# rethinkdb: Basic Usage

RethinkDB — real-time JSON document database with ReQL query language and push-based change feeds forwarded to clients.

## Scenario

Use this example as a starting point when applying **rethinkdb** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. ReQL Essentials** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
