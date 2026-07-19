# Review checklist

Focused reference for **karma-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## General Rules of Thumb

- **Config minimal; frameworks/browsers/reporters — one task per concern.**
- **Real-browser runs test the browser environment — that's Karma's point.**
- **CI profile = `singleRun` + headless + coverage thresholds.**
- **Custom launchers tuned to the container; timeouts realistic.**
- **Coverage is a gate, not a vanity metric.**

---

## Quick-Start Checklist

- [ ] `karma.conf.js` with frameworks + browsers + reporters; `singleRun` in CI
- [ ] Bundle preprocessed (karma-typescript/webpack/esbuild); ESM consistent
- [ ] `ChromeHeadlessNoSandbox` in containers; launcher flags match CI
- [ ] `karma-coverage` with global thresholds as the CI gate
- [ ] `npm test` = CI profile; dev loop uses `--watch` + progress/spec reporters
