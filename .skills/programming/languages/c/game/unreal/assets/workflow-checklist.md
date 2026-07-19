# Unreal Engine Best Practices: Workflow Checklist

A practical run sheet for applying [Unreal Engine Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Project & Modules: **One responsibility per module; plugins for resharable packages:**
- [ ] 1. Project & Modules: **Forward declare and #include narrowly** — Unreal headers are heavy; a Core module that drags the engine is a build-time and dependency smell
- [ ] 2. UObject, Classes & Reflection: **Gameplay objects are UCLASSes — UObject for shared data/gameplay code, AActor for world-placed, UActorComponent for behaviors:**
- [ ] 2. UObject, Classes & Reflection: **ADT-free**: expose via UPROPERTY/UFUNCTION so editor/Blueprint/GC see it — C++ members hidden from reflection are a separate contract you re-implement
- [ ] 3. Actor & Component Composition: **Build actors from components over inheritance chains** — a AFlyingSaucer is USceneComponent + UMeshComponent + behaviors, not a 6-level AActor subclass:
- [ ] 3. Actor & Component Composition: **Components own one behavior** (UHealthComponent, UInventoryComponent); actors orchestrate component events (OnHealthDepleted)
- [ ] 4. Ownership, Memory & the GC: **UObjects are garbage-collected — owned by the engine; hard references (TObjectPtr/UPROPERTY in a UObject-rooted context) keep them alive:**
- [ ] 4. Ownership, Memory & the GC: **Referencing non-UObject C++**: prefer TSharedPtr/TWeakPtr/TUniquePtr for the rare native allocations; never new a UClass-derived object (use NewObject<U>)
- [ ] 5. Core Types: **UE strings/types by convention**: FString (mutable heap text), FName (atomized key, comparisons by identity), FText (localizable UI), TArray<T>/TMap<K,V>/TSet<T> (UE containers, safe with GC-reflected elements):
- [ ] 5. Core Types: **FText for anything displayed (localization), FName for lookup, FString only where genuinely mutable.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
