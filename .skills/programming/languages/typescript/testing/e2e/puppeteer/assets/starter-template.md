# Puppeteer Best Practices: Starter Template

A reusable starting point derived from the **1. Launch & Browser Lifecycle** section of [Puppeteer Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
