# Puppeteer Best Practices: Basic Usage

Best practices for browser automation with Puppeteer — the Node.js Chrome automation conventions. Use when writing, structuring, or reviewing Puppeteer scripts/tests — covers launching, selectors, waits, screenshots, scraping, and CI.

## Scenario

Use this example as a starting point when applying **puppeteer-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Launch & Browser Lifecycle** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
