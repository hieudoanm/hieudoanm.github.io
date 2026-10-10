# Helidon Best Practices: 3. Configuration

## Source guidance

This example applies the **3. Configuration** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`Config.create()`/`@ConfigProperty` is the only configuration source** — system property, env, `application.yaml` in one unified tree:
- **Typed reads** (`config.get("x").asInt().asOptional()`) at the boundary — typed and default-aware.
- **Secrets via env/system properties, never constants in code**; `@ConfigProperty` names documented.

## Example

```java
@ConfigProperty(name = "app.db.url")
String dbUrl;

// or programmatic:
Config config = Config.create();
String port = config.get("app.port").asString().orElse("8080");
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for helidon-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
