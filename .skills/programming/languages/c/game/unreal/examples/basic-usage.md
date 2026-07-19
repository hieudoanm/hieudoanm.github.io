# Unreal Engine Best Practices: Basic Usage

Best practices for building games with Unreal Engine (C++) — the framework conventions for UE5 game code. Use when writing, structuring, or reviewing Unreal C++ — covers project layout, UObject/actor design, gameplay frameworks, memory ownership, UTF-8/UE types, UPROPERTY/reflection, replication, and performance.

## Scenario

Use this example as a starting point when applying **unreal-engine-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. UObject, Classes & Reflection** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
