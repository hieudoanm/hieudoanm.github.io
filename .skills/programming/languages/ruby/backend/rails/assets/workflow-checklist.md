# Rails Backend Best Practices: Workflow Checklist

A practical run sheet for applying [Rails Backend Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Constraints: Ruby **3.2+**; Rails **7+**
- [ ] 1. Core Stack & Constraints: Active Record for persistence (knowing its trade-offs); Sidekiq/Active Job for background work
- [ ] 2. MVC Boundaries: **Skinny controllers** — HTTP orchestration only: params → validation → service/job → respond
- [ ] 2. MVC Boundaries: **Models own persistence + invariants** — validations, scopes, associations, and domain invariants
- [ ] 3. Architecture & Design Rates: **Explicit boundaries:**
- [ ] 3. Architecture & Design Rates: Controllers (HTTP)
- [ ] 4. Organizing Beyond `app/models`: **Not everything in app/models** — when complexity grows, organize by feature/domain:
- [ ] 4. Organizing Beyond `app/models`: **Rails is an application framework, not the domain** — the domain logic should survive outside Rails if ever needed; keep framework calls at the edges
- [ ] 5. Active Record Discipline: **Eager-load deliberately; avoid N+1** — includes/preload balanced against query size:
- [ ] 5. Active Record Discipline: **Know eager vs lazy loading** — default understanding of when AR loads collections and why

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
