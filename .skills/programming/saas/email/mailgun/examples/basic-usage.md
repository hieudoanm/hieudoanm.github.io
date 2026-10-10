# Mailgun Best Practices: Basic Usage

Best practices for sending and receiving email with Mailgun. Use when integrating transaction email, configuring inbound routing, or handling delivery events — covers sending API, inbound parsing, webhooks, and deliverability.

## Scenario

Use this example as a starting point when applying **mailgun** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Concepts** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```bash
curl -s --user "api:$MAILGUN_API_KEY" \
  https://api.mailgun.net/v3/mg.acme.com/messages \
  -F from="Acme <no-reply@mg.acme.com>" \
  -F to="user@example.com" \
  -F subject="Verify your email" \
  -F text="Your code is 1234"
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
