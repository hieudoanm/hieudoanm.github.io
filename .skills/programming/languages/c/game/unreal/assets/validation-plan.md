# Unreal Engine Best Practices: Validation Plan

Use this plan to verify work guided by [Unreal Engine Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with C and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Profile with the tools before touching systems** (stat unit, stat game, Unreal Insights, render-thread analysis)
- [ ] **Per-frame laws**: no per-frame allocations/reboxes, UpdateOverlaps guarded, NetUpdateFrequency respected, no per-frame component lookups in heavy loops
- [ ] **Async heavy work** (AsyncTask, FGraphEventRef) off the game thread; do GAsync correct, never lock-shuffle the game thread
- [ ] **STATGROUP/SCOPE_CYCLE_COUNTER for your own timing budgets.**
- [ ] **World partitions / ToM/LevelStreaming** for open-world scale; a single mega-level is the usual perf ceiling
- [ ] **Automation tests via IMPLEMENT_SIMPLE_AUTOMATION_TEST** for pure logic/components:
- [ ] **ensure/check for invariant violations; verify with runtime branches** — assertions are part of the shipped posture decision

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
