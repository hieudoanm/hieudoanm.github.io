# Implementation notes

Focused reference for **selenium-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
