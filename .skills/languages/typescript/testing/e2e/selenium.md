---
name: selenium-best-practices
description: Best practices for browser automation with Selenium — the cross-browser WebDriver conventions for end-to-end automation. Use when writing, structuring, or reviewing Selenium (WebDriver/remote) — covers WebDriver setup, element location, waits, frameworks, and CI.
---

# Selenium Best Practices

Selenium WebDriver drives browsers (Chrome/Edge/Firefox/Safari) through the **WebDriver protocol** across many languages. Practical Selenium leans on **`WebDriver` lifecycle managed explicitly, `By`-based finders with explicit/fluent waits (`WebDriverWait`) instead of `Thread.sleep`, and page-object/AAA structure so the suite stays maintainable.** Selenium is the portability officer — words like "works on <browser>" are its reason to exist; keep waits explicit and locators stable.

---

## 1. WebDriver Lifecycle

- **One driver per browser session; quit in `finally`/teardown:**

```java
WebDriver driver = new ChromeDriver();
try {
  driver.get("https://example.com");
  // test
} finally {
  driver.quit();   // closes browser, releases process
}
```

- **Options explicit** — `ChromeOptions().addArguments("--headless=new")` for CI, `--no-sandbox` in containers, binary path pinned.
- **No per-page driver** — reuse the session unless the test demands fresh state.

---

## 2. Locating Elements

- **Stable finders over brittle ones:** `By.id`, `By.cssSelector("[data-testid=...]")`, `By.xpath` as the last resort:

```java
driver.findElement(By.id("email")).sendKeys("ada@example.com");
driver.findElement(By.cssSelector("[data-testid='submit']")).click();
```

- **Design-in a test id/data‑testid to avoid CSS-class coupling.**
- **Find once, hold the `WebElement`; avoid re-querying on every step.**

---

## 3. Waits

- **Explicit waits `WebDriverWait` — never `Thread.sleep`:**

```java
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='result']")));
```

- **`ExpectedConditions` (visibility, clickable, presence) encode the condition; timeouts realistic.**
- **Fluent/retry for flaky networks is a bounded loop, not blind sleeping.**

---

## 4. Test Structure

- **AAA (Arrange-Act-Assert) + a page-object layer for reuse:**

```java
public class LoginPage {
    private final WebDriver driver;
    private final By email = By.id("email");
    // page owns locators + action methods: submit(), error()
}
```

- **Page objects encapsulate locators & flows; tests express scenarios, not driver primitives.**
- **One behavior per test method; setup via seed APIs, not long UI journeys.**

---

## 5. Browsers & Grid

- **`WebDriverManager`/managed binaries — pin browser versions to the runner.**
- **Grid/remote (`RemoteWebDriver` with hub URL) for matrix runs; local headless for speed.**
- **Screenshots on failure (`((TakesScreenshot) driver).getScreenshotAs(...)`)** attached to CI logs.

---

## 6. CI & Actions

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