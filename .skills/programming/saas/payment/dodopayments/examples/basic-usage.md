# Dodo Payments Best Practices: Basic Usage

Best practices for integrating Dodo Payments, a payments platform for digital products. Use when accepting payments/subscriptions, handling local payment methods, or consuming webhooks — covers robust online payments, signature verification, and entitlement flow.

## Scenario

Use this example as a starting point when applying **dodopayments** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Webhooks & Entitlement** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
const mac = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest("hex");
if (mac !== signature) return res.status(401).end();
// dedup → handle event → grant/revoke entitlement
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
