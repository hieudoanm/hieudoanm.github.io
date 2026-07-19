# Overview

Focused reference for **qt-qml-ui-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
