---
name: express-backend
description: Best practices for building HTTP APIs and web services with Express (Node.js/TypeScript). Use when creating, structuring, or reviewing an Express app — covers project layout, middleware, routing, validation, error handling, async discipline, and testing.
---

# Express.js Backend Best Practices

Express is the minimal, battle-tested Node.js web framework: routing, middleware, and a tiny core, with everything else composed from the ecosystem. Best practice is about _structure and discipline_ — Express gives you almost no guardrails, so the value is in consistent project layout, middleware order, async-safe handlers, centralized error handling, and boundary validation.

---

## 1. Core Stack

- `express` — router/handler framework (`express@5` for current releases; promises errors flow to the error middleware automatically)
- `zod` — request validation at the boundary (see §5)
- `pino` (+ `pino-http`) — structured request/error logging
- `helmet` — security headers; `cors` — controlled cross-origin access
- `supertest` — integration-testing the HTTP server in-process

```bash
pnpm add express zod pino pino-http helmet cors
pnpm add -d @types/express supertest
```

---

## 2. Project Layout

```txt
src/
├── app.ts              # exports the Express app (no listen) — the testable unit
├── server.ts           # imports app.ts, builds server, listens (entrypoint only)
├── config.ts            # typed env/config parsing, validated once at boot
├── middleware/
│   ├── error.ts        # error handler (last middleware)
│   └── request.ts      # logging, body parsing, request-id
├── routes/             # one router file per resource
│   ├── health.ts
│   └── users.ts
├── services/           # business logic, no HTTP imports
├── schemas/            # zod schemas for routes/domains
└── db/                 # data access (Prisma/Drizzle/raw) — see orm/ skills
```

- **`app.ts` builds the app; `server.ts` only `listen()`s** — integration tests import `app.ts` and use `supertest` without binding a port.
- **Router per resource** (`express.Router()` in `routes/users.ts`), mounted under `/api/v1` — routes stay short and namespaced.
- **Services never import Express types** — plain functions/classes returning domain values; the route layer translates HTTP ⇄ domain (see §6).

---

## 3. Middleware & Ordering

- **Order is the entire contract** — middleware runs top-down; logging → body parsing → security → request-id → routes → error handler:

```ts
app.use(pinoHttp({ logger }));
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(requestId());
app.use('/api', routes);
app.use(errorHandler()); // LAST — see §4
```

- **`app.use` for global middleware, router-level `router.use` for namespaced**; mount versioned routers by path (`/api/v1`) for API evolution.
- **Add request-id middleware early** (e.g. `crypto.randomUUID()` + `x-request-id` echo) — it ties logs, downstream calls, and error responses together.
- **Body parsing with explicit `limit`** (`express.json({ limit: "1mb" })`) — unbounded JSON bodies are a memory-exhaustion vector.

---

## 4. Routing & Handlers

```ts
import { Router } from 'express';

const users = Router();

users.get('/', async (req, res, next) => {
  try {
    const list = await getUsers();
    res.json(list);
  } catch (err) {
    next(err); // delegate to the error middleware — never swallow
  }
});

users.post('/', validate(userCreateSchema), async (req, res, next) => {
  /* ... */
});

export default users;
```

- **`express@5` handles rejected promises natively** — async handlers that `throw` reach the error middleware without a manual `try/catch`; on `express@4`, wrap with a small `asyncHandler(fn)` helper.
- **Resource-noun routes, HTTP-verb methods, REST-ish naming** — `users/:id`, `POST/GET/PATCH/DELETE`; keep routes 2 levels deep (`/users/:id/orders` only when a real nested resource exists).
- **`req.params`/`req.query` are strings — validate and coerce** (see §5); never trust them raw.
- Use **`res.status(...).json(...)` explicitly** — default 200 can lie about a 201/204 you meant to return.

---

## 5. Validation at the Boundary

- **Validate every request with zod at the route edge** — params, query, and body schemas fail fast with 400s and never reach the service:

```ts
const userCreateSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
});

const validate = (schema: z.ZodType) => (req, res, next) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res
      .status(400)
      .json({ error: 'invalid body', issues: parsed.error.issues });
    return;
  }
  req.body = parsed.data; // attach the parsed, narrowed value
  next();
};
```

- **Return narrowed parsed data, not the raw body** — the handler consumes `parsed.data`, so types stay honest downstream.
- **Coerce ids/numbers in the schema** (`z.coerce.number()`), don't `Number(req.params.id)` in handlers.
- **Validate `req.query` too** — query shapes are input as much as bodies.

---

## 6. Error Handling (Centralized)

- **One error-handling middleware, attached last**, translating errors → status + shape:

```ts
export function errorHandler(): ErrorRequestHandler {
  return (err, _req, res, _next) => {
    const status = err instanceof NotFoundError ? 404 : (err.status ?? 500);
    const body = { error: err.message, requestId: _req.id };
    if (status >= 500)
      logger.error(err, 'unhandled'); // log the full cause
    else logger.warn(err, 'handled');
    res.status(status).json(body);
  };
}
```

- **Map domain errors to HTTP** at the edge (`NotFoundError → 404`, `ValidationError → 400`, auth → 401/403) — services throw domain errors, not `res.…` calls.
- **Server errors are log-and-500** — never leak stack traces or SQL to clients; keep `error.message` generic unless `NODE_ENV=development`+`DEBUG`.
- **A `NotFoundError` for unknown routes** (`app.use((_req,res)=>res.status(404).json(...))`) placed before the error handler.

---

## 7. Async Discipline & Concurrency

- **No blocking I/O in handlers** — sync `fs`/`crypto` on the hot path starve the event loop (see the Node runtime skill).
- **Validate with a schema, then fan out independent work with `Promise.all`**, sequence dependent work with `for…of` — don't build callback nesting.
- **Outbound calls get `AbortSignal.timeout(…)`** — a hung upstream shouldn't hang your handler.
- **Graceful shutdown in `server.ts`** — close the server, drain in-flight, then `process.exit(0)` (see Node skill §4).

---

## 8. Security Essentials

- **`helmet()` + explicit `cors` origin policy** on every public app.
- **Rate limiting + auth-z at the router level** for protected resources (before business logic).
- **Never log request bodies or `req.headers.authorization`** — default redaction in `pino-http` for secrets.
- **Payload limits** (`express.json({ limit })`) and **content-type checks** — reject unexpected shapes early.
- **Input is untrusted**: `zod` at the boundary + Prisma/Drizzle schema-typed data access (see `orm/` skills) close the common injection paths.

---

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
