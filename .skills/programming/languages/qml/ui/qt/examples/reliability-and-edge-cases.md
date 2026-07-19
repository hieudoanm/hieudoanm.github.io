# Qt Quick UI Best Practices: 3. Event Handling

## Source guidance

This example applies the **3. Event Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`MouseArea`** for click/tap interactions — `MouseArea { anchors.fill: parent; onClicked: { ... } }`.
- **`Keys`** for keyboard input — `Keys.onPressed: { if (event.key === Qt.Key_Escape) close() }`.
- **`focus` policy** — set `focus: true` on the root Item to enable keyboard events.

## Example

```qml
Item {
    focus: true
    Keys.onPressed: {
        if (event.key === Qt.Key_Space) {
            doSomething()
        }
    }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for qt-qml-ui-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
