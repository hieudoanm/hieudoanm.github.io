# Resend Best Practices: Basic Usage

Best practices for sending transactional email with Resend. Use when integrating outbound email, handling bounces, or setting up templates — covers API usage, deliverability, webhooks, and reliability.

## Scenario

Use this example as a starting point when applying **resend** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Concepts** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
