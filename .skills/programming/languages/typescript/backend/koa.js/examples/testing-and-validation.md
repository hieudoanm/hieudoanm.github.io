# Koa.js Backend Best Practices: 8. Testing

## Source guidance

This example applies the **8. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`app.callback()` composes the app into a plain `(req,res)=>void` handler** — perfect for `supertest` without a listener:
- **Test the shapes**: success status + body, 400-on-invalid, 404-on-missing, and the 500 path (mapped, generic body).
- **Isolate state** — in-memory SQLite/test DB resets per suite; mock outbound at the service boundary.

## Example

```ts
import request from 'supertest';
import app from '../app';

it('creates a user with 201', async () => {
  const res = await request(app.callback())
    .post('/api/v1/users')
    .send({ name: 'Ada', email: 'ada@x.io' });
  expect(res.status).toBe(201);
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for koa-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
