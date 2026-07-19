# Node.js Runtime Best Practices: 7. Errors & Logging

## Source guidance

This example applies the **7. Errors & Logging** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Errors are data** — typed errors (`class ConfigError extends Error`) with a `cause`; log structured metadata, never `console.log` in prod libraries.
- **Structured logs via `pino` (or `winston`)** to stdout — one JSON line per event, `level`, `msg`, `err`, `reqId`; routing sinks is a deployment concern, not a library one.
- **Never log secrets** — redact `password`/`token`/`authorization` from request/error serialization.
- **`error.cause` chaining** (`new Error("...", { cause })`) preserves the original failure without string-stuffing.

## Example

A team applying **7. Errors & Logging** to a Node.js Runtime Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Errors are data** — typed errors (`class ConfigError extends Error`) with a `cause`; log structured metadata, never `console.log` in prod libraries.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for nodejs-runtime.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
