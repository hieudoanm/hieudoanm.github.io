# fauna: Basic Usage

Fauna — distributed multi-model database with relational query surface, temporal logs, and a graph-compatible API.

## Scenario

Use this example as a starting point when applying **fauna** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. FQL Query Syntax** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
