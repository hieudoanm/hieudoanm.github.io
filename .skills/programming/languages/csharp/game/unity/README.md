# Unity Best Practices

Unity builds scenes from **GameObjects with Components** — C# scripts attached to entities — and a per-frame game loop (Update/FixedUpdate). Practical Unity leans on **component-per-concern composition, SerializeField/[RequireComponent] as the editor contract, an event/store for cross-system communication**, and **object pooling + asset loading discipline so the runtime stays allocation-free in hot paths**`. Unity is...

## When to use

Use when writing, structuring, or reviewing Unity C#.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Unity Best Practices: Basic Usage](./examples/basic-usage.md)
- [Unity Best Practices: 7. Performance](./examples/reliability-and-edge-cases.md)
- [Unity Best Practices: 1. Project & Folder Structure](./examples/setup-and-configuration.md)
- [Unity Best Practices: 9. Testing & Code Quality](./examples/testing-and-validation.md)

## Assets

- [Unity Best Practices: Decision Record](./assets/decision-record.md)
- [Unity Best Practices: Starter Template](./assets/starter-template.md)
- [Unity Best Practices: Validation Plan](./assets/validation-plan.md)
- [Unity Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
