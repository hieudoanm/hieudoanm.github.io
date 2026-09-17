# Implementation notes

Focused reference for **unreal-engine-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
