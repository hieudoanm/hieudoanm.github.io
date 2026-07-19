# Overview

Focused reference for **unreal-engine-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Unreal Engine Best Practices

Unreal Engine 5 is an **object framework (`UObject`) with reflection** (macros/`UPROPERTY`), a gameplay class hierarchy (`AGameMode`, `APawn`, `AActor`, `UActorComponent`), and a **garbage-collected ownership model** layered on hard C++. Practical Unreal leans on **small-focused `Actor`-`Component` composition, `UPROPERTY`/`UCLASS`/`UFUNCTION` visible to the editor and GC, UE types (`FString`, `TArray`, `TObjectPtr`, `TWeakObjectPtr`) instead of raw STL in gameplay code**, and **travel/epic-scale replication done at the boundary**. Blueprints wire the graph; C++ owns the invariants.

---

## 1. Project & Modules

- **One responsibility per module; plugins for resharable packages:**

```text
Source/MyGame/
  Core/          # gameplay systems, data, services (no Actor deps)
  Gameplay/      # Actors, Components, characters
  UI/            # UMG widgets + viewmodel glue
  Tests/         # automation tests + gameplay asserts
```

- **Forward declare and `#include` narrowly** — Unreal headers are heavy; a `Core` module that drags the engine is a build-time and dependency smell.
- **`Build.cs` dependencies explicit** — `Public/Private` include paths; module references match what you `#include`.
- **Consistent naming by UE convention** — assets (`Content/` folders) named `BP_X`, textures `T_`, materials `M_`, blueprints `BP_` — discoverability is convention.

---

## 2. UObject, Classes & Reflection

- **Gameplay objects are `UCLASS`es — `UObject` for shared data/gameplay code, `AActor` for world-placed, `UActorComponent` for behaviors:**

```cpp
UCLASS()
class MYGAME_API UHealthComponent final : public UActorComponent
{
    GENERATED_BODY()
public:
    UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Health")
    float MaxHealth = 100.f;

    UFUNCTION(BlueprintCallable, Category = "Health")
    void TakeDamage(float Amount);
};
```

- **ADT-free**: expose via `UPROPERTY`/`UFUNCTION` so editor/Blueprint/GC see it — C++ members hidden from reflection are a separate contract you re-implement.
- **`GENERATED_BODY()` on every `UCLASS`; `final` classes; `UPROPERTY` on every member the engine should own/serialize.**
- **Prefer `TObjectPtr`/`TWeakObjectPtr`/`TSoftObjectPtr` for references** based on lifetime — never raw `AActor*` stored long-term that memory can outlive.
- **`UE_LOG` with categories + `LogVerbosity`** over `UE_LOG(LogTemp, ...)` scattered noise:

```cpp
DECLARE_LOG_CATEGORY_EXTERN(LogGameplay, Log, All);
```
