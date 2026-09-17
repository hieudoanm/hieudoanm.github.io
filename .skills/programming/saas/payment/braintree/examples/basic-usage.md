# Braintree Best Practices: Basic Usage

Best practices for payment integration with Braintree (PayPal's gateway). Use when accepting cards, PayPal, and alternative methods, or adding subscriptions — covers client tokens, server-side transactions, and webhooks.

## Scenario

Use this example as a starting point when applying **braintree** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Concepts** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
// server generates a token for the client; client never handles card numbers directly
const gateway = braintree.connect({ environment, merchantId, publicKey, privateKey });
const { clientToken } = await gateway.clientToken.generate({});
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
