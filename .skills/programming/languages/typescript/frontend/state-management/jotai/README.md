# Jotai Best Practices

Jotai is an **atomic state library** — every piece of state is an atom([])/atom(value) with fine-grained subscriptions; components read with useAtomValue and write with useSetAtom/useAtom. Practical Jotai leans on **small atoms (one concept each), derived atoms for computed state (no manual syncing), async atoms for data that arrives outside React**, and **Provider scoping for testability and multi-store pages**. "Atom =...

## When to use

Use when writing, structuring, or reviewing Jotai.

## Core topics

- 1. Atoms & Basic Usage
- 2. Derived Atoms
- 3. Async Atoms
- 4. Persistence
- 5. Selectors & Performance
- 6. Providers & Testability

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Jotai Best Practices: Basic Usage](./examples/basic-usage.md)
- [Jotai Best Practices: 5. Selectors & Performance](./examples/reliability-and-edge-cases.md)
- [Jotai Best Practices: 3. Async Atoms](./examples/setup-and-configuration.md)
- [Jotai Best Practices: 6. Providers & Testability](./examples/testing-and-validation.md)

## Assets

- [Jotai Best Practices: Decision Record](./assets/decision-record.md)
- [Jotai Best Practices: Starter Template](./assets/starter-template.md)
- [Jotai Best Practices: Validation Plan](./assets/validation-plan.md)
- [Jotai Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
