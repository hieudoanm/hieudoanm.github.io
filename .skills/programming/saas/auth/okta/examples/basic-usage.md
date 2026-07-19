# Okta Best Practices: Basic Usage

Best practices for integrating Okta into a backend. Use when adding enterprise authentication, SSO/SAML-OIDC federation, or provisioning — covers token validation, group claims, SSO, and lifecycle management.

## Scenario

Use this example as a starting point when applying **okta** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Concepts** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
// groups-as-claims authorization
const { payload } = jwt.verify(token, jwks);
if (!payload.groups.includes("admins")) throw new ForbiddenError();
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
