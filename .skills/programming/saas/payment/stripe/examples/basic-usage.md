# Stripe Best Practices: Basic Usage

Best practices for integrating Stripe payments into a backend. Use when building checkout, subscriptions, webhooks, or payment processing — covers idempotency, webhook signatures, payment-method handling, and monitoring.

## Scenario

Use this example as a starting point when applying **stripe** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Principles** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```bash
curl https://api.stripe.com/v1/payment_intents \
  -u sk_test_...: \
  -d amount=2000 -d currency=usd \
  -H "Idempotency-Key: order_123_invoice_456"
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
