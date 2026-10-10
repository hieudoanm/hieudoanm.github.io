# Clerk Best Practices

Clerk is a developer-friendly authentication service with prebuilt components and session management. Best practice is leaning on its **sessions and prebuilt components** for speed while keeping authorization server-side: validate sessions (JWT or webhooks) in your backend, sync identity via webhooks, and never trust client-only state.

## When to use

Use when wiring up sign-in/sign-up, sessions, organization support, or webhooks.

## Core topics

- 1. Core Stack & Concepts
- 2. Integration Patterns
- 3. Authorization & Trust
- 4. Security & Operations

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Clerk Best Practices: Basic Usage](./examples/basic-usage.md)
- [Clerk Best Practices: 4. Security & Operations](./examples/reliability-and-edge-cases.md)
- [Clerk Best Practices: Quick-Start Checklist](./examples/setup-and-configuration.md)
- [Clerk Best Practices: Overview](./examples/testing-and-validation.md)

## Assets

- [Clerk Best Practices: Decision Record](./assets/decision-record.md)
- [Clerk Best Practices: Starter Template](./assets/starter-template.md)
- [Clerk Best Practices: Validation Plan](./assets/validation-plan.md)
- [Clerk Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
