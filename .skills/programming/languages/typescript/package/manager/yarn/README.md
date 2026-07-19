# Yarn Best Practices

Yarn is **a package manager focused on reliability and speed** — available as Yarn Classic (v1, node_modules) and Yarn Modern (v4+, with **Plug'n'Play / Zero-Install**). Practical Yarn leans on **sticking to ONE major version per repo (mixing v1/v4 configs breaks), committing the lockfile (yarn.lock), choosing node_modules vs PnP deliberately, and yarn classic-only flags gated in CI** — Pin the toolchain: corepack + a...

## When to use

Use when writing, structuring, or reviewing Yarn projects.

## Core topics

- 1. Choosing Yarn & Version
- 2. Lockfiles & Install
- 3. PnP vs node_modules
- 4. Workspaces & Monorepos
- 5. Scripts & Lifecycle
- 6. Security & CI

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Yarn Best Practices: Basic Usage](./examples/basic-usage.md)
- [Yarn Best Practices: 6. Security & CI](./examples/reliability-and-edge-cases.md)
- [Yarn Best Practices: 1. Choosing Yarn & Version](./examples/setup-and-configuration.md)
- [Yarn Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Yarn Best Practices: Decision Record](./assets/decision-record.md)
- [Yarn Best Practices: Starter Template](./assets/starter-template.md)
- [Yarn Best Practices: Validation Plan](./assets/validation-plan.md)
- [Yarn Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
