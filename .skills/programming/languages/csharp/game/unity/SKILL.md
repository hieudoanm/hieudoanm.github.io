---
name: "unity-best-practices"
description: "Best practices for building games with Unity (C#) — the framework conventions for Unity projects. Use when writing, structuring, or reviewing Unity C# — covers project structure, components/MonoBehaviours, the game loop, scene/prefab composition, events, asset loading, performance, and testing."
tags:
  - "programming"
  - "language"
  - "csharp"
  - "game"
  - "unity"
when_to_use: "Use when writing, structuring, or reviewing Unity C#."
prerequisites:
  - "Basic familiarity with C# and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../../../typescript/game/cocos-creator/SKILL.md"
  - "../../dotnet/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Unity Best Practices

Unity builds scenes from **GameObjects with Components** — C# scripts attached to entities — and a per-frame game loop (Update/FixedUpdate). Practical Unity leans on **component-per-concern composition, SerializeField/[RequireComponent] as the editor contract, an event/store for cross-system communication**, and **object pooling + asset loading discipline so the runtime stays allocation-free in hot paths**`. Unity is data-driven: prefabs hold composition, scenes hold worlds, and scripts fill behaviors.

## When to use

Use when writing, structuring, or reviewing Unity C#.

## Prerequisites

- Basic familiarity with C# and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Component per concern; scenes composed from prefabs; scripts fill behavior.**
- **SerializeField for data; cached GetComponent; never scene-scraping at runtime.**
- **Events/ScriptableObject decouple systems; subscribe/unsubscribe paired.**
- **Pool spawnables; hot paths allocation-free; fixed timestep for physics.**
- **Reference assets at build time; Addressables with paired release.**
- **Profile the frame before optimizing; editor-scripted, reproducible builds.**
- [ ] Folder structure + one component per file; pure logic separated (Core/)
- [ ] Lifecycle discipline (Awake/OnEnable/OnDisable) with paired subscribe/unsubscribe

## Focus areas

- 1. Project & Folder Structure
- 2. MonoBehaviour Lifecycle & Components
- 3. Scene & Prefab Composition
- 4. Events & Cross-System Communication
- 5. Game Loop & Physics
- 6. Assets & Loading
- 7. Performance
- 8. Build & Delivery
- 9. Testing & Code Quality

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
