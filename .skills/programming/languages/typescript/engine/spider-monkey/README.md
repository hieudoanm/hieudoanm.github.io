# SpiderMonkey Best Practices

SpiderMonkey (SM) is **Mozilla's JS engine (Firefox, and the FirefoxOS / embedded contexts)** — with a pipeline of interpreter → baseline JIT → Ion (tiered optimization) plus a bytecode-to-native compiler. Practical SM-aware code follows the same shape-discipline but with SM's specifics: **stable hidden classes (current "group"/shape), consistent call-site types for Ion, generated structures to avoid getter/setter surprise...

## When to use

Use when writing, structuring, or reviewing code that targets SM.

## Core topics

- 1. Hidden Classes & Shapes
- 2. JIT Tiers & Ion
- 3. Typed Structures & Works-with
- 4. Stability & Compatibility
- 5. Memory & GC
- 6. Diagnostics & Profiling

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [SpiderMonkey Best Practices: Basic Usage](./examples/basic-usage.md)
- [SpiderMonkey Best Practices: Overview](./examples/reliability-and-edge-cases.md)
- [SpiderMonkey Best Practices: 3. Typed Structures & Works-with](./examples/setup-and-configuration.md)
- [SpiderMonkey Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [SpiderMonkey Best Practices: Decision Record](./assets/decision-record.md)
- [SpiderMonkey Best Practices: Starter Template](./assets/starter-template.md)
- [SpiderMonkey Best Practices: Validation Plan](./assets/validation-plan.md)
- [SpiderMonkey Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
