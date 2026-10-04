---
name: qt-qml-ui-best-practices
description: Best practices for Qt Quick UI development under QML scene graph. Use when designing, structuring, or optimizing QML user interfaces.
---

# Qt Quick UI Best Practices

Qt Quick provides a declarative framework for fluid, animated user interfaces. Following these conventions ensures smooth performance and maintainable UI code.

---

## 1. Scene Graph & Item Hierarchy

- **`Item` as root** — use `Item { }` as the root when no specific visual type is needed; it has no visual representation and is the lightest node.
- **`Rectangle` for solid shapes** — prefer `Rectangle` over custom `Painter` paths for simple boxes; it's hardware-accelerated.
- **`Grouping` with `Column`, `Row`, `GridLayout`** — use layout components for automatic positioning and resizing.

```qml
Column {
    spacing: 12
    Rectangle { height: 50; width: 100; color: "red" }
    Rectangle { height: 50; width: 100; color: "green" }
}
```

---

## 2. Animation & Transitions

- **`NumberAnimation`** for property changes — `NumberAnimation { properties: ["x", "y"]; duration: 300 }`.
- **`Behavior`** for smooth default animations — `Behavior on x { NumberAnimation { duration: 200 } }`.
- **Avoid `PropertyAnimation` on `visible`** — use `State` + `PropertyChanges` or `Transition` instead.

```qml
Transition {
    from: ""
    to: "*"
    NumberAnimation { duration: 400; easing.type: Easing.OutQuad }
}
```

---

## 3. Event Handling

- **`MouseArea`** for click/tap interactions — `MouseArea { anchors.fill: parent; onClicked: { ... } }`.
- **`Keys`** for keyboard input — `Keys.onPressed: { if (event.key === Qt.Key_Escape) close() }`.
- **`focus` policy** — set `focus: true` on the root Item to enable keyboard events.

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

---

## 4. Internationalization

- **`qsTr()` for user-visible strings** — `Text { text: qsTr("Save") }`.
- **`qsTranslate()` for plural forms** — `Text { text: qsTr("1 file selected", "%n files selected", count) }`.
- **Separate `.qm` translation files** — use `lupdate` and `lrelease` to generate translations.

```qml
Text { text: qsTr("Hello, World!") }
```

---

## 5. Quick-Start Checklist

- [ ] `Item { }` as root when no visual type needed
- [ ] Layout components (`Column`, `Row`, `GridLayout`) for positioning
- [ ] `NumberAnimation` / `Transition` for animations
- [ ] `MouseArea` for click interactions
- [ ] `focus: true` on root Item for keyboard support
- [ ] `qsTr()` for all user-visible strings