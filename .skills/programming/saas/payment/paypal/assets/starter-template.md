# PayPal Best Practices: Starter Template

A reusable starting point derived from the **1. Core Stack & Concepts** section of [PayPal Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```http
POST /v2/checkout/orders
Authorization: Bearer <access_token>
{ "intent": "CAPTURE", "purchase_units": [{ "amount": { "currency_code":"USD", "value":"20.00" } }] }
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
