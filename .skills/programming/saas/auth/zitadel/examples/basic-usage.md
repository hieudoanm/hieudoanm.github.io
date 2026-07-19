# ZITADEL Best Practices: Basic Usage

Best practices for running ZITADEL as a self-hosted or managed identity provider. Use when deploying realms/projects, configuring OIDC clients, or integrating IAM for your product — covers project/isolation model, token validation, and production operations.

## Scenario

Use this example as a starting point when applying **zitadel** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Concepts** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
// local validation with ZITADEL's well-known JWKS
const { payload } = jwt.verify(token, jwks, {
  issuer: "https://your-instance.zitadel.cloud",
  audience: "your.com/business/project",
});
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
