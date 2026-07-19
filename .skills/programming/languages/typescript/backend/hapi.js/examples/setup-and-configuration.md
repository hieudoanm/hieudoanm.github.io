# Hapi.js Backend Best Practices: 3. Routes (Config Objects)

## Source guidance

This example applies the **3. Routes (Config Objects)** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Routes are declarations** — `method`/`path`/`options` (auth, validation, cache) describe the contract; the `handler` just executes the validated request.
- **`h.response(...).code(201)`** — the response toolkit builds the reply; return it from `async` handlers. Never touch `request.raw.res` directly.
- **`request.params`/`query`/`payload` are already validated** when `validate` is set — handlers can trust them (unlike Express/Koa hand-rolling).
- **`failAction: "error"`** makes validation failures throw (mapped to 400 with `request.info` detail); `"log"` returns 400 without throwing on unexpected key shapes in dev/CI fidelity.

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for hapi-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
