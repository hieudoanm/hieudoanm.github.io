# C Best Practices

C (C11/C17) is a small language with no safety net: manual memory management, no exceptions, no strings, no containers. Practical C leans on **explicit ownership, fail-fast error contracts, and discipline enforced by tooling** — sanitizers and analyzers are not optional extras, they are the code getting reviewed. Every function signature is a contract: parameters in, results out, errors up.

## When to use

Use when writing, structuring, or reviewing C.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [C Best Practices: Basic Usage](./examples/basic-usage.md)
- [C Best Practices: 4. Error Handling](./examples/reliability-and-edge-cases.md)
- [C Best Practices: 3. Types, Qualifiers & Integers](./examples/setup-and-configuration.md)
- [C Best Practices: 10. Testing](./examples/testing-and-validation.md)

## Assets

- [C Best Practices: Decision Record](./assets/decision-record.md)
- [C Best Practices: Starter Template](./assets/starter-template.md)
- [C Best Practices: Validation Plan](./assets/validation-plan.md)
- [C Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
