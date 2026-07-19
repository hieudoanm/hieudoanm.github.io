# Qt Quick UI Best Practices: Workflow Checklist

A practical run sheet for applying [Qt Quick UI Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Scene Graph & Item Hierarchy: **Item as root** — use Item { } as the root when no specific visual type is needed; it has no visual representation and is the lightest node
- [ ] 1. Scene Graph & Item Hierarchy: **Rectangle for solid shapes** — prefer Rectangle over custom Painter paths for simple boxes; it's hardware-accelerated
- [ ] 2. Animation & Transitions: **NumberAnimation** for property changes — NumberAnimation { properties: ["x", "y"]; duration: 300 }
- [ ] 2. Animation & Transitions: **Behavior** for smooth default animations — Behavior on x { NumberAnimation { duration: 200 } }
- [ ] 3. Event Handling: **MouseArea** for click/tap interactions — MouseArea { anchors.fill: parent; onClicked: { ... } }
- [ ] 3. Event Handling: **Keys** for keyboard input — Keys.onPressed: { if (event.key === Qt.Key_Escape) close() }
- [ ] 4. Internationalization: **qsTr() for user-visible strings** — Text { text: qsTr("Save") }
- [ ] 4. Internationalization: **qsTranslate() for plural forms** — Text { text: qsTr("1 file selected", "%n files selected", count) }

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
