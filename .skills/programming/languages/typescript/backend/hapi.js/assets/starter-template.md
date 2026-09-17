# Hapi.js Backend Best Practices: Starter Template

A reusable starting point derived from the **3. Routes (Config Objects)** section of [Hapi.js Backend Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
server.route({
  method: 'POST',
  path: '/',
  options: {
    auth: 'jwt',
    validate: {
      payload: Joi.object({
        name: Joi.string().min(1).required(),
        email: Joi.string().email().required(),
      }),
      params: Joi.object({ id: Joi.number().integer().positive() }),
    },
    handler: async (request, h) => {
      const created = await createUser(request.payload);
      return h.response(created).code(201); // response toolkit, not res
    },
  },
});
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
