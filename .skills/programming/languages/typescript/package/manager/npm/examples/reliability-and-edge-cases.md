# npm Best Practices: 6. Security & Audits

## Source guidance

This example applies the **6. Security & Audits** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`npm audit` wired into CI (fail on `high`+); `npm outdated` quarterly:**
- **Trust the provenance: prefer scoped/official packages; avoid tall dependency trees that drift; `overrides` only with a reason documented.**
- **Registry mirrors (Verdaccio/proxy) for orgs; SSRF feel. Least-privilege tokens.**

## Example

```bash
npm audit --production   # only what ships
npm outdated
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for npm-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
