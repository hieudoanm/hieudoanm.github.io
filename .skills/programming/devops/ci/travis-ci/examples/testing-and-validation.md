# Travis CI Best Practices: 7. Deployment

## Source guidance

This example applies the **7. Deployment** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Deploy to various platforms:**
- **Use appropriate deployment providers.**
- **Use conditional deployment on specific branches.**
- **Use encrypted credentials for authentication.**

## Example

```yaml
deploy:
  provider: heroku
  api_key:
    secure: encrypted_api_key
  app: myapp
  on:
    branch: main
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for travis-ci-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
