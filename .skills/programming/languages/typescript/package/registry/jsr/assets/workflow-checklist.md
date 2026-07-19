# JSR Best Practices: Workflow Checklist

A practical run sheet for applying [JSR Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Package Metadata: **deno.json (or jsr.json) defines the JSR package surface:**
- [ ] 1. Package Metadata: **exports explicit entry points; excluded dirs keep the package lean/source-clean.**
- [ ] 2. Source-First Structure: **JSR publishes TS/JS source (compiled at use) — no build artifact worship:**
- [ ] 2. Source-First Structure: **Explicit publish.exclude keeps tests/docs private to the package.**
- [ ] 3. Runtime Compatibility: **Target runtime deltas tested: Deno (default), Node (node: modules), Browser (no Deno. globals):**
- [ ] 3. Runtime Compatibility: **Guard feature-detects (typeof Deno !== "undefined") at the seams; avoid unconditional Deno.* in public entry.**
- [ ] 4. Publishing & CI: **Publish idempotent from CI on tags:**
- [ ] 4. Publishing & CI: **deno publish with --token/login flow; CI secrets host the JSR token.**
- [ ] 5. Consuming JSR: **Consumers add via jsr add @myorg/lib (Deno) or npx jsr add @myorg/lib for Node-style:**
- [ ] 5. Consuming JSR: **Lock-graph (deno.lock/package-lock) covers JSR deps — integrity verified at install.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
