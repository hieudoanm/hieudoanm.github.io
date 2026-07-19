# tRPC Best Practices: Workflow Checklist

A practical run sheet for applying [tRPC Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Router Structure: **Routers compose by namespace — small domain routers merged into a root:**
- [ ] 1. Router Structure: **One router per domain; the merged appRouter is the API root.**
- [ ] 2. Procedures & Input Schemas: **zod input/output on every procedure — untrusted input dies at the boundary:**
- [ ] 2. Procedures & Input Schemas: **Output types derived from what you return** (.input(...).output(...) or inference) — the schema is the type, no drift
- [ ] 3. Context: **Context is built per request (createContext) — request-scoped data only:**
- [ ] 3. Context: **No global mutable state in context** — it's the req-shaped contract; middlewares push values
- [ ] 4. Middleware & Authorization: **Procedure middleware wraps logic; auth/rate-limit/logging as middleware:**
- [ ] 4. Middleware & Authorization: **Common middleware (protectedProcedure, adminProcedure) = the security boundary** — attach at the procedure, not per-handler checks
- [ ] 5. Error Handling: **TRPCError with a code + message is the error contract; map domain errors to codes:**
- [ ] 5. Error Handling: **An error-formatter maps unknown → INTERNAL_SERVER_ERROR at the boundary** — service-layer exceptions converted to codes; never leak stack traces

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
