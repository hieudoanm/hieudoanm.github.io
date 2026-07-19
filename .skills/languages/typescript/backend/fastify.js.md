---
name: fastify-backend
description: Best practices for building HTTP APIs and web services with Fastify (Node.js/TypeScript). Use when creating, structuring, or reviewing a Fastify app — covers plugin architecture, schema validation, hooks, encapsulation, error handling, and testing.
---

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

---

## 3. Schema Validation (The Fastify Way)

- **Declare JSON Schema per route** — validation _and serialization_ from one declaration; fast, typed, and enforced:

```ts
import { Type } from '@sinclair/typebox';
import type { FastifySchema } from 'fastify';

const bodySchema = Type.Object({
  name: Type.String({ minLength: 1 }),
  email: Type.String({ format: 'email' }),
});

const userCreateSchema = {
  body: bodySchema,
  response: {
    201: Type.Object({ id: Type.String(), email: Type.String() }),
  },
};

app.post('/', { schema: userCreateSchema }, async (req, reply) => {
  const { name, email } = req.body; // typed from the schema
  return reply.code(201).send({ id: genId(), email });
});
```

- **Validation is at the edge, for free** — validation errors return 400 automatically with the schema's issue list; no manual `if`s.
- **`response` schemas validate & serialize outgoing** — they shape the payload and (via the `response` map) guarantee a stable public contract, catching drift before it ships.
- **TypeBox/`json-schema-to-ts` so runtime and types agree** — pick one type-provider and register it once (`app.setValidatorCompiler(...)` via the provider plugin); don't mix.
- **Zod also first-class** (`@fastify/type-provider-zod`) if the team standard is zod — the point is _one_ provider, shared with the boundary-validation skills.

---

## 4. Hooks (Lifecycle)

- **Hooks are the middleware model** — composed per-route or global, awaited, order-explicit:

```ts
app.addHook('onRequest', authenticate); // runs before parsing
app.addHook('preValidation', (req, _rep, done) => done()); // after parsing, before schema
app.addHook('preHandler', checkPermission);
app.addHook('onSend', async (req, reply, payload) =>
  addSecurityHeaders(payload)
);
app.addHook('onResponse', (req) => logOutcome(req));
```

- **Prefix-hook with `app.addHook` inside a plugin** — scope auth/logging to a plugin's routes instead of the whole app (`onRequest` on the protected router plugin).
- **`preSerialization`/`onSend` for payload shaping**; avoid mutating response bodies late — validation & serialization already gate output.
- **Hook-to-route topology**: put generic concerns (logging, request-id, security) in early app-level hooks; business concerns (authz, tenant) in plugin/routes-level hooks.

---

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

## 8. Testing

- **`app.inject()`** — in-process, zero-network request testing (Fastify's built-in equivalent of supertest):

```ts
const res = await app.inject({
  method: 'POST',
  url: '/api/v1/users',
  payload: { name: 'Ada', email: 'ada@x.io' },
});
expect(res.statusCode).toBe(201);
expect(res.json().email).toBe('ada@x.io');
```

- **Build the app via a factory `buildApp()`** (register plugins, no `listen`) and `inject` after `await app.ready()` — the app object is the test fixture.
- **Assert the schema-invalid cases** (400 with issues), the 404 path, and that `response` schemas hold — the contract is your test spec.
- **Isolated services** — in-memory SQLite/test DB per suite; mock external HTTP at the boundary.

---

## 9. General Rules of Thumb

- **Register, don't sprinkle** — capabilities are plugins; app is a tree of `register`s with `prefix` scoping.
- **Schema once, used everywhere** — validation + serialization + types + docs all from one declaration; the compiler and the wire agree.
- **Hooks over scattered middleware** — lifecycle is explicit (`onRequest` → `preValidation` → `preHandler` → `onSend` → `onResponse`); keep order deterministic.
- **One error handler, one logger** — centralization is where observability lives.
- **Fastify expects its own ergonomics** — don't race to `express`-style freedom; the enforcement is the point.

---

## Quick-Start Checklist

- [ ] Capabilities as `fastify-plugin`s with clear `name`; routes `prefix`ed in their plugin
- [ ] Route `schema` (TypeBox/zod) set for body **and** response; one type provider chosen
- [ ] `preValidation`/`preHandler` hooks scoped per-plugin; generic concerns app-level
- [ ] Central `setErrorHandler` mapping domain errors → status + JSON shape
- [ ] `req.log` used for per-request context; no `console.*`
- [ ] `@fastify/helmet`/`cors`/`rate-limit` registered; `bodyLimit` configured
- [ ] Secrets redacted from logs; payload limits enforced
- [ ] `app.inject()` tests against a `buildApp()` factory
- [ ] `await app.ready()` before `listen`; single instance
- [ ] Outbound calls time-limited; no blocking I/O in handlers
