# Puppeteer Best Practices: Workflow Checklist

A practical run sheet for applying [Puppeteer Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Launch & Browser Lifecycle: **Launch once, reuse pages; always close:**
- [ ] 1. Launch & Browser Lifecycle: **Pin the channel/executable** (channel: "chrome" or executablePath) for reproducibility in CI
- [ ] 2. Navigating & Waiting: **page.goto(url, { waitUntil: "networkidle0" }) explicitly; then select waits:**
- [ ] 2. Navigating & Waiting: **page.waitForSelector/locator.waitFor() over sleep() — auto-wait is the discipline:**
- [ ] 3. Interacting & Reading: **Click/type via selectors; read DOM via evaluate:**
- [ ] 3. Interacting & Reading: **$eval/$$eval for data extraction (scraping) — return values, not DOM handles.**
- [ ] 4. Screenshots & PDFs: **page.screenshot({ type: "png", fullPage: true, path: ... }) for visual capture:**
- [ ] 4. Screenshots & PDFs: **page.pdf(...) for print-target content (header/footer settings); clip/viewport sized deliberately.**
- [ ] 5. Scraping & Performance: **page.evaluate returns serializable data — batch reads, avoid per-node round trips.**
- [ ] 5. Scraping & Performance: **page.setViewport/emulate devices for responsive checks; request interception (page.setRequestInterception(true)) to block heavy media when reading only text.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
