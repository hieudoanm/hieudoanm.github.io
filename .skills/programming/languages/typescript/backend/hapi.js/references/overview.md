# Overview

Focused reference for **hapi-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Hapi.js Backend Best Practices

hapi is a configuration-driven Node.js framework built on plugins and a rich request lifecycle: you _describe_ servers, routes, validation, auth, and cache in config objects, and hapi enforces them. Its strengths — explicit lifecycle hooks, Joi validation, Boom errors, built-in caching — shine in large, stable APIs. Note hapi is in maintenance mode on the npm `hapi`/`@hapi/hapi` line, so prefer it for legacy consistency; reach for Fastify unless this architecture pattern is already proven in the codebase.

---

## 1. Core Stack

- `@hapi/hapi` — the framework (v21 current, CJS)
- `joi` (or `@hapi/joi`) — schema validation for routes (the hapi-native style)
- `@hapi/boom` — HTTP-friendly thrown errors
- `@hapi/vision`/`@hapi/inert` where templating/static serving is needed
- `@hapi/cookie`/`hapi-auth-jwt2` for auth strategies

```bash
pnpm add @hapi/hapi joi @hapi/boom
```

- **TypeScript support** (`@types/hapi__hapi`) exists but hapi's config-first style reads best when decorated types (`Server`, `Request`, `ResponseToolkit`) are used deliberately on handlers.

---

## 2. Server Construction & Plugins

```ts
import Hapi from '@hapi/hapi';

const server = Hapi.server({
  port: 3000,
  host: '0.0.0.0',
  routes: {
    cors: { origin: ['https://app.example.com'] },
    validate: { failAction: 'error' },
  },
});

await server.register([
  { plugin: userRoutes, routes: { prefix: '/api/v1/users' } },
  { plugin: loggingPlugin },
]);

await server.start();
console.log(`listening on ${server.info.uri}`);
```

- **One server, expressed config-first** — port, routes, and global route options (`routes: { cors, validate }`) declared at construction, not scattered in handlers.
- **Plugins via `server.register([...])`** — each plugin owns routes, hooks, and methods; prefix routes at _registration_ (`routes: { prefix }`), not by string-concatenating paths.
- **`await server.start()`** for listen; for tests, `server.inject()` without ever binding a port.
- **`server.decorate()`/`server.method()`** to expose shared capabilities (services, cached lookups) on `server`/`request` context.

---
