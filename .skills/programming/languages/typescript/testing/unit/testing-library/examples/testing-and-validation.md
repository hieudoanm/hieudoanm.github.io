# Testing Library Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `getByRole`/`getByLabelText` queries; `screen` bindings
- [ ] `userEvent.setup()` interactions; visible-state assertions
- [ ] `findBy`/`waitFor` async handling; no sleeps
- [ ] No state/internals probing (`instance`, props, `aria-invalid` gouging)
- [ ] Shared `Providers` wrapper; cleanup wired
- [ ] Accessible semantics enforced by role queries

## Example

A team applying **Quick-Start Checklist** to a Testing Library Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `getByRole`/`getByLabelText` queries; `screen` bindings**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for testing-library-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
