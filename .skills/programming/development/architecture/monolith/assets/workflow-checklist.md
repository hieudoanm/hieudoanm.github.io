# Monolithic Architecture Best Practices: Workflow Checklist

A practical run sheet for applying [Monolithic Architecture Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Principles: **Single deployment unit** — entire application deployed as one unit
- [ ] 1. Core Principles: **Shared database** — typically uses a single database
- [ ] 2. Project Structure: **Layered architecture** — clear separation between layers
- [ ] 2. Project Structure: **Domain-driven design** — organize around business domains
- [ ] 3. Module Organization: **Domain modules** — organize by business domain:
- [ ] 3. Module Organization: **Shared kernel** — common functionality shared across domains
- [ ] 4. Database Design: **Single database** — typically one database for the entire application
- [ ] 4. Database Design: **Schema organization** — organize tables by domain:
- [ ] 5. API Design: **RESTful API** — design RESTful endpoints:
- [ ] 5. API Design: **Versioning** — implement API versioning

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
