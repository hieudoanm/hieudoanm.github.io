# Review checklist

Focused reference for **hapi-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 8. Testing

- **`server.inject()`** — in-process, no network, tests the full lifecycle (validation, auth, hooks, error mapping):

```ts
const res = await server.inject({
  method: 'POST',
  url: '/api/v1/users',
  payload: { name: 'Ada', email: 'ada@x.io' },
});
expect(res.statusCode).toBe(201);
```

- **Build the app through a `buildServer()` factory** (create, register plugins, no `start`) — tests `inject` into that instance.
- **Assert the contract**: validation-failure 400s (with Boom detail), auth 401s, cache hit vs miss, and the `onPreResponse` envelope on a 500.
- **Isolate** — in-memory/test DB per suite; mock at the service seam; exercise `onPreResponse` for error-shape stability.

---

## 9. General Rules of Thumb

- **Declare, don't improvise** — routes, validation, auth, and cache live in config; the handler is the small payoff at the end.
- **Everything errors via Boom** — a single error vocabulary and one `onPreResponse` shape keep the API coherent.
- **Plugins own their slice** — routes/hooks/methods grouped by capability, `register`ed with prefixes; tests per plugin boundary.
- **Maintenance reality check** — hapi is stable but legacy; pick it for proven codebases, and Fastify (this folder's `fastify.js.md`) when evaluating greenfield ergonomics.

---

## Quick-Start Checklist

- [ ] Server config-first: port, global `routes` `cors`/`validate` options
- [ ] Routes as declarations with `options.validate` (Joi) + `auth`; handlers return `h.response(...).code(...)`
- [ ] `failAction: "error"` for validation; schemas colocated per route
- [ ] All errors thrown as `Boom.*`; domain→Boom mapped once
- [ ] `onPreResponse` centralizes envelope/error shaping; request-id via earliest hook
- [ ] `server.method` caching with `expiresIn`/`generateTimeout` for hot lookups
- [ ] Plugins registered with `prefix` at registration
- [ ] `server.inject()` tests against a `buildServer()` factory
- [ ] Validation-400/auth-401/cache-hit paths asserted
- [ ] Secrets never logged; strict closed schemas on controlled API endpoints
