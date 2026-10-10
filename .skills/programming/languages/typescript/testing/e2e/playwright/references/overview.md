# Overview

Focused reference for **playwright-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Playwright Best Practices

Playwright drives real browsers (Chromium, Firefox, WebKit) with **auto-waiting locators** and a **first-class fixture system (`test`, `expect`, `page`)**. Practical Playwright leans on **`locator` over raw selectors, accessible queries (`getByRole`) mirroring user intent, auto-waiting assertions (`expect.toBeVisible`) instead of sleeps, and the `webServer`/`page` fixture model for deterministic runs.** Reliable E2E is a product feature.

---

## 1. Locators & Queries

- **Accessible locators first: `getByRole`, `getByText`, `getByTestId`, `getByLabel`:**

```ts
await page.getByRole("button", { name: "Submit" }).click();
await expect(page.getByTestId("result")).toBeVisible();
```

- **`locator(...)` chains scope precisely** (`page.locator('nav').getByText('Home')`) — no strong CSS-class coupling.
- **`testid` attribute via `testIdAttribute: "data-testid"` config** — a stable, design-in contract.
- **Multiple matches fail loudly** — a `getByRole` returning two elements is caught by the runner (strictness).

---

## 2. Assertions & Auto-Waiting

- **Assertions auto-retry — never `waitForTimeout`:**
