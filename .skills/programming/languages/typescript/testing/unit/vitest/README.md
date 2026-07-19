# Vitest Best Practices

Vitest is the **Vite-native test runner** — near-zero-config for Vite projects, ESM-first, fast watch mode, Jest-compatible API combined with Vite's HMR and aliases. Practical Vitest leans on **expect matchers + vi mocks (Jest-style), config that leans on Vite resolve.alias, and test.environment matched to the target (node vs jsdom/happy-dom)** — with the same behavioral discipline: describe/it sentences, boundary mocking,...

## When to use

Use when writing, structuring, or reviewing Vitest suites.

## Core topics

- 1. Config
- 2. Structure & Matchers
- 3. Mocking
- 4. Watch & DX
- 5. DOM & Browser Mode
- 6. CI & Repeatability

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Vitest Best Practices: Basic Usage](./examples/basic-usage.md)
- [Vitest Best Practices: 3. Mocking](./examples/reliability-and-edge-cases.md)
- [Vitest Best Practices: 2. Structure & Matchers](./examples/setup-and-configuration.md)
- [Vitest Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Vitest Best Practices: Decision Record](./assets/decision-record.md)
- [Vitest Best Practices: Starter Template](./assets/starter-template.md)
- [Vitest Best Practices: Validation Plan](./assets/validation-plan.md)
- [Vitest Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
