# Helidon Best Practices: Starter Template

A reusable starting point derived from the **3. Configuration** section of [Helidon Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```java
@ConfigProperty(name = "app.db.url")
String dbUrl;

// or programmatic:
Config config = Config.create();
String port = config.get("app.port").asString().orElse("8080");
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
