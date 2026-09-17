# Selenium Best Practices: Decision Record

Use this record when applying [Selenium Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for browser automation with Selenium — the cross-browser WebDriver conventions for end-to-end automation. Use when writing, structuring, or reviewing Selenium (WebDriver/remote) — covers WebDriver setup, element location, waits, frameworks, and CI.

Selenium WebDriver drives browsers (Chrome/Edge/Firefox/Safari) through the **WebDriver protocol** across many languages. Practical Selenium leans on **WebDriver lifecycle managed explicitly, By-based finders with explicit/fluent waits (WebDriverWait) instead of Thread.sleep, and page-object/AAA structure so the suite stays maintainable.** Selenium is the portability officer — words like "works on <browser>" are its reason to exist; keep waits explicit and locators stable.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. WebDriver Lifecycle
- [ ] 2. Locating Elements
- [ ] 3. Waits
- [ ] 4. Test Structure
- [ ] 5. Browsers & Grid
- [ ] 6. CI & Actions
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
