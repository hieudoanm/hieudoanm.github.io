# Workflow notes

Focused reference for **unreal-engine-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
