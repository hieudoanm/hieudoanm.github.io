# Review checklist

Focused reference for **playwright-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Specs per user journey** (`auth.spec.ts`, `checkout.spec.ts`); helpers (`helpers/`) for repeated flows.
- **Run in CI on every push; `npx playwright test --shard=x/y` for parallel workers**; artifacts (`trace`, `screenshot`, `video`) on failure.
- **`expect(page).toHaveScreenshot()` for visual regression — deliberate, not default.**
- **Reporters** (`list`/`html`/`github`) wired for actionable failure output.

---

## General Rules of Thumb

- **Accessible locators + strictness — tests read like the user.**
- **Auto-wait assertions; `waitForResponse` for network; no sleeps.**
- **`webServer` owns lifecycle; `storageState` reuses sessions.**
- **Seed via API; stub only what must be stubbed.**
- **CI parallel shards + failure artifacts; stable and green is the deliverable.**

---

## Quick-Start Checklist

- [ ] `getByRole`/`getByTestId` locators; strict selectors; no CSS-class coupling
- [ ] `expect.*` auto-waiting matchers; `Promise.all` for click+response
- [ ] `webServer` config; `page`/`request` fixtures; API seeding
- [ ] `storageState` session reuse; `page.route` only where heavy backend
- [ ] Journey-per-spec; parallel shards; trace/screenshot artifacts on failure
