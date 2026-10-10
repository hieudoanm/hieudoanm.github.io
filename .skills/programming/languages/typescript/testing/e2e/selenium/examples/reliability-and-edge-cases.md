# Selenium Best Practices: 2. Locating Elements

## Source guidance

This example applies the **2. Locating Elements** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Stable finders over brittle ones:** `By.id`, `By.cssSelector("[data-testid=...]")`, `By.xpath` as the last resort:
- **Design-in a test id/data‑testid to avoid CSS-class coupling.**
- **Find once, hold the `WebElement`; avoid re-querying on every step.**

## Example

```java
driver.findElement(By.id("email")).sendKeys("ada@example.com");
driver.findElement(By.cssSelector("[data-testid='submit']")).click();
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for selenium-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
