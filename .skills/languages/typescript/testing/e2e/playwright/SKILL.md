---
name: playwright-best-practices
description: Best practices for end-to-end testing with Playwright — the cross-browser testing framework conventions. Use when writing, structuring, or reviewing Playwright suites — covers locators, assertions, webServer, fixtures, network, and CI.
---

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

```ts
await expect(page.getByText("Saved")).toBeVisible();   // retries up to timeout
```

- **`expect` (matchers: `toBeVisible`, `toHaveText`, `toBeEnabled`, `toHaveValue`, `toHaveURL`)** describe user-visible state.
- **`page.waitForResponse`/`waitForRequest` for network-gated flows; `Promise.all` for click + wait:**

```ts
await Promise.all([
  page.waitForResponse(r => r.url().includes("/api/login") && r.ok()),
  page.getByRole("button", { name: "Sign in" }).click(),
]);
```

- **Timeouts configured (`timeout` in `test.use`) generously; assertions own precision, not sleeps.**

---

## 3. Fixtures & webServer

- **`test.beforeEach` for shared setup; the `page`/`request` fixtures isolate per test:**

```ts
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("login").fill(seedUser.email);
});
```

- **`webServer` in `playwright.config.ts` behind the base URL** — the framework starts the app (command + url), no manual boot:

```ts
webServer: { command: "npm run start:test", url: "http://localhost:3000", reuseExistingServer: true },
```

- **Seed data via API/`request` fixture**, not via the UI.

---

## 4. Network & Storage

- **`page.route` for API stubs when the backend is heavy; otherwise run the real app + seeded data:**

```ts
await page.route("**/api/user", route => route.fulfill({ json: fakeUser }));
```

- **`storageState` reuses authenticated sessions** — login once, share state across specs:

```ts
test.use({ storageState: "states/authenticated.json" });
```

- **Deterministic time** via `page.clock`/`clock` for date-sensitive scenes.

---

## 5. Structure & CI

- **Specs per user journey** (`auth.spec.ts`, `checkout.spec.ts`); helpers (`helpers/`) for repeated flows.
- **Run in CI on every push; `npx playwright test --shard=x/y` for parallel workers**; artifacts (`trace`, `screenshot`, `video`) on failure.
- **`expect(page).toHaveScreenshot()` for visual regression — deliberate, not default.**
- **Reporters** (`list`/`html`/`github`) wired for actionable failure output.

---

## General Rules of Thumb

- **Accessible locators + strictness — tests read like the user.**
- **Auto-wait assertions; `waitForResponse` for network; no sleeps.**
- **`webServer` owns lifecycle; `storageState` reuses sessions.**
- **Seed via API; stub only what must be stubbed.**
- **CI parallel shards + failure artifacts; stable and green is the deliverable.**

---

## Quick-Start Checklist

- [ ] `getByRole`/`getByTestId` locators; strict selectors; no CSS-class coupling
- [ ] `expect.*` auto-waiting matchers; `Promise.all` for click+response
- [ ] `webServer` config; `page`/`request` fixtures; API seeding
- [ ] `storageState` session reuse; `page.route` only where heavy backend
- [ ] Journey-per-spec; parallel shards; trace/screenshot artifacts on failure