# 2. FQL Query Syntax

Focused reference for **fauna**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. FQL Query Syntax

- Reads: `doc = DocumentWithVersion("product/123")`, `table.all()` vs `table.byId(id)`.
- Writes: `fql` `create`, `update`, and `delete` ops; batch with `compose`, `do`, or `map` for multiple ops.
- Query composition: use `map`, `filter`, `reduce`, `sort`, `first`, `select` on collections.
- Conditional logic: `If`, `Let`.
- Transactions: Fauna supports multi-document ACID transactions via FQL transactions and eventual consistency between query steps.

```javascript
import { Client, Field, FQL } from 'fauna-js';

const client = new Client({
  secret: process.env.FAUNA_SECRET,
});

// point read by id, then a scoped, indexed collection read
const order = await client.query(FQL`
  Order.byId("ord_1001").select({ id, status, total })
`);
```

```javascript
// multi-document write in one ACID transaction — no partial state
await client.query(FQL`
  let order = Order.create({
    customer: Customer.byId("cus_42"),
    total: 99.00,
    status: "pending"
  });

  Customer.byId("cus_42").update({
    orderCount: Field.increment(1)
  });

  return order;
`);
```
