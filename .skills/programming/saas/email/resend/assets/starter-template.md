# Resend Best Practices: Starter Template

A reusable starting point derived from the **1. Core Stack & Concepts** section of [Resend Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
import { Resend } from "resend";

const client = new Resend(process.env.RESEND_API_KEY);
await client.emails.send({
  from: "Acme <no-reply@acme.com>",
  to: ["user@example.com"],
  subject: "Verify your email",
  react: <VerifyEmail code={code} />,
});
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
