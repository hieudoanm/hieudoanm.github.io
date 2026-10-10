# Unreal Engine Best Practices: Decision Record

Use this record when applying [Unreal Engine Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building games with Unreal Engine (C++) — the framework conventions for UE5 game code. Use when writing, structuring, or reviewing Unreal C++ — covers project layout, UObject/actor design, gameplay frameworks, memory ownership, UTF-8/UE types, UPROPERTY/reflection, replication, and performance.

Unreal Engine 5 is an **object framework (UObject) with reflection** (macros/UPROPERTY), a gameplay class hierarchy (AGameMode, APawn, AActor, UActorComponent), and a **garbage-collected ownership model** layered on hard C++. Practical Unreal leans on **small-focused Actor-Component composition, UPROPERTY/UCLASS/UFUNCTION visible to the editor and GC, UE types (FString, TArray, TObjectPtr, TWeakObjectPtr) instead of raw STL in gameplay code**, and **travel/epic-scale replication done at the boundary**. Blueprints wire the graph; C++ owns the invariants.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with C and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Project & Modules
- [ ] 2. UObject, Classes & Reflection
- [ ] 3. Actor & Component Composition
- [ ] 4. Ownership, Memory & the GC
- [ ] 5. Core Types
- [ ] 6. Replication & Networking
- [ ] 7. Gameplay Framework
- [ ] 8. Performance

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
