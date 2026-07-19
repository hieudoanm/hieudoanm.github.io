# Overview

Focused reference for **hono-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Hono.js Backend Best Practices

Hono is a small, standards-based TypeScript web framework that runs anywhere `fetch`/`Request`/`Response` do: Node, Bun, Deno, Cloudflare Workers, and browsers via adapters. Handlers get a `Request`-shaped `c.req` and return `Response`s, middleware is a flat `app.use` + `await next()` model, and types flow through route chains. Best practice here is about respecting the Web-standard shape (it's why the same code ports everywhere), using middleware as small `app.use` layers, and leaning on Hono's typed helpers instead of stringly routing.

---

## 1. Core Stack & Runtime Choice

- `hono` — the framework
- `@hono/node-server` (Node), Bun/Deno/Workers run `hono` via their native `fetch`/`serve` — one framework, choose the adapter per deployment
- `hono/zod-validator` for zod validation; `@hono/...` official middleware (logger, secure-headers, cors)
- `hono/client` and `hono/type-test` for typed-client + type-level tests

```bash
pnpm add hono @hono/node-server zod
```

- **Pick the adapter consciously** — `@hono/node-server` for Node, `Bun.serve` for Bun, `Deno.serve` for Deno, Workers export for the edge. The handlers are identical; the deployment story is the decision.
- Edge caveat: keep bundle small and avoid Node-only APIs (`fs`, `child_process`, npm-native) in code that must run on Workers — validate the runtime before using Node libs.

---

## 2. App & Route Structure

```ts
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => c.text('hello'));
app.get('/users/:id', (c) => c.json({ id: c.req.param('id') }));

const api = new Hono();
api.post('/users', validate('json', userCreateSchema), async (c) => {
  const input = c.req.valid('json');
  return c.json(await createUser(input), 201);
});
app.route('/api/v1', api);

export default app; // adapters import `app` and serve it
```

- **`c.req.param()`/`c.req.query()` return strings; validate before trusting** (see §4).
- **Nest routers via `app.route("/api/v1", api)`** — namespacing without string-concatenating early; per-resource `new Hono()` subtypes keep route definitions grouped.
- **`c.json()/c.text()/c.html()` helpers return `Response`s** — the handler contract is "return a Response"; no `res` mutation anywhere.
- **Export the `app` (not a started server)** so adapters and tests (`app.request()`) share one unit.

---
