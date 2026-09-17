# Express.js Backend Best Practices: Starter Template

A reusable starting point derived from the **6. Error Handling (Centralized)** section of [Express.js Backend Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
