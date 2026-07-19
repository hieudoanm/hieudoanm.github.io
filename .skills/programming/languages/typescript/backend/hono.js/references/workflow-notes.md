# Workflow notes

Focused reference for **hono-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
