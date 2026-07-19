# Fastify.js Backend Best Practices: Starter Template

A reusable starting point derived from the **4. Hooks (Lifecycle)** section of [Fastify.js Backend Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
app.addHook('onRequest', authenticate); // runs before parsing
app.addHook('preValidation', (req, _rep, done) => done()); // after parsing, before schema
app.addHook('preHandler', checkPermission);
app.addHook('onSend', async (req, reply, payload) =>
  addSecurityHeaders(payload)
);
app.addHook('onResponse', (req) => logOutcome(req));
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
