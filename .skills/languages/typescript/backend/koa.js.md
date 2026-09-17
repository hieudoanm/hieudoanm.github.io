---
name: koa-backend
description: Best practices for building HTTP APIs and web services with Koa (Node.js/TypeScript). Use when creating, structuring, or reviewing a Koa app — covers the context model, onion middleware, routing, validation, error handling, and testing.
---

# Koa.js Backend Best Practices

Koa (by the Express authors) replaces the `req`/`res` pair with a single request **`ctx`** and composes behaviour through _onion_ middleware: each layer `await next()`s into the next and resumes outward. Koa is deliberately bare — there's no router, body parser, or security middleware built in — so best practice is about assembling a disciplined middleware stack, keeping `ctx` access central, and choosing well-maintained companions (`@koa/router`, `koa-bodyparser`, `koa-helmet`).

---

## 1. Core Stack

- `koa` — the app (current v2/v3)
- `@koa/router` — routing (Koa ships none)
- `koa-bodyparser` — JSON/urlencoded body parsing (`limit` configurable)
- `koa-helmet` — security headers; `@koa/cors` — CORS policy
- `zod` — boundary validation
- `supertest` or `server.callback()` — integration tests

```bash
pnpm add koa @koa/router koa-bodyparser koa-helmet @koa/cors zod
```

- **Koa v3 is ESM-only; v2 is CJS** — pick per your module system and pin it (the ecosystem differs).

---

## 2. The Context Model

- **`ctx` is both request and response** — `ctx.method`, `ctx.url`, `ctx.params`/`ctx.request.body`, and output via `ctx.body`/`ctx.status`:

```ts
app.use(async (ctx) => {
  ctx.body = { ok: true, url: ctx.url };
});
```

- **Setting `ctx.body` is the response** — Koa serializes and assigns status; `ctx.body = null` means 204. Prefer assigning a value over mutating `ctx.res` directly.
- **`ctx.state` for per-request flow** — it carries authenticated/tenant info down the middleware chain without globals.
- **Never interact with `ctx.res` directly** unless you're writing a body streamer — Koa's abstraction is where logging, headers, and error mapping live.

---

## 3. Onion Middleware (The Core Idea)

- **`await next()` composes up and down** — setup before `next`, teardown after; this is _the_ Koa idiom:

```ts
app.use(async (ctx, next) => {
  const start = Date.now();
  ctx.state.reqId = crypto.randomUUID();
  ctx.set('x-request-id', ctx.state.reqId);
  await next(); // flow down
  ctx.set('x-response-time', `${Date.now() - start}ms`); // resume out
});
```

- **Order matters and is explicit** — security → logging/request-id → body parsing → routes → error handler (see §4–5).
- **Always `await next()` or explicitly end the chain** — skipping `next` without sending a body leaves the request hanging; a middleware that ends the response (404/401) does so deliberately.
- **Middleware stay tiny and single-purpose** — one middleware, one concern; compose big behaviours from named pieces you can test.

---

## 4. Routing

```ts
import Router from '@koa/router';

const users = new Router({ prefix: '/api/v1/users' });

users.get('/', async (ctx) => {
  ctx.body = await listUsers();
});

users.post('/', async (ctx) => {
  const parsed = userCreateSchema.parse(ctx.request.body); // throws → error middleware
  ctx.body = await createUser(parsed);
  ctx.status = 201;
});

app.use(users.routes()).use(users.allowedMethods());
```

- **Router prefix for versioning/namespacing** (`api/v1/users`); one router file per resource.
- **`allowedMethods()`** yields proper `405 Method Not Allowed` for undefined verbs on a path — free correctness.
- **`ctx.router.url(...)` / named routes for URL generation** where links exist between resources.
- Keep handlers thin — parse → validate → service → assign `ctx.body`; no business logic inline.

---

## 5. Validation & Input Handling

- **`koa-bodyparser` with a `limit`** (e.g. `{ limit: "1mb" }`) mounted early — unbounded bodies are a memory-exhaustion risk.
- **Validate `ctx.params` (strings), `ctx.query` (strings), and `ctx.request.body`** with zod at the route, coerce ids/numbers in the schema:

```ts
const id = z.coerce.number().int().positive().parse(ctx.params.id);
const input = userCreateSchema.parse(ctx.request.body); // narrowed, trusted hereon
```

- **Fail fast — a `ZodError` reaching the error middleware becomes a 400** (see §6); never forward raw `req` payloads to services.
- Prefer parsing to `safeParse` at the route edge (throw → centralized 400) over hand-rolled `if`s per field.

---

## 6. Error Handling

- **One centralized error middleware** (first execution layer) catching everything that flows out:

```ts
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof ZodError || err instanceof BadRequestError) {
      ctx.status = 400;
      ctx.body = { error: 'bad request', issues: err.issues };
    } else if (err instanceof NotFoundError) {
      ctx.status = 404;
      ctx.body = { error: err.message };
    } else {
      ctx.app.emit('error', err, ctx); // out to the app-level logger
      ctx.status = 500;
      ctx.body = { error: 'internal error' };
    }
  }
});
```

- **`app.on("error", ...)`** centralizes the severe-error logging (Koa's own event) — pino the full cause there, keep the 500 body generic.
- **Services throw domain errors** (`NotFoundError`, `ValidationError`) — the middleware maps them to status; services never `ctx.*` anything (guards the layer).
- **Don't rely on raw Koa status semantics** — always assign `ctx.status` for the non-200s you intend.

---

## 7. Async Discipline & Security

- **No blocking I/O in handlers** — async `fs`/`fetch`/DB; keep the event loop honest (Node runtime skill).
- **Outbound calls `AbortSignal.timeout(…)`** so a hung upstream can't hang the request.
- **`koa-helmet` + `@koa/cors` (explicit origin) + rate limiting on auth routes** — the trio you bolt onto every public app.
- **Never log sensitive bodies/headers**; redact `authorization`/`cookie` from logs; respect `NO_COLOR`-style conventions in any CLI-adjacent spans.
- **Stream large responses via `ctx.body = createReadStream(path)`** instead of buffers where payloads are big.

---

## 8. Testing

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
