# Workflow notes

Focused reference for **hapi-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Routes (Config Objects)

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

- **Routes are declarations** — `method`/`path`/`options` (auth, validation, cache) describe the contract; the `handler` just executes the validated request.
- **`h.response(...).code(201)`** — the response toolkit builds the reply; return it from `async` handlers. Never touch `request.raw.res` directly.
- **`request.params`/`query`/`payload` are already validated** when `validate` is set — handlers can trust them (unlike Express/Koa hand-rolling).
- **`failAction: "error"`** makes validation failures throw (mapped to 400 with `request.info` detail); `"log"` returns 400 without throwing on unexpected key shapes in dev/CI fidelity.

---

## 4. Validation (Joi)

- **Joi at the route edge, `failAction: "error"`** — schemas for `payload`, `params`, `query`, and `headers` where relevant; no manual `if`s:

```ts
const userCreate = Joi.object({
  name: Joi.string().min(1).max(200).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('USER', 'ADMIN').default('USER'),
});
```

- **Coerce and default in the schema** (`Joi.number()`, `.default(...)`, `.allow("", null)`) so handlers receive normalized data.
- **`Joi.any().unknown(true)` only for open-ended payloads** — prefer strict, closed shapes for APIs you control.
- **Cross-field constraints** (`Joi.object().and("a", "b")`, `.oxor(...)`) express invariants Joi understands natively; keep schemas colocated with each route's `options.validate`.

---

## 5. Errors (Boom)

- **`Boom` errors are the error vocabulary** — `throw Boom.notFound("user missing")`, `Boom.badRequest("invalid payload")`, `Boom.unauthorized(…)`, `Boom.conflict(…)`:

```ts
const user = await findUser(id);
if (!user) throw Boom.notFound(`user ${id} not found`);
```
