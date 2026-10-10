# Hono.js Backend Best Practices: Basic Usage

Best practices for building HTTP APIs and edge-capable web services with Hono (TypeScript). Use when creating, structuring, or reviewing a Hono app — covers middleware, typed routes, validation, adapters, error handling, and testing across server runtimes.

## Scenario

Use this example as a starting point when applying **hono-backend** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. App & Route Structure** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => c.text('hello'));
app.get('/users/:id', (c) => c.json({ id: c.req.param('id') }));

const api = new Hono();
api.post('/users', validate('json', userCreateSchema), async (c) => {
  const input = c.req.valid('json');
  return c.json(await createUser(input), 201);
});
app.route('/api/v1', api);

export default app; // adapters import `app` and serve it
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
