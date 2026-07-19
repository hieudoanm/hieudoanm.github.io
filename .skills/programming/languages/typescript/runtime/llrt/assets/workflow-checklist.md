# LLRT Best Practices: Workflow Checklist

A practical run sheet for applying [LLRT Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Runtime Setup: **Pin the LLRT layer/version explicitly:**
- [ ] 1. Runtime Setup: **Official pattern: image public.ecr.aws/lambda/llrt (or the binary in memory) pinned by SHA;**
- [ ] 2. Surface & Compatibility: **LLRT supports a subset: no full Node DOM/node_modules surface — node: built-ins are minimized:**
- [ ] 2. Surface & Compatibility: **Static-only require/import lives fine; dynamic-plugin ecosystems (fastify-style init) may not fit.**
- [ ] 3. Cold Start & Bundle: **Cold start = billed latency — keep bundles small, code shallow:**
- [ ] 3. Cold Start & Bundle: **Lazy-import heavy helpers inside branches (only on the code path hit).**
- [ ] 4. Async & Events: **Async handlers supported; use Promise-based APIs, no multi-busy event-loop games.**
- [ ] 4. Async & Events: **Connect to AWS SDK v3 subset (@aws-sdk/ packs supported) — profile the pack versions.**
- [ ] 5. Logging & Observability: **Console logging via CloudWatch (stdout) — no fancy logger dependencies:**
- [ ] 5. Logging & Observability: **performance.now()/timing embedded in the response for latency breadcrumbs.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
