# Overview

Focused reference for **fastify-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Fastify.js Backend Best Practices

Fastify is the high-performance, plugin-architecture Node.js web framework: schema-first validation, Promise-based lifecycle, and a composition model where capabilities are `register`ed plugins. It's the natural upgrade from Express when you want enforceability (typed schemas, encapsulated state, timing/logging out of the box) without surrendering control. Best practice here is about leaning into plugins, schemas, and hooks — the three features that make a Fastify app coherent.

---

## 1. Core Stack

- `fastify` — the framework (v5 current)
- `@fastify/sensible`, `@fastify/helmet`, `@fastify/cors`, `@fastify/rate-limit` — security/middleware plugins
- `@fastify/type-provider-json-schema-to-ts` (or `typebox`) — typed schemas shared between runtime and types
- `pino` (built-in logger) — structured logging
- Zod via `@fastify/type-provider-zod` if you prefer zod schemas for validation

```bash
pnpm add fastify @fastify/helmet @fastify/cors @fastify/rate-limit
```

---

## 2. Plugin Architecture (Encapsulation)

- **Everything composable is a `fastify-plugin`** — plugins get their own encapsulated context, state, and decorators; apps are a tree of `register`ed plugins:

```ts
// src/plugins/config.ts
import fp from 'fastify-plugin';

export default fp(
  async (app, opts) => {
    const cfg = parseConfigFromEnv();
    app.decorate('config', cfg); // app.config available in nested scopes
    app.addHook('onClose', async () => {
      // cleanup hooks live with their plugin
      await closePools();
    });
  },
  { name: 'config' }
);

// src/app.ts
const app = Fastify({ logger: true });
await app.register(configPlugin);
await app.register(userRoutes, { prefix: '/api/v1/users' });
await app.ready(); // ensure all register-ed plugins loaded
await app.listen({ port: 3000 });
```

- **`register` is the composition unit** — routes, decorators, hooks, and validation schemas ship as plugins; overriding/streaming app state via `app.decorate` stays explicit.
- **Encapsulation is a feature** — `app.register` scopes plugins; a plugin's decorators/state don't leak to sibling scopes. Prefix routes inside the plugin (`{ prefix: "/api/v1/users" }`), don't concatenate paths.
- **`fastify-plugin` wrapper** marks a plugin as shared (its additions propagate up); plain `register`s stay encapsulated. Use `fp()` deliberately.
- Name `fastify-plugin` packages clearly (`{ name: "config" }`) so `app.printRoutes()` and the plugin graph stay legible.
