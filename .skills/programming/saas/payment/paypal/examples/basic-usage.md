# PayPal Best Practices: Basic Usage

Best practices for integrating PayPal payments. Use when adding checkout, subscriptions/billing, or handling webhooks — covers order/v2 API, webhook verification, and dispute handling.

## Scenario

Use this example as a starting point when applying **paypal** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Concepts** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```http
POST /v2/checkout/orders
Authorization: Bearer <access_token>
{ "intent": "CAPTURE", "purchase_units": [{ "amount": { "currency_code":"USD", "value":"20.00" } }] }
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
