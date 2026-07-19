# Volta Best Practices

Volta is **a JS toolchain manager that pins Node, yarn/pnpm, and nvm-style runtime per-project — via volta "hooks" in package.json** — routing the right version from the toolchain section. Practical Volta leans on **volta pin node@20 yarn@4 in the project (committed), Volta installs env-consistency across shells, and CI reuse volta setup/volta run for an engine-exact build** — the package.json volta block IS the contract;...

## When to use

Use when writing, structuring, or reviewing Volta setups.

## Core topics

- 1. Pinning the Toolchain
- 2. Setup & Environment
- 3. Per-Project Consistency
- 4. CI Integration
- 5. Compat & Troubleshooting

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Volta Best Practices: Basic Usage](./examples/basic-usage.md)
- [Volta Best Practices: 3. Per-Project Consistency](./examples/reliability-and-edge-cases.md)
- [Volta Best Practices: 2. Setup & Environment](./examples/setup-and-configuration.md)
- [Volta Best Practices: 5. Compat & Troubleshooting](./examples/testing-and-validation.md)

## Assets

- [Volta Best Practices: Decision Record](./assets/decision-record.md)
- [Volta Best Practices: Starter Template](./assets/starter-template.md)
- [Volta Best Practices: Validation Plan](./assets/validation-plan.md)
- [Volta Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
