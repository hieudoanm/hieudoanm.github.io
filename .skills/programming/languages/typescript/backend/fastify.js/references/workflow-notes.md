# Workflow notes

Focused reference for **fastify-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
