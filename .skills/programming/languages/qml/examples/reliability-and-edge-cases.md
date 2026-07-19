# QML Best Practices: 3. Performance

## Source guidance

This example applies the **3. Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`Item` as root** — use `Item { }` as the root Item when you don't need a specific visual type; it's the lightest.
- **`Loader` for on-demand loading** — `Loader { sourceComponent: myComponent; active: visible }` loads components only when needed.
- **Avoid JavaScript loops** for large datasets — use `Model` and `Repeater` instead.

## Example

```qml
Repeater {
    model: 100
    delegate: Item {
        width: 100; height: 50
    }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for qml-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
