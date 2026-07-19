# Selenium Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `WebDriver` created once, `quit()` in `finally`; headless container flags
- [ ] `By.id`/`data-testid` locators; find-once and hold elements
- [ ] `WebDriverWait` + `ExpectedConditions` over `Thread.sleep`
- [ ] Page-object layer; AAA structure; one behavior per test
- [ ] `WebDriverManager`/pinned binaries; RemoteWebDriver for matrix
- [ ] Failure screenshots + CI artifacts; bounded- loop retries

## Example

A team applying **Quick-Start Checklist** to a Selenium Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `WebDriver` created once, `quit()` in `finally`; headless container flags**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for selenium-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
