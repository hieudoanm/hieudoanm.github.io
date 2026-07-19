# Mailgun Best Practices

Mailgun is an email API strong at both **sending** and **inbound email processing** (routes/webhooks). Best practice is authenticating domains properly, using webhooks for delivery truth, and leveraging **inbound routes** to parse replies/notifications into your application.

## When to use

Use when integrating transaction email, configuring inbound routing, or handling delivery events.

## Core topics

- 1. Core Stack & Concepts
- 2. Sending Integration
- 3. Inbound & Processing
- 4. Deliverability & Events
- 5. Reliability & Operations

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Mailgun Best Practices: Basic Usage](./examples/basic-usage.md)
- [Mailgun Best Practices: 5. Reliability & Operations](./examples/reliability-and-edge-cases.md)
- [Mailgun Best Practices: Overview](./examples/setup-and-configuration.md)
- [Mailgun Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Mailgun Best Practices: Decision Record](./assets/decision-record.md)
- [Mailgun Best Practices: Starter Template](./assets/starter-template.md)
- [Mailgun Best Practices: Validation Plan](./assets/validation-plan.md)
- [Mailgun Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
