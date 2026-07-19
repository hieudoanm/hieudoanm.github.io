# Workflow notes

Focused reference for **puppeteer-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`page.goto(url, { waitUntil: "networkidle0" })` explicitly; then select waits:**

```js
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForSelector('[data-testid="result"]', { visible: true });
```

- **`page.waitForSelector`/`locator.waitFor()` over `sleep()` — auto-wait is the discipline:**
- **`page.locator(...)` (Puppeteer's auto-waiting Locators) for clicks/type on modern APIs.**

---

## 3. Interacting & Reading

- **Click/type via selectors; read DOM via `evaluate`:**

```js
await page.locator('input[name="email"]').fill("ada@example.com");
await page.locator('[data-testid="submit"]').click();
await page.waitForSelector('[data-testid="success"]');
const text = await page.$eval('[data-testid="result"]', el => el.textContent);
```

- **`$eval`/`$$eval` for data extraction (scraping) — return values, not DOM handles.**
- **Assert on the DOM you read** — Puppeteer has no `expect`; the checks are manual (`assert.ok(...)`).

---
