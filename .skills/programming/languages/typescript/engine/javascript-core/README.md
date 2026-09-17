# JavaScriptCore Best Practices

JavaScriptCore (JSC) is **Apple's JS engine (WebKit, Safari, iOS/macOS JavaScript apps)** — with its own pipeline: parser → baseline JIT → DFG → FTL. Practical JSC-aware code shares V8-ish principles but with engine-specific levers: **stable shapes & monomorphic call sites still win; --useJIT/diagnostics via Safari's Performance tooling, not recipe-guessing** — steer code toward the fast paths JSC exposes, and read JSC's...

## When to use

Use when writing, structuring, or reviewing code that targets JSC.

## Core topics

- 1. Shapes & Caching
- 2. JIT Tiers & Warmup
- 3. Typed Arrays & Big-Int
- 4. Memory & GC (JSC's generational GC)
- 5. Debugging & Diagnostics
- 6. Multi-Isolate & Workers

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [JavaScriptCore Best Practices: Basic Usage](./examples/basic-usage.md)
- [JavaScriptCore Best Practices: Overview](./examples/reliability-and-edge-cases.md)
- [JavaScriptCore Best Practices: 1. Shapes & Caching](./examples/setup-and-configuration.md)
- [JavaScriptCore Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [JavaScriptCore Best Practices: Decision Record](./assets/decision-record.md)
- [JavaScriptCore Best Practices: Starter Template](./assets/starter-template.md)
- [JavaScriptCore Best Practices: Validation Plan](./assets/validation-plan.md)
- [JavaScriptCore Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
