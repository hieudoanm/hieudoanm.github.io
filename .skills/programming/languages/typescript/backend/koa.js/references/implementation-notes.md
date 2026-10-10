# Implementation notes

Focused reference for **koa-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
