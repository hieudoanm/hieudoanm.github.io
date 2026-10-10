# Fastify.js Backend Best Practices: Workflow Checklist

A practical run sheet for applying [Fastify.js Backend Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack: fastify — the framework (v5 current)
- [ ] 1. Core Stack: @fastify/sensible, @fastify/helmet, @fastify/cors, @fastify/rate-limit — security/middleware plugins
- [ ] 2. Plugin Architecture (Encapsulation): **Everything composable is a fastify-plugin** — plugins get their own encapsulated context, state, and decorators; apps are a tree of registered plugins:
- [ ] 2. Plugin Architecture (Encapsulation): **register is the composition unit** — routes, decorators, hooks, and validation schemas ship as plugins; overriding/streaming app state via app.decorate stays explicit
- [ ] 3. Schema Validation (The Fastify Way): **Declare JSON Schema per route** — validation _and serialization_ from one declaration; fast, typed, and enforced:
- [ ] 3. Schema Validation (The Fastify Way): **Validation is at the edge, for free** — validation errors return 400 automatically with the schema's issue list; no manual ifs
- [ ] 4. Hooks (Lifecycle): **Hooks are the middleware model** — composed per-route or global, awaited, order-explicit:
- [ ] 4. Hooks (Lifecycle): **Prefix-hook with app.addHook inside a plugin** — scope auth/logging to a plugin's routes instead of the whole app (onRequest on the protected router plugin)
- [ ] 5. Error Handling: **Structured errors are first-class** — the built-in logger emits JSON, and app.setErrorHandler sets the central contract:
- [ ] 5. Error Handling: **Domain → HTTP mapping centrally** — services throw typed errors (NotFoundError → 404); let the error handler translate, never reply.send inside services

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
