# GDScript Best Practices: Workflow Checklist

A practical run sheet for applying [GDScript Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Typing & Style: **Type every variable/parameter/return:**
- [ ] 1. Typing & Style: **@export for inspector-tweakable design values; const over var where invariant.**
- [ ] 2. Signals for Communication: **Signals decouple nodes — emit events, not commands:**
- [ ] 2. Signals for Communication: **Connect via editor/code deliberately; prefer health_changed.connect(...) over polling.**
- [ ] 3. Node Lifecycle: **Reference peers/siblings in _ready(), not _init() (tree unready at _init):**
- [ ] 3. Node Lifecycle: **_process(delta) per-frame; _physics_process(delta) for physics steps (fixed timestep).**
- [ ] 4. Scenes & Composition: **One scene per node-type; composition over inheritance (prefabs build trees).**
- [ ] 4. Scenes & Composition: **get_node via @onready path or @export NodePath; children owned by their parent.**
- [ ] 5. Performance & Memory: **Reuse/pool where hot (bullets, particles) — queue_free on death, spawn via preloaded scenes:**
- [ ] 5. Performance & Memory: **get_node/paths cached (@onready); string lookups in _process are the slow path.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
