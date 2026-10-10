# Cocos Creator Best Practices

Cocos Creator is a component-based game engine (TypeScript-first) where **scenes /prefabs/are composed of nodes and Components** with a well-defined lifecycle (onLoad → start → update → onDestroy). Practical Cocos Creator leans on **one responsibility per component, scene graph assembled from prefabs (not ad-hoc scripts), a Director/EventTarget bus for cross-system events**, and **asset bundles with explicit preloading for...

## When to use

Use when writing, structuring, or reviewing Cocos Creator projects.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Cocos Creator Best Practices: Basic Usage](./examples/basic-usage.md)
- [Cocos Creator Best Practices: 7. Performance](./examples/reliability-and-edge-cases.md)
- [Cocos Creator Best Practices: 1. Project & Directory Structure](./examples/setup-and-configuration.md)
- [Cocos Creator Best Practices: 9. Testing](./examples/testing-and-validation.md)

## Assets

- [Cocos Creator Best Practices: Decision Record](./assets/decision-record.md)
- [Cocos Creator Best Practices: Starter Template](./assets/starter-template.md)
- [Cocos Creator Best Practices: Validation Plan](./assets/validation-plan.md)
- [Cocos Creator Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
