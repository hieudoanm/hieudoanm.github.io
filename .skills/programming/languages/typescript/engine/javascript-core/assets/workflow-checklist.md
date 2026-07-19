# JavaScriptCore Best Practices: Workflow Checklist

A practical run sheet for applying [JavaScriptCore Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Shapes & Caching: **Stable property layout per constructor — JSC caches on shapes; same discipline as V8:**
- [ ] 1. Shapes & Caching: **Precreate objects fully; adding keys later in hot code forces re-transition.**
- [ ] 2. JIT Tiers & Warmup: **JSC runs: baseline (interpreter), DFG (medium), FTL (optimizing) — tier-up paths come from call/structure frequency:**
- [ ] 2. JIT Tiers & Warmup: **Hot loops stabilized over warmup — benchmarks must warm up before timing (JSC benchmarks document this ceremony).**
- [ ] 3. Typed Arrays & Big-Int: **Typed arrays (including BigInt64Array) map to native memory — good for numeric tunnels:**
- [ ] 3. Typed Arrays & Big-Int: **Int64-ish work via BigInt for exactness; avoid >> on large bitmasks unless Smi-range.**
- [ ] 4. Memory & GC (JSC's generational GC): **JSC GC = semi-space + mark-sweep; allocation counts drive --gc-observation:**
- [ ] 4. Memory & GC (JSC's generational GC): **Short-lived objects stay in youngest heap; watch retention in heap snapshots (Safari/Mac instrumentation).**
- [ ] 5. Debugging & Diagnostics: **Safari Web Inspector / jsc CLI with --profile for CPU; allocation traces via Instruments.**
- [ ] 5. Debugging & Diagnostics: **js shell: d8-analogue jsc — --printstrings, --jitMemoryAllocation diagnostics for the curious.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
