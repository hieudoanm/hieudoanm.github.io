# Beego Best Practices: Starter Template

A reusable starting point derived from the **2. Configuration** section of [Beego Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ini
appname = myservice
httpport = 8080
runmode = dev
[database]
driver = postgres
dsn = ${DB_DSN}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
