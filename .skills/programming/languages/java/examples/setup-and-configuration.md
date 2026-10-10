# Java Best Practices: 1. Project Structure

## Source guidance

This example applies the **1. Project Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

Build with Maven or Gradle (Kotlin DSL preferred):
- **Package names: lowercase reverse-domain** (`com.example.myapp`); no `java`/`javax`/`sun` segments.
- **Layering by package**: `domain` (pure business logic, no frameworks) → `application` (use cases, services) → `infrastructure` (persistence, HTTP, config). Dependencies point inward; domain never imports infrastructure.
- **A thin `main`** — parse config/args, wire dependencies, start; business logic lives in testable classes.
- One top-level class per file (public class name = file name); keep `package-private` types for file-internal helpers.

## Example

A team applying **1. Project Structure** to a Java Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Package names: lowercase reverse-domain** (`com.example.myapp`); no `java`/`javax`/`sun` segments.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for java-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
