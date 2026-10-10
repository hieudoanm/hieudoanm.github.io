# Review checklist

Focused reference for **fastify-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 8. Testing

- **`app.inject()`** — in-process, zero-network request testing (Fastify's built-in equivalent of supertest):

```ts
const res = await app.inject({
  method: 'POST',
  url: '/api/v1/users',
  payload: { name: 'Ada', email: 'ada@x.io' },
});
expect(res.statusCode).toBe(201);
expect(res.json().email).toBe('ada@x.io');
```

- **Build the app via a factory `buildApp()`** (register plugins, no `listen`) and `inject` after `await app.ready()` — the app object is the test fixture.
- **Assert the schema-invalid cases** (400 with issues), the 404 path, and that `response` schemas hold — the contract is your test spec.
- **Isolated services** — in-memory SQLite/test DB per suite; mock external HTTP at the boundary.

---

## 9. General Rules of Thumb

- **Register, don't sprinkle** — capabilities are plugins; app is a tree of `register`s with `prefix` scoping.
- **Schema once, used everywhere** — validation + serialization + types + docs all from one declaration; the compiler and the wire agree.
- **Hooks over scattered middleware** — lifecycle is explicit (`onRequest` → `preValidation` → `preHandler` → `onSend` → `onResponse`); keep order deterministic.
- **One error handler, one logger** — centralization is where observability lives.
- **Fastify expects its own ergonomics** — don't race to `express`-style freedom; the enforcement is the point.

---

## Quick-Start Checklist

- [ ] Capabilities as `fastify-plugin`s with clear `name`; routes `prefix`ed in their plugin
- [ ] Route `schema` (TypeBox/zod) set for body **and** response; one type provider chosen
- [ ] `preValidation`/`preHandler` hooks scoped per-plugin; generic concerns app-level
- [ ] Central `setErrorHandler` mapping domain errors → status + JSON shape
- [ ] `req.log` used for per-request context; no `console.*`
- [ ] `@fastify/helmet`/`cors`/`rate-limit` registered; `bodyLimit` configured
- [ ] Secrets redacted from logs; payload limits enforced
- [ ] `app.inject()` tests against a `buildApp()` factory
- [ ] `await app.ready()` before `listen`; single instance
- [ ] Outbound calls time-limited; no blocking I/O in handlers
