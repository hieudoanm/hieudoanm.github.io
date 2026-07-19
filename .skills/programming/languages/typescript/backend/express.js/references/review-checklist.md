# Review checklist

Focused reference for **express-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 9. Testing

- **`supertest` against the `app.ts` export** — in-process, no port binding:

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

- **Test the contract**: status, body shape, and stable error shape (400 on bad body, 404 on missing id, 500-path mapped).
- **Isolate with an in-memory SQLite / dedicated test DB + fixtures**, reset per suite — never the dev database.
- **Mock at the service boundary** (`vi.fn()`) for hard dependencies; keep a couple of true end-to-end tests for wiring.

---

## 10. General Rules of Thumb

- **Express rewards structure, punishes improvisation** — layout, middleware order, and error paths decided once and consistently beat ad-hoc per-handler choices.
- **Routes are thin translation layers** — params → validated/parsed → service → response; no business logic in handlers.
- **Everything is typed at the boundary** — zod in, typed services out; `req/res` stay `unknown` until validated.
- **One error path** — nothing throws outside the centralized middleware; never `res.send(err)` in handlers.
- **Version the API early** (`/api/v1/`) — unversioned endpoints are expensive to change.

---

## Quick-Start Checklist

- [ ] `app.ts`/`server.ts` split; routers per resource under `/api/v1`
- [ ] Middleware order: logging → body(limit) → security → request-id → routes → error
- [ ] Async handlers route errors to the error middleware (express@5 native, or `asyncHandler`)
- [ ] All requests validated with zod (params, query, body); narrowed data forwarded
- [ ] Single centralized error handler; domain→HTTP mapping; 500s log + generic body
- [ ] `helmet`, explicit `cors`, rate-limit on auth resources
- [ ] No blocking I/O in handlers; outbound calls time-limited
- [ ] Graceful shutdown; request-id threaded through logs
- [ ] `supertest` integration tests on `app.ts`; public contract asserted
- [ ] Secrets never logged; payload limits enforced
- [ ] Note: Express is unopinionated — for performance-critical or very large APIs, assess Fastify (see `backend/fastify.js.md`)
