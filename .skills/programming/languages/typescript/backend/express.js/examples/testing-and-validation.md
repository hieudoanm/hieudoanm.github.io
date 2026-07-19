# Express.js Backend Best Practices: 9. Testing

## Source guidance

This example applies the **9. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`supertest` against the `app.ts` export** — in-process, no port binding:
- **Test the contract**: status, body shape, and stable error shape (400 on bad body, 404 on missing id, 500-path mapped).
- **Isolate with an in-memory SQLite / dedicated test DB + fixtures**, reset per suite — never the dev database.
- **Mock at the service boundary** (`vi.fn()`) for hard dependencies; keep a couple of true end-to-end tests for wiring.

## Example

```ts
import request from 'supertest';
import app from '../app';

it('creates a user and returns 201', async () => {
  const res = await request(app)
    .post('/api/v1/users')
    .send({ name: 'Ada', email: 'ada@x.io' });
  expect(res.status).toBe(201);
  expect(res.body.email).toBe('ada@x.io');
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for express-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
