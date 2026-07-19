# Workflow notes

Focused reference for **koa-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
