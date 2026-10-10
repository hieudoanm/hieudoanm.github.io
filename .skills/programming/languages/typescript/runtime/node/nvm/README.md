# nvm

nvm is a **shell function library** that installs each Node.js version into its own directory under ~/.nvm/versions/node/ and manipulates PATH to switch between them. That per-version isolation is the reason it works: two projects needing incompatible Node versions coexist on one machine without conflict. Practical nvm work is about **committing the version, defaulting to LTS, and knowing the two places it does not work**...

## When to use

Use when pinning Node versions or fixing "wrong version" failures.

## Core topics

- 1. Install
- 2. Pinning Per Project
- 3. LTS Policy
- 4. Daily Commands
- 5. Global Packages
- 6. CI

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [nvm: Basic Usage](./examples/basic-usage.md)
- [nvm: 9. Common Pitfalls](./examples/reliability-and-edge-cases.md)
- [nvm: 1. Install](./examples/setup-and-configuration.md)
- [nvm: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [nvm: Decision Record](./assets/decision-record.md)
- [nvm: Starter Template](./assets/starter-template.md)
- [nvm: Validation Plan](./assets/validation-plan.md)
- [nvm: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
