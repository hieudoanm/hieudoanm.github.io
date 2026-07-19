# Overview

Focused reference for **koa-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Koa.js Backend Best Practices

Koa (by the Express authors) replaces the `req`/`res` pair with a single request **`ctx`** and composes behaviour through _onion_ middleware: each layer `await next()`s into the next and resumes outward. Koa is deliberately bare — there's no router, body parser, or security middleware built in — so best practice is about assembling a disciplined middleware stack, keeping `ctx` access central, and choosing well-maintained companions (`@koa/router`, `koa-bodyparser`, `koa-helmet`).

---

## 1. Core Stack

- `koa` — the app (current v2/v3)
- `@koa/router` — routing (Koa ships none)
- `koa-bodyparser` — JSON/urlencoded body parsing (`limit` configurable)
- `koa-helmet` — security headers; `@koa/cors` — CORS policy
- `zod` — boundary validation
- `supertest` or `server.callback()` — integration tests

```bash
pnpm add koa @koa/router koa-bodyparser koa-helmet @koa/cors zod
```

- **Koa v3 is ESM-only; v2 is CJS** — pick per your module system and pin it (the ecosystem differs).

---

## 2. The Context Model

- **`ctx` is both request and response** — `ctx.method`, `ctx.url`, `ctx.params`/`ctx.request.body`, and output via `ctx.body`/`ctx.status`:

```ts
app.use(async (ctx) => {
  ctx.body = { ok: true, url: ctx.url };
});
```

- **Setting `ctx.body` is the response** — Koa serializes and assigns status; `ctx.body = null` means 204. Prefer assigning a value over mutating `ctx.res` directly.
- **`ctx.state` for per-request flow** — it carries authenticated/tenant info down the middleware chain without globals.
- **Never interact with `ctx.res` directly** unless you're writing a body streamer — Koa's abstraction is where logging, headers, and error mapping live.
