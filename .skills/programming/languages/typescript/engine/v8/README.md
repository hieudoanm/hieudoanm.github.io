# V8 Best Practices

V8 is **Google's JavaScript engine (Chrome, Node.js, Electron, Deno, Bun)** — code is JIT-compiled across tiers (Ignition interpreter → Sparkplug/TurboFan optimizing compiler). Practical V8-aware code leans on **stable object shape for fast hidden-class paths (monomorphic), typed arrays for numeric buffers, and profiler-guided optimization (%OptimizeFunctionOnNextCall is a debugging tool, not a production lever)** — most...

## When to use

Use when writing, structuring, or reviewing code that targets V8.

## Core topics

- 1. Object Shape & Monomorphism
- 2. Typed Arrays & Numeric Work
- 3. Deoptimization Traps
- 4. Memory & GC
- 5. Profiling & Tooling
- 6. Multi-Threading (Workers)

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [V8 Best Practices: Basic Usage](./examples/basic-usage.md)
- [V8 Best Practices: 6. Multi-Threading (Workers)](./examples/reliability-and-edge-cases.md)
- [V8 Best Practices: 2. Typed Arrays & Numeric Work](./examples/setup-and-configuration.md)
- [V8 Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [V8 Best Practices: Decision Record](./assets/decision-record.md)
- [V8 Best Practices: Starter Template](./assets/starter-template.md)
- [V8 Best Practices: Validation Plan](./assets/validation-plan.md)
- [V8 Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
