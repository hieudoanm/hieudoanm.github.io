# Puppeteer Best Practices: 5. Scraping & Performance

## Source guidance

This example applies the **5. Scraping & Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`page.evaluate` returns serializable data — batch reads, avoid per-node round trips.**
- **`page.setViewport`/emulate devices for responsive checks; request interception (`page.setRequestInterception(true)`) to block heavy media when reading only text.**
- **`page.metrics()`/`performance.getEntriesByType("navigation")` via evaluate for perf probes.**

## Example

A team applying **5. Scraping & Performance** to a Puppeteer Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****`page.evaluate` returns serializable data — batch reads, avoid per-node round trips.****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for puppeteer-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
