# RevenueCat Best Practices: Starter Template

A reusable starting point derived from the **3. Entitlements & Backend Truth** section of [RevenueCat Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
// backend reflects webhook: grant/revoke entitlement server-side
switch (event.type) {
  case "CUSTOMER_ENTITLEMENT_CREATED": await grant(event.app_user_id, event.entitlement_id); break;
  case "CUSTOMER_ENTITLEMENT_REVOKED": await revoke(event.app_user_id, event.entitlement_id); break;
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
