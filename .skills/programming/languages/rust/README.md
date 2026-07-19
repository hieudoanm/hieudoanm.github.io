# Rust Best Practices

Rust's compiler already enforces memory safety and a huge class of bugs — "best practice" here is mostly about working _with_ the ownership model instead of fighting it with excessive clone()/Rc<RefCell<>>, and following the ecosystem's strong conventions around errors, traits, and module layout.

## When to use

Use when writing, structuring, or reviewing Rust code.

## Core topics

- 1. Project Structure
- 2. Ownership & Borrowing
- 3. Error Handling
- 4. Traits & Generics
- 5. Testing
- 6. Tooling (Non-negotiable)

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Rust Best Practices: Basic Usage](./examples/basic-usage.md)
- [Rust Best Practices: 3. Error Handling](./examples/reliability-and-edge-cases.md)
- [Rust Best Practices: 1. Project Structure](./examples/setup-and-configuration.md)
- [Rust Best Practices: 5. Testing](./examples/testing-and-validation.md)

## Assets

- [Rust Best Practices: Decision Record](./assets/decision-record.md)
- [Rust Best Practices: Starter Template](./assets/starter-template.md)
- [Rust Best Practices: Validation Plan](./assets/validation-plan.md)
- [Rust Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
