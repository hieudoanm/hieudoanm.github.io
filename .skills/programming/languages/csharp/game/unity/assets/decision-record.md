# Unity Best Practices: Decision Record

Use this record when applying [Unity Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building games with Unity (C#) — the framework conventions for Unity projects. Use when writing, structuring, or reviewing Unity C# — covers project structure, components/MonoBehaviours, the game loop, scene/prefab composition, events, asset loading, performance, and testing.

Unity builds scenes from **GameObjects with Components** — C# scripts attached to entities — and a per-frame game loop (Update/FixedUpdate). Practical Unity leans on **component-per-concern composition, SerializeField/[RequireComponent] as the editor contract, an event/store for cross-system communication**, and **object pooling + asset loading discipline so the runtime stays allocation-free in hot paths**`. Unity is data-driven: prefabs hold composition, scenes hold worlds, and scripts fill behaviors.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with C# and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Project & Folder Structure
- [ ] 2. MonoBehaviour Lifecycle & Components
- [ ] 3. Scene & Prefab Composition
- [ ] 4. Events & Cross-System Communication
- [ ] 5. Game Loop & Physics
- [ ] 6. Assets & Loading
- [ ] 7. Performance
- [ ] 8. Build & Delivery

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
