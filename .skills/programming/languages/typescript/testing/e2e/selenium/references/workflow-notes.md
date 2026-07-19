# Workflow notes

Focused reference for **selenium-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
