# Deno Runtime Best Practices

Deno is a secure-by-default TypeScript-first runtime: modules come from URLs/JSR, permissions are granted explicitly per-run, everything standard ships in the runtime and deno_std, and the toolchain (fmt, lint, test, doc, compile) is built in. Best practice here is embracing that model — sandboxed permissions as a feature, URL/JSR modules without node_modules, Web-standard APIs by default, and letting the built-in tools be...

## When to use

Use when structuring or reviewing Deno scripts, servers, or tools.

## Core topics

- 1. Secure by Default (Permissions)
- 2. Modules & Dependencies
- 3. Code Organization
- 4. Web APIs & I/O
- 5. TypeScript & Strict Mode
- 6. Testing

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Deno Runtime Best Practices: Basic Usage](./examples/basic-usage.md)
- [Deno Runtime Best Practices: 2. Modules & Dependencies](./examples/reliability-and-edge-cases.md)
- [Deno Runtime Best Practices: 1. Secure by Default (Permissions)](./examples/setup-and-configuration.md)
- [Deno Runtime Best Practices: 6. Testing](./examples/testing-and-validation.md)

## Assets

- [Deno Runtime Best Practices: Decision Record](./assets/decision-record.md)
- [Deno Runtime Best Practices: Starter Template](./assets/starter-template.md)
- [Deno Runtime Best Practices: Validation Plan](./assets/validation-plan.md)
- [Deno Runtime Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
