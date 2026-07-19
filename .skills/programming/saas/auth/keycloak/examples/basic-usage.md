# Keycloak Best Practices: Basic Usage

Best practices for running Keycloak as a self-hosted identity provider. Use when deploying Keycloak, configuring realms/clients, or integrating OIDC/SAML — covers realm isolation, token validation, high availability, and upgrades.

## Scenario

Use this example as a starting point when applying **keycloak** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Concepts** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```sh
# external PostgreSQL is the production requirement
docker run --name keycloak-db -e POSTGRES_DB=keycloak -e POSTGRES_USER=keycloak \
  -e POSTGRES_PASSWORD=changeme postgres:16
docker run --name keycloak --link keycloak-db:postgres quay.io/keycloak/keycloak:24 \
  start --db=postgres --features=declarative-ui
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
