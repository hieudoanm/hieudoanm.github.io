# Implementation notes

Focused reference for **hapi-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Map domain→Boom in the service boundary or handler**, never in every call site — a small translator converts typed domain errors to `Boom.*` with client-safe messages.
- **`server.ext("onPreResponse", ...)`** for a centralized response shaping hook — stamp generic metadata, serialize errors consistently, and keep stack traces out of `payload` for 5xx.
- **Validation errors map automatically** — Joi `failAction: "error"` produces a 400-shaped Boom response; don't double-handle.

---

## 6. Lifecycle Hooks (server.ext)

- **`server.ext("onRequest" | "onPreAuth" | "onPreHandler" | "onPostHandler" | "onPreResponse")`** gives deterministic points for middleware-like concerns:

```ts
server.ext('onRequest', async (request, h) => {
  // earliest
  request.headers['x-request-id'] ??= crypto.randomUUID();
  return h.continue;
});
server.ext('onPreResponse', async (request, h) => {
  // last — error/response shaping
  if (request.response.isBoom && request.response.output.statusCode >= 500) {
    request.log('error', request.response);
  }
  return h.continue;
});
```

- **Use the earliest hook for request-id/logging; `onPreResponse` for consistent response/error envelope** — the whole request path flows through the same points.
- Return `h.continue` explicitly — that's how intended processing resumes.
- Prefer **route-scoped `options.pre`** for per-route guards/preconditions over app-wide hooks when the concern is narrow.

---

## 7. Caching

- **`server.method(name, fn, { cache: { expiresIn, generateTimeout } })`** — memoize expensive lookups (DB reads, tokens) with TTL and caching built in:

```ts
server.method('getUserCached', getUserById, {
  cache: { expiresIn: 30_000, generateTimeout: 2_000 },
});

const user = await server.methods.getUserCached(id);
```

- **Route-level `options.cache: { expiresIn }`** declares response caching declaratively; `request.server`/`catbox` backends plug in for Redis-level clustering.
- **Cache read-through with timeout** — `generateTimeout` prevents a slow source from blocking cached reads (stale-by-default, fails loud).
- **Invalidate deliberately** (`server.methods.clearCache` or cached key removal) on writes that affect the memo — never rely on TTL as your only coherence story for correctness-critical data.

---
