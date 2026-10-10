# Fastify.js Backend Best Practices: 8. Testing

## Source guidance

This example applies the **8. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`app.inject()`** — in-process, zero-network request testing (Fastify's built-in equivalent of supertest):
- **Build the app via a factory `buildApp()`** (register plugins, no `listen`) and `inject` after `await app.ready()` — the app object is the test fixture.
- **Assert the schema-invalid cases** (400 with issues), the 404 path, and that `response` schemas hold — the contract is your test spec.
- **Isolated services** — in-memory SQLite/test DB per suite; mock external HTTP at the boundary.

## Example

```ts
const res = await app.inject({
  method: 'POST',
  url: '/api/v1/users',
  payload: { name: 'Ada', email: 'ada@x.io' },
});
expect(res.statusCode).toBe(201);
expect(res.json().email).toBe('ada@x.io');
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for fastify-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
