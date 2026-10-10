# LLRT Best Practices

LLRT (**Low Latency Runtime**) is **an optimized-embedding runtime (QuickJS-based) for AWS Lambda JS functions — cold starts ~2–5x faster than Node** with a trimmed engine surface. Practical LLRT leans on **explicit runtime pinning (aws-lambda-js-rt extension / binary download), staying inside the supported JS surface (no Node-only globals), small bundles, and measuring cold-start under your own load** — LLRT's wins come...

## When to use

Use when writing, structuring, or reviewing LLRT-based serverless.

## Core topics

- 1. Runtime Setup
- 2. Surface & Compatibility
- 3. Cold Start & Bundle
- 4. Async & Events
- 5. Logging & Observability
- 6. CI & Testing

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [LLRT Best Practices: Basic Usage](./examples/basic-usage.md)
- [LLRT Best Practices: 2. Surface & Compatibility](./examples/reliability-and-edge-cases.md)
- [LLRT Best Practices: 1. Runtime Setup](./examples/setup-and-configuration.md)
- [LLRT Best Practices: 6. CI & Testing](./examples/testing-and-validation.md)

## Assets

- [LLRT Best Practices: Decision Record](./assets/decision-record.md)
- [LLRT Best Practices: Starter Template](./assets/starter-template.md)
- [LLRT Best Practices: Validation Plan](./assets/validation-plan.md)
- [LLRT Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
