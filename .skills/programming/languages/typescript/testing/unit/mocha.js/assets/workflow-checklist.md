# Mocha Best Practices: Workflow Checklist

A practical run sheet for applying [Mocha Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Structure & Hooks: **describe per unit, nested per behavior; hooks for lifecycle:**
- [ ] 1. Structure & Hooks: **Hooks: beforeEach fresh state, afterEach cleanup, beforeAll/afterAll sparingly for shared heavy setup.**
- [ ] 2. Assertions: **Chai expect style — compose readable contracts:**
- [ ] 2. Assertions: **Pick one style (expect/should/assert) and standardize — mixing styles is its own bug.**
- [ ] 3. Async Tests: **Async via async/await or explicit done — never silently ignore:**
- [ ] 3. Async Tests: **A done that's never called = timeout — set this.timeout(...) realistically; always call done on every path.**
- [ ] 4. Spies & Stubs: **Sinon for spies/stubs/fakes (the defacto companion):**
- [ ] 4. Spies & Stubs: **sinon.restore() in afterEach** — spies left installed leak across tests
- [ ] 5. Running & CI: **mocha with a config (spec, reporter, timeout):**
- [ ] 5. Running & CI: **CI single-run + --reporter mocha-junit-reporter (or @cypress/xvfb contexts); coverage via c8/nyc at the runner level.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
