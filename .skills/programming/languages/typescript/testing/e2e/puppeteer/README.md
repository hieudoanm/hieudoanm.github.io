# Puppeteer Best Practices

Puppeteer drives **Chromium via DevTools Protocol** from Node — headless or headed, with fine-grained control (page.evaluate, page.goto, locator). Practical Puppeteer leans on **puppeteer.launch() with an explicit browser/headless mode, page.locator/waitForSelector auto-waiting selectors over sleep loops, and tight goto-wait cycles** — plus screenshot/perf capture where the artifact matters. It's automation-first: great...

## When to use

Use when writing, structuring, or reviewing Puppeteer scripts/tests.

## Core topics

- 1. Launch & Browser Lifecycle
- 2. Navigating & Waiting
- 3. Interacting & Reading
- 4. Screenshots & PDFs
- 5. Scraping & Performance
- 6. CI & Structure

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Puppeteer Best Practices: Basic Usage](./examples/basic-usage.md)
- [Puppeteer Best Practices: 5. Scraping & Performance](./examples/reliability-and-edge-cases.md)
- [Puppeteer Best Practices: 6. CI & Structure](./examples/setup-and-configuration.md)
- [Puppeteer Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Puppeteer Best Practices: Decision Record](./assets/decision-record.md)
- [Puppeteer Best Practices: Starter Template](./assets/starter-template.md)
- [Puppeteer Best Practices: Validation Plan](./assets/validation-plan.md)
- [Puppeteer Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
