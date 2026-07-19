# Postmark Best Practices: Starter Template

A reusable starting point derived from the **1. Core Stack & Concepts** section of [Postmark Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
