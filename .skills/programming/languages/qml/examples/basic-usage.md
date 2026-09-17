# QML Best Practices: Basic Usage

Best practices for QML (Qt Modeling Language) development. Use when writing, structuring, or reviewing QML applications and components.

## Scenario

Use this example as a starting point when applying **qml-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Component Structure** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
