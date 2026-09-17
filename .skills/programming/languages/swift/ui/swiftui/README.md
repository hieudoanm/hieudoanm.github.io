# SwiftUI Best Practices

SwiftUI is a declarative UI framework: you describe the view for a given state and the framework reconciles it. Practical SwiftUI leans on **small View structs, explicit state ownership through property wrappers (@State, @Binding, @Observable)**, and **Observable/@Environment flows for shared data — not singletons**. The modifier chain reads as the styling contract, and #Preview + XCTest gate every iteration.

## When to use

Use when writing, structuring, or reviewing SwiftUI.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [SwiftUI Best Practices: Basic Usage](./examples/basic-usage.md)
- [SwiftUI Best Practices: 2. View Composition](./examples/reliability-and-edge-cases.md)
- [SwiftUI Best Practices: 10. Performance & App Structure](./examples/setup-and-configuration.md)
- [SwiftUI Best Practices: 9. Testing](./examples/testing-and-validation.md)

## Assets

- [SwiftUI Best Practices: Decision Record](./assets/decision-record.md)
- [SwiftUI Best Practices: Starter Template](./assets/starter-template.md)
- [SwiftUI Best Practices: Validation Plan](./assets/validation-plan.md)
- [SwiftUI Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
