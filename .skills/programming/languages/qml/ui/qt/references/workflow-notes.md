# Workflow notes

Focused reference for **qt-qml-ui-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
