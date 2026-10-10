# Fastify.js Backend Best Practices: 6. Performance & Concurrency Discipline

## Source guidance

This example applies the **6. Performance & Concurrency Discipline** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Schema validation is the performance story** — route `schema` makes handlers parse-free & pre-validated; don't replace it with zod-in-handler checks that defeat Fastify's fast path.
- **Async everywhere, awaited** — handlers return payloads (Fastify serializes); never `await` next-blocking I/O; keep the event loop honest (see Node runtime skill).
- **Outbound calls timed** (`AbortSignal.timeout`) so a hung upstream can't pin a worker.
- **Instance cost is zero-ish** — prefer `await app.ready()` + `app.listen` once; don't create a new `Fastify()` per request.

## Example

A team applying **6. Performance & Concurrency Discipline** to a Fastify.js Backend Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Schema validation is the performance story** — route `schema` makes handlers parse-free & pre-validated; don't replace it with zod-in-handler checks that defeat Fastify's fast path.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for fastify-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
