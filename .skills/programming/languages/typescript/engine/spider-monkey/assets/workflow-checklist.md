# SpiderMonkey Best Practices: Workflow Checklist

A practical run sheet for applying [SpiderMonkey Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Hidden Classes & Shapes: **Stable shape transitions per allocation site (SM uses "shapes" like V8/Dart-like):**
- [ ] 1. Hidden Classes & Shapes: **Prefill full shape at construction; late-property addition re-shapes.**
- [ ] 2. JIT Tiers & Ion: **SM tiers: interpreter → Baseline → Ion (optimizing) — stable frequent loops warm up to Ion:**
- [ ] 2. JIT Tiers & Ion: **Ion bails on type drift; keep accumulators one type (int stays int).**
- [ ] 3. Typed Structures & Works-with: **Typed typed-arrays first-class (including BigInt64Array)— numeric tunnels native:**
- [ ] 3. Typed Structures & Works-with: **Prefer DataView/typed views over bit-twiddling boxed objects for buffer IO.**
- [ ] 4. Stability & Compatibility: **SM engines vary by embedder — test against the actual embedded version (Firefox vs server/feedJS forks).**
- [ ] 4. Stability & Compatibility: **WorkerLifecycle/exit semantics differ — pin the embedder contract before streaming.**
- [ ] 5. Memory & GC: **SM's mark-compact GC: generational young + major collections — allocation-rate aware:**
- [ ] 5. Memory & GC: **Temporary buffers in the youngest heap; clear references after big array use.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
