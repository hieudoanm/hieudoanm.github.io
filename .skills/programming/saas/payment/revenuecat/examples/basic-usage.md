# RevenueCat Best Practices: Basic Usage

Best practices for in-app purchases and subscriptions with RevenueCat. Use when integrating IAP on iOS/Android (and web), managing entitlement state, or this offering trial promotions — treats RevenueCat as the entitlement source of truth for native stores.

## Scenario

Use this example as a starting point when applying **revenuecat** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Entitlements & Backend Truth** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
// backend reflects webhook: grant/revoke entitlement server-side
switch (event.type) {
  case "CUSTOMER_ENTITLEMENT_CREATED": await grant(event.app_user_id, event.entitlement_id); break;
  case "CUSTOMER_ENTITLEMENT_REVOKED": await revoke(event.app_user_id, event.entitlement_id); break;
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
