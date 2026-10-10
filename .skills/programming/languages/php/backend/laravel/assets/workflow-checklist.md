# Laravel Backend Best Practices: Workflow Checklist

A practical run sheet for applying [Laravel Backend Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Constraints: Laravel **10+**; PHP **8.2+**
- [ ] 1. Core Stack & Constraints: Eloquent ORM (knowing its trade-offs); queues/jobs/events; Horizon for monitoring queues
- [ ] 2. MVC & Layering: **Thin controllers, fat domain/services** — controllers orchestrate HTTP only: Validate → dispatch Action → respond
- [ ] 2. MVC & Layering: **Form Requests for validation** — request objects carry validation + authorization:
- [ ] 3. Eloquent Discipline: **Use Eloquent deliberately, not everywhere** — accept Read/Write trade-offs; raw SQL where queries get complex or hot
- [ ] 3. Eloquent Discipline: **Avoid magic attributes without casts** — always $casts for typed values; no implicit type juggling:
- [ ] 4. Validation: **Validate input early via Form Requests** — authorization + rules colocated with the request
- [ ] 4. Validation: **Fail fast on invalid input** — Laravel's validation redirects/422s before business logic runs
- [ ] 5. Service Container & DI: **Prefer dependency injection over facades in domain logic** — facades are fine at HTTP/edge layers; inject for testability:
- [ ] 5. Service Container & DI: **Avoid overusing facades in domain logic** and global helpers outside edges — resolve dependencies explicitly

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
