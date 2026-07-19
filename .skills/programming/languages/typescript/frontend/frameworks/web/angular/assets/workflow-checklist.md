# Angular Best Practices: Workflow Checklist

A practical run sheet for applying [Angular Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack: Angular **latest stable**
- [ ] 1. Core Stack: TypeScript **strict mode**
- [ ] 2. Project Structure: **Feature modules** — organize by feature, not by type
- [ ] 2. Project Structure: **Core module** — for singleton services and one-time-only imports
- [ ] 3. Components: **Single Responsibility** — components should have one clear purpose:
- [ ] 3. Components: **Smart vs Dumb components** — separate container components from presentational components
- [ ] 4. Services & Dependency Injection: **Services for business logic** — keep business logic in services:
- [ ] 4. Services & Dependency Injection: **Dependency injection** — use constructor injection:
- [ ] 5. RxJS & Reactive Programming: **Observables for async operations** — use Observables for HTTP calls:
- [ ] 5. RxJS & Reactive Programming: **Async pipe** — use async pipe in templates:

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
