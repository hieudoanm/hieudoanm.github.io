---
name: puppeteer-best-practices
description: Best practices for browser automation with Puppeteer — the Node.js Chrome automation conventions. Use when writing, structuring, or reviewing Puppeteer scripts/tests — covers launching, selectors, waits, screenshots, scraping, and CI.
---

# Puppeteer Best Practices

Puppeteer drives **Chromium via DevTools Protocol** from Node — headless or headed, with fine-grained control (`page.evaluate`, `page.goto`, `locator`). Practical Puppeteer leans on **`puppeteer.launch()` with an explicit browser/headless mode, `page.locator`/`waitForSelector` auto-waiting selectors over sleep loops, and tight `goto`-wait cycles** — plus screenshot/perf capture where the artifact matters. It's automation-first: great for scraping, PDF, and screenshot pipelines; use Playwright's test runner for full E2E suites.

---

## 1. Launch & Browser Lifecycle

- **Launch once, reuse pages; always close:**

```js
const browser = await puppeteer.launch({
  headless: "new",                 // 'new' headless on modern Chrome
  args: ["--no-sandbox", "--disable-gpu"],   // container-friendly
});
try {
  const page = await browser.newPage();
  // work
} finally {
  await browser.close();
}
```

- **Pin the channel/executable** (`channel: "chrome"` or `executablePath`) for reproducibility in CI.
- **One browser per suite, pages per task** — launching 50 browsers is the classic slowdown.

---

## 2. Navigating & Waiting

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

## 4. Screenshots & PDFs

- **`page.screenshot({ type: "png", fullPage: true, path: ... })` for visual capture:**

```js
await page.screenshot({ path: "artifacts/home.png", fullPage: true });
```

- **`page.pdf(...)` for print-target content (header/footer settings); `clip`/`viewport` sized deliberately.**
- **Capture on failure for diagnosis** (`page.on("console", ...)` + screenshot in `catch`).

---

## 5. Scraping & Performance

- **`page.evaluate` returns serializable data — batch reads, avoid per-node round trips.**
- **`page.setViewport`/emulate devices for responsive checks; request interception (`page.setRequestInterception(true)`) to block heavy media when reading only text.**
- **`page.metrics()`/`performance.getEntriesByType("navigation")` via evaluate for perf probes.**

---

## 6. CI & Structure

- **Plain JS/TS scripts or a runner; `npm run bot` = the crawl/screenshot pipeline.**
- **CI: headless, container-friendly `--no-sandbox`; artifacts uploaded on failure.**
- **Deterministic**: no real sleeps — `waitUntil` + `waitForSelector`; retry flaky network via a bounded loop, not a blind timeout.

---

## General Rules of Thumb

- **Launch once, close in `finally`; one browser per suite.**
- **Auto-wait (`waitForSelector`/`locator`) over `sleep`.**
- **`evaluate` returns values; screenshots/PDFs deliberate artifacts.**
- **Container-friendly flags; pinned channel; CI artifacts on failure.**
- **Puppeteer = automation; Playwright's runner = full E2E suites.**

---

## Quick-Start Checklist

- [ ] `puppeteer.launch({ headless: "new", container args })`; `browser.close()` in `finally`
- [ ] `goto`/`waitUntil` explicit; `waitForSelector({ visible: true })` over sleeps
- [ ] `page.locator` fill/click; `$eval`/`$$eval` return data
- [ ] Manual assertions (`assert.ok`) on read-back DOM
- [ ] Screenshots/PDFs captured on demand; console + screenshot on failure
- [ ] Batch `evaluate` reads; request interception where useful
- [ ] Pinned channel; CI flags; artifacts on failure