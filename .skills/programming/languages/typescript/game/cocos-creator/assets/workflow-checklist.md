# Cocos Creator Best Practices: Workflow Checklist

A practical run sheet for applying [Cocos Creator Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Project & Directory Structure: **Cap-everything kinds cleanly** — assets by functional folder, scripts colocated with their scene/prefab:
- [ ] 1. Project & Directory Structure: **One component per file; name it after behavior** (PlayerController.ts, WaveSpawner.ts), not Update1.ts
- [ ] 2. Components & Lifecycle: **Components are behaviors; @ccclass + props make them designer-editable:**
- [ ] 2. Components & Lifecycle: **Lifecycle shape respected**: onLoad (self setup), start (depends ready), update(dt) (per-frame — keep it small), onDestroy (unsubscribe/cleanup):
- [ ] 3. Scene & Prefab Composition: **Build the scene tree from prefabs** — a scene that is one giant hand-built hierarchy is unmaintable; prefab = reusable assembly
- [ ] 3. Scene & Prefab Composition: **Prefab reuse over copy-paste**: one prefab + variants (via props) over duplicated nodes
- [ ] 4. Input & Events: **Prefer the node event system for game logic** — node.on("died", ...), node.emit — typed via a shared event-name module:
- [ ] 4. Input & Events: **Input (Input.on(Input.EventType.KEY_DOWN, cb)) at the entry, dispatched as game events** — input mapping is config, not business logic
- [ ] 5. State & Data: **Game state in typed services** (a store/EventTarget hub), not scattered across components:
- [ ] 5. State & Data: **Components remain pure renderers/react to the store; the store owns truth.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
