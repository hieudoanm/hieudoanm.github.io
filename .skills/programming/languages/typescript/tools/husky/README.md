# Husky

Husky puts a core.hooksPath entry in your repo so that Git runs scripts in .husky/ instead of .git/hooks/. That single indirection is the whole point: **hooks become committed, reviewable, and identical on every machine** — no more "my pre-commit hook worked but yours didn't". Practical Husky work is mostly about **getting the v9 setup right, keeping hooks fast, and putting the real work in tooling that Husky only triggers**.

## When to use

Use when adding or debugging pre-commit hooks in a JS/TS repo.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Husky: Basic Usage](./examples/basic-usage.md)
- [Husky: 10. Common Pitfalls](./examples/reliability-and-edge-cases.md)
- [Husky: 2. Setup](./examples/setup-and-configuration.md)
- [Husky: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Husky: Decision Record](./assets/decision-record.md)
- [Husky: Starter Template](./assets/starter-template.md)
- [Husky: Validation Plan](./assets/validation-plan.md)
- [Husky: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
