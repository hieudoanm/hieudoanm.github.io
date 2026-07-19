# GitHub Actions Best Practices: 10. Security

## Source guidance

This example applies the **10. Security** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Use security best practices:**
- **Use security scanning tools.**
- **Use code scanning for dependency vulnerabilities.**
- **Use security alerts for security notifications.**

## Example

```yaml
steps:
  - name: Run security scan
    uses: actions/security-scan/action@v1
    with:
      severity: 'high,critical'
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for github-actions-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
