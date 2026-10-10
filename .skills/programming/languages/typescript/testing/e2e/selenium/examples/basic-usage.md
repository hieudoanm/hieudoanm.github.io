# Selenium Best Practices: Basic Usage

Best practices for browser automation with Selenium — the cross-browser WebDriver conventions for end-to-end automation. Use when writing, structuring, or reviewing Selenium (WebDriver/remote) — covers WebDriver setup, element location, waits, frameworks, and CI.

## Scenario

Use this example as a starting point when applying **selenium-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. WebDriver Lifecycle** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```java
WebDriver driver = new ChromeDriver();
try {
  driver.get("https://example.com");
  // test
} finally {
  driver.quit();   // closes browser, releases process
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
