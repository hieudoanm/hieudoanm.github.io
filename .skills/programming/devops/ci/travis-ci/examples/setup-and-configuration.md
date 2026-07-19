# Travis CI Best Practices: 2. Configuration Structure

## Source guidance

This example applies the **2. Configuration Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Basic Travis CI configuration:**
- **Use semantic versioning for Node.js.**
- **Use appropriate language for your project.**
- **Use script section for build commands.**

## Example

This excerpt is from the cited **2. Configuration Structure** section.

```yaml
language: node_js
node_js:
  - '18'
  - '20'

script:
  - npm ci
  - npm test
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for travis-ci-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
