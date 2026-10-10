# OneLogin Best Practices: Basic Usage

Best practices for integrating OneLogin as an enterprise identity provider. Use when adding SSO (SAML/OIDC), directory sync, or policy-based authentication — covers federation, group-based access, and IdP-driven lifecycle.

## Scenario

Use this example as a starting point when applying **onelogin** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Concepts** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```text
Enterprise directory ──► OneLogin (IdP) ──(SAML/OIDC)──► Your App
                            │
                            └──(SCIM / claims)──► Authorization from groups
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
