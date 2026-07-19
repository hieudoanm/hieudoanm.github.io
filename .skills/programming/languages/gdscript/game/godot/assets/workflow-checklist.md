# Godot Best Practices: Workflow Checklist

A practical run sheet for applying [Godot Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Scene Organization: **Small, single-purpose scenes composed into bigger ones:**
- [ ] 1. Scene Organization: **One scene per gameplay entity; innermost scenes own their siblings/children.**
- [ ] 2. Nodes & Communication: **Signals for events, methods only for direct flows:**
- [ ] 2. Nodes & Communication: **@onready/$Path for tree refs; export for design-time wiring (setget/@export) instead of hardcoded paths.**
- [ ] 3. The Main Loop: **_physics_process(delta) = fixed timestep (physics, movement); _process(delta) = per-frame visuals/UI:**
- [ ] 3. The Main Loop: **Integrate with delta — frame-rate independent movement; never raw constant positions.**
- [ ] 4. Resources & Data: **Resource (.tres/.gd-derived) for data-driven config — abilities, stats, levels:**
- [ ] 4. Resources & Data: **preload shared Resources for const-like singletons; load for spawned items.**
- [ ] 5. Input & Audio: **InputMap actions over raw keys** (ui_accept, move_left) — rebindable, multi-device:
- [ ] 5. Input & Audio: **Input.get_axis/get_vector for directional input; is_action_just_pressed in _physics_process.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
