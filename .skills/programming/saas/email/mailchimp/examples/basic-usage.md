# Mailchimp Best Practices: Basic Usage

Best practices for email marketing and audience management with Mailchimp. Use when running campaigns, managing audiences/automations, or integrating sign-ups — covers audience management, campaigns, and deliverability.

## Scenario

Use this example as a starting point when applying **mailchimp** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Concepts** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```text
App sign-up ──(API)──► Mailchimp audience (+ tags)
                          │
                          ├─ campaigns / automations
                          ├─ segment = tag + status
                          └─ unsubscribe/suppression honored
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
