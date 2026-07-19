# Implementation notes

Focused reference for **fastify-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 5. Error Handling

- **Structured errors are first-class** — the built-in logger emits JSON, and `app.setErrorHandler` sets the central contract:

```ts
app.setErrorHandler((err, req, reply) => {
  const status = err.statusCode ?? 500;
  if (status >= 500) req.log.error(err, 'unhandled');
  else req.log.warn(err);
  reply.code(status).send({ error: err.message, requestId: req.id });
});
```

- **Domain → HTTP mapping centrally** — services throw typed errors (`NotFoundError` → `404`); let the error handler translate, never `reply.send` inside services.
- **The logger is per-request** — `req.log` carries request context (id, route, latency) for free in dev/prod; never `console.*` in handlers.
- **`@fastify/sensible`** adds helpers (`.notFound()`, `.conflict()`, `httpErrors`) that read clearly and map to proper status codes.

---

## 6. Performance & Concurrency Discipline

- **Schema validation is the performance story** — route `schema` makes handlers parse-free & pre-validated; don't replace it with zod-in-handler checks that defeat Fastify's fast path.
- **Async everywhere, awaited** — handlers return payloads (Fastify serializes); never `await` next-blocking I/O; keep the event loop honest (see Node runtime skill).
- **Outbound calls timed** (`AbortSignal.timeout`) so a hung upstream can't pin a worker.
- **Instance cost is zero-ish** — prefer `await app.ready()` + `app.listen` once; don't create a new `Fastify()` per request.
- **`process.availableMemory` / `--expose-gc` tuning is an optimization** — measure before you tune; the default config is the sensible baseline until profiled.

---

## 7. Security

- **`@fastify/helmet` + `@fastify/cors` (explicit origin policy) + `@fastify/rate-limit`** — the trio covers headers, CORS, and brute-force on auth endpoints.
- **Never log `req.headers.authorization`, cookies, or bodies** — pino's default serializers are json-serializing; add redaction for known secret fields.
- **Payload limits at server config** (`Fastify({ bodyLimit: 1_048_576 })`) — un-bounded bodies are a memory-exhaustion attack.
- **Schema `format`/`pattern` on strings you'll index or log** — validate the shape of everything that crosses the boundary.

---
