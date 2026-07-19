# Flask Best Practices

Flask is **a minimal WSGI micro-framework with a large extension ecosystem** — app = Flask(__name__) + routes; structure grows with blueprints. Practical Flask leans on **an application factory (create_app) + blueprints for modular structure, config objects/environment-driven settings, extensions as declared dependencies, and thin routes with the domain in services** — small core; the factory pattern keeps projects...

## When to use

Use when writing, structuring, or reviewing Flask.

## Core topics

- 1. App Factory & Blueprints
- 2. Configuration
- 3. Routes & Views
- 4. Extensions & ORM
- 5. Resilience & Middleware
- 6. Testing & Deployment

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Flask Best Practices: Basic Usage](./examples/basic-usage.md)
- [Flask Best Practices: 4. Extensions & ORM](./examples/reliability-and-edge-cases.md)
- [Flask Best Practices: 2. Configuration](./examples/setup-and-configuration.md)
- [Flask Best Practices: 6. Testing & Deployment](./examples/testing-and-validation.md)

## Assets

- [Flask Best Practices: Decision Record](./assets/decision-record.md)
- [Flask Best Practices: Starter Template](./assets/starter-template.md)
- [Flask Best Practices: Validation Plan](./assets/validation-plan.md)
- [Flask Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
