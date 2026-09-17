# Implementation notes

Focused reference for **express-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
