# Javalin Best Practices: Workflow Checklist

A practical run sheet for applying [Javalin Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. App Setup & Wiring: **Javalin.create() with explicit handlers; the wiring is the app structure:**
- [ ] 1. App Setup & Wiring: **Fluent route registrations read top-down**; a named controller class per resource keeps the route table tidy
- [ ] 2. Handlers & Context: **Handler = void handle(Context); everything from the ctx:**
- [ ] 2. Handlers & Context: **Typed access**: ctx.pathParamAsClass, ctx.queryParamAsClass, ctx.bodyAsClass(Body.class) — parse + validate at the boundary:
- [ ] 3. Middleware & Filters: **app.before()/app.after() / app.use() for middleware layers:**
- [ ] 3. Middleware & Filters: **Scoped by path filter** (before("/api/*")) — middleware applies to the security domain, not the whole app
- [ ] 4. Validation & Errors: **Validate at the handler entry, fail fast:**
- [ ] 4. Validation & Errors: **exceptionHandler per exception class, registered once:**
- [ ] 5. Context & Request State: **Request-scoped data via ctx.attribute("key", value)/ctx.attribute("key")** — middleware can enrich context (auth user, request-id):
- [ ] 5. Context & Request State: **ctx.subRouter()/app.routes for mounting sub-apps** — a plugin/service exposes its own routes

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
