# Hapi.js Backend Best Practices: 5. Errors (Boom)

## Source guidance

This example applies the **5. Errors (Boom)** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`Boom` errors are the error vocabulary** — `throw Boom.notFound("user missing")`, `Boom.badRequest("invalid payload")`, `Boom.unauthorized(…)`, `Boom.conflict(…)`:
- **Map domain→Boom in the service boundary or handler**, never in every call site — a small translator converts typed domain errors to `Boom.*` with client-safe messages.
- **`server.ext("onPreResponse", ...)`** for a centralized response shaping hook — stamp generic metadata, serialize errors consistently, and keep stack traces out of `payload` for 5xx.
- **Validation errors map automatically** — Joi `failAction: "error"` produces a 400-shaped Boom response; don't double-handle.

## Example

```ts
const user = await findUser(id);
if (!user) throw Boom.notFound(`user ${id} not found`);
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for hapi-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
