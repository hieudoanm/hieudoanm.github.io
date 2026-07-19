# Overview

Focused reference for **puppeteer-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
