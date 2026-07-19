---
name: hono-backend
description: Best practices for building HTTP APIs and edge-capable web services with Hono (TypeScript). Use when creating, structuring, or reviewing a Hono app — covers middleware, typed routes, validation, adapters, error handling, and testing across server runtimes.
---

# Hono.js Backend Best Practices

Hono is a small, standards-based TypeScript web framework that runs anywhere `fetch`/`Request`/`Response` do: Node, Bun, Deno, Cloudflare Workers, and browsers via adapters. Handlers get a `Request`-shaped `c.req` and return `Response`s, middleware is a flat `app.use` + `await next()` model, and types flow through route chains. Best practice here is about respecting the Web-standard shape (it's why the same code ports everywhere), using middleware as small `app.use` layers, and leaning on Hono's typed helpers instead of stringly routing.

---

## 1. Core Stack & Runtime Choice

- `hono` — the framework
- `@hono/node-server` (Node), Bun/Deno/Workers run `hono` via their native `fetch`/`serve` — one framework, choose the adapter per deployment
- `hono/zod-validator` for zod validation; `@hono/...` official middleware (logger, secure-headers, cors)
- `hono/client` and `hono/type-test` for typed-client + type-level tests

```bash
pnpm add hono @hono/node-server zod
```

- **Pick the adapter consciously** — `@hono/node-server` for Node, `Bun.serve` for Bun, `Deno.serve` for Deno, Workers export for the edge. The handlers are identical; the deployment story is the decision.
- Edge caveat: keep bundle small and avoid Node-only APIs (`fs`, `child_process`, npm-native) in code that must run on Workers — validate the runtime before using Node libs.

---

## 2. App & Route Structure

```ts
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => c.text('hello'));
app.get('/users/:id', (c) => c.json({ id: c.req.param('id') }));

const api = new Hono();
api.post('/users', validate('json', userCreateSchema), async (c) => {
  const input = c.req.valid('json');
  return c.json(await createUser(input), 201);
});
app.route('/api/v1', api);

export default app; // adapters import `app` and serve it
```

- **`c.req.param()`/`c.req.query()` return strings; validate before trusting** (see §4).
- **Nest routers via `app.route("/api/v1", api)`** — namespacing without string-concatenating early; per-resource `new Hono()` subtypes keep route definitions grouped.
- **`c.json()/c.text()/c.html()` helpers return `Response`s** — the handler contract is "return a Response"; no `res` mutation anywhere.
- **Export the `app` (not a started server)** so adapters and tests (`app.request()`) share one unit.

---

## 3. Middleware (app.use)

- **One middleware per `app.use`, onion-style with `await next()`** — setup/logging in, teardown out:

```ts
app.use('*', logger()); // built-in logging middleware
app.use('/api/*', cors({ origin: config.corsOrigin }));
app.use(async (c, next) => {
  const start = Date.now();
  await next();
  c.header('x-response-time', `${Date.now() - start}ms`);
});
```

- **Scope by path pattern** (`"/api/*"`) — auth, CORS, and rate-limit target route families, not everything.
- **Middleware compose like Koa** — `await next()` flows down and back; declare order deterministically (logs → headers → auth → validation).
- **Built-in suite** (`logger`, `secureHeaders`, `cors`, `csrf`, `serveStatic`, `prettyJSON`) covers the usual pedestal; prefer it before rolling your own.

---

## 4. Validation & Typed Input

- **`hono/zod-validator`** — validate `json`/`form`/`query`/`header`/`cookie` with zod, and the parsed value rides `c.req.valid("json")` _typed_:

```ts
import { zValidator } from 'hono/zod-validator';

const userCreateSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
});

app.post('/users', zValidator('json', userCreateSchema), async (c) => {
  const input = c.req.valid('json'); // typed zod output — no runtime checks here
  return c.json(await createUser(input), 201);
});
```

- **`c.req.valid()` is set only after its validator ran** — handlers never touch raw `c.req` payloads.
- **Coerce params/query in-schema** (`z.coerce.number()`) before use; validation failures return 400 with the zod issues by default, surface them consistently via a shared error middleware.
- **`hono/type-test`** (`expectTypeOf`-style type-level tests) pins the contract between routes and typed clients (`hono/client`).

---

## 5. Error Handling & Lifecycle

- **A single error-catcher middleware** (`app.onError`) maps ZodError/domain errors → status + envelope:

```ts
app.onError((err, c) => {
  if (err instanceof ZodError) {
    return c.json({ error: 'invalid request', issues: err.issues }, 400);
  }
  if (err instanceof NotFoundError) return c.json({ error: err.message }, 404);
  console.error(err); // runtime logging layer
  return c.json({ error: 'internal error' }, 500);
});

app.notFound((c) => c.json({ error: 'route not found' }, 404));
```

- **`app.onError` is the single funnel** — throw from handlers/schema errors alike; never `c.status(...)`+hand-build a 500 in a handler.
- **`app.notFound` for the 404 shape** — one consistent response for unknown paths.
- Services throw domain errors; **`onError` maps**, services never know about `c`.

---

## 6. Adapters, Streaming & the Web Standard

- **The handler is transferable** — the same `app` serves Node/Bun/Deno/Workers; keep Node-isms behind the adapter and code shared against `Request`/`Response`.
- **Streaming responses via `ReadableStream` body** — `c.body(stream)` for large payloads instead of buffering:

```ts
app.get('/export', (c) => c.body(fileStream(), 200));
```

- **`c.env` vs `c.executionCtx` (Workers) vs `process.env` (Node)** — access environment through the adapter-agnostic `c.env` where possible so porting stays clean.
- **`satisfies ExportedHandler`** for the Workers entry keeps deployment types honest.

---

## 7. Performance & Edge Discipline

- **Small middleware surface** — each `app.use` is runtime cost; compose few, targeted layers.
- **Prefer `Static`/`serveStatic` and built-ins over node-only magic on edge targets**; validate bundle size before edge deploy (`workers` freeze on heavy modules).
- **Atomic responses** — return `c.json/c.text/c.body(...).status` and let the framework handle headers; avoid mutating a shared response object across handlers.
- **Keep handlers thin and promise-typed** — `async` handlers returning responses compose with `Promise.all` for parallel independent reads.

---

## 8. Testing

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
