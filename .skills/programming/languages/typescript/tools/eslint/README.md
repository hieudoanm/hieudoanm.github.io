# ESLint

ESLint is the de facto linter for JavaScript and TypeScript. Its value is not style enforcement — that is prettier.md's job — but **catching whole classes of bug** (unhandled promises, unsafe any, broken hook rules, shadowed globals) statically. Practical ESLint work leans on **flat config with defineConfig, type-aware linting via projectService, and a deliberately small rule set** — while language-level type guidance...

## When to use

Use when setting up, structuring, or debugging an ESLint configuration.

## Core topics

- 1. Flat Config Is the Only Format
- 2. TypeScript Integration
- 3. Typed Linting (the High-Value Part)
- 4. Rule Strategy
- 5. Monorepos & Overrides
- 6. Plugin Selection

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [ESLint: Basic Usage](./examples/basic-usage.md)
- [ESLint: Common Pitfalls](./examples/reliability-and-edge-cases.md)
- [ESLint: 1. Flat Config Is the Only Format](./examples/setup-and-configuration.md)
- [ESLint: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [ESLint: Decision Record](./assets/decision-record.md)
- [ESLint: Starter Template](./assets/starter-template.md)
- [ESLint: Validation Plan](./assets/validation-plan.md)
- [ESLint: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
