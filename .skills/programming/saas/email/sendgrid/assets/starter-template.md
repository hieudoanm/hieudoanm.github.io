# SendGrid Best Practices: Starter Template

A reusable starting point derived from the **1. Core Stack & Concepts** section of [SendGrid Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
