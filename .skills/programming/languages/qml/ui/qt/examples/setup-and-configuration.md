# Qt Quick UI Best Practices: 2. Animation & Transitions

## Source guidance

This example applies the **2. Animation & Transitions** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`NumberAnimation`** for property changes — `NumberAnimation { properties: ["x", "y"]; duration: 300 }`.
- **`Behavior`** for smooth default animations — `Behavior on x { NumberAnimation { duration: 200 } }`.
- **Avoid `PropertyAnimation` on `visible`** — use `State` + `PropertyChanges` or `Transition` instead.

## Example

```qml
Transition {
    from: ""
    to: "*"
    NumberAnimation { duration: 400; easing.type: Easing.OutQuad }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for qt-qml-ui-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
