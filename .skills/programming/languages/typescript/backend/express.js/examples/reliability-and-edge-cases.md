# Express.js Backend Best Practices: 6. Error Handling (Centralized)

## Source guidance

This example applies the **6. Error Handling (Centralized)** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **One error-handling middleware, attached last**, translating errors → status + shape:
- **Map domain errors to HTTP** at the edge (`NotFoundError → 404`, `ValidationError → 400`, auth → 401/403) — services throw domain errors, not `res.…` calls.
- **Server errors are log-and-500** — never leak stack traces or SQL to clients; keep `error.message` generic unless `NODE_ENV=development`+`DEBUG`.
- **A `NotFoundError` for unknown routes** (`app.use((_req,res)=>res.status(404).json(...))`) placed before the error handler.

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for express-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
