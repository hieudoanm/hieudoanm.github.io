# Puppeteer Best Practices: 6. CI & Structure

## Source guidance

This example applies the **6. CI & Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Plain JS/TS scripts or a runner; `npm run bot` = the crawl/screenshot pipeline.**
- **CI: headless, container-friendly `--no-sandbox`; artifacts uploaded on failure.**
- **Deterministic**: no real sleeps — `waitUntil` + `waitForSelector`; retry flaky network via a bounded loop, not a blind timeout.

## Example

A team applying **6. CI & Structure** to a Puppeteer Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Plain JS/TS scripts or a runner; `npm run bot` = the crawl/screenshot pipeline.****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for puppeteer-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
