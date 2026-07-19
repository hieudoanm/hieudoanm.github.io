# Polar Best Practices: Starter Template

A reusable starting point derived from the **3. Webhooks & Entitlement** section of [Polar Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
switch (event.type) {
  case "subscription.active":
    await grantBenefits(event.data.subscription); // license keys, repo access, roles
    break;
  case "subscription.revoked":
    await revokeBenefits(event.data.subscription);
    break;
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
