# Keycloak Best Practices: Starter Template

A reusable starting point derived from the **1. Core Stack & Concepts** section of [Keycloak Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```sh
# external PostgreSQL is the production requirement
docker run --name keycloak-db -e POSTGRES_DB=keycloak -e POSTGRES_USER=keycloak \
  -e POSTGRES_PASSWORD=changeme postgres:16
docker run --name keycloak --link keycloak-db:postgres quay.io/keycloak/keycloak:24 \
  start --db=postgres --features=declarative-ui
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
