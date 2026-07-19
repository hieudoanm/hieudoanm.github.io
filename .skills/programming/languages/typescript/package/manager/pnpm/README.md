# pnpm Best Practices

pnpm is **a strict, disk-efficient package manager** — content-addressed global store symlinked into projects, with **strict node_modules isolation** (no phantom deps). Practical pnpm leans on **a committed lockfile (pnpm-lock.yaml) with frozenLockfile in CI, a shared global store (--store-dir) for disk savings, workspaces for monorepos, and deliberate overrides/peer handling** — isolation is the safety feature: packages...

## When to use

Use when writing, structuring, or reviewing pnpm.

## Core topics

- 1. Install & Lockfile
- 2. Store & Disk
- 3. Strictness & Phantom Deps
- 4. Workspaces
- 5. Overrides & Struggles
- 6. CI & Security

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [pnpm Best Practices: Basic Usage](./examples/basic-usage.md)
- [pnpm Best Practices: 6. CI & Security](./examples/reliability-and-edge-cases.md)
- [pnpm Best Practices: 1. Install & Lockfile](./examples/setup-and-configuration.md)
- [pnpm Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [pnpm Best Practices: Decision Record](./assets/decision-record.md)
- [pnpm Best Practices: Starter Template](./assets/starter-template.md)
- [pnpm Best Practices: Validation Plan](./assets/validation-plan.md)
- [pnpm Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
