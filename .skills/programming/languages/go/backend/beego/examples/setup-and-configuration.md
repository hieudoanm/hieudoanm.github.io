# Beego Best Practices: 2. Configuration

## Source guidance

This example applies the **2. Configuration** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Centralized config (`conf/app.conf`) — env-overridable per deploy:**
- **`web.AppConfig` API for typed reads; configs versioned (never secrets in the file).**
- **`runmode` gating for dev/prod behavior; secrets via env or a secret manager.**

## Example

```ini
appname = myservice
httpport = 8080
runmode = dev
[database]
driver = postgres
dsn = ${DB_DSN}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for beego-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
