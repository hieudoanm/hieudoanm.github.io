# Hono.js Backend Best Practices: 5. Error Handling & Lifecycle

## Source guidance

This example applies the **5. Error Handling & Lifecycle** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **A single error-catcher middleware** (`app.onError`) maps ZodError/domain errors → status + envelope:
- **`app.onError` is the single funnel** — throw from handlers/schema errors alike; never `c.status(...)`+hand-build a 500 in a handler.
- **`app.notFound` for the 404 shape** — one consistent response for unknown paths.
- Services throw domain errors; **`onError` maps**, services never know about `c`.

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for hono-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
