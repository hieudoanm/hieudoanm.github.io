---
name: "cocos-creator-best-practices"
description: "Best practices for building games with Cocos Creator — the framework conventions for 3D/2D games exported to web, iOS, and Android. Use when writing, structuring, or reviewing Cocos Creator projects — covers project structure, components/scenes, the component lifecycle, state management, asset loading, performance, and the build pipeline."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "game"
  - "cocos"
  - "creator"
when_to_use: "Use when writing, structuring, or reviewing Cocos Creator projects."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../../../csharp/game/unity/SKILL.md"
  - "../../frontend/frameworks/web/angular/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Cocos Creator Best Practices

Cocos Creator is a component-based game engine (TypeScript-first) where **scenes /prefabs/are composed of nodes and Components** with a well-defined lifecycle (onLoad → start → update → onDestroy). Practical Cocos Creator leans on **one responsibility per component, scene graph assembled from prefabs (not ad-hoc scripts), a Director/EventTarget bus for cross-system events**, and **asset bundles with explicit preloading for the shipping build**. The editor is the composition root; code fills the behavior.

## When to use

Use when writing, structuring, or reviewing Cocos Creator projects.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **One component per behavior; pure logic lives outside the cc layer and is unit-tested.**
- **The scene graph is composed from prefabs; scripts fill behavior, not node bureaucracy.**
- **Events /store for cross-system flow; components render/predicate state.**
- **Pool spawnables; update stays tiny; frames budget profiled before anything.**
- **Assets preloaded/bundled for the release target; errors fail loud.**
- [ ] Folder structure (scenes/prefabs/components/bundles/scripts) and one component per file
- [ ] Lifecycle (onLoad/start/update/onDestroy) with dt clamp and cleanup
- [ ] Prefab composition; designer-editable @property; no component reach-ins

## Focus areas

- 1. Project & Directory Structure
- 2. Components & Lifecycle
- 3. Scene & Prefab Composition
- 4. Input & Events
- 5. State & Data
- 6. Assets & Loading
- 7. Performance
- 8. Build & Release Pipeline
- 9. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
