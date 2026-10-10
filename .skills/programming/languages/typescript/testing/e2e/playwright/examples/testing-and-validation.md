# Playwright Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `getByRole`/`getByTestId` locators; strict selectors; no CSS-class coupling
- [ ] `expect.*` auto-waiting matchers; `Promise.all` for click+response
- [ ] `webServer` config; `page`/`request` fixtures; API seeding
- [ ] `storageState` session reuse; `page.route` only where heavy backend
- [ ] Journey-per-spec; parallel shards; trace/screenshot artifacts on failure

## Example

A team applying **Quick-Start Checklist** to a Playwright Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `getByRole`/`getByTestId` locators; strict selectors; no CSS-class coupling**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for playwright-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
