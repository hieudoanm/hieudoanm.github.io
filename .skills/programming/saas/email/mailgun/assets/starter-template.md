# Mailgun Best Practices: Starter Template

A reusable starting point derived from the **1. Core Stack & Concepts** section of [Mailgun Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```bash
curl -s --user "api:$MAILGUN_API_KEY" \
  https://api.mailgun.net/v3/mg.acme.com/messages \
  -F from="Acme <no-reply@mg.acme.com>" \
  -F to="user@example.com" \
  -F subject="Verify your email" \
  -F text="Your code is 1234"
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
