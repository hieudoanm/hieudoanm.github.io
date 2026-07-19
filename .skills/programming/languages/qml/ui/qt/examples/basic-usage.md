# Qt Quick UI Best Practices: Basic Usage

Best practices for Qt Quick UI development under QML scene graph. Use when designing, structuring, or optimizing QML user interfaces.

## Scenario

Use this example as a starting point when applying **qt-qml-ui-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Scene Graph & Item Hierarchy** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```qml
Column {
    spacing: 12
    Rectangle { height: 50; width: 100; color: "red" }
    Rectangle { height: 50; width: 100; color: "green" }
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
