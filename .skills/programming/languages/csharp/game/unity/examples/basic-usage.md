# Unity Best Practices: Basic Usage

Best practices for building games with Unity (C#) — the framework conventions for Unity projects. Use when writing, structuring, or reviewing Unity C# — covers project structure, components/MonoBehaviours, the game loop, scene/prefab composition, events, asset loading, performance, and testing.

## Scenario

Use this example as a starting point when applying **unity-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. MonoBehaviour Lifecycle & Components** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```csharp
public class Health : MonoBehaviour
{
    [SerializeField] private int _max = 100;
    public int Current { get; private set; }
    public event System.Action Died;

    private void Awake() => Current = _max;
    public void TakeDamage(int n)
    {
        Current = Mathf.Max(0, Current - n);
        if (Current == 0) Died?.Invoke();
    }
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
