# Windows App Development: 5. XAML & Performance

## Scenario

A project is working on **5. xaml & performance** for Windows App Development. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Use `x:Bind`, not `{Binding}`.** `{Binding}` resolves through reflection and boxing at runtime and allocates on every update; `x:Bind` is compiled at build time, so a renamed property is a compile error instead of a silent empty field.
- **`x:Bind` does not update automatically when a source property changes** unless you pass `Mode=OneWay` explicitly for non-`INotifyPropertyChanged` sources, or use `x:Bind` with a one-way path from an observable property. This is a feature, not a bug — it makes the data flow visible.
- **`x:Load="False"` defers a control out of the startup tree.** Use it for anything that is often not visible.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **5. XAML & Performance** section of [SKILL.md](../SKILL.md).
