# Polar Best Practices: Basic Usage

Best practices for monetizing open-source and digital products with Polar. Use when selling subscriptions, one-time purchases, or handling donations/pledges — covers checkout, benefits, webhooks, and the open-source ISV model.

## Scenario

Use this example as a starting point when applying **polar** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Webhooks & Entitlement** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
