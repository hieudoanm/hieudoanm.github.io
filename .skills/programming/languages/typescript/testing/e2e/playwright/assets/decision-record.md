# Playwright Best Practices: Decision Record

Use this record when applying [Playwright Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for end-to-end testing with Playwright — the cross-browser testing framework conventions. Use when writing, structuring, or reviewing Playwright suites — covers locators, assertions, webServer, fixtures, network, and CI.

Playwright drives real browsers (Chromium, Firefox, WebKit) with **auto-waiting locators** and a **first-class fixture system (test, expect, page)**. Practical Playwright leans on **locator over raw selectors, accessible queries (getByRole) mirroring user intent, auto-waiting assertions (expect.toBeVisible) instead of sleeps, and the webServer/page fixture model for deterministic runs.** Reliable E2E is a product feature.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Locators & Queries
- [ ] 2. Assertions & Auto-Waiting
- [ ] 3. Fixtures & webServer
- [ ] 4. Network & Storage
- [ ] 5. Structure & CI
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
