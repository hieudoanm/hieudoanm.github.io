# Spring Boot Backend Best Practices: 2. Layering & Structure

## Source guidance

This example applies the **2. Layering & Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Separate layers with one responsibility** — `controller`, `service`, `repository`, `domain/entity`:
- **Controllers are thin** — accept a request DTO, call a service, return a response DTO; no business logic.
- **Business logic lives in services, not controllers** — controllers orchestrate HTTP only.
- **Repositories are thin** — Spring Data interfaces for persistence; no business rules in queries.
- **Stateless services where possible**; prefer composition over inheritance.

## Example

A team applying **2. Layering & Structure** to a Spring Boot Backend Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Separate layers with one responsibility** — `controller`, `service`, `repository`, `domain/entity`:**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for spring-boot-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
