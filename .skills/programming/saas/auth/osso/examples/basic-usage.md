# Osso Best Practices: Basic Usage

Best practices for self-hosting SSO for B2B SaaS with Osso. Use when adding enterprise SAML login, managing IdP connections, or syncing directory users — covers SAML flows, connection management, and production deployment.

## Scenario

Use this example as a starting point when applying **osso** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Concepts** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```text
Browser ──► Your App
               │
               └─► Osso (SAML SP) ◄── SAML ── Enterprise IdP (Okta/AzureAD)
                      │
                      └─► SCIM sync ◄── directory → user provisioning
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
