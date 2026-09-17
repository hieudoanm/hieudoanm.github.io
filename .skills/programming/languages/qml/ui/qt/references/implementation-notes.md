# Implementation notes

Focused reference for **qt-qml-ui-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
