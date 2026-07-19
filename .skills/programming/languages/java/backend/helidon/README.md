# Helidon Best Practices

Helidon offers two flavors: **helidon-se** (now **helidon-nima/virtual-thread based**; a modern, imperative WebServer with Routing builders) and **helidon-mp** (MicroProfile; CDI + JAX-RS conventions). Practical Helidon leans on **a Routing builder assembled from small Service/Handler pieces for SE, or CDI-managed resources with typed config for MP**, **Config/@ConfigProperty as the single configuration boundary**, and...

## When to use

Use when writing, structuring, or reviewing Helidon (helidon-se/helidon-nima and helidon-mp).

## Core topics

- 1. Starting Point (Helidon SE/Nima)
- 2. Routing & Structure
- 3. Configuration
- 4. Dependencies (SE) & CDI (MP)
- 5. Errors & Validation
- 6. Observability

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Helidon Best Practices: Basic Usage](./examples/basic-usage.md)
- [Helidon Best Practices: 5. Errors & Validation](./examples/reliability-and-edge-cases.md)
- [Helidon Best Practices: 3. Configuration](./examples/setup-and-configuration.md)
- [Helidon Best Practices: 7. Testing](./examples/testing-and-validation.md)

## Assets

- [Helidon Best Practices: Decision Record](./assets/decision-record.md)
- [Helidon Best Practices: Starter Template](./assets/starter-template.md)
- [Helidon Best Practices: Validation Plan](./assets/validation-plan.md)
- [Helidon Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
