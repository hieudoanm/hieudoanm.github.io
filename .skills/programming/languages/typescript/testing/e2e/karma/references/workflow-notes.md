# Workflow notes

Focused reference for **karma-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Files & Bundling

- **Preprocess the TS/JS bundle** (karma-typescript, webpack, or esbuild) — the browser needs transpiled units, not bare TS.
- **`files`/`include` narrow to the test entry points**; no accidental serving of `node_modules`.
- **ESM consistency** — keep the module graph transpiled uniformly; mixing CJS/ESM breaks the browser run.

---

## 3. Browsers & Launchers

- **`ChromeHeadless` default; custom launcher for the CI environment:**

```js
customLaunchers: {
  ChromeHeadlessNoSandbox: {
    base: "ChromeHeadless",
    flags: ["--no-sandbox", "--disable-gpu"],
  },
}
```

- **Match launcher flags to the CI container** (sandbox, no-GPU, memory limits).
- **Timeouts set realistically** — `browserNoActivityTimeout`/`browserDisconnectTimeout`, not zero.

---
