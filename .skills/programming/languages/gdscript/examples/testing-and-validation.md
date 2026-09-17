# GDScript Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for GDScript Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Full typing (`: int`, `-> void`); `@export` tweakables
- [ ] `signal` decoupling; typed signal args; grouped tree calls
- [ ] `@onready` for node refs; lifecycle hooks correct (`_ready`/`_process`/`_physics_process`)
- [ ] `queue_free()` lifecycle; `is_inside_tree()` checks
- [ ] Cached nodes/strings; no per-frame allocations
- [ ] Debug tools (asserts, push_error); GUT tests for pure logic

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
