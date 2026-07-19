# Groovy Best Practices: Starter Template

A reusable starting point derived from the **3. Builders & DSLs** section of [Groovy Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```groovy
def json = new groovy.json.JsonBuilder()
json.people {
  person name: "Ada", role: "admin"
}
assert json.toString() == '{"people":{"person":{"name":"Ada","role":"admin"}}}'
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
