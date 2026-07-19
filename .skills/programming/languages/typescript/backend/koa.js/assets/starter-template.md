# Koa.js Backend Best Practices: Starter Template

A reusable starting point derived from the **8. Testing** section of [Koa.js Backend Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
