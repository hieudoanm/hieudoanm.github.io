# Micronaut Best Practices: 4. Configuration

## Source guidance

This example applies the **4. Configuration** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Typed config via `@ConfigurationProperties` (or `@Configuration` + `@Value` scoped):**
- **`@ConfigurationProperties` bean injected once; `@Value("${app.retries}")` for the odd scalar only.**
- **Env-driven overrides** (`APP_DB_URL`) via property mapping; secrets from env, never constants.
- **Validation of config at startup** (`@NotBlank` on config properties) — a bad config fails fast in dev and deploy.

## Example

```yaml
app:
  db:
    url: jdbc:postgresql://localhost/db
  retries: 3
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for micronaut-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
