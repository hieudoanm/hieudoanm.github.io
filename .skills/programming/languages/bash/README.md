# Bash Best Practices

Bash is the language of the dev script: small, powerful, and quiet until it bites. Practical Bash leans on **a strict error contract (set -euo pipefail), defensive quoting on every expansion, and cleanup guaranteed via trap**. The shell doesn't warn, so the discipline is written into the first three lines of the file and enforced with shellcheck in CI, not by memory.

## When to use

Use when writing, structuring, or reviewing Bash.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Bash Best Practices: Basic Usage](./examples/basic-usage.md)
- [Bash Best Practices: 6. Error Handling & Cleanup](./examples/reliability-and-edge-cases.md)
- [Bash Best Practices: 1. Script Safety Contract](./examples/setup-and-configuration.md)
- [Bash Best Practices: 9. Testing](./examples/testing-and-validation.md)

## Assets

- [Bash Best Practices: Decision Record](./assets/decision-record.md)
- [Bash Best Practices: Starter Template](./assets/starter-template.md)
- [Bash Best Practices: Validation Plan](./assets/validation-plan.md)
- [Bash Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
