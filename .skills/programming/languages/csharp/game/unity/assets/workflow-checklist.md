# Unity Best Practices: Workflow Checklist

A practical run sheet for applying [Unity Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Project & Folder Structure: **Folders as categories, names as contracts:**
- [ ] 1. Project & Folder Structure: **One component per file, named after behavior** (Health.cs, PlayerMovement.cs), never Manager(Script)2.cs
- [ ] 2. MonoBehaviour Lifecycle & Components: **Scripts are Components; the lifecycle is the contract:**
- [ ] 2. MonoBehaviour Lifecycle & Components: **Awake (self-setup) / OnEnable (subscribe) / Start (others ready) / OnDisable+OnDestroy (unsubscribe)** — the observer/unsubscribe pairing is the classic leak:
- [ ] 3. Scene & Prefab Composition: **Build scenes from prefabs** — one prefab per entity type; variants (Prefab → Prefab Variant) over copy-paste:
- [ ] 3. Scene & Prefab Composition: **Prefab = composition contract**: designer tweaks numbers; code owns invariants
- [ ] 4. Events & Cross-System Communication: **A static event bus / C# events to decouple systems**:
- [ ] 4. Events & Cross-System Communication: **Subscribe/unsubscribe paired explicitly** (OnEnable/OnDisable) — leaked static listeners keep dead objects alive
- [ ] 5. Game Loop & Physics: **Fixed timestep for physics; move by Time.fixedDeltaTime; scale-independent:**
- [ ] 5. Game Loop & Physics: **Time.deltaTime for camera/UI; clamp dt divides hitches** (Mathf.Min(Time.deltaTime, 0.05f) where gameplay depends)

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
