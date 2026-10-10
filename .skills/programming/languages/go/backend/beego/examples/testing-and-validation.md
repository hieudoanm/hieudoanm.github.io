# Beego Best Practices: 6. Deployment & Testing

## Source guidance

This example applies the **6. Deployment & Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Config as env; graceful shutdown; `runmode=prod` with `AutoRender=false` for API mode:**
- **Tests: `httptest`+controller harness; service packages unit-tested; golden-response checks.**
- **Pin versions (`go.mod`); CI pipeline builds + tests + lint; health endpoints for SWR.**

## Example

A team applying **6. Deployment & Testing** to a Beego Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Config as env; graceful shutdown; `runmode=prod` with `AutoRender=false` for API mode:****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for beego-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
