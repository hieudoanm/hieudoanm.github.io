# Hono.js Backend Best Practices: 2. App & Route Structure

## Source guidance

This example applies the **2. App & Route Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`c.req.param()`/`c.req.query()` return strings; validate before trusting** (see §4).
- **Nest routers via `app.route("/api/v1", api)`** — namespacing without string-concatenating early; per-resource `new Hono()` subtypes keep route definitions grouped.
- **`c.json()/c.text()/c.html()` helpers return `Response`s** — the handler contract is "return a Response"; no `res` mutation anywhere.
- **Export the `app` (not a started server)** so adapters and tests (`app.request()`) share one unit.

## Example

This excerpt is from the cited **2. App & Route Structure** section.

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for hono-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
