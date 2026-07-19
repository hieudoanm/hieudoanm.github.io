# Unreal Engine Best Practices: Starter Template

A reusable starting point derived from the **2. UObject, Classes & Reflection** section of [Unreal Engine Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
