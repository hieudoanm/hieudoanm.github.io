# GitHub Actions Best Practices: 7. Deployment

## Source guidance

This example applies the **7. Deployment** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Deploy to various platforms:**
- **Use conditional deployment (only on main branch).**
- **Use environment-specific workflows.**
- **Use deployment actions (Heroku, AWS, etc.).**

## Example

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to production
        run: |
          # Deployment commands
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for github-actions-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
