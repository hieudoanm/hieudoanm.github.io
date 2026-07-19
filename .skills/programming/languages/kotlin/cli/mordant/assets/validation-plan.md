# Mordant Best Practices: Validation Plan

Use this plan to verify work guided by [Mordant Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Kotlin and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Test the renderer as a pure function.** Render.frame(state, kv): String takes state and returns a frame — no terminal, no timing, no flakiness. Assert on substrings (assertTrue(frame.contains(">1 user:alice"))) and on column alignment, not on byte-for-byte equality
- [ ] **Test terminal I/O with the recorder.** Pin AnsiLevel.NONE and a fixed width so the assertions do not depend on the developer's terminal

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
