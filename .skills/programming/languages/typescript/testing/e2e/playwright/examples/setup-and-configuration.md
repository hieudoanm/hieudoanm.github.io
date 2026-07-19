# Playwright Best Practices: 5. Structure & CI

## Source guidance

This example applies the **5. Structure & CI** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Specs per user journey** (`auth.spec.ts`, `checkout.spec.ts`); helpers (`helpers/`) for repeated flows.
- **Run in CI on every push; `npx playwright test --shard=x/y` for parallel workers**; artifacts (`trace`, `screenshot`, `video`) on failure.
- **`expect(page).toHaveScreenshot()` for visual regression — deliberate, not default.**
- **Reporters** (`list`/`html`/`github`) wired for actionable failure output.

## Example

A team applying **5. Structure & CI** to a Playwright Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Specs per user journey** (`auth.spec.ts`, `checkout.spec.ts`); helpers (`helpers/`) for repeated flows.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for playwright-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
