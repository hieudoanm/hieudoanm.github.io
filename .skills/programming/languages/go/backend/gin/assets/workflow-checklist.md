# Gin Backend Best Practices: Workflow Checklist

A practical run sheet for applying [Gin Backend Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack: Go **1.21+**; Gin (latest stable)
- [ ] 1. Core Stack: Standard library first; add dependencies deliberately (DB driver, JWT lib)
- [ ] 2. Project Structure & Routing: **Separate layers clearly** — handler (HTTP), service (business), repository (data), domain (models):
- [ ] 2. Project Structure & Routing: **RESTful resource naming** (/users, /orders/:id); **version explicitly** (/api/v1/...)
- [ ] 3. Handlers & Middleware: **Thin handlers** — parse, call the service, map the result; no business logic:
- [ ] 3. Handlers & Middleware: **c.JSON, c.BindJSON, c.Param, c.Query** are the Gin surface — everything else is plain Go
- [ ] 4. Middleware Patterns: **Compose with router.Use(mw) for global, group.Use(mw) for route families**:
- [ ] 4. Middleware Patterns: **Auth/request-id/logging in middleware, exposed via c.Set/c.Get** — typed helpers avoid stringly context:
- [ ] 5. Validation: **Bind typed structs with tags** and let Gin validate via binding:
- [ ] 5. Validation: **Validate all external input; fail fast on invalid requests** — never trust client data

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
