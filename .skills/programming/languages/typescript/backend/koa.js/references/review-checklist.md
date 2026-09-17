# Review checklist

Focused reference for **koa-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`app.callback()` composes the app into a plain `(req,res)=>void` handler** — perfect for `supertest` without a listener:

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

- **Test the shapes**: success status + body, 400-on-invalid, 404-on-missing, and the 500 path (mapped, generic body).
- **Isolate state** — in-memory SQLite/test DB resets per suite; mock outbound at the service boundary.

---

## 9. General Rules of Thumb

- **Compose from small, named middleware** — the onion model rewards layers that each do one thing and `await next()` correctly.
- **The error path is one place** — a single wrapper mapping exceptions → status; everything that throws flows through it.
- **Assemble what Express/Fastify build in** — Koa has no opinions; decide router/parser/security once and standardize (that's the real work).
- **Choose consciously for fit** — Koa's advantage is minimalism; if you want features built in, Fastify's plugin/schema model is the ergonomic sibling (see `backend/fastify.js.md`).

---

## Quick-Start Checklist

- [ ] `ctx`-only handlers; `ctx.body`/`ctx.status` always assigned for non-200s
- [ ] Onion middleware composed: security → logging/request-id → bodyparser(limit) → routes → error
- [ ] Every middleware either `await next()`s or ends the response deliberately
- [ ] `@koa/router` prefixes per resource; `allowedMethods()` for 405s
- [ ] All input zod-validated at the route (params/query/body), values coerced in-schema
- [ ] Single centralized error middleware; domain→status mapping; 500s generic + logged via `app.on("error")`
- [ ] `koa-helmet`, `@koa/cors`, bodyparser `limit`, rate-limit on auth routes
- [ ] No blocking I/O; outbound calls time-limited
- [ ] `supertest` against `app.callback()`; contract assertions incl. 400/404
- [ ] Secrets never logged; large payloads streamed
