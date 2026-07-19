# Auth.js Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Auth config centralized; providers declared (OAuth/Credentials) minimal
- [ ] Session strategy chosen + documented (JWT vs DB + adapter)
- [ ] Callbacks minimal identity; no secrets in session
- [ ] Middleware route protection; API auth guards
- [ ] Adapter schema migrated; expired sessions cleaned
- [ ] `AUTH_SECRET` rotated; callbackUrl checked; rate limiting on credentials

## Example

A team applying **Quick-Start Checklist** to a Auth.js Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Auth config centralized; providers declared (OAuth/Credentials) minimal**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for auth-js-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
