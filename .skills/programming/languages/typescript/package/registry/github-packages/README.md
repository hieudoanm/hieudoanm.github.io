# GitHub Packages Best Practices

GitHub Packages (GHR/ GHCR) hosts **private/registry-scoped npm packages alongside your GitHub org** — publishing via GITHUB_TOKEN or a PAT from a workflow, consumed through the scoped registry URL. Practical GitHub Packages leans on **a scoped name (@org/pkg), per-repo workflow_dispatch-style publish with least-privilege tokens, registry auth via npm_config_registry pattern, and version/changelog driven from tags** — the...

## When to use

Use when writing, structuring, or reviewing GitHub Packages.

## Core topics

- 1. Auth & Registry
- 2. Package Setup
- 3. Publishing in CI
- 4. Consuming Private Packages
- 5. Versions & Semantics
- 6. Security & Hygiene

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [GitHub Packages Best Practices: Basic Usage](./examples/basic-usage.md)
- [GitHub Packages Best Practices: 6. Security & Hygiene](./examples/reliability-and-edge-cases.md)
- [GitHub Packages Best Practices: 2. Package Setup](./examples/setup-and-configuration.md)
- [GitHub Packages Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [GitHub Packages Best Practices: Decision Record](./assets/decision-record.md)
- [GitHub Packages Best Practices: Starter Template](./assets/starter-template.md)
- [GitHub Packages Best Practices: Validation Plan](./assets/validation-plan.md)
- [GitHub Packages Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
