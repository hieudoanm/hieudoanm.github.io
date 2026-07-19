# GDScript Best Practices: Validation Plan

Use this plan to verify work guided by [GDScript Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Gdscript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Reuse/pool where hot (bullets, particles) — queue_free on death, spawn via preloaded scenes:**
- [ ] **get_node/paths cached (@onready); string lookups in _process are the slow path.**
- [ ] **@export typed + @tool scripts only where the editor benefit is real.**
- [ ] **Avoid allocations in _process (temp arrays/strings); dirty-flag the work outside the frame.**

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
