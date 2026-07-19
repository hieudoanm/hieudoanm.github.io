# Resend Best Practices

Resend is a developer-focused email API for transactional and marketing email. Best practice is treating email as a **deliverability engineering problem**: single recipient-focused API calls, webhooks for events (delivered/opened/bounced/complained), proper DNS/DKIM/SPF setup, and idempotent by-email retry handling.

## When to use

Use when integrating outbound email, handling bounces, or setting up templates.

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

- [Resend Best Practices: Basic Usage](./examples/basic-usage.md)
- [Resend Best Practices: 4. Reliability & Operations](./examples/reliability-and-edge-cases.md)
- [Resend Best Practices: 3. Deliverability & Events](./examples/setup-and-configuration.md)
- [Resend Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [Resend Best Practices: Decision Record](./assets/decision-record.md)
- [Resend Best Practices: Starter Template](./assets/starter-template.md)
- [Resend Best Practices: Validation Plan](./assets/validation-plan.md)
- [Resend Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
