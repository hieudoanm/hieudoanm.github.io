# CQRS Best Practices: Workflow Checklist

A practical run sheet for applying [CQRS Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Principles: **Separation of concerns** — separate command (write) and query (read) models
- [ ] 1. Core Principles: **Optimized read models** — design read models for specific query needs
- [ ] 2. Architecture Overview: **Command side** — handles write operations and validation
- [ ] 2. Architecture Overview: **Query side** — handles read operations and optimization
- [ ] 3. Command Implementation: **Command objects** — define commands as immutable objects:
- [ ] 3. Command Implementation: **Command handlers** — implement command handlers:
- [ ] 4. Query Implementation: **Query objects** — define queries as read operations:
- [ ] 4. Query Implementation: **Query handlers** — implement query handlers:
- [ ] 5. Read Model Optimization: **Denormalized data** — design read models for specific queries:
- [ ] 5. Read Model Optimization: **Materialized views** — create materialized views for complex queries:

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
