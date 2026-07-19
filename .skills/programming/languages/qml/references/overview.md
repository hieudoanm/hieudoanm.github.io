# Overview

Focused reference for **qml-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# QML Best Practices

QML is a declarative language for designing user interface-centric applications. Following conventions ensures maintainable, performant, and scalable UI code.

---

## 1. Component Structure

- **One component per file** — `Button.qml`, `Card.qml`, `ListItem.qml` — keep files focused and reusable.
- **Use `Component`** for dynamic UI generation — `Component { ... }` when UI needs to be instantiated multiple times with varying data.
- **`QtQuick` imports** — always specify version: `import QtQuick 2.15`.
- **`Qt.labs.platform`** for desktop-styled controls when needed.

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
