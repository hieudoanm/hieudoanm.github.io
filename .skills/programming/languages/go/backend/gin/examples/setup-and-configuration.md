# Gin Backend Best Practices: 2. Project Structure & Routing

## Source guidance

This example applies the **2. Project Structure & Routing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Separate layers clearly** — `handler` (HTTP), `service` (business), `repository` (data), `domain` (models):
- **RESTful resource naming** (`/users`, `/orders/:id`); **version explicitly** (`/api/v1/...`).
- **Compose the router in `main`/an `app.NewRouter()` factory** — register routes with their handler + middleware visibly.
- **`Context.Context` flows through all layers** — create/derive one per request in middleware/handler, pass it to services and repositories.

## Example

A team applying **2. Project Structure & Routing** to a Gin Backend Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Separate layers clearly** — `handler` (HTTP), `service` (business), `repository` (data), `domain` (models):**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for gin-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
