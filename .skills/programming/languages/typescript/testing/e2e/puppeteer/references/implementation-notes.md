# Implementation notes

Focused reference for **puppeteer-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
