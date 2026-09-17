---
name: hapi-backend
description: Best practices for building HTTP APIs and web services with hapi (Node.js/TypeScript). Use when creating, structuring, or reviewing a hapi app — covers plugin registration, route config, Joi validation, Boom errors, lifecycle extensions, caching, and testing.
---

# Hapi.js Backend Best Practices

hapi is a configuration-driven Node.js framework built on plugins and a rich request lifecycle: you _describe_ servers, routes, validation, auth, and cache in config objects, and hapi enforces them. Its strengths — explicit lifecycle hooks, Joi validation, Boom errors, built-in caching — shine in large, stable APIs. Note hapi is in maintenance mode on the npm `hapi`/`@hapi/hapi` line, so prefer it for legacy consistency; reach for Fastify unless this architecture pattern is already proven in the codebase.

---

## 1. Core Stack

- `@hapi/hapi` — the framework (v21 current, CJS)
- `joi` (or `@hapi/joi`) — schema validation for routes (the hapi-native style)
- `@hapi/boom` — HTTP-friendly thrown errors
- `@hapi/vision`/`@hapi/inert` where templating/static serving is needed
- `@hapi/cookie`/`hapi-auth-jwt2` for auth strategies

```bash
pnpm add @hapi/hapi joi @hapi/boom
```

- **TypeScript support** (`@types/hapi__hapi`) exists but hapi's config-first style reads best when decorated types (`Server`, `Request`, `ResponseToolkit`) are used deliberately on handlers.

---

## 2. Server Construction & Plugins

```ts
import Hapi from '@hapi/hapi';

const server = Hapi.server({
  port: 3000,
  host: '0.0.0.0',
  routes: {
    cors: { origin: ['https://app.example.com'] },
    validate: { failAction: 'error' },
  },
});

await server.register([
  { plugin: userRoutes, routes: { prefix: '/api/v1/users' } },
  { plugin: loggingPlugin },
]);

await server.start();
console.log(`listening on ${server.info.uri}`);
```

- **One server, expressed config-first** — port, routes, and global route options (`routes: { cors, validate }`) declared at construction, not scattered in handlers.
- **Plugins via `server.register([...])`** — each plugin owns routes, hooks, and methods; prefix routes at _registration_ (`routes: { prefix }`), not by string-concatenating paths.
- **`await server.start()`** for listen; for tests, `server.inject()` without ever binding a port.
- **`server.decorate()`/`server.method()`** to expose shared capabilities (services, cached lookups) on `server`/`request` context.

---

## 3. Routes (Config Objects)

```ts
server.route({
  method: 'POST',
  path: '/',
  options: {
    auth: 'jwt',
    validate: {
      payload: Joi.object({
        name: Joi.string().min(1).required(),
        email: Joi.string().email().required(),
      }),
      params: Joi.object({ id: Joi.number().integer().positive() }),
    },
    handler: async (request, h) => {
      const created = await createUser(request.payload);
      return h.response(created).code(201); // response toolkit, not res
    },
  },
});
```

- **Routes are declarations** — `method`/`path`/`options` (auth, validation, cache) describe the contract; the `handler` just executes the validated request.
- **`h.response(...).code(201)`** — the response toolkit builds the reply; return it from `async` handlers. Never touch `request.raw.res` directly.
- **`request.params`/`query`/`payload` are already validated** when `validate` is set — handlers can trust them (unlike Express/Koa hand-rolling).
- **`failAction: "error"`** makes validation failures throw (mapped to 400 with `request.info` detail); `"log"` returns 400 without throwing on unexpected key shapes in dev/CI fidelity.

---

## 4. Validation (Joi)

- **Joi at the route edge, `failAction: "error"`** — schemas for `payload`, `params`, `query`, and `headers` where relevant; no manual `if`s:

```ts
const userCreate = Joi.object({
  name: Joi.string().min(1).max(200).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('USER', 'ADMIN').default('USER'),
});
```

- **Coerce and default in the schema** (`Joi.number()`, `.default(...)`, `.allow("", null)`) so handlers receive normalized data.
- **`Joi.any().unknown(true)` only for open-ended payloads** — prefer strict, closed shapes for APIs you control.
- **Cross-field constraints** (`Joi.object().and("a", "b")`, `.oxor(...)`) express invariants Joi understands natively; keep schemas colocated with each route's `options.validate`.

---

## 5. Errors (Boom)

- **`Boom` errors are the error vocabulary** — `throw Boom.notFound("user missing")`, `Boom.badRequest("invalid payload")`, `Boom.unauthorized(…)`, `Boom.conflict(…)`:

```ts
const user = await findUser(id);
if (!user) throw Boom.notFound(`user ${id} not found`);
```

- **Map domain→Boom in the service boundary or handler**, never in every call site — a small translator converts typed domain errors to `Boom.*` with client-safe messages.
- **`server.ext("onPreResponse", ...)`** for a centralized response shaping hook — stamp generic metadata, serialize errors consistently, and keep stack traces out of `payload` for 5xx.
- **Validation errors map automatically** — Joi `failAction: "error"` produces a 400-shaped Boom response; don't double-handle.

---

## 6. Lifecycle Hooks (server.ext)

- **`server.ext("onRequest" | "onPreAuth" | "onPreHandler" | "onPostHandler" | "onPreResponse")`** gives deterministic points for middleware-like concerns:

```ts
server.ext('onRequest', async (request, h) => {
  // earliest
  request.headers['x-request-id'] ??= crypto.randomUUID();
  return h.continue;
});
server.ext('onPreResponse', async (request, h) => {
  // last — error/response shaping
  if (request.response.isBoom && request.response.output.statusCode >= 500) {
    request.log('error', request.response);
  }
  return h.continue;
});
```

- **Use the earliest hook for request-id/logging; `onPreResponse` for consistent response/error envelope** — the whole request path flows through the same points.
- Return `h.continue` explicitly — that's how intended processing resumes.
- Prefer **route-scoped `options.pre`** for per-route guards/preconditions over app-wide hooks when the concern is narrow.

---

## 7. Caching

- **`server.method(name, fn, { cache: { expiresIn, generateTimeout } })`** — memoize expensive lookups (DB reads, tokens) with TTL and caching built in:

```ts
server.method('getUserCached', getUserById, {
  cache: { expiresIn: 30_000, generateTimeout: 2_000 },
});

const user = await server.methods.getUserCached(id);
```

- **Route-level `options.cache: { expiresIn }`** declares response caching declaratively; `request.server`/`catbox` backends plug in for Redis-level clustering.
- **Cache read-through with timeout** — `generateTimeout` prevents a slow source from blocking cached reads (stale-by-default, fails loud).
- **Invalidate deliberately** (`server.methods.clearCache` or cached key removal) on writes that affect the memo — never rely on TTL as your only coherence story for correctness-critical data.

---

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
