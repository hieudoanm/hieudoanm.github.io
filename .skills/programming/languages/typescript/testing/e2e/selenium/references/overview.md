# Overview

Focused reference for **selenium-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
