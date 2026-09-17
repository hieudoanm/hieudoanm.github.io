# Karma Best Practices: Decision Record

Use this record when applying [Karma Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for running browser tests with Karma — the test-runner conventions for Angular/Jasmine unit suites. Use when writing, structuring, or reviewing Karma — covers config, browsers, reporters, coverage, and CI.

Karma is a **test runner that executes unit tests in real browsers** — you write tests with Jasmine/Mocha, Karma launches Chrome/Firefox/headless, serves the bundle, and reports results. Practical Karma leans on **a minimal karma.conf.js (frameworks, browsers, bundling via webpack/vite/karma-esbuild), browser launchers matching CI (ChromeHeadless/custom launchers), and karma-coverage thresholds enforced as the CI gate.** Modern Angular CLIs bundle Karma by default; keep the config thin and purpose-driven.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Configuration
- [ ] 2. Files & Bundling
- [ ] 3. Browsers & Launchers
- [ ] 4. Coverage Gate
- [ ] 5. Running & CI
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
