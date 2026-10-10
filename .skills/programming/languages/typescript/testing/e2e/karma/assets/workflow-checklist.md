# Karma Best Practices: Workflow Checklist

A practical run sheet for applying [Karma Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Configuration: **karma.conf.js is the wiring — frameworks + browsers + reporters:**
- [ ] 1. Configuration: **singleRun: true in CI; singleRun: false for the watch loop in dev.**
- [ ] 2. Files & Bundling: **Preprocess the TS/JS bundle** (karma-typescript, webpack, or esbuild) — the browser needs transpiled units, not bare TS
- [ ] 2. Files & Bundling: **files/include narrow to the test entry points**; no accidental serving of node_modules
- [ ] 3. Browsers & Launchers: **ChromeHeadless default; custom launcher for the CI environment:**
- [ ] 3. Browsers & Launchers: **Match launcher flags to the CI container** (sandbox, no-GPU, memory limits)
- [ ] 4. Coverage Gate: **karma-coverage + check thresholds fail the build under coverage:**
- [ ] 4. Coverage Gate: **Coverage thresholds are the CI brake for untested seams** — raise the numbers as the suite matures
- [ ] 5. Running & CI: **npm test wraps karma start with the CI profile** (singleRun + headless) vs the dev loop (--watch)
- [ ] 5. Running & CI: **CI runs on the headless launcher with the coverage gate**; failures surface the failing spec name, not a screenshot-less "1 failed"

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
