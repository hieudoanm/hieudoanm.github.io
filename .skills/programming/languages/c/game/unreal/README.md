# Unreal Engine Best Practices

Unreal Engine 5 is an **object framework (UObject) with reflection** (macros/UPROPERTY), a gameplay class hierarchy (AGameMode, APawn, AActor, UActorComponent), and a **garbage-collected ownership model** layered on hard C++. Practical Unreal leans on **small-focused Actor-Component composition, UPROPERTY/UCLASS/UFUNCTION visible to the editor and GC, UE types (FString, TArray, TObjectPtr, TWeakObjectPtr) instead of raw...

## When to use

Use when writing, structuring, or reviewing Unreal C++.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Unreal Engine Best Practices: Basic Usage](./examples/basic-usage.md)
- [Unreal Engine Best Practices: 8. Performance](./examples/reliability-and-edge-cases.md)
- [Unreal Engine Best Practices: 2. UObject, Classes & Reflection](./examples/setup-and-configuration.md)
- [Unreal Engine Best Practices: 9. Testing & Debugging](./examples/testing-and-validation.md)

## Assets

- [Unreal Engine Best Practices: Decision Record](./assets/decision-record.md)
- [Unreal Engine Best Practices: Starter Template](./assets/starter-template.md)
- [Unreal Engine Best Practices: Validation Plan](./assets/validation-plan.md)
- [Unreal Engine Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
