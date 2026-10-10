# V8 Best Practices: Workflow Checklist

A practical run sheet for applying [V8 Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Object Shape & Monomorphism: **Stable key insertion order/type per "shape" — hot paths stay monomorphic:**
- [ ] 1. Object Shape & Monomorphism: **Avoid adding/removing properties after creation** (obj.x = 1; delete obj.x churns hidden classes)
- [ ] 2. Typed Arrays & Numeric Work: **Float64Array/Int32Array for numeric buffers — flat, unboxed, SIMD-able:**
- [ ] 2. Typed Arrays & Numeric Work: **Heavy loops in typed-array land (not boxed Number objects); preallocate sizes.**
- [ ] 3. Deoptimization Traps: **Distinct sources deopt the hot function** — mixing int/float/double in one accumulator, bailouts from in-guards
- [ ] 3. Deoptimization Traps: **try/catch/with/eval restrict optimization in their scope** — keep them out of the hot inner loop
- [ ] 4. Memory & GC: **V8 GC (generational — young/old) — allocations into old space survive scavenges:**
- [ ] 4. Memory & GC: **Large arrays/buffers and strings flow; avoid long pin/lifetime of buffers — null references after use.**
- [ ] 5. Profiling & Tooling: **Profile with --prof/--cpu-prof / DevTools CPU profile; the flame is the map:**
- [ ] 5. Profiling & Tooling: **Optimization tier affinity: d8 --trace-opt --trace-deopt (debug harness only).**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
