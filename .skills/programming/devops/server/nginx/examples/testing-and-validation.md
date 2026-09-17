# Nginx Best Practices: 5. Quick-Start Checklist

## Source guidance

This example applies the **5. Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `server_name` explicitly set
- [ ] HTTP → HTTPS 301 redirect
- [ ] HSTS header enabled
- [ ] TLS 1.2+ only, TLS 1.3 preferred
- [ ] Strong cipher suites configured
- [ ] Gzip compression enabled for text types
- [ ] Sensitive files denied access

## Example

A team applying **5. Quick-Start Checklist** to a Nginx Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `server_name` explicitly set**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for nginx-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
