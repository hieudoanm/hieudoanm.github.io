# Android: 1. Core Stack & Module Structure

## Source guidance

This example applies the **1. Core Stack & Module Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Kotlin + K2 compiler**: standard since Kotlin 2.0; the compiler ships with the Kotlin plugin, so no separate Compose compiler version.
- **Jetpack Compose** for UI, **AndroidX** for platform glue, **KSP** for annotation processing.
- **Layers**: `ui` (Compose + ViewModel), `domain` (pure Kotlin, no Android deps), `data` (Room, Retrofit, DataStore). The `domain` module must stay Android-free so it is testable on the JVM.
- **Prefer a single `:app` module** until build times or team ownership actually force a split. Premature multi-module is a common source of accidental public API and slow builds.

## Example

A team applying **1. Core Stack & Module Structure** to a Android project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Kotlin + K2 compiler**: standard since Kotlin 2.0; the compiler ships with the Kotlin plugin, so no separate Compose compiler version.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for android-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
