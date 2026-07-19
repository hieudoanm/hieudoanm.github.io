# Snyk: Starter Template

A reusable starting point derived from the **2. Triage: Reachability First** section of [Snyk](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```json
{
  "ignore": [
    {
      "id": "SNYK-JS-1234",
      "paths": ["tests/**", "**/*.test.ts"],
      "reason": "Test-only dependency, not shipped; pinned until the suite is migrated",
      "expires": "2027-01-15"
    }
  ]
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
