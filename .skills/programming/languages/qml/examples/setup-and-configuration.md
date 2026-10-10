# QML Best Practices: 4. Model-View Pattern

## Source guidance

This example applies the **4. Model-View Pattern** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`ListModel`** for simple data — declare data inline or load from JavaScript.
- **`Repeater`** for rendering lists — bind to `ListModel` or `QtObject` data.
- **`delegate` efficiency** — keep delegates lightweight; avoid heavy layout or JavaScript in `delegate`.

## Example

```qml
ListView {
    model: ListModel {
        id: fruitModel
        ListElement { name: "Apple"; color: "red" }
        ListElement { name: "Banana"; color: "yellow" }
    }
    delegate: Text { text: model.name }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for qml-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
