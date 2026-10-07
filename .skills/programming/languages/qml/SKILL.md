---
name: qml-best-practices
description: Best practices for QML (Qt Modeling Language) development. Use when writing, structuring, or reviewing QML applications and components.
---

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

---

## 2. Property Binding & State

- **Use `readonly` properties** for constants — `property readonly MAX_WIDTH: 400`.
- **`Signal` over `Handler`** for communication between components — emit signals instead of calling handlers directly.
- **`State` and `PropertyChanges`** for UI transitions — define visual states declaratively.

```qml
Component.onCompleted: {
    state = State {
        name: "highlighted"
        PropertyChanges { target: rectangle; color: "orange" }
    }
    goToState("highlighted")
}
```

---

## 3. Performance

- **`Item` as root** — use `Item { }` as the root Item when you don't need a specific visual type; it's the lightest.
- **`Loader` for on-demand loading** — `Loader { sourceComponent: myComponent; active: visible }` loads components only when needed.
- **Avoid JavaScript loops** for large datasets — use `Model` and `Repeater` instead.

```qml
Repeater {
    model: 100
    delegate: Item {
        width: 100; height: 50
    }
}
```

---

## 4. Model-View Pattern

- **`ListModel`** for simple data — declare data inline or load from JavaScript.
- **`Repeater`** for rendering lists — bind to `ListModel` or `QtObject` data.
- **`delegate` efficiency** — keep delegates lightweight; avoid heavy layout or JavaScript in `delegate`.

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

---

## 5. Quick-Start Checklist

- [ ] `import QtQuick 2.15` (or appropriate version) at top
- [ ] One component per file
- [ ] `Item { }` as root when no specific visual type needed
- [ ] `Repeater` or `ListView` for lists — not JavaScript `for` loops
- [ ] Signals used for component communication
- [ ] `Loader` for on-demand component loading