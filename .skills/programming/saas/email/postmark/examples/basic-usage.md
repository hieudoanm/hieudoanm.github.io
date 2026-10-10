# Postmark Best Practices: Basic Usage

Best practices for transactional email with Postmark. Use when sending app-triggered email reliably, handling bounces, or setting up delivery events — covers the send API, deliverability defaults, and reputation management.

## Scenario

Use this example as a starting point when applying **postmark** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Concepts** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```bash
curl -X POST https://api.postmarkapp.com/email \
  -H "X-Postmark-Server-Token: $POSTMARK_TOKEN" \
  -H "Accept: application/json" -H "Content-Type: application/json" \
  -d '{
    "From":"no-reply@acme.com",
    "To":"user@example.com",
    "Subject":"Verify your email",
    "HtmlBody":"<p>Your code is 1234</p>",
    "MessageStream":"outbound"
  }'
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
