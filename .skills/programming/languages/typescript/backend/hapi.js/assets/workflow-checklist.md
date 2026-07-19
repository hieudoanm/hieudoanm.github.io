# Hapi.js Backend Best Practices: Workflow Checklist

A practical run sheet for applying [Hapi.js Backend Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack: @hapi/hapi — the framework (v21 current, CJS)
- [ ] 1. Core Stack: joi (or @hapi/joi) — schema validation for routes (the hapi-native style)
- [ ] 2. Server Construction & Plugins: **One server, expressed config-first** — port, routes, and global route options (routes: { cors, validate }) declared at construction, not scattered in handlers
- [ ] 2. Server Construction & Plugins: **Plugins via server.register([...])** — each plugin owns routes, hooks, and methods; prefix routes at _registration_ (routes: { prefix }), not by string-concatenating paths
- [ ] 3. Routes (Config Objects): **Routes are declarations** — method/path/options (auth, validation, cache) describe the contract; the handler just executes the validated request
- [ ] 3. Routes (Config Objects): **h.response(...).code(201)** — the response toolkit builds the reply; return it from async handlers. Never touch request.raw.res directly
- [ ] 4. Validation (Joi): **Joi at the route edge, failAction: "error"** — schemas for payload, params, query, and headers where relevant; no manual ifs:
- [ ] 4. Validation (Joi): **Coerce and default in the schema** (Joi.number(), .default(...), .allow("", null)) so handlers receive normalized data
- [ ] 5. Errors (Boom): **Boom errors are the error vocabulary** — throw Boom.notFound("user missing"), Boom.badRequest("invalid payload"), Boom.unauthorized(…), Boom.conflict(…):
- [ ] 5. Errors (Boom): **Map domain→Boom in the service boundary or handler**, never in every call site — a small translator converts typed domain errors to Boom.* with client-safe messages

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
