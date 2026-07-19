# Travis CI Best Practices: 4. Caching

## Source guidance

This example applies the **4. Caching** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Use caching for dependencies:**
- **Cache node_modules to speed up builds.**
- **Use npm cache for package dependencies.**
- **Use appropriate cache directories.**

## Example

```yaml
cache:
  directories:
    - node_modules
    - $HOME/.npm
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for travis-ci-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
