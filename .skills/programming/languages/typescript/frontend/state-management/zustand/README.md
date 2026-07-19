# Zustand Best Practices

Zustand is a **minimal hook-based store** — a create() store with set/get returns a hook (useCountStore) where **selectors ((s) => s.count) drive granular re-renders**. Practical Zustand leans on **small stores per domain, selector functions over whole-store reads, actions as plain functions (no strict reducers)**, and **middleware (persist, devtools, immer) only where the feature is genuinely used**. The knobs are few —...

## When to use

Use when writing, structuring, or reviewing Zustand.

## Core topics

- 1. Creating a Store
- 2. Selectors & Re-renders
- 3. Actions & Async
- 4. Middleware
- 5. Store Composition
- 6. Testing

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Zustand Best Practices: Basic Usage](./examples/basic-usage.md)
- [Zustand Best Practices: 3. Actions & Async](./examples/reliability-and-edge-cases.md)
- [Zustand Best Practices: 2. Selectors & Re-renders](./examples/setup-and-configuration.md)
- [Zustand Best Practices: 6. Testing](./examples/testing-and-validation.md)

## Assets

- [Zustand Best Practices: Decision Record](./assets/decision-record.md)
- [Zustand Best Practices: Starter Template](./assets/starter-template.md)
- [Zustand Best Practices: Validation Plan](./assets/validation-plan.md)
- [Zustand Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
