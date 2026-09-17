# SendGrid Best Practices

SendGrid is the Twilio email platform for transactional and marketing email. Best practice is treating it as a **deliverability pipeline**: authenticated sender domains (DKIM/SPF/DMARC), a single sending strategy per type, and event webhooks over polling to react to bounces/complaints.

## When to use

Use when integrating transactional/marketing email, configuring sender authentication, or handling delivery events.

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

- [SendGrid Best Practices: Basic Usage](./examples/basic-usage.md)
- [SendGrid Best Practices: 4. Reliability & Operations](./examples/reliability-and-edge-cases.md)
- [SendGrid Best Practices: 3. Deliverability & Events](./examples/setup-and-configuration.md)
- [SendGrid Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [SendGrid Best Practices: Decision Record](./assets/decision-record.md)
- [SendGrid Best Practices: Starter Template](./assets/starter-template.md)
- [SendGrid Best Practices: Validation Plan](./assets/validation-plan.md)
- [SendGrid Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
