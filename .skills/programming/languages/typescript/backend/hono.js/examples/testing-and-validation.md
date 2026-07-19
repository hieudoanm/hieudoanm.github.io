# Hono.js Backend Best Practices: 8. Testing

## Source guidance

This example applies the **8. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`app.request()`** — in-process, fetch-shaped, no network:
- **Test the contract across adapters** — `app.request` exercises middlewares/handlers; a pair of adapter-level tests (Bun/Node serve) verify the deployment wiring.
- **Validation + error paths asserted** — 400-on-bad-body, 404 via `notFound`, and the `onError` envelope for a forced 500.
- **Isolate services** (in-memory DB, mocked outbound) so tests are fast and deterministic.

## Example

```ts
const res = await app.request('/api/v1/users', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ name: 'Ada', email: 'ada@x.io' }),
});
expect(res.status).toBe(201);
expect(await res.json()).toMatchObject({ email: 'ada@x.io' });
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for hono-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
