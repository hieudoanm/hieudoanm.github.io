# Jasmine Best Practices: Workflow Checklist

A practical run sheet for applying [Jasmine Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Structure & Naming: **describe per unit, nested for behaviors; it as one behavioral sentence:**
- [ ] 1. Structure & Naming: **One assertion-path per it** — a failing step is named, not buried in a mega test
- [ ] 2. Matchers: **toEqual for deep equality; toBe for identity; toBeTruthy/toBeFalsy for truthiness:**
- [ ] 2. Matchers: **toThrow with a specific error for error contracts:**
- [ ] 3. Spies & Fakes: **spyOn for seam isolation — verify calls, stub returns, inject fakes:**
- [ ] 3. Spies & Fakes: **Use and.returnValue, and.throwError, and.callFake for controlled dops.**
- [ ] 4. Setup & Teardown: **beforeEach builds fresh state per it; afterEach resets/restores:**
- [ ] 4. Setup & Teardown: **beforeAll only for truly shared heavy setup** — shared mutable state causes test orderings
- [ ] 5. Async Specs: **Async via done or returning a promise/done-return — prefer async/await:**
- [ ] 5. Async Specs: **Explicit done() for callback-style code; jasmine.DEFAULT_TIMEOUT_INTERVAL set realistically.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
