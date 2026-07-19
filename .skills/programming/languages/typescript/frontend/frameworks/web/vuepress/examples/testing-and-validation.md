# VuePress Best Practices: 10. Deployment

## Source guidance

This example applies the **10. Deployment** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Static generation** — build static site:
- **Deployment** — deploy to various platforms:
- **CI/CD** — set up CI/CD for automatic deployment:

## Example

```bash
npm run docs:build
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for vuepress-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
