# Square Best Practices: Basic Usage

Best practices for integrating Square payments, including cards, subscriptions, and invoicing. Use when building checkout, commerce APIs, or processing online sales — covers API access tokens, webhooks, and secure payment handling.

## Scenario

Use this example as a starting point when applying **square** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Concepts** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```bash
curl -X POST https://connect.squareup.com/v2/payments \
  -H "Authorization: Bearer $SQUARE_ACCESS_TOKEN" \
  -H "Square-Version: 2024-01-18" \
  -d '{
    "idempotency_key": "order_123",
    "source_id": "cnon:card_nonce_ok",
    "amount_money": {"amount": 2000, "currency": "USD"}
  }'
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
