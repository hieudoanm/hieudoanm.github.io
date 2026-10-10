# Playwright Best Practices: Workflow Checklist

A practical run sheet for applying [Playwright Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Locators & Queries: **Accessible locators first: getByRole, getByText, getByTestId, getByLabel:**
- [ ] 1. Locators & Queries: **locator(...) chains scope precisely** (page.locator('nav').getByText('Home')) — no strong CSS-class coupling
- [ ] 2. Assertions & Auto-Waiting: **Assertions auto-retry — never waitForTimeout:**
- [ ] 2. Assertions & Auto-Waiting: **expect (matchers: toBeVisible, toHaveText, toBeEnabled, toHaveValue, toHaveURL)** describe user-visible state
- [ ] 3. Fixtures & webServer: **test.beforeEach for shared setup; the page/request fixtures isolate per test:**
- [ ] 3. Fixtures & webServer: **webServer in playwright.config.ts behind the base URL** — the framework starts the app (command + url), no manual boot:
- [ ] 4. Network & Storage: **page.route for API stubs when the backend is heavy; otherwise run the real app + seeded data:**
- [ ] 4. Network & Storage: **storageState reuses authenticated sessions** — login once, share state across specs:
- [ ] 5. Structure & CI: **Specs per user journey** (auth.spec.ts, checkout.spec.ts); helpers (helpers/) for repeated flows
- [ ] 5. Structure & CI: **Run in CI on every push; npx playwright test --shard=x/y for parallel workers**; artifacts (trace, screenshot, video) on failure

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
