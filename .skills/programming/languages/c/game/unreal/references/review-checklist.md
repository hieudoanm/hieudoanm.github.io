# Review checklist

Focused reference for **unreal-engine-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
