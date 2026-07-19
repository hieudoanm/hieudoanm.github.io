# Unity Best Practices: Starter Template

A reusable starting point derived from the **2. MonoBehaviour Lifecycle & Components** section of [Unity Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
