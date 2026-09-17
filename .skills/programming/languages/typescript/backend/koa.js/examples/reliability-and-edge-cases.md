# Koa.js Backend Best Practices: 6. Error Handling

## Source guidance

This example applies the **6. Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **One centralized error middleware** (first execution layer) catching everything that flows out:
- **`app.on("error", ...)`** centralizes the severe-error logging (Koa's own event) — pino the full cause there, keep the 500 body generic.
- **Services throw domain errors** (`NotFoundError`, `ValidationError`) — the middleware maps them to status; services never `ctx.*` anything (guards the layer).
- **Don't rely on raw Koa status semantics** — always assign `ctx.status` for the non-200s you intend.

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for koa-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
