# Workflow notes

Focused reference for **playwright-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
