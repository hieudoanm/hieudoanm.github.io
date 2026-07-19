# Playwright Best Practices

Playwright drives real browsers (Chromium, Firefox, WebKit) with **auto-waiting locators** and a **first-class fixture system (test, expect, page)**. Practical Playwright leans on **locator over raw selectors, accessible queries (getByRole) mirroring user intent, auto-waiting assertions (expect.toBeVisible) instead of sleeps, and the webServer/page fixture model for deterministic runs.** Reliable E2E is a product feature.

## When to use

Use when writing, structuring, or reviewing Playwright suites.

## Core topics

- 1. Locators & Queries
- 2. Assertions & Auto-Waiting
- 3. Fixtures & webServer
- 4. Network & Storage
- 5. Structure & CI

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Playwright Best Practices: Basic Usage](./examples/basic-usage.md)
- [Playwright Best Practices: 2. Assertions & Auto-Waiting](./examples/reliability-and-edge-cases.md)
- [Playwright Best Practices: 5. Structure & CI](./examples/setup-and-configuration.md)
- [Playwright Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Playwright Best Practices: Decision Record](./assets/decision-record.md)
- [Playwright Best Practices: Starter Template](./assets/starter-template.md)
- [Playwright Best Practices: Validation Plan](./assets/validation-plan.md)
- [Playwright Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
