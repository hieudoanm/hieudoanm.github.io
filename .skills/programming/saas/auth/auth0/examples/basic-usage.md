# Auth0 Best Practices: Basic Usage

Best practices for integrating Auth0 into a backend. Use when adding authentication, configuring OIDC/OAuth2 clients, tenancy, or user management — covers token validation, MFA, rate limiting, and secure storage.

## Scenario

Use this example as a starting point when applying **auth0** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Concepts** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
// verify RS256 JWT locally, not over HTTP per request
const { payload } = jwt.verify(token, getSigningKey(jwks, header.kid), {
  audience: "https://api.example.com",
  issuer: "https://your-tenant.auth0.com/",
});
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
