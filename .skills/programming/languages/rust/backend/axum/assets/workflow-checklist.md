# Axum Best Practices: Workflow Checklist

A practical run sheet for applying [Axum Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack: Rust **latest stable**
- [ ] 1. Core Stack: Axum **latest stable**
- [ ] 3. Application Setup: **Router composition with state:**
- [ ] 4. Routing & Handlers: **Route definition with extractors:**
- [ ] 4. Routing & Handlers: **Use extractors for request data (Path, Query, Json, State).**
- [ ] 5. State Management: **Shared state via Arc:**
- [ ] 5. State Management: **Use Arc for shared state across async tasks.**
- [ ] 6. Error Handling: **Custom error types with IntoResponse:**
- [ ] 6. Error Handling: **Implement IntoResponse for custom error types.**
- [ ] 7. Middleware: **Tower middleware for cross-cutting concerns:**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
