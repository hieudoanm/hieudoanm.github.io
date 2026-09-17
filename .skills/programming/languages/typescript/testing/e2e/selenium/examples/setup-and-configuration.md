# Selenium Best Practices: 4. Test Structure

## Source guidance

This example applies the **4. Test Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **AAA (Arrange-Act-Assert) + a page-object layer for reuse:**
- **Page objects encapsulate locators & flows; tests express scenarios, not driver primitives.**
- **One behavior per test method; setup via seed APIs, not long UI journeys.**

## Example

```java
public class LoginPage {
    private final WebDriver driver;
    private final By email = By.id("email");
    // page owns locators + action methods: submit(), error()
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for selenium-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
