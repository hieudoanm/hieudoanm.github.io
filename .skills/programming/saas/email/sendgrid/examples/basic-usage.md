# SendGrid Best Practices: Basic Usage

Best practices for sending email with Twilio SendGrid. Use when integrating transactional/marketing email, configuring sender authentication, or handling delivery events — covers API usage, deliverability, and event webhooks.

## Scenario

Use this example as a starting point when applying **sendgrid** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Concepts** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```bash
curl -X POST https://api.sendgrid.com/v3/mail/send \
  -H "Authorization: Bearer $SENDGRID_API_KEY" -H "Content-Type: application/json" \
  -d '{
    "from": {"email":"no-reply@acme.com","name":"Acme"},
    "personalizations":[{"to":[{"email":"user@example.com"}]}],
    "subject":"Verify your email",
    "content":[{"type":"text/plain","value":"Your code is 1234"}]
  }'
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
