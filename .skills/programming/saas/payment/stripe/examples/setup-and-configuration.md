# Stripe Best Practices: 3. Webhooks & State

## Source guidance

This example applies the **3. Webhooks & State** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Verify webhook signatures** with your `whsec_` signing secret (HMAC-SHA256) and the `Stripe-Signature` header — never trust unverified payloads
- **Handle event idempotency**: store processed event IDs (crash-safe dedup)
- Handle the **canonical events** explicitly:
- `payment_intent.succeeded` / `.processing` / `.requires_payment_method` / `.canceled`
- `invoice.payment_succeeded` / `.payment_failed`
- `customer.subscription.updated` / `deleted`
- `charge.dispute.created` / `charge.refunded`

## Example

```js
const sigHeader = req.headers["stripe-signature"];
try {
  const event = stripe.webhooks.constructEvent(req.body, sigHeader, process.env.STRIPE_WEBHOOK_SECRET);
  // event.id → dedup → handle by type
} catch (err) { res.status(400).send(`Webhook Error: ${err.message}`); }
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for stripe.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
