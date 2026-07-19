# Implementation notes

Focused reference for **qml-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
