# Hono.js Backend Best Practices: Starter Template

A reusable starting point derived from the **2. App & Route Structure** section of [Hono.js Backend Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
