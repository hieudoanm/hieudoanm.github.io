# Karma Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Karma Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] `karma.conf.js` with frameworks + browsers + reporters; `singleRun` in CI
- [ ] Bundle preprocessed (karma-typescript/webpack/esbuild); ESM consistent
- [ ] `ChromeHeadlessNoSandbox` in containers; launcher flags match CI
- [ ] `karma-coverage` with global thresholds as the CI gate
- [ ] `npm test` = CI profile; dev loop uses `--watch` + progress/spec reporters

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
