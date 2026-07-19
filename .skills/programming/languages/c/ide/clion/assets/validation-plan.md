# CLion: Validation Plan

Use this plan to verify work guided by [CLion](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with C and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **CLion's refactorings are reliable for semantic changes** — extract function, introduce parameter, change signature — because they are backed by the real index. Use them rather than hand-editing signatures across a codebase
- [ ] **The ReSharper C++ engine does most of the work,** so keeping the project fully indexed matters more than in other JetBrains IDEs. Excluding a generated directory with a full-project search will slow it noticeably; exclude narrow paths only
- [ ] **Run inspections as a batch (Inspect Code → Whole solution) before large refactors,** not after, so the baseline is known
- [ ] **Memory: check the size of what you assume is small.** sizeof in a watch, or a static assert, replaces a guess
- [ ] **For large codebases, build only the target you are changing.** Building everything because there is one run configuration defeats the incremental build the IDE was designed around

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
