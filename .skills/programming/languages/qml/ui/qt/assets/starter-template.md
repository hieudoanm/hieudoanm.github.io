# Qt Quick UI Best Practices: Starter Template

A reusable starting point derived from the **3. Event Handling** section of [Qt Quick UI Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
