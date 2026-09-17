# Jasmine Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Nested `describe` per behavior; one-path `it` names
- [ ] Correct matchers (`toEqual`/`toBe`/`toThrowError`)
- [ ] `spyOn` seams; controlled returns/errors
- [ ] Fresh state in `beforeEach`; restores in `afterEach`
- [ ] Async specs via async/await or explicit `done`
- [ ] CI headless + single run; focused specs removed

## Example

A team applying **Quick-Start Checklist** to a Jasmine Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Nested `describe` per behavior; one-path `it` names**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for jasmine-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
