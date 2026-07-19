# Bun Runtime Best Practices

Bun is an all-in-one JavaScript/TypeScript runtime, bundler, transpiler, test runner, and package manager. It executes .ts/.tsx natively, implements web-standard APIs (fetch, WebSocket, Request/Response, Blob), and ships a fast filesystem, database (bun:sqlite), and shell-command layer. Best practice here is to lean into Bun's built-ins — Bun.serve/Bun.file/Bun.$/bun:test — instead of bolting on the node-style toolchain...

## When to use

Use when structuring or reviewing Bun servers, CLIs, scripts, or tests.

## Core topics

- 1. Runtime Foundations
- 2. Serving HTTP (Bun.serve)
- 3. File I/O & Blobs
- 4. Shell & Scripting (Bun.$, bunx)
- 5. Testing (bun:test)
- 6. The Package Manager

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Bun Runtime Best Practices: Basic Usage](./examples/basic-usage.md)
- [Bun Runtime Best Practices: 3. File I/O & Blobs](./examples/reliability-and-edge-cases.md)
- [Bun Runtime Best Practices: 5. Testing (bun:test)](./examples/setup-and-configuration.md)
- [Bun Runtime Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Bun Runtime Best Practices: Decision Record](./assets/decision-record.md)
- [Bun Runtime Best Practices: Starter Template](./assets/starter-template.md)
- [Bun Runtime Best Practices: Validation Plan](./assets/validation-plan.md)
- [Bun Runtime Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
