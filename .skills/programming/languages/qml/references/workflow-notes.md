# Workflow notes

Focused reference for **qml-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
