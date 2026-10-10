# Lemon Squeezy Best Practices: Basic Usage

Best practices for selling digital products and subscriptions with Lemon Squeezy (now part of Stripe's merchant of record). Use when integrating checkout, managing licenses/entitlements, or consuming webhooks — covers MoR model, webhook signatures, and subscription lifecycle.

## Scenario

Use this example as a starting point when applying **lemonsqueezy** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Webhooks & Entitlement** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
const sig = req.headers["x-signature"];
const digest = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest("hex");
if (sig !== digest) return res.status(401).end();
// event.data → dedup → entitlement updates
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
