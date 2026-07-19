# Ktor Backend Best Practices: Workflow Checklist

A practical run sheet for applying [Ktor Backend Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack: Kotlin **1.9+**; Ktor **2.x** (or engine pin in project — CIO/Netty)
- [ ] 1. Core Stack: kotlinx.serialization (or Jackson) for JSON
- [ ] 2. Application Setup & Plugins: **Install plugins explicitly** — Ktor features are reified via install, which is your whole configuration surface:
- [ ] 2. Application Setup & Plugins: **Keep Application.module minimal** — install plugins, then delegate routing to modules
- [ ] 3. Routing: **RESTful resource naming** (/users, /orders/{id}); **version explicitly** (/api/v1/...)
- [ ] 3. Routing: **Organize routes as Route extensions** — one file per resource, self-contained:
- [ ] 4. Coroutines & Async Discipline: **Coroutine-first design** — suspend functions everywhere; Ktor handlers are suspend
- [ ] 4. Coroutines & Async Discipline: **Structured concurrency** — use coroutineScope/explicit scopes; never leak GlobalScope into request handling
- [ ] 5. Serialization & DTOs: **kotlinx.serialization with @Serializable** for JSON — type-safe, multiplatform-friendly, Ktor-native:
- [ ] 5. Serialization & DTOs: **Explicit request/response models; no domain/entity leakage** — contracts stay stable even when internals change

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
