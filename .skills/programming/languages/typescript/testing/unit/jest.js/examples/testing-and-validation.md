# Jest Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Colocated `x.test.ts`; nested `describe`; one-path `it`
- [ ] Matchers express intent (`toEqual`/`toMatchObject`/`toThrow`)
- [ ] `jest.mock`/`jest.spyOn` at boundaries; mocks cleared per test
- [ ] `useFakeTimers` for time logic; `useRealTimers` after
- [ ] Coverage thresholds enforced in CI config
- [ ] Config minimal; no `only` shipped; CI single-run

## Example

A team applying **Quick-Start Checklist** to a Jest Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Colocated `x.test.ts`; nested `describe`; one-path `it`**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for jest-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
