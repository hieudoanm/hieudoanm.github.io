# Review checklist

Focused reference for **selenium-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **CI runs headless with container flags; artifacts (HTML report, screenshots) uploaded.**
- **Flakiness engineering**: retries via a bounded runner policy; deterministic waits; no shared browser state between tests.
- **`Actions`/keys via the builder when WebDriver-native APIs don't fit** (`new Actions(driver).moveToElement(el).click().perform()`).

---

## General Rules of Thumb

- **Driver lifecycle per session; `quit()` paramount; container flags in CI.**
- **Stable `By` locators (id/data‑testid) over XPath/CSS sprawl.**
- **`WebDriverWait` over sleeps — encoded conditions, realistic timeouts.**
- **Page objects + AAA keep the suite maintainable.**
- **Screenshots + report artifacts on failure; pinned browser versions.**

---

## Quick-Start Checklist

- [ ] `WebDriver` created once, `quit()` in `finally`; headless container flags
- [ ] `By.id`/`data-testid` locators; find-once and hold elements
- [ ] `WebDriverWait` + `ExpectedConditions` over `Thread.sleep`
- [ ] Page-object layer; AAA structure; one behavior per test
- [ ] `WebDriverManager`/pinned binaries; RemoteWebDriver for matrix
- [ ] Failure screenshots + CI artifacts; bounded- loop retries
