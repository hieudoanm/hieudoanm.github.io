# Fastify.js Backend Best Practices: 3. Schema Validation (The Fastify Way)

## Source guidance

This example applies the **3. Schema Validation (The Fastify Way)** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Declare JSON Schema per route** — validation _and serialization_ from one declaration; fast, typed, and enforced:
- **Validation is at the edge, for free** — validation errors return 400 automatically with the schema's issue list; no manual `if`s.
- **`response` schemas validate & serialize outgoing** — they shape the payload and (via the `response` map) guarantee a stable public contract, catching drift before it ships.
- **TypeBox/`json-schema-to-ts` so runtime and types agree** — pick one type-provider and register it once (`app.setValidatorCompiler(...)` via the provider plugin); don't mix.

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for fastify-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
