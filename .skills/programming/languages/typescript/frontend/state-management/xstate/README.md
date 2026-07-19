# XState Best Practices

XState models **state machines & statecharts** — a machine is a graph of states with on transitions triggered by events, guarded by guards and executed by actions. Practical XState leans on **machines that mirror the domain's real state space (idle/loading/ready/error), events as the only input, guards for decision boundaries, actions for pure (or invoke-mediated) effects**, and **actors for living instances**. A machine...

## When to use

Use when writing, structuring, or reviewing XState (v5).

## Core topics

- 1. Defining a Machine
- 2. Guards
- 3. Actions & Effects
- 4. Actors & Orchestration
- 5. Persistence & Interop
- 6. Testing

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [XState Best Practices: Basic Usage](./examples/basic-usage.md)
- [XState Best Practices: 4. Actors & Orchestration](./examples/reliability-and-edge-cases.md)
- [XState Best Practices: 3. Actions & Effects](./examples/setup-and-configuration.md)
- [XState Best Practices: 6. Testing](./examples/testing-and-validation.md)

## Assets

- [XState Best Practices: Decision Record](./assets/decision-record.md)
- [XState Best Practices: Starter Template](./assets/starter-template.md)
- [XState Best Practices: Validation Plan](./assets/validation-plan.md)
- [XState Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
