# Testing Library Best Practices: Workflow Checklist

A practical run sheet for applying [Testing Library Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Queries & the User's Eye: **Accessible by default: getByRole, getByLabelText, getByPlaceholderText, getByText, getByTestId as last resort:**
- [ ] 1. Queries & the User's Eye: **Prefer role/label — they map to user perception and to a11y; testid only where no accessible name exists.**
- [ ] 2. Expect + User Events: **Assert on visible, user-facing state:**
- [ ] 2. Expect + User Events: **userEvent (higher fidelity: typing, click, tab, hover) over fireEvent** — setup() per test
- [ ] 3. Async & Waiting: **findBy* auto-waits (async); waitFor for custom conditions:**
- [ ] 3. Async & Waiting: **Avoid waitForElementToBeRemoved overuse; act-wrapped async resolves itself:**
- [ ] 4. Anti-Patterns: **Never grab internal state:**
- [ ] 4. Anti-Patterns: no getAttribute("aria-invalid") when getByRole("alert") exists,
- [ ] 5. Rendering & Cleanup: **Setup/teardown wired once per framework** (@testing-library/react + jest/vitest globals; cleanup auto)
- [ ] 5. Rendering & Cleanup: **Wrapper providers (AllTheProviders) shared in a helper module to dry up setup:**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
