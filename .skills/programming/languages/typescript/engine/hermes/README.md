# Hermes Best Practices

Hermes is **Meta's JS engine optimized for React Native/Android — precompiled bytecode, low-memory footprint, and fast startup** (no JIT; ahead-of-time bytecode and a compact GC). Practical Hermes-aware code leans on **writing for the interpreter's reality (no JIT warmup hand-waves), keeping the initial module graph small for cold start, careful memory ownership (Engine.release vs image absence), and testing under RN's...

## When to use

Use when writing, structuring, or reviewing Hermes-targeted code.

## Core topics

- 1. Bytecode & Startup
- 2. No-JIT Discipline
- 3. Memory & GC
- 4. React Native Integration
- 5. Compatibility & Debugging

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Hermes Best Practices: Basic Usage](./examples/basic-usage.md)
- [Hermes Best Practices: 1. Bytecode & Startup](./examples/reliability-and-edge-cases.md)
- [Hermes Best Practices: Overview](./examples/setup-and-configuration.md)
- [Hermes Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Hermes Best Practices: Decision Record](./assets/decision-record.md)
- [Hermes Best Practices: Starter Template](./assets/starter-template.md)
- [Hermes Best Practices: Validation Plan](./assets/validation-plan.md)
- [Hermes Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
