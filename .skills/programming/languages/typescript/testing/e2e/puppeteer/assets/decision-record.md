# Puppeteer Best Practices: Decision Record

Use this record when applying [Puppeteer Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for browser automation with Puppeteer — the Node.js Chrome automation conventions. Use when writing, structuring, or reviewing Puppeteer scripts/tests — covers launching, selectors, waits, screenshots, scraping, and CI.

Puppeteer drives **Chromium via DevTools Protocol** from Node — headless or headed, with fine-grained control (page.evaluate, page.goto, locator). Practical Puppeteer leans on **puppeteer.launch() with an explicit browser/headless mode, page.locator/waitForSelector auto-waiting selectors over sleep loops, and tight goto-wait cycles** — plus screenshot/perf capture where the artifact matters. It's automation-first: great for scraping, PDF, and screenshot pipelines; use Playwright's test runner for full E2E suites.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Launch & Browser Lifecycle
- [ ] 2. Navigating & Waiting
- [ ] 3. Interacting & Reading
- [ ] 4. Screenshots & PDFs
- [ ] 5. Scraping & Performance
- [ ] 6. CI & Structure
- [ ] General Rules of Thumb
- [ ] Quick-Start Checklist

## Decision

- Chosen approach:
- Alternatives considered:
- Evidence and tradeoffs:
- Assumptions or deviations from the skill:

## Consequences and review

- Expected benefits:
- Risks and mitigations:
- Validation required before adoption:
- Revisit when:
