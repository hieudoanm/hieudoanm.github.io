---
name: unreal-engine-best-practices
description: Best practices for building games with Unreal Engine (C++) — the framework conventions for UE5 game code. Use when writing, structuring, or reviewing Unreal C++ — covers project layout, UObject/actor design, gameplay frameworks, memory ownership, UTF-8/UE types, UPROPERTY/reflection, replication, and performance.
---

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

---

## 3. Actor & Component Composition

- **Build actors from components over inheritance chains** — a `AFlyingSaucer` is `USceneComponent` + `UMeshComponent` + behaviors, not a 6-level `AActor` subclass:

```cpp
AEnemy::AEnemy()
{
    Health = CreateDefaultSubobject<UHealthComponent>(TEXT("Health"));
    Mesh = CreateDefaultSubobject<USkeletalMeshComponent>(TEXT("Mesh"));
}
```

- **Components own one behavior** (`UHealthComponent`, `UInventoryComponent`); actors orchestrate component events (`OnHealthDepleted`).
- **`BeginPlay`/`Tick` vs `Constructor`**: init data/serialization in `BeginPlay`; create subobjects in the constructor; `Tick` only what must run per-frame.
- **Fast-distribution**: gameplay logic in C++, Blueprint only for visual/wiring — the graph is not the place to keep mutable state.
- **Avoid actor reach-into-actor** — query by event/service; a `GetComponentByClass` per frame is a code smell.

---

## 4. Ownership, Memory & the GC

- **`UObject`s are garbage-collected — owned by the engine; hard references (`TObjectPtr`/`UPROPERTY` in a UObject-rooted context) keep them alive:**

```cpp
UPROPERTY()
TObjectPtr<UDataAsset> Config;    // GC-rooted, serialized
```

- **Referencing non-UObject C++**: prefer `TSharedPtr`/`TWeakPtr`/`TUniquePtr` for the rare native allocations; never `new` a `UClass`-derived object (use `NewObject<U>`).
- **`TWeakObjectPtr`/`TSoftObjectPtr` break reference cycles** (actor → another actor → back) that born GC leaks.
- **`AddToRoot` is a root-cause smell** — keep hard refs in a rooted owner instead of preventing collection globally.
- **Chunked/Async loading**: `LoadObject`/`LoadPrimaryAsset` + `FStreamableManager` over `StaticLoadObject` in the hot path.

---

## 5. Core Types

- **UE strings/types by convention**: `FString` (mutable heap text), `FName` (atomized key, comparisons by identity), `FText` (localizable UI), `TArray<T>`/`TMap<K,V>`/`TSet<T>` (UE containers, safe with GC-reflected elements):

```cpp
FText DisplayName = NSLOCTEXT("Game", "HealthFull", "Health is full!");
FName NativeKey = TEXT("player_id");
```

- **`FText` for anything displayed (localization), `FName` for lookup, `FString` only where genuinely mutable.**
- **`TArray` over `std::vector`, `TMap` over `std::map` in engine code** — GC-aware, iterators/sort helpers, consistency.
- **`FVector`/`FRotator`/`FTransform` for math; `UKismetMathLibrary`/`FMath` helpers** over hand-rolled trig.
- **File/config reads via `GGameplayStatics`/`FConfigCacheIni`/`SaveGame` — never raw fstream file hacks for game data (platform-path correctness).**

---

## 6. Replication & Networking

- **State to replicate is a decision, not a default** — `DOREPLIFETIME`/`UPROPERTY(Replicated)` with `RepNotify`:

```cpp
UPROPERTY(ReplicatedUsing = OnRep_Health, BlueprintReadWrite, Category = "Health")
float Health;

void GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& OutLifetimeProps) const override;

UFUNCTION()
void OnRep_Health() { OnHealthChanged.Broadcast(Health); }
```

- **Authoritative simulation**: the owning server computes; client predicts/corrects — gameplay never trust client state.
- **`RPC` (`Server`/`Client`/`Multicast`)** chosen by direction; call validation (auth) on the server end always.
- **Test both local and dedicated-server paths** — a "works in singleplayer" game is networked, not playable.
- **Replication frequency/`NetUpdateFrequency` budgeted** — replicate only what occupancy/authority needs.

---

## 7. Gameplay Framework

- **Framework classes wired intentionally** — `AGameModeBase` (rules, match start), `AGameStateBase` (replicated state), `APawn`/`AController`/`APlayerController` for the simulation:

```cpp
UCLASS()
class AMyGameMode final : public AGameModeBase
{
    GENERATED_BODY()
public:
    virtual void StartPlay() override;
};
```

- **The framework is a protocol, not a bag** — each class has one role; game systems (scoring, waves) live in components/services addressed from the mode.
- **`UGameInstance` for session-level persistent state; `UGameInstanceSubsystem` for long-lived services.**
- **Data-driven tuning via `UDataAsset`/`UDataTable`** — numbers live in content, not code.

---

## 8. Performance

- **Profile with the tools before touching systems** (`stat unit`, `stat game`, Unreal Insights, render-thread analysis).
- **Per-frame laws**: no per-frame allocations/reboxes, `UpdateOverlaps` guarded, `NetUpdateFrequency` respected, no per-frame component lookups in heavy loops.
- **`Async` heavy work** (`AsyncTask`, `FGraphEventRef`) off the game thread; do `GAsync` correct, never lock-shuffle the game thread.
- **`STATGROUP`/`SCOPE_CYCLE_COUNTER` for your own timing budgets.**
- **World partitions / `ToM/LevelStreaming`** for open-world scale; a single mega-level is the usual perf ceiling.

---

## 9. Testing & Debugging

- **Automation tests via `IMPLEMENT_SIMPLE_AUTOMATION_TEST`** for pure logic/components:

```cpp
IMPLEMENT_SIMPLE_AUTOMATION_TEST(FHealthTest, "Gameplay.Health.ApplyDamage", EAutomationTestFlags_GameContextFilter)
bool FHealthTest::RunTest(UTestContext* Context) { /* ... */ }
```

- **`ensure`/`check` for invariant violations; `verify` with runtime branches** — assertions are part of the shipped posture decision.

---

## General Rules of Thumb

- **Compose from components; keep the UObject framework the owner of state.**
- **`UPROPERTY`/`UFUNCTION`/`UCLASS` visible — reflection is the engine's eyes; don't hide from it.**
- **UE containers/types in engine code; `FText` for display, `FName` for keys.**
- **References with the right lifetime tool (`TObjectPtr`/`TWeakObjectPtr`/`TSoftObjectPtr`).**
- **Replication is an explicit, verified contract; server is the authority.**
- **Profile reality; keep the update loop tiny; data in content, logic in C++.**

---

## Quick-Start Checklist

- [ ] Module per responsibility; narrow includes; assets named by convention
- [ ] `UCLASS`/`UPROPERTY`/`UFUNCTION` over hidden C++ state; `GENERATED_BODY` everywhere
- [ ] Actor = component composition; one behavior per component; C++ owns invariants
- [ ] GC-aware refs (`TObjectPtr`/`TWeakObjectPtr`/`TSoftObjectPtr`); no raw long-lived pointers
- [ ] `FText` display / `FName` keys / UE containers in gameplay code
- [ ] Replicated state via `DOREPLIFETIME` + `RepNotify`; server authority; RPC auth
- [ ] Framework roles respected (Mode/State/Pawn/Controller); data via `UDataAsset`/tables
- [ ] Per-frame discipline; async heavy work; Insights/`stat unit` before optimizing
- [ ] Automation tests + `ensure`/`check` invariants; dedicated-server tested