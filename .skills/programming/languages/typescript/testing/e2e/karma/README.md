# Karma Best Practices

Karma is a **test runner that executes unit tests in real browsers** — you write tests with Jasmine/Mocha, Karma launches Chrome/Firefox/headless, serves the bundle, and reports results. Practical Karma leans on **a minimal karma.conf.js (frameworks, browsers, bundling via webpack/vite/karma-esbuild), browser launchers matching CI (ChromeHeadless/custom launchers), and karma-coverage thresholds enforced as the CI gate.**...

## When to use

Use when writing, structuring, or reviewing Karma.

## Core topics

- 1. Configuration
- 2. Files & Bundling
- 3. Browsers & Launchers
- 4. Coverage Gate
- 5. Running & CI

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Karma Best Practices: Basic Usage](./examples/basic-usage.md)
- [Karma Best Practices: 4. Coverage Gate](./examples/reliability-and-edge-cases.md)
- [Karma Best Practices: 1. Configuration](./examples/setup-and-configuration.md)
- [Karma Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Karma Best Practices: Decision Record](./assets/decision-record.md)
- [Karma Best Practices: Starter Template](./assets/starter-template.md)
- [Karma Best Practices: Validation Plan](./assets/validation-plan.md)
- [Karma Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
