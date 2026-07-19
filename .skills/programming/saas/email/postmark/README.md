# Postmark Best Practices

Postmark is a transactional-email-only service (it rejects marketing/bulk by policy). Best practice is using it for **behavioral, app-triggered email** with high deliverability expectations: plain send API + templates, webhooks for bounces, and strict suppression handling.

## When to use

Use when sending app-triggered email reliably, handling bounces, or setting up delivery events.

## Core topics

- 1. Core Stack & Concepts
- 2. Integration & Sending
- 3. Deliverability & Events
- 4. Reliability & Operations

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Postmark Best Practices: Basic Usage](./examples/basic-usage.md)
- [Postmark Best Practices: 4. Reliability & Operations](./examples/reliability-and-edge-cases.md)
- [Postmark Best Practices: Overview](./examples/setup-and-configuration.md)
- [Postmark Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Postmark Best Practices: Decision Record](./assets/decision-record.md)
- [Postmark Best Practices: Starter Template](./assets/starter-template.md)
- [Postmark Best Practices: Validation Plan](./assets/validation-plan.md)
- [Postmark Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
