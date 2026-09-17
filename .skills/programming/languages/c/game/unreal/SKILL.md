---
name: "unreal-engine-best-practices"
description: "Best practices for building games with Unreal Engine (C++) — the framework conventions for UE5 game code. Use when writing, structuring, or reviewing Unreal C++ — covers project layout, UObject/actor design, gameplay frameworks, memory ownership, UTF-8/UE types, UPROPERTY/reflection, replication, and performance."
tags:
  - "programming"
  - "language"
  - "c"
  - "game"
  - "unreal"
  - "engine"
when_to_use: "Use when writing, structuring, or reviewing Unreal C++."
prerequisites:
  - "Basic familiarity with C and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../../cpp/SKILL.md"
  - "../../../csharp/game/unity/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Unreal Engine Best Practices

Unreal Engine 5 is an **object framework (UObject) with reflection** (macros/UPROPERTY), a gameplay class hierarchy (AGameMode, APawn, AActor, UActorComponent), and a **garbage-collected ownership model** layered on hard C++. Practical Unreal leans on **small-focused Actor-Component composition, UPROPERTY/UCLASS/UFUNCTION visible to the editor and GC, UE types (FString, TArray, TObjectPtr, TWeakObjectPtr) instead of raw STL in gameplay code**, and **travel/epic-scale replication done at the boundary**. Blueprints wire the graph; C++ owns the invariants.

## When to use

Use when writing, structuring, or reviewing Unreal C++.

## Prerequisites

- Basic familiarity with C and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Compose from components; keep the UObject framework the owner of state.**
- **UPROPERTY/UFUNCTION/UCLASS visible — reflection is the engine's eyes; don't hide from it.**
- **UE containers/types in engine code; FText for display, FName for keys.**
- **References with the right lifetime tool (TObjectPtr/TWeakObjectPtr/TSoftObjectPtr).**
- **Replication is an explicit, verified contract; server is the authority.**
- **Profile reality; keep the update loop tiny; data in content, logic in C++.**
- [ ] Module per responsibility; narrow includes; assets named by convention
- [ ] UCLASS/UPROPERTY/UFUNCTION over hidden C++ state; GENERATED_BODY everywhere

## Focus areas

- 1. Project & Modules
- 2. UObject, Classes & Reflection
- 3. Actor & Component Composition
- 4. Ownership, Memory & the GC
- 5. Core Types
- 6. Replication & Networking
- 7. Gameplay Framework
- 8. Performance
- 9. Testing & Debugging

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
