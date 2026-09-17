# QML Best Practices: Starter Template

A reusable starting point derived from the **1. Component Structure** section of [QML Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```qml
import QtQuick 2.15
import QtQuick.Controls 2.15

Button {
    text: "Click me"
    onClicked: {
        console.log("Button clicked")
    }
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
