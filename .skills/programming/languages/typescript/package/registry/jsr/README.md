# JSR Best Practices

JSR (jsr.io) is **a modern registry for TypeScript-first packages, designed to work with Deno, Node, and the browser** — publishing via jsr publish with deno.json/jsr.json metadata and a source-driven package (JSR is native to JSR-typed Deno; interop via npm: and jsr: specifiers). Practical JSR leans on **a clean scope/name, an explicit deno.json { exports, name, version }, publishing from CI with --allow-dirty gates, and...

## When to use

Use when writing, structuring, or reviewing JSR packages.

## Core topics

- 1. Package Metadata
- 2. Source-First Structure
- 3. Runtime Compatibility
- 4. Publishing & CI
- 5. Consuming JSR
- 6. Hygiene & Security

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [JSR Best Practices: Basic Usage](./examples/basic-usage.md)
- [JSR Best Practices: 6. Hygiene & Security](./examples/reliability-and-edge-cases.md)
- [JSR Best Practices: 2. Source-First Structure](./examples/setup-and-configuration.md)
- [JSR Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [JSR Best Practices: Decision Record](./assets/decision-record.md)
- [JSR Best Practices: Starter Template](./assets/starter-template.md)
- [JSR Best Practices: Validation Plan](./assets/validation-plan.md)
- [JSR Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
