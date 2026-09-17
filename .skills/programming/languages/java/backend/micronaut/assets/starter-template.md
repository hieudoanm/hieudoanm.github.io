# Micronaut Best Practices: Starter Template

A reusable starting point derived from the **4. Configuration** section of [Micronaut Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```java
@ConfigurationProperties("app")
public class AppConfig {
    private Db db;
    public static class Db { private String url; /* getters/setters */ }
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
