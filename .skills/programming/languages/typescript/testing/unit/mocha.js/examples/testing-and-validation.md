# Mocha Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Nested `describe`; `beforeEach` fresh state; `afterEach` cleanup
- [ ] Standardized assertion style (Chai `expect`); `eql` for objects
- [ ] Async tested explicitly with timeouts; `done` on all paths
- [ ] Sinon stubs/spies at seams; restore in teardown
- [ ] Runner config (spec/reporter/timeout); CI single-run + coverage
- [ ] No focused `.only` committed; parallel only for isolated suites

## Example

A team applying **Quick-Start Checklist** to a Mocha Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Nested `describe`; `beforeEach` fresh state; `afterEach` cleanup**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for mocha-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
