# Paddle Best Practices: Starter Template

A reusable starting point derived from the **3. Webhooks & Fulfillment** section of [Paddle Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
switch (event.event_type) {
  case "transaction.completed":
    await grantLicense(event.data.passthrough, event.data.payout);
    break;
  case "subscription.canceled":
    await revokeAtRenewal(event.data.subscription_id);
    break;
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
