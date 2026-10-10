# Puppeteer Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `puppeteer.launch({ headless: "new", container args })`; `browser.close()` in `finally`
- [ ] `goto`/`waitUntil` explicit; `waitForSelector({ visible: true })` over sleeps
- [ ] `page.locator` fill/click; `$eval`/`$$eval` return data
- [ ] Manual assertions (`assert.ok`) on read-back DOM
- [ ] Screenshots/PDFs captured on demand; console + screenshot on failure
- [ ] Batch `evaluate` reads; request interception where useful
- [ ] Pinned channel; CI flags; artifacts on failure

## Example

A team applying **Quick-Start Checklist** to a Puppeteer Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `puppeteer.launch({ headless: "new", container args })`; `browser.close()` in `finally`**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for puppeteer-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
