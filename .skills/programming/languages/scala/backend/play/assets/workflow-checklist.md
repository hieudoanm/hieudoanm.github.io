# Play Framework Backend Best Practices: Workflow Checklist

A practical run sheet for applying [Play Framework Backend Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Constraints: Scala **2.13+** or **Scala 3**; Play Framework **latest LTS**
- [ ] 1. Core Stack & Constraints: Play JSON (play-json) or Circe for serialization
- [ ] 2. Project Structure & Architecture: **Separate layers clearly** — controllers, services, repositories, models/domain:
- [ ] 2. Project Structure & Architecture: **RESTful resource naming** (/users, /orders/:id); **version explicitly** (/api/v1/...)
- [ ] 3. Controllers (Thin HTTP Layer): **Controllers return actions** — Action.async when the body is async:
- [ ] 3. Controllers (Thin HTTP Layer): **@Inject() constructor injection** — Play's compile-time or runtime DI; no object singletons for state
- [ ] 4. Async & Non-Blocking Discipline: **Async-first design** — Future-returning services; non-blocking APIs; controllers Action.async
- [ ] 4. Async & Non-Blocking Discipline: **Never block the default execution context** — no .toBlocking(), no Await.result, no thread-sleep inside actions:
- [ ] 5. JSON & DTOs: **Play JSON via Json.toJson/Json.format** — defined on DTOs at the API boundary:
- [ ] 5. JSON & DTOs: **Explicit serialization at the edge** — services return domain models; controllers map to DTO formats

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
