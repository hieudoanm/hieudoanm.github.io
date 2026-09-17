# Travis CI Best Practices: Starter Template

A reusable starting point derived from the **2. Configuration Structure** section of [Travis CI Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```yaml
language: node_js
node_js:
  - '18'
  - '20'

script:
  - npm ci
  - npm test
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
