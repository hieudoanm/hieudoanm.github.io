# npm Best Practices

npm is the **default package manager + registry for Node.js** — package.json declares the graph, package-lock.json pins it. Practical npm leans on **minimal, precise dependencies vs devDependencies, npm install determinism via the committed lockfile, --save-exact/workspaces discipline, and lifecycle through npm ci in CI** — the lockfile is the deployment artifact; the registry is upstream of trust (pin scopes/versions).

## When to use

Use when writing, structuring, or reviewing npm usage.

## Core topics

- 1. package.json
- 2. Lockfiles & Determinism
- 3. Scripts & Lifecycle
- 4. Workspaces & Monorepos
- 5. Publishing
- 6. Security & Audits

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [npm Best Practices: Basic Usage](./examples/basic-usage.md)
- [npm Best Practices: 6. Security & Audits](./examples/reliability-and-edge-cases.md)
- [npm Best Practices: 2. Lockfiles & Determinism](./examples/setup-and-configuration.md)
- [npm Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [npm Best Practices: Decision Record](./assets/decision-record.md)
- [npm Best Practices: Starter Template](./assets/starter-template.md)
- [npm Best Practices: Validation Plan](./assets/validation-plan.md)
- [npm Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
