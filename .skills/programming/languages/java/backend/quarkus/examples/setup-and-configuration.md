# Quarkus Best Practices: 4. Configuration & Secrets

## Source guidance

This example applies the **4. Configuration & Secrets** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`application.properties` is the tree; env maps the same keys** (`OME_DB_URL` → `quarkus.datasource.jdbc.url` style):
- **Typed config via `@ConfigProperty`/`@ConfigMapping`** — `@ConfigMapping` for grouped, immutable settings:
- **Secrets via env/`Helidon`-style layer, never constants**; native builds bake config — env overrides still apply.

## Example

```properties
%dev.quarkus.datasource.jdbc.url=jdbc:postgresql://localhost/db
quarkus.datasource.jdbc.url=${OME_DB_URL}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for quarkus-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
