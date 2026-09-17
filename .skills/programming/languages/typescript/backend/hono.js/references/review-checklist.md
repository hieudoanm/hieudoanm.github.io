# Review checklist

Focused reference for **hono-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`app.request()`** — in-process, fetch-shaped, no network:

```ts
const res = await app.request('/api/v1/users', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ name: 'Ada', email: 'ada@x.io' }),
});
expect(res.status).toBe(201);
expect(await res.json()).toMatchObject({ email: 'ada@x.io' });
```

- **Test the contract across adapters** — `app.request` exercises middlewares/handlers; a pair of adapter-level tests (Bun/Node serve) verify the deployment wiring.
- **Validation + error paths asserted** — 400-on-bad-body, 404 via `notFound`, and the `onError` envelope for a forced 500.
- **Isolate services** (in-memory DB, mocked outbound) so tests are fast and deterministic.

---

## 9. General Rules of Thumb

- **Web-standards-first** — `Request`/`Response`/streams are the vocabulary; code written against them ports with zero rewrites.
- **One error shape, one 404 shape** — `onError`/`notFound` are your consistency wins.
- **Middleware as small, scoped layers** — path-pattern `app.use`, deterministic order, always `await next()` or return a response.
- **Validate with zod once, type everywhere** — `zValidator` → `c.req.valid()` keeps the fast path honest.
- **Adapters are deployment decisions** — share the app, choose the serve story per environment.

---

## Quick-Start Checklist

- [ ] Handlers return `Response`s (`c.json/c.text/c.body(...)`) — no `res` mutation
- [ ] Routers nested via `app.route("/api/v1", ...)`; `app` exported for adapters/tests
- [ ] Middleware `app.use` path-scoped, one concern, `await next()` discipline
- [ ] `hono/zod-validator` on `json`/`query`/`params`; `c.req.valid()` typed input
- [ ] `app.onError` maps Zod/domain errors → status + envelope; `app.notFound` for 404s
- [ ] Adapter chosen consciously (Node/Bun/Deno/Workers); Node-isms behind it
- [ ] Streaming bodies for large payloads; no shared mutable request/response state
- [ ] `app.request()` tests cover success/400/404/500 paths
- [ ] Secrets never logged; security middleware (secureHeaders/cors) on public routes
- [ ] Bundle small for edge target; runtime-specific deps validated before deploy
