# Stripe Best Practices: Starter Template

A reusable starting point derived from the **3. Webhooks & State** section of [Stripe Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```js
const sigHeader = req.headers["stripe-signature"];
try {
  const event = stripe.webhooks.constructEvent(req.body, sigHeader, process.env.STRIPE_WEBHOOK_SECRET);
  // event.id → dedup → handle by type
} catch (err) { res.status(400).send(`Webhook Error: ${err.message}`); }
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
