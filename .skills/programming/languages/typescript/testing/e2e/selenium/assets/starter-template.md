# Selenium Best Practices: Starter Template

A reusable starting point derived from the **4. Test Structure** section of [Selenium Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```java
public class LoginPage {
    private final WebDriver driver;
    private final By email = By.id("email");
    // page owns locators + action methods: submit(), error()
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
