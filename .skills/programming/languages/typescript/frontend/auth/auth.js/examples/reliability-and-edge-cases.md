# Auth.js Best Practices: 6. Security Hygiene

## Source guidance

This example applies the **6. Security Hygiene** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`AUTH_SECRET`/`secret` long, rotated; provider secrets never in client bundles.**
- **CSRF/`callbackUrl` handling sanctioned (NextAuth handles most — verify redirect sanity).**
- **Rate-limit the credential path; lockout on brute-force via stored throttling.**
- **Audit dependency upgrades (`@auth/*` versioning reviewed); logs redact PII.**

## Example

A team applying **6. Security Hygiene** to a Auth.js Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****`AUTH_SECRET`/`secret` long, rotated; provider secrets never in client bundles.****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for auth-js-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
