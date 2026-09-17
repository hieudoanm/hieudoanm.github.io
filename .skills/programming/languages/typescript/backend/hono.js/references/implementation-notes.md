# Implementation notes

Focused reference for **hono-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

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

- **`app.onError` is the single funnel** — throw from handlers/schema errors alike; never `c.status(...)`+hand-build a 500 in a handler.
- **`app.notFound` for the 404 shape** — one consistent response for unknown paths.
- Services throw domain errors; **`onError` maps**, services never know about `c`.

---

## 6. Adapters, Streaming & the Web Standard

- **The handler is transferable** — the same `app` serves Node/Bun/Deno/Workers; keep Node-isms behind the adapter and code shared against `Request`/`Response`.
- **Streaming responses via `ReadableStream` body** — `c.body(stream)` for large payloads instead of buffering:

```ts
app.get('/export', (c) => c.body(fileStream(), 200));
```

- **`c.env` vs `c.executionCtx` (Workers) vs `process.env` (Node)** — access environment through the adapter-agnostic `c.env` where possible so porting stays clean.
- **`satisfies ExportedHandler`** for the Workers entry keeps deployment types honest.

---

## 7. Performance & Edge Discipline

- **Small middleware surface** — each `app.use` is runtime cost; compose few, targeted layers.
- **Prefer `Static`/`serveStatic` and built-ins over node-only magic on edge targets**; validate bundle size before edge deploy (`workers` freeze on heavy modules).
- **Atomic responses** — return `c.json/c.text/c.body(...).status` and let the framework handle headers; avoid mutating a shared response object across handlers.
- **Keep handlers thin and promise-typed** — `async` handlers returning responses compose with `Promise.all` for parallel independent reads.

---

## 8. Testing
