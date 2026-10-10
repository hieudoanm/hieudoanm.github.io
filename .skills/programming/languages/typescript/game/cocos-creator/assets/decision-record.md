# Cocos Creator Best Practices: Decision Record

Use this record when applying [Cocos Creator Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building games with Cocos Creator — the framework conventions for 3D/2D games exported to web, iOS, and Android. Use when writing, structuring, or reviewing Cocos Creator projects — covers project structure, components/scenes, the component lifecycle, state management, asset loading, performance, and the build pipeline.

Cocos Creator is a component-based game engine (TypeScript-first) where **scenes /prefabs/are composed of nodes and Components** with a well-defined lifecycle (onLoad → start → update → onDestroy). Practical Cocos Creator leans on **one responsibility per component, scene graph assembled from prefabs (not ad-hoc scripts), a Director/EventTarget bus for cross-system events**, and **asset bundles with explicit preloading for the shipping build**. The editor is the composition root; code fills the behavior.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Project & Directory Structure
- [ ] 2. Components & Lifecycle
- [ ] 3. Scene & Prefab Composition
- [ ] 4. Input & Events
- [ ] 5. State & Data
- [ ] 6. Assets & Loading
- [ ] 7. Performance
- [ ] 8. Build & Release Pipeline

## Decision

- Chosen approach:
- Alternatives considered:
- Evidence and tradeoffs:
- Assumptions or deviations from the skill:

## Consequences and review

- Expected benefits:
- Risks and mitigations:
- Validation required before adoption:
- Revisit when:
