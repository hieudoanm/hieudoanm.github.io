# Review checklist

Focused reference for **puppeteer-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
