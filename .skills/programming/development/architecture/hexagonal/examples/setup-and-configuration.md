# Hexagonal Architecture Best Practices: 2. Architecture Overview

## Source guidance

This example applies the **2. Architecture Overview** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Primary adapters** — driving adapters (API, CLI, UI)
- **Secondary adapters** — driven adapters (Database, Message Queue, External API)
- **Ports** — interfaces that define how the domain interacts with external systems
- **Domain** — core business logic without external dependencies

## Example

A team applying **2. Architecture Overview** to a Hexagonal Architecture Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Primary adapters** — driving adapters (API, CLI, UI)**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for hexagonal-architecture.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
