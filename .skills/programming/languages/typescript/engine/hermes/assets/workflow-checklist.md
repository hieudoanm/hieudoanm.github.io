# Hermes Best Practices: Workflow Checklist

A practical run sheet for applying [Hermes Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Bytecode & Startup: **Precompile apps: Hermes's .hbc bytecode ships precompiled — faster start than JIT warmup:**
- [ ] 1. Bytecode & Startup: **Cold start = time-to-first-paint — trim the initial require graph** (lazy requires, defer heavy modules)
- [ ] 2. No-JIT Discipline: **Hermes is an interpreter (no Ion-style tier) — code style = normal, but:**
- [ ] 2. No-JIT Discipline: **Ion-flavored hacks (shapes as performance) matter less; correctness/GC matters more.**
- [ ] 3. Memory & GC: **Hermes GC is generational with compacting major cycles — allocation-rate aware:**
- [ ] 3. Memory & GC: **Queue releases: Engine.release() after background graphs; keep references short on large arrays.**
- [ ] 4. React Native Integration: **Enable Hermes consistent (RN 0.70+): enableHermes: true in metro.config/AppDelegate:**
- [ ] 4. React Native Integration: **Test on Hermes (not V8/Chrome-sim) — the engine is the runtime:**
- [ ] 5. Compatibility & Debugging: **Feature-set differs from V8 (some built-ins shimmed) — polyfill the seams:**
- [ ] 5. Compatibility & Debugging: **Debug via the official Hermes CLI (hermesc/hermes) + Metro for bytecode checks; repro visually in RN.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
