# Fauna: Starter Template

A reusable starting point derived from the **2. FQL Query Syntax** section of [Fauna](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
