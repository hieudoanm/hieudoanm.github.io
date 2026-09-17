# Selenium Best Practices: Workflow Checklist

A practical run sheet for applying [Selenium Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. WebDriver Lifecycle: **One driver per browser session; quit in finally/teardown:**
- [ ] 1. WebDriver Lifecycle: **Options explicit** — ChromeOptions().addArguments("--headless=new") for CI, --no-sandbox in containers, binary path pinned
- [ ] 2. Locating Elements: **Stable finders over brittle ones:** By.id, By.cssSelector("[data-testid=...]"), By.xpath as the last resort:
- [ ] 2. Locating Elements: **Design-in a test id/data‑testid to avoid CSS-class coupling.**
- [ ] 3. Waits: **Explicit waits WebDriverWait — never Thread.sleep:**
- [ ] 3. Waits: **ExpectedConditions (visibility, clickable, presence) encode the condition; timeouts realistic.**
- [ ] 4. Test Structure: **AAA (Arrange-Act-Assert) + a page-object layer for reuse:**
- [ ] 4. Test Structure: **Page objects encapsulate locators & flows; tests express scenarios, not driver primitives.**
- [ ] 5. Browsers & Grid: **WebDriverManager/managed binaries — pin browser versions to the runner.**
- [ ] 5. Browsers & Grid: **Grid/remote (RemoteWebDriver with hub URL) for matrix runs; local headless for speed.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
