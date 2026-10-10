# Node.js Runtime Best Practices

Node.js is a single-threaded, event-loop-based JavaScript runtime with a rich set of standard modules. The modern runtime has converged on ESM, node: (and node:test) built-ins, first-class fetch, and smooth TypeScript — so "best practice" is about writing non-blocking I/O, managing the process lifecycle explicitly, and using the well-trodden tools (node --watch, --env-file, node:test) instead of re-inventing them.

## When to use

Use when structuring or reviewing Node.js server, CLI, or library code.

## Core topics

- 1. Module System (ESM by Default)
- 2. The Event Loop & Non-Blocking I/O
- 3. Streams & Large Data
- 4. Process Lifecycle, Signals & Exit Codes
- 5. Files, Paths & Environment
- 6. HTTP & Networking

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Node.js Runtime Best Practices: Basic Usage](./examples/basic-usage.md)
- [Node.js Runtime Best Practices: 7. Errors & Logging](./examples/reliability-and-edge-cases.md)
- [Node.js Runtime Best Practices: 1. Module System (ESM by Default)](./examples/setup-and-configuration.md)
- [Node.js Runtime Best Practices: 8. Testing](./examples/testing-and-validation.md)

## Assets

- [Node.js Runtime Best Practices: Decision Record](./assets/decision-record.md)
- [Node.js Runtime Best Practices: Starter Template](./assets/starter-template.md)
- [Node.js Runtime Best Practices: Validation Plan](./assets/validation-plan.md)
- [Node.js Runtime Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
