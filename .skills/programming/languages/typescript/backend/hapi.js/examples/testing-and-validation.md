# Hapi.js Backend Best Practices: 8. Testing

## Source guidance

This example applies the **8. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`server.inject()`** — in-process, no network, tests the full lifecycle (validation, auth, hooks, error mapping):
- **Build the app through a `buildServer()` factory** (create, register plugins, no `start`) — tests `inject` into that instance.
- **Assert the contract**: validation-failure 400s (with Boom detail), auth 401s, cache hit vs miss, and the `onPreResponse` envelope on a 500.
- **Isolate** — in-memory/test DB per suite; mock at the service seam; exercise `onPreResponse` for error-shape stability.

## Example

```ts
const res = await server.inject({
  method: 'POST',
  url: '/api/v1/users',
  payload: { name: 'Ada', email: 'ada@x.io' },
});
expect(res.statusCode).toBe(201);
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for hapi-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
