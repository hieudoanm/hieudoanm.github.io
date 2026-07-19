# Unreal Engine Best Practices: 2. UObject, Classes & Reflection

## Source guidance

This example applies the **2. UObject, Classes & Reflection** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Gameplay objects are `UCLASS`es — `UObject` for shared data/gameplay code, `AActor` for world-placed, `UActorComponent` for behaviors:**
- **ADT-free**: expose via `UPROPERTY`/`UFUNCTION` so editor/Blueprint/GC see it — C++ members hidden from reflection are a separate contract you re-implement.
- **`GENERATED_BODY()` on every `UCLASS`; `final` classes; `UPROPERTY` on every member the engine should own/serialize.**
- **Prefer `TObjectPtr`/`TWeakObjectPtr`/`TSoftObjectPtr` for references** based on lifetime — never raw `AActor*` stored long-term that memory can outlive.

## Example

```cpp
DECLARE_LOG_CATEGORY_EXTERN(LogGameplay, Log, All);
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for unreal-engine-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
