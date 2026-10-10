# QuickJS Best Practices

QuickJS is **a small, embeddable JS engine (nice perf, Tiny footprint) — used by Bun, deno, and as the embedded interpreter in many products** via the C library and Rust bindings. Practical QuickJS embeds in lean on **one JSContext per isolate with explicit lifetimes (JS_NewRuntime/JS_NewContext), memory limits and interrupts configured (JS_SetMemoryLimit, JS_SetMaxStackSize), and a tight object-lifecycle discipline...

## When to use

Use when writing, structuring, or reviewing QuickJS deployments.

## Core topics

- 1. Embedding Model
- 2. Limits & Interrupts
- 3. Values & Objects
- 4. Property & C Interop
- 5. Async & Workers
- 6. Rust & Bindings

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [QuickJS Best Practices: Basic Usage](./examples/basic-usage.md)
- [QuickJS Best Practices: 3. Values & Objects](./examples/reliability-and-edge-cases.md)
- [QuickJS Best Practices: 1. Embedding Model](./examples/setup-and-configuration.md)
- [QuickJS Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [QuickJS Best Practices: Decision Record](./assets/decision-record.md)
- [QuickJS Best Practices: Starter Template](./assets/starter-template.md)
- [QuickJS Best Practices: Validation Plan](./assets/validation-plan.md)
- [QuickJS Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
