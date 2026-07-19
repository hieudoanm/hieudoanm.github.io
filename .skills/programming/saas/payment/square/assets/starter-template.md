# Square Best Practices: Starter Template

A reusable starting point derived from the **1. Core Stack & Concepts** section of [Square Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
