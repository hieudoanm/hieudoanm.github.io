# Hexagonal Architecture Best Practices: Workflow Checklist

A practical run sheet for applying [Hexagonal Architecture Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Principles: **Domain isolation** — core domain logic is isolated from external concerns
- [ ] 1. Core Principles: **Port interfaces** — define interfaces for external interactions
- [ ] 2. Architecture Overview: **Primary adapters** — driving adapters (API, CLI, UI)
- [ ] 2. Architecture Overview: **Secondary adapters** — driven adapters (Database, Message Queue, External API)
- [ ] 3. Domain Layer: **Domain entities** — define core domain entities:
- [ ] 3. Domain Layer: **Domain services** — implement domain services:
- [ ] 4. Port Interfaces: **Primary ports** — define interfaces for driving adapters:
- [ ] 4. Port Interfaces: **Secondary ports** — define interfaces for driven adapters:
- [ ] 5. Adapter Implementations: **Primary adapters** — implement driving adapters:
- [ ] 5. Adapter Implementations: **Secondary adapters** — implement driven adapters:

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
