# QML Best Practices: Workflow Checklist

A practical run sheet for applying [QML Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Component Structure: **One component per file** — Button.qml, Card.qml, ListItem.qml — keep files focused and reusable
- [ ] 1. Component Structure: **Use Component** for dynamic UI generation — Component { ... } when UI needs to be instantiated multiple times with varying data
- [ ] 2. Property Binding & State: **Use readonly properties** for constants — property readonly MAX_WIDTH: 400
- [ ] 2. Property Binding & State: **Signal over Handler** for communication between components — emit signals instead of calling handlers directly
- [ ] 3. Performance: **Item as root** — use Item { } as the root Item when you don't need a specific visual type; it's the lightest
- [ ] 3. Performance: **Loader for on-demand loading** — Loader { sourceComponent: myComponent; active: visible } loads components only when needed
- [ ] 4. Model-View Pattern: **ListModel** for simple data — declare data inline or load from JavaScript
- [ ] 4. Model-View Pattern: **Repeater** for rendering lists — bind to ListModel or QtObject data

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
